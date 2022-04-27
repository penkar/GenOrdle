import cn from "classnames";
import { useGuess } from "../Hooks/useGuess";
require("./key.scss");

interface KeyInterface {
  letter: string;
}

export default function Key({ letter }: KeyInterface) {
  const { addLetterToGuess, hintCharacters, matchCharacters } = useGuess();
  const addLetter = () => addLetterToGuess(letter);
  const className = cn("key", {
    "key__match-character": matchCharacters.has(letter),
    "key__hint-character": hintCharacters.has(letter),
  })
  
  return (
    <a className={className} onClick={addLetter}>
      {letter}
    </a>
  );
}
