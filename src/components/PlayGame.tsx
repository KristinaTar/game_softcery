import React, { useEffect, useMemo, useState } from 'react';
import { joinGame, socket } from "../data/api";
import { Box, Button, Container, Typography } from "@mui/material";
import { Choice, GameResult, Outcome } from "../data/types";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


type Props = {
  userName: string,
  gameId: string,
}

const PlayGame: React.FC<Props> = ({ userName, gameId }) => {
  const [choice, setChoice] = useState<Choice | null>(null);

  const [onlineStatus, setOnlineStatus] = useState(false);
  const [opponentMadeChoice, setOpponentMadeChoice] = useState(false);
  const [opponentName, setOpponentName] = useState("");
  const [displayOutcome, setDisplayOutcome] = useState(false);
  const [gameData, setGameData] = useState<GameResult>({
    outcome: Outcome.Draw,
    playerScore: 0,
    opponentScore: 0,
    yourChoice: Choice.Rock,
    opponentChoice: Choice.Rock,
  });

  const handleClose = () => {
    setDisplayOutcome(false);
  };

  useEffect(() => {
    socket.emit('joinGame', {
      gameId,
      playerName: userName
    });
  }, [gameId]);

  useEffect(() => {
    socket.on('playerJoined', (_opponentName) => {
      setOnlineStatus(true);
      setOpponentName(_opponentName);
    });

    socket.on('opponentMadeChoice', () => {
      setOpponentMadeChoice(true);
    });

    socket.on('gameResult', (gameResult: GameResult) => {
      setGameData(gameResult);
      setDisplayOutcome(true);
      setChoice(null);
    });

    socket.on('opponentDisconnected', ()=>{
      setOpponentName("Waiting for opponent name");
      setOpponentMadeChoice(false);
      setOnlineStatus(false);
      setGameData((prevState) => ({
        ...prevState,
        playerScore: 0,
        opponentScore: 0,
      }));
    });

    return () => {
      socket.off('playerJoined');
      socket.off('opponentMadeChoice');
      socket.off('gameResult');
      socket.off('opponentDisconnected');
    };
  }, []);

  const handleChoice = (newChoice: Choice) => {
    setChoice(newChoice);
    socket.emit('madeChoice', {
      choice: newChoice,
      gameId
    });
  }

  const outcomeMessage = useMemo(() => {
    if (gameData.outcome === Outcome.Win) {
      return "YOU WON!";
    } else if (gameData.outcome === Outcome.Loss) {
      return "YOU LOSS!";
    }

    return "DRAW!";
  }, [gameData.outcome]);

  return (
    <Container>
      <Typography>Game URL: <i style={{ backgroundColor: '#9be0cf' }}>{window.location.href}</i></Typography>
      <Typography mb={5}>Copy and provide it to your opponent</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Box>
          <Typography>{userName}</Typography>
          {
            onlineStatus
              ? <>
                <Typography>Make your choice:</Typography>
                <Button
                  size='large'
                  variant={choice === Choice.Rock ? "contained" : "outlined"}
                  onClick={() => handleChoice(Choice.Rock)}
                >
                  Rock
                </Button>
                <Button
                  size='large'
                  variant={choice === Choice.Scissors ? "contained" : "outlined"}
                  onClick={() => handleChoice(Choice.Scissors)}
                >
                  Scissors
                </Button>
                <Button
                  size='large'
                  variant={choice === Choice.Paper ? "contained" : "outlined"}
                  onClick={() => handleChoice(Choice.Paper)}
                >
                  Paper
                </Button>
              </>
              : <Typography>Please wait for player</Typography>
          }
        </Box>
        <Box>
          <Typography>Opponent name: {opponentName || 'Waiting for player'}</Typography>
          <Typography>Status: {onlineStatus ? "Online" : "Offline"}</Typography>
          <Typography>Choosing: {opponentMadeChoice ? "MadeChoice" : "Waiting for opponent choice"} </Typography>
          <Typography>Your score: {gameData.playerScore} </Typography>
          <Typography>Opponent Score: {gameData.opponentScore}</Typography>
          <div>
            <Dialog
              open={displayOutcome}
              onClose={handleClose}
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description"
                                   style={{
                                     display: 'flex',
                                     flexDirection: 'column',
                                     alignItems: 'center',
                                     justifyContent: 'center'
                                    }}>
                  <Typography style={{fontSize: '20px', fontWeight: '700', marginBottom:'10px'}}>{outcomeMessage}</Typography>
                  <Typography> Your choice: {gameData.yourChoice.toUpperCase()}</Typography>
                  <Typography> Opponent choice: {gameData.opponentChoice.toUpperCase()}</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default PlayGame;
