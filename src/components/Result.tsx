'use client';

import React, { useState, useEffect } from 'react';
import GroupStage from './GroupStage';

export default function Result() {
  const [activeSection, setActiveSection] = useState<'group_stage' | 'nockout_stage'>('group_stage');

  return (
    <div className="container">
      <div className="container mx-auto space-x-4 bg-white grid grid-cols-2 w-2/3">
      <button 
          onClick={() => setActiveSection('group_stage')}
          className={`px-4 py-1 rounded text-sm ${
            activeSection === 'group_stage' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-black'
          }`}
      >
          グループステージ
        </button>
        <button 
          onClick={() => setActiveSection('nockout_stage')}
          className={`px-4 py-1 rounded text-sm ${
            activeSection === 'nockout_stage' 
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
          <GroupStage />
        </div>
      )}
      </div>
      
    </div>
  );
}