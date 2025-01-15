'use client';

import React, { useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import { PointRanking } from './types/point_ranking'


export default function PointRankingTable() {
  const [ranking, setRanking] = useState<PointRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchPointRanking  = async () => {
      try {
        const response = await fetch('/api/point_ranking');
        const result = await response.json();

        if (result.status === 'success') {
          setRanking(result.data);
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

    fetchPointRanking();
  }, []);

  if (loading) return <div className="text-black bg-white p-4">読み込み中...</div>;
  if (error) return <div className="text-red-500 bg-white p-4">エラー: {error}</div>;
  // 順位を計算する関数
  const calculateRank = (currentPlayer: PointRanking, index: number, array: PointRanking[]): number => {
    if (index === 0) return 1;
    const prevPlayer = array[index - 1];
    if (currentPlayer.player_goals === prevPlayer.player_goals) {
      return calculateRank(prevPlayer, index - 1, array);
    }
    return index + 1;
  };
  
  return (
    <div className="w-3/4 container m-auto bg-white p-4 rounded-lg shadow-md" >
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-800">
                <th className="py-3 px-4 text-left">順位</th>
                <th className="py-3 px-4 text-left">国</th>
                <th className="py-3 px-4 text-left">選手名</th>
                <th className="py-3 px-4 text-right">得点</th>
              </tr>
            </thead>
            <tbody>
              {ranking
                .map((player, index, array) => (
                  <tr
                    key={player.player_id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                  >
                    <td className="py-4 px-4 font-semibold text-black">{calculateRank(player, index, array)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Image
                          src={`/national_flag/${player.country_id}.png`}
                          alt={`${player.country_id} flag`}
                          width={24}
                          height={16}
                          className="mr-2"
                        />
                        <span className="text-gray-800">{player.country}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-800">{player.player_name}</td>
                    <td className="py-4 px-4 text-right font-bold text-blue-600">{player.player_goals}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}