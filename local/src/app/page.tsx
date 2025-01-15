'use client';

import { useState } from 'react';
import CountriesTable from '../components/CountriesTable'; // 必要なコンポーネントをインポート
import GroupLeague from '../components/GroupLeague';
import Result from '../components/Result'; 
import { StageProvider} from "../components/context/StageContext";
import PointRankingTable from '../components/PointRankingTable';

export default function Home() {
  const [activeSection, setActiveSection] = useState<'top' | 'schedule' | 'teams' | 'point_ranking'>('top');

  return (
    <StageProvider>
    <main className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">W杯2014</h1>
      
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={() => setActiveSection('top')}
          className={`px-4 py-2 rounded ${
            activeSection === 'top' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-black'
          }`}
        >
          トップ
        </button>
        <button 
          onClick={() => setActiveSection('schedule')}
          className={`px-4 py-2 rounded ${
            activeSection === 'schedule' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-black'
          }`}
        >
          試合日程
        </button>
        <button 
          onClick={() => setActiveSection('teams')}
          className={`px-4 py-2 rounded ${
            activeSection === 'teams' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-black'
          }`}
        >
          チーム
        </button>
        <button 
          onClick={() => setActiveSection('point_ranking')}
          className={`px-4 py-2 rounded ${
            activeSection === 'point_ranking' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-black'
          }`}
        >
          得点ランキング
        </button>
      </div>

      {activeSection === 'top' && (
        <div className="text-black">
          <div className="grid grid-col ">
          </div>
        </div>
      )}

      {activeSection === 'schedule' && (
        <div className="text-black">
          <h2 className="text-xl font-semibold mb-4"></h2>
          <div className="grid grid-col ">
          <Result />
          </div>
        </div>
      )}

      {activeSection === 'teams' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black"></h2>
          <div className="grid grid-col ">
            <CountriesTable /> 
          </div>
        </div>
      )}

      {activeSection === 'point_ranking' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black"></h2>
          <div className="grid grid-col ">
            <PointRankingTable /> 
          </div>
        </div>
      )}
      </main>
      </StageProvider>

  );
}