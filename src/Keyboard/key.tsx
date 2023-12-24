import cn from "classnames";
import { useGuess } from "../Hooks/useGuess";

import { KeyInterface } from "./types";

export default function Key({ letter }: KeyInterface) {
  const { addLetterToGuess, hintCharacters, matchCharacters, spentCharacters } =
    useGuess();
  const addLetter = () => addLetterToGuess(letter);
  const className = cn("key", {
    "key__match-character": matchCharacters.has(letter),
    "key__hint-character": hintCharacters.has(letter),
    "key__spent-character": spentCharacters.has(letter),
  });

  return (
    <button className={className} onClick={addLetter}>
      {letter}
    </button>
  );
}
