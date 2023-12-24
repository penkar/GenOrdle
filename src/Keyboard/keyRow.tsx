import EnterDel from "./enterDel";
import Key from "./key";

import { KeyRowInterface } from "./types";

export default function KeyRow({
  enterDel = false,
  letters = "",
}: KeyRowInterface) {
  return (
    <div className="key__row">
      {enterDel && <EnterDel enter />}
      {letters.split("").map((letter) => (
        <Key key={letter} letter={letter} />
      ))}
      {enterDel && <EnterDel />}
    </div>
  );
}
