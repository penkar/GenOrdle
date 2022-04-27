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
    <a
      className="enter key"
      onClick={enter ? attemptGuess : removeLetter}
    >
      {enter ? "ENTER" : <FontAwesomeIcon icon={faDeleteLeft} />}
    </a>
  );
}

EnterDel.defaultProps = {
  enter: false,
};
