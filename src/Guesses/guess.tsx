import Character from "./character";
require("./guess.scss");

interface guessInterface {
  character: string;
  hint: boolean;
  match: boolean;
}

interface guessesInterface {
  guess: guessInterface[];
  length: number;
  previous?: boolean;
}

export const Guess = ({ length, guess, previous }: guessesInterface) => {
  const currentGuess = new Array(length);
  for (let i = 0; i < length; i++) {
    currentGuess[i] = guess[i] || {};
  }
  return (
    <div className="guess__guess">
      {currentGuess.map((character: guessInterface, i: number) => (
        <Character key={i} {...character} previous={previous} />
      ))}
    </div>
  );
};

Guess.defaultProps = {
  guess: [],
  previous: false,
};

interface currentGuessInterface {
  guess: string;
  length: number;
}

export const CurrentGuess = ({ guess, length }: currentGuessInterface) => {
  const letters = [];
  for (let i = 0; i < length; i++) {
    letters.push(<Character character={guess[i]} currentGuess key={i} />);
  }
  return <div className="guess__guess">{letters}</div>;
};
