import * as io from "socket.io-client";

export const socket = io.connect("http://192.168.88.120:3001");


export const createGame = () => {
  socket.emit('createGame');
}

export const joinGame = (gameId: string, playerName: string) => {
  socket.emit('joinGame', { gameId, playerName });
}


