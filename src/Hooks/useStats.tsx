import React, { ReactNode } from "react";

type CurrentStats = {
  current_streak: number;
  guessCount: number[];
  longest_streak: number;
  total: number;
  wins: number;
};

type StatsContextType = {
  currentStats: CurrentStats;
  updateStats: (level: number) => void;
};

const StatsContext = React.createContext<StatsContextType>({
  currentStats: {
    current_streak: 0,
    guessCount: [0, 0, 0, 0, 0, 0, 0],
    longest_streak: 0,
    total: 0,
    wins: 0,
  },
  updateStats: (s) => null,
});

const StatsContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentStats, setCurrentStats] = React.useState({
    wins: 0,
    total: 0,
    current_streak: 0,
    longest_streak: 0,
    guessCount: [0, 0, 0, 0, 0, 0, 0],
  });

  React.useEffect(() => {
    if (window !== undefined) {
      const existingStats = JSON.parse(
        window.localStorage.getItem("genordle") || "{}"
      );
      const newCurrentstats = {
        wins: parseInt(existingStats.wins) || 0,
        total: parseInt(existingStats.total) || 0,
        current_streak: parseInt(existingStats.current_streak) || 0,
        longest_streak: parseInt(existingStats.longest_streak) || 0,
        guessCount: existingStats.guessCount || [0, 0, 0, 0, 0, 0, 0],
      };
      setCurrentStats(newCurrentstats);
    }
  }, []);

  const updateStats = (gl: number) => {
    if (window !== undefined) {
      const newCurrentstats = { ...currentStats };
      newCurrentstats.total++;
      if (gl > 0 && gl < 7) {
        if (newCurrentstats.current_streak === newCurrentstats.longest_streak) {
          newCurrentstats.longest_streak++;
        }
        newCurrentstats.current_streak++;
        newCurrentstats.wins++;
        newCurrentstats.guessCount[gl] = newCurrentstats.guessCount[gl] + 1;
      } else {
        newCurrentstats.guessCount[0] = newCurrentstats.guessCount[0] + 1;
      }
      window.localStorage.setItem("genordle", JSON.stringify(newCurrentstats));
      setCurrentStats(newCurrentstats);
    }
  };

  const statsProps = {
    currentStats,
    updateStats,
  };

  return (
    <StatsContext.Provider value={statsProps}>{children}</StatsContext.Provider>
  );
};

const useStats = () => React.useContext(StatsContext);

export { StatsContext, StatsContextProvider, useStats };
