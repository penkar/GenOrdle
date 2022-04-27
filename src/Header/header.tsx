import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChartColumn,
  faGear,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { useModal } from "../Hooks/useModal";

require("./header.scss");

interface HeaderInterface {
  title?: string;
}

const Header = React.memo(({ title = "GenOrdle" }: HeaderInterface) => {
  const { setCurrentModal } = useModal();

  return (
    <div className='header__header'>
      <div className='header__row'>
        <FontAwesomeIcon
          className='header__icon'
          icon={faBars}
          onClick={() => setCurrentModal(1)}
          size="2x"
        />
        <FontAwesomeIcon
          className='header__icon'
          icon={faQuestion}
          onClick={() => setCurrentModal(2)}
          size="2x"
        />
      </div>
      <div className='header__title'>{title}</div>
      <div className='header__row'>
        <FontAwesomeIcon
          className='header__icon'
          icon={faChartColumn}
          onClick={() => setCurrentModal(3)}
          size="2x"
        />
        <FontAwesomeIcon
          className='header__icon'
          icon={faGear}
          onClick={() => setCurrentModal(4)}
          size="2x"
        />
      </div>
    </div>
  );
});

export default Header;
