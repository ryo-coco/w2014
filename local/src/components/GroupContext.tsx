'use client';

import React, { createContext, useState, useContext } from 'react';

type GroupContextType = {
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroupContext must be used within a GroupProvider');
  }
  return context;
};

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState('A');

  return (
    <GroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

