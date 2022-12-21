export enum Choice {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors',
}

export type GameResult = {
  outcome: Outcome,
  playerScore: number,
  opponentScore: number,
  yourChoice: Choice,
  opponentChoice: Choice,
}

export enum Outcome {
  Win = 'win',
  Loss = 'loss',
  Draw = 'draw',
}
