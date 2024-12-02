'use client';

import React, { useState, useEffect } from 'react';

interface Pairing {
  pg1_id: number;
  kick_off: string;
  home_team: string;
  away_team: string;
  pg2_id: number;
  home_goals: string;
  away_goals: string;
  match_type_id: string;
}

export default function PairingsTable() {
    const [pairings, setPairings] = useState<Pairing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchPairings = async () => {
        try {
          const response = await fetch('/api/pairing');
          const result = await response.json();
          
          if (result.status === 'success') {
            setPairings(result.data); 
            setLoading(false);
          } else {
            setError(result.message);
            setLoading(false);
          }
        } catch (err) {
          setError('データの取得に失敗しました');
          setLoading(false);
          console.error(err);
        }
      };
  
      fetchPairings();
    }, []);
  
    if (loading) return <div className="text-black bg-white p-4">読み込み中...</div>;
    if (error) return <div className="text-red-500 bg-white p-4">エラー: {error}</div>;
  
    return (
      <div className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-black font-semibold">ホーム</th>
              <th className="border border-gray-300 p-1 text-black font-semibold">得点</th>
              <th className="border border-gray-300 p-2 text-black font-semibold">開始時刻</th>
              <th className="border border-gray-300 p-1 text-black font-semibold">得点</th>
              <th className="border border-gray-300 p-2 text-black font-semibold">アウェイ</th>
            </tr>
          </thead>
          <tbody>
            {pairings.map((pairing) => (
              <tr key={pairing.pg1_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-black text-center">{pairing.home_team}</td>
                <td className="border border-gray-300 p-2 text-black text-center">{pairing.home_goals}</td>
                <td className="border border-gray-300 p-2 text-black text-center text-xs">{pairing.kick_off}</td>
                <td className="border border-gray-300 p-2 text-black text-center">{pairing.away_goals}</td>
                <td className="border border-gray-300 p-2 text-black text-center">{pairing.away_team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }