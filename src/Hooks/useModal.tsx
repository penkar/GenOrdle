import React, { ReactNode } from "react";

type ModalContextType = {
  currentModal: number;
  exitModal: () => void;
  setCurrentModal: (modal: number) => void;
};

const ModalContext = React.createContext<ModalContextType>({
  currentModal: 0,
  exitModal: () => null,
  setCurrentModal: () => null,
});

const ModalContextProvider = ({ children }: {children: ReactNode}) => {
  const [currentModal, setCurrentModal] = React.useState(0);
  const memoizedSetCurrentModal = React.useCallback((modal: number) => {
    setCurrentModal(modal);
  }, []);
  const exitModal = React.useCallback(() => setCurrentModal(0), []);

  const guessProps = {
    currentModal,
    exitModal,
    setCurrentModal: memoizedSetCurrentModal,
  };

  return (
    <ModalContext.Provider value={guessProps}>{children}</ModalContext.Provider>
  );
};

const useModal = () => React.useContext(ModalContext);

export { ModalContext, ModalContextProvider, useModal };
