//'use client';

import React, { useState, useEffect } from 'react';
import GroupStage from './GroupStage';
import KnockoutStage from './KnockoutStage';
import { GroupProvider } from "./GroupContext";
import { useStageContext } from "./context/StageContext";


export default function Result() {
  const [activeSection, setActiveSection] = useState<'group_stage' | 'knockout_stage'>('group_stage');
  const { setSelectedStage } = useStageContext();

  return (
    // <GroupProvider>
      <div className="container">
      <div className="container mx-auto space-x-4 bg-white grid grid-cols-2 w-2/3">
      <button 
            onClick={(e) => {
              setActiveSection('group_stage');
              e.preventDefault();
              setSelectedStage('1');
            }
            }
          className={`px-4 py-1 rounded text-sm ${
            activeSection === 'group_stage' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-black'
          }`}
      >
          グループステージ
        </button>
        <button 
              onClick={(e) => {
                setActiveSection('knockout_stage');
                e.preventDefault();
                setSelectedStage('2');
                }}
          className={`px-4 py-1 rounded text-sm ${
            activeSection === 'knockout_stage' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-black'
          }`}
      >
          ノックアウトステージ
      </button>
      </div>
      <div>
      {activeSection === 'group_stage' && (
        <div className="container m-auto w-3/4">
          <GroupProvider>
            <GroupStage />
          </GroupProvider>
        </div>
      )}
      </div>
      <div>
      {activeSection === 'knockout_stage' && (
        <div className="container m-auto w-3/4">
          <GroupProvider>
            <KnockoutStage />
          </GroupProvider>
        </div>
      )}
      </div>

        
      </div>
    // </GroupProvider>
  );
}