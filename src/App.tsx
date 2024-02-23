import React, { ReactNode } from "react";

import Guesses from "./Guesses";
import Header from "./Header";
import Keyboard from "./Keyboard";
import { GuessContextProvider } from "./Hooks/useGuess";
import { ModalContextProvider } from "./Hooks/useModal";
import { StatsContextProvider } from "./Hooks/useStats";
import Modals from "./Modals/index";

require("./App.css");

const Layout = ({ children }: { children: ReactNode }) => (
  <StatsContextProvider>
    <ModalContextProvider>
      <GuessContextProvider>{children}</GuessContextProvider>
    </ModalContextProvider>
  </StatsContextProvider>
);

const Index = () => (
  <Layout>
    <div className="application">
      <Header />
      <Guesses />
      <Keyboard />
      <Modals.HowToPlay />
      <Modals.Statistics />
    </div>
  </Layout>
);

export default Index;
