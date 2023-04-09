import React from "react";

import KeyRow from "./keyRow";
import { useGuess } from "../Hooks/useGuess";

require("./keyboard.scss");

export default function Keyboard() {
  const { addLetterToGuess, completion, removeLetter, attemptGuess } =
    useGuess();

  const keyDownEvent = React.useCallback(
    (event: KeyboardEvent): void => {
      if (completion) return;
      const { key, keyCode } = event;
      if (keyCode > 64 && keyCode < 91) {
        /* A-Z */
        addLetterToGuess(key);
      } else if (keyCode === 8) {
        /* Backspace */
        removeLetter();
      } else if (keyCode === 13) {
        attemptGuess();
      }
    },
    [addLetterToGuess, attemptGuess, completion, removeLetter]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", keyDownEvent);
    return () => document.removeEventListener("keydown", keyDownEvent);
  }, [keyDownEvent]);

  return (
    <div className="keyboard">
      <KeyRow letters="qwertyuiop" />
      <KeyRow letters="asdfghjkl" />
      <KeyRow letters="zxcvbnm" enterDel />
    </div>
  );
}
