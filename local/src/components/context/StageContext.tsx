'use client';

import React, { createContext, useState, useContext } from 'react';

type StageContextType = {
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
};

const StageContext = createContext<StageContextType | undefined>(undefined);

export const useStageContext = () => {
  const context = useContext(StageContext);
  if (context === undefined) {
    throw new Error('useStageContext must be used within a StageProvider');
  }
  return context;
};

export const StageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStage, setSelectedStage] = useState('1');

  return (
    <StageContext.Provider value={{ selectedStage, setSelectedStage }}>
      {children}
    </StageContext.Provider>
  );
};

