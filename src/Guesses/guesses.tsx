import cn from "classnames";

import { Guess, CurrentGuess } from "./guess";
import { useGuess } from "../Hooks/useGuess";

export default function Guesses() {
  const { allowedGuesses, guesses, guess, rumble, secretLength } = useGuess();
  const emptyGuesses = allowedGuesses - guesses.length - 1 > 0;

  return (
    <div className={cn("guesses__mainBody", { rumble })}>
      {guesses.map((prevGuess, i) => (
        <Guess previous key={i} guess={prevGuess} length={secretLength} />
      ))}
      {guesses.length < allowedGuesses && (
        <CurrentGuess guess={guess} length={secretLength} />
      )}
      {emptyGuesses &&
        new Array(allowedGuesses - guesses.length - 1)
          .fill({})
          .map((x, i) => (
            <Guess key={`empty_${i}`} length={secretLength} guess={x} />
          ))}
    </div>
  );
}
