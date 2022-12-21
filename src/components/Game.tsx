import React, { useEffect } from 'react';

import { useNavigate, useParams } from "react-router-dom";
import CreateGame from "./CreateGame";
import PlayGame from "./PlayGame";
import { socket } from "../data/api";

type Props = {
  userName: string
}

const Game: React.FC<Props> = ({ userName }) => {
  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    socket.on('gameCreated',(_gameId)=>{
      navigate("/" + _gameId);
    });

    socket.on('wrongGameId',()=>{
      navigate('..');
    });

    return () => {
      socket.off('gameCreated');
      socket.off('wrongGameId');
    };
  }, []);

  return (
    !gameId
      ?
      <CreateGame userName={userName}/>
      :
      <PlayGame gameId={gameId} userName={userName}/>
  );
};

export default Game;
