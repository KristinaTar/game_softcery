import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import { createGame } from "../data/api";

type Props = {
  userName: string
}

const CreateGame: React.FC<Props> = ({ userName }) => {
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography>Welcome, {userName}</Typography>
        <Button
          size='large'
          variant="contained"
          onClick={() => createGame()}
        > Create Game</Button>
      </Box>
    </>
  );
};

export default CreateGame;
