import cn from "classnames";

import { characterInterface } from "./types";

const Character = ({
  character = "",
  currentGuess = false,
  hint = false,
  match = false,
  previous = false,
}: characterInterface) => {
  const charStyles = cn("guess__character", {
    matchCharacter: match,
    hintCharacter: hint,
    previousCharacter: previous,
    currentGuess: currentGuess,
    emptyCharacter: !currentGuess && !character,
  });

  return <div className={charStyles}>{character}</div>;
};

export default Character;
