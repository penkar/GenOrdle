export type guessInterface = {
  character: string;
  hint: boolean;
  match: boolean;
};

export type guessesInterface = {
  guess: guessInterface[];
  length: number;
  previous?: boolean;
};

export type characterInterface = {
  character: string;
  currentGuess?: boolean;
  hint?: boolean;
  match?: boolean;
  previous?: boolean;
};
