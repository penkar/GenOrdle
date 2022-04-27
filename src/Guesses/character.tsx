import cn from "classnames";
require("./character.scss");

interface characterInterface {
  character: string;
  currentGuess?: boolean;
  hint?: boolean;
  match?: boolean;
  previous?: boolean;
}

const Character = ({
  character,
  currentGuess,
  hint,
  match,
  previous,
}: characterInterface) => {
  const charStyles = cn("guess__character", {
    "matchCharacter": match,
    "hintCharacter": hint,
    "previousCharacter": previous,
    "currentGuess": currentGuess,
    "emptyCharacter": !currentGuess && !character,
  });

  return <div className={charStyles}>{character}</div>;
};

Character.defaultProps = {
  character: "",
  currentGuess: false,
  hint: false,
  match: false,
  previous: false,
};

export default Character;
