'use client';

import { useState } from 'react';
import CountriesTable from '../components/CountriesTable'; // 必要なコンポーネントをインポート
import PairingsTable from '../components/PairingsTable';

export default function Home() {
  const [activeSection, setActiveSection] = useState<'schedule' | 'teams'>('schedule');

  return (
    <main className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">W杯2014</h1>
      
      <div className="flex justify-center space-x-4 mb-6">
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
      </div>

      {activeSection === 'schedule' && (
        <div className="text-black">
          <h2 className="text-xl font-semibold mb-4">試合日程</h2>
          <div className="grid grid-col md:grid-cols-4 gap-4">
            <PairingsTable /> 
          </div>
        </div>
      )}

      {activeSection === 'teams' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black">チーム一覧</h2>
          <div className="grid grid-col md:grid-cols-4 gap-4">
            <CountriesTable /> 
          </div>
        </div>
      )}
    </main>
  );
}