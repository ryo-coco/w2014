'use client';

import React, { useState, useEffect } from 'react';
import { useGroupContext } from "./GroupContext";
import { useStageContext } from './context/StageContext';
import MatchDetailModal from './modal/matchDetailModal'

interface Pairing {
  pg1_id: number;
  kick_off: string;
  home_team: string;
  away_team: string;
  pg2_id: number;
  home_goals: string;
  away_goals: string;
  category: string;
}

export default function PairingsTable() {
    const [pairings, setPairings] = useState<Pairing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { selectedGroup } = useGroupContext();
    const { selectedStage} = useStageContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      const fetchPairings = async () => {
        try {
          const response = await fetch(`/api/pairing?group=${selectedGroup}&stage=${selectedStage}`);
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
    }, [selectedGroup, selectedStage]);
  
    const handlePairingClick = async (pg1_id: number, pg2_id: number) => {
      // try {
        console.log('handlePairingClick');
        setIsModalOpen(true);

        //   const response = await fetch(`/api/match-detail?pg1_id=${pg1_id}&pg2_id=${pg2_id}`);
      //   const result = await response.json();
      
      //   if (result.status === 'success') {
      //     // setSelectedMatch(result.data);
      //     setIsModalOpen(true);
      //   } else {
      //     console.error('Failed to fetch match details');
      //   }
      // } catch (err) {
      //   console.error('Error fetching match details:', err);
      // }
  };
  
    if (loading) return <div className="text-black bg-white p-4">読み込み中...</div>;
    if (error) return <div className="text-red-500 bg-white p-4">エラー: {error}</div>;
  
    return (
      <div className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <div className="text-xl font-bold mb-4 text-black my-4">日程・結果</div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-ml">
              <th className="border border-gray-300 w-1/6 p-1 text-black font-semibold ">日時</th>
              <th className="border border-gray-300 p-2 text-black font-semibold">カテゴリー</th>
              <th className="border border-gray-300 p-2 text-black font-semibold">ホーム</th>
              <th className="border border-gray-300 p-2 text-black font-semibold">スコア</th>
              <th className="border border-gray-300 p-2 text-black font-semibold">アウェイ</th>
            </tr>
          </thead>
          <tbody>
            {pairings.map((pairing) => (
              <tr key={pairing.pg1_id} className="hover:bg-gray-100" onClick={() => handlePairingClick(pairing.pg1_id, pairing.pg2_id)}>
                <td className="border border-gray-300 p-1 text-black text-center text-xs">{pairing.kick_off}</td>
                <td className="border border-gray-300 p-2 text-black text-center text-xs">{pairing.category}</td>
                <td className="border border-gray-300 p-2 text-black text-center text-sm">{pairing.home_team}</td>
                <td className="border border-gray-300 p-2 text-black text-center font-medium text-sm">
                  <span className="gap-2">{pairing.home_goals}</span>
                  <span className="gap-2"> - </span>
                  <span className="gap-2">{pairing.away_goals}</span>
                </td>
                <td className="border border-gray-300 p-2 text-black text-center text-sm">{pairing.away_team}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <MatchDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="text-gray-900">モーダル</div>
        </MatchDetailModal>
      </div>
    );
  }