import React, { ReactNode } from "react";
import {
  // getRandomWord,
  getWordBasedOnDate,
  checkRandomWrod,
} from "../sampleWords";

type GuessContextType = {
  rumble: boolean;
  allowedGuesses: number;
  completion: number;
  secretLength: number;
  secret: string | null;
  guess: string;
  guesses: [];
  status: {};
  hintCharacters: Set<any>;
  matchCharacters: Set<any>;
  spentCharacters: Set<any>;
  attemptGuess: () => void;
  removeLetter: () => void;
  addLetterToGuess: (c: string) => void;
  setGuess: (c: string) => void;
};

const GuessContext = React.createContext<GuessContextType>({
  rumble: false,
  allowedGuesses: 6,
  completion: 0,
  secretLength: 5,
  secret: null,
  guess: "",
  guesses: [],
  status: {},
  hintCharacters: new Set(),
  matchCharacters: new Set(),
  spentCharacters: new Set(),
  removeLetter: () => null,
  attemptGuess: () => null,
  addLetterToGuess: (c) => null,
  setGuess: (c) => null,
});

type Guess = {
  character: string;
  hint: boolean;
  match: boolean;
};

const GuessContextProvider = ({ children }: { children: ReactNode }) => {
  const [completion, setCompletion] = React.useState<number>(0);
  // Status object.
  const [status, setStatus] = React.useState({ shiver: false });
  const [rumble, setRumble] = React.useState(false);
  // Secret is the answer to the puzzle. I'm not bothering to hide this on the client side.
  const [secret, setSecret] = React.useState("");
  // This is the number of guesses that is allowed. Depending on the length of the secret you might incraease the number of allowed guesses.
  const [allowedGuesses /*, setAllowedGuesses*/] = React.useState(6);
  // guesses that have been made previously.
  const [guessArray, setGuessArray] = React.useState<any>([]);
  // This is the current guess.
  const [guess, setGuess] = React.useState("");
  // This is an array of matching characters that match characters in the secret.
  const [hintCharacters, setHintCharacters] = React.useState(new Set());
  // This is an array of positions where characters have matched.
  const [matchCharacters, setMatchCharacters] = React.useState(new Set());
  const [spentCharacters, setSpentCharacters] = React.useState(new Set());

  // Add a letter to the current guess.
  const addLetterToGuess = (letter: string) => {
    if (guess.length < secret.length) {
      setGuess(guess + letter);
    } else {
      setStatus({ shiver: !status.shiver });
    }
  };
  // Remove the last letter from the current guess.
  const removeLetter = () =>
    guess.length > 0 && setGuess(guess.slice(0, guess.length - 1));

  // Function will test the current guess against the secret.
  const attemptGuess = () => {
    if (guess.length < secret.length) return;
    if (checkRandomWrod(guess)) {
      const guessAttempt: Guess[] = [];
      const newGuessArray: Guess[][] = [...guessArray];

      for (let i = 0; i < guess.length; i++) {
        const character = guess[i];
        const characterObject = { match: false, hint: false, character };
        spentCharacters.add(character);
        if (character === secret[i]) {
          characterObject.match = true;
          matchCharacters.add(character);
        }
        if (secret.includes(character)) {
          characterObject.hint = true;
          hintCharacters.add(character);
        }
        guessAttempt.push(characterObject);
      }
      newGuessArray.push(guessAttempt);
      setMatchCharacters(matchCharacters);
      setHintCharacters(hintCharacters);
      setSpentCharacters(spentCharacters);
      setGuessArray(newGuessArray);

      setOffset();

      if (newGuessArray.length === allowedGuesses) {
        setCompletion(7);
      } else if (guess === secret) {
        setCompletion(newGuessArray.length);
      }
      setGuess("");
    } else {
      setRumble(true);
      setTimeout(() => {
        setRumble(false);
        setGuess("");
      }, 500);
    }
  };

  const guessProps = {
    addLetterToGuess,
    allowedGuesses,
    attemptGuess,
    completion,
    guess,
    guesses: guessArray,
    hintCharacters: hintCharacters,
    removeLetter,
    rumble,
    secret: completion ? secret : null,
    secretLength: secret.length,
    setGuess,
    spentCharacters,
    status,
    matchCharacters: matchCharacters,
  };

  const getOffset = () =>
    JSON.parse(
      window.localStorage.getItem("genordleOffset") ||
        '{"date": 0, "offset": 0}'
    ).offset;

  const setOffset = () => {
    const dateNum = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24);
    const offsetData = JSON.parse(
      window.localStorage.getItem("genordleOffset") ||
        '{"date": 0, "offset": 0}'
    );
    const offset = dateNum === offsetData.date ? offsetData.offset : 0;
    window.localStorage.setItem(
      "genordleOffset",
      JSON.stringify({ date: dateNum, offset: offset + 1 })
    );
    return offset;
  };

  React.useEffect(() => {
    // setSecret("wreck");
    // setSecret(getRandomWord());
    setSecret(getWordBasedOnDate(getOffset()));
  }, []);

  return (
    <GuessContext.Provider value={guessProps}>{children}</GuessContext.Provider>
  );
};

const useGuess = () => React.useContext(GuessContext);

export { GuessContext, GuessContextProvider, useGuess };
