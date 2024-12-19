'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGroupContext } from "./GroupContext";
import { useStageContext } from './context/StageContext';
import MatchDetailModal from './modal/MatchDetailModal'

interface Pairing {
  pg1_id: number;
  kick_off: string;
  home_country_id: number;
  home_team: string;
  away_team: string;
  pg2_id: number;
  away_country_id: number;
  home_goals: string;
  away_goals: string;
  category: string;
}

interface MatchDetail {
  goal_id: number;
  country: string;
  player: string;
  goal_time: string;
}


export default function PairingsTable() {
    const [pairings, setPairings] = useState<Pairing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { selectedGroup } = useGroupContext();
    const { selectedStage} = useStageContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchDetails, setMatchDetails] = useState<{ home: MatchDetail[], away: MatchDetail[] }>({ home: [], away: [] });
  const [matchResult, setMatchResult] = useState<Pairing | null>(null);



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
  
    const handlePairingClick = async (pairings: Pairing) => {
      try {
        setMatchResult(pairings);
        
        setLoading(true);
        const [homeResponse, awayResponse] = await Promise.all([
          fetch(`/api/matchDetail?id=${pairings.pg1_id}`),
          fetch(`/api/matchDetail?id=${pairings.pg2_id}`)
        ]);
        
        const homeResult = await homeResponse.json();
        const awayResult = await awayResponse.json();

        if (homeResult.status === 'success' && awayResult.status === 'success') {
          setMatchDetails({
            home: homeResult.data,
            away: awayResult.data
          });
          setIsModalOpen(true);
        } else {
          setError('試合詳細の取得に失敗しました');
        }
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
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
              <tr key={pairing.pg1_id} className="hover:bg-gray-100" onClick={() => handlePairingClick(pairing)}>
                <td className="border border-gray-300 p-1 text-black text-center text-xs">{pairing.kick_off}</td>
                <td className="border border-gray-300 p-2 text-black text-center text-xs">{pairing.category}</td>
                <td className="border border-gray-300 p-2 text-black text-center text-sm">
                  <div className="flex items-center justify-center">
                    <Image
                      src={`/national_flag/${pairing.home_country_id}.png`}
                      alt={`${pairing.home_team} flag`}
                      width={24}
                      height={16}
                      className="mr-2"
                    />
                    {pairing.home_team}
                  </div>
                </td>
                <td className="border border-gray-300 p-2 text-black text-center font-medium text-sm">
                  <span className="gap-2">{pairing.home_goals}</span>
                  <span className="gap-2"> - </span>
                  <span className="gap-2">{pairing.away_goals}</span>
                </td>
                <td className="border border-gray-300 p-2 text-black text-center text-sm">
                  <div className="flex items-center justify-center">
                    <Image
                      src={`/national_flag/${pairing.away_country_id}.png`}
                      alt={`${pairing.away_team} flag`}
                      width={24}
                      height={16}
                      className="mr-2"
                    />
                    {pairing.away_team}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MatchDetailModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        >
          <div className="container w-7/8 text-black m-auto ">
            {matchResult && (
              <div>
               <table className="w-full border-collapse">
                <thead>
                  <tr className="border border-gray-300 bg-white-200 text-ml">
                      <th className="border border-gray-300 font-semibold p-2 w-2/5">
                        <div className="flex items-center justify-center">
                        <Image
                          src={`/national_flag/${matchResult.home_country_id}.png`}
                          alt={`${matchResult.home_team} flag`}
                          width={24}
                          height={16}
                          className="mr-2"
                        />
                          <span id="truncate">{matchResult.home_team}</span>
                        </div>
                    </th>
                    <th className="font-semibold p-2 ">{matchResult.home_goals}</th>
                    <th className="font-semibold p-2 "> ー </th>
                    <th className="font-semibold p-2 ">{matchResult.away_goals}</th>
                      <th className="border border-gray-300 font-semibold w-2/5">
                        <div className="flex items-center justify-center ">
                        <Image
                          src={`/national_flag/${matchResult.away_country_id}.png`}
                          alt={`${matchResult.away_team} flag`}
                          width={24}
                          height={16}
                          className="mr-2"
                        />
                          <span id="truncate">{matchResult.away_team}</span>
                        </div>
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white-200 text-ml border border-gray-300 h-64">
                      <td className="border border-gray-300 font-semibold p-2 w-2/5 align-top text-sm">
                        {matchDetails.home.map((home) => (
                          <div key={home.goal_id} className="flex items-start mb-2">
                            <span className="mr-2 truncate">{home.goal_time}</span>
                            <span className="truncate">{home.player}</span>
                          </div>
                        ))}
                      </td>
                      <td className="p-2 w-12"></td>
                      <td className="p-2 w-12"></td>
                      <td className="p-2 w-12"></td>
                      <td className="border border-gray-300 font-semibold p-2 w-2/5 align-top text-sm">
                        {matchDetails.away.map((away) => (
                          <div key={away.goal_id} className="flex items-start mb-2">
                            <span className="mr-2 truncate">{away.goal_time}</span>
                            <span className="truncate">{away.player}</span>
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </MatchDetailModal>
      </div>
    );
  }