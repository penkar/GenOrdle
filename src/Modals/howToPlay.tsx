import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Guess } from "../Guesses/guess";

import { useModal } from "../Hooks/useModal";

require("./howToPlay.scss");

const HowToPlay = React.memo(() => {
  const { currentModal, exitModal } = useModal();

  const guess1 = [
    { match: true, hint: false, character: "t" },
    { match: false, hint: false, character: "o" },
    { match: false, hint: false, character: "p" },
    { match: false, hint: false, character: "s" },
  ];

  const guess2 = [
    { match: false, hint: false, character: "w" },
    { match: false, hint: true, character: "o" },
    { match: false, hint: false, character: "r" },
    { match: false, hint: false, character: "d" },
  ];

  const guess3 = [
    { match: false, hint: false, character: "w" },
    { match: false, hint: false, character: "i" },
    { match: false, hint: false, character: "n" },
    { match: false, hint: false, character: "s" },
  ];

  return (
    <div className={currentModal === 2 ? "how_to_play__open" : "how_to_play__modal"}>
      <div className="how_to_play__contentWrapper">
        <div className="how_to_play__title">
          <span>how to play</span>
          <FontAwesomeIcon
            className="how_to_play__closeIcon"
            icon={faClose}
            onClick={exitModal}
          />
        </div>
        <div>
          <div className="how_to_play__line">
            Guess the <span className="how_to_play__strong">GenOrdle</span> in six
            tries.
          </div>
          <div className="how_to_play__line">
            Each guess must be a 5-8 character set of words. Hit the enter
            button to submit.
          </div>
          <div className="how_to_play__line">
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </div>
          <hr />
          <div className="how_to_play__strongLine">Examples</div>
          <div className="how_to_play__line">
            The letter <span className="how_to_play__strong">T</span> is in the word
            and in the correct spot.
          </div>
          <div className="how_to_play__line">
            <Guess length={4} previous guess={guess1} />
          </div>
          <div className="how_to_play__line">
            The letter <span className="how_to_play__strong">O</span> is in the word
            but in the wrong spot.
          </div>
          <div className="how_to_play__line">
            <Guess length={4} previous guess={guess2} />
          </div>
          <div className="how_to_play__line">
            The letter <span className="how_to_play__strong">S</span> is not in the
            word in any spot.
          </div>
          <div className="how_to_play__line">
            <Guess length={4} previous guess={guess3} />
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
});

export default HowToPlay;
