import React, { ReactNode } from "react";
import { getRandomWord, checkRandomWrod } from "../sampleWords";

type GuessContextType = {
  addLetterToGuess: (c: string) => void;
  allowedGuesses: number;
  attemptGuess: () => void;
  completion: number;
  guess: string;
  guesses: [];
  hintCharacters: Set<any>;
  matchCharacters: Set<any>;
  removeLetter: () => void;
  secretLength: number;
  setGuess: (c: string) => void;
  status: {};
};

const GuessContext = React.createContext<GuessContextType>({
  addLetterToGuess: (c) => null,
  allowedGuesses: 6,
  attemptGuess: () => null,
  completion: 0,
  guess: "",
  guesses: [],
  hintCharacters: new Set(),
  matchCharacters: new Set(),
  removeLetter: () => null,
  secretLength: 5,
  setGuess: (c) => null,
  status: {},
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
  const [matchCharacters, setmatchCharacters] = React.useState(new Set());

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
      setmatchCharacters(matchCharacters);
      setHintCharacters(hintCharacters);
      setGuessArray(newGuessArray);

      if (newGuessArray.length === allowedGuesses) {
        setCompletion(7);
      } else if (guess === secret) {
        setCompletion(newGuessArray.length);
      }
    }
    setGuess("");
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
    secretLength: secret.length,
    setGuess,
    status,
    matchCharacters: matchCharacters,
  };

  React.useEffect(() => {
    // setSecret("wreck");
    setSecret(getRandomWord());
    // Fetch request to an outside API to get a random wordl.
    /*
    let url = `https://api.wordnik.com/v4/words.json/randomWord?`;
    const searchParams = {
      hasDictionaryDef: true,
      includePartOfSpeech:
        "noun%2Cadjective%2Cverb%2Cadverb%2Cpreposition%2Carticle",
      minCorpusCount: 1000,
      maxCorpusCount: -1,
      minDictionaryCount: 1,
      maxDictionaryCount: -1,
      minLength: 6,
      maxLength: 6,
      api_key: "YOURAPIKEY",
    };
    url += Object.entries(searchParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    fetch(`url`)
      .then((res) => res.json())
      .then(({ word }) => {
        setSecret(word);
      });
    */
  }, []);

  return (
    <GuessContext.Provider value={guessProps}>{children}</GuessContext.Provider>
  );
};

const useGuess = () => React.useContext(GuessContext);

export { GuessContext, GuessContextProvider, useGuess };
