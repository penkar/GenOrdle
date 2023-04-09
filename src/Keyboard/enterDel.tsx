import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useGuess } from "../Hooks/useGuess";

require("./key.scss");

interface EnterDelInterface {
  enter?: boolean;
}

export default function EnterDel({ enter = false }: EnterDelInterface) {
  const { attemptGuess, removeLetter } = useGuess();

  return (
    <button
      className={cn("key", { enter: enter, delete: !enter })}
      onClick={enter ? attemptGuess : removeLetter}
    >
      {enter ? "ENTER" : <FontAwesomeIcon icon={faDeleteLeft} />}
    </button>
  );
}

EnterDel.defaultProps = {
  enter: false,
};
