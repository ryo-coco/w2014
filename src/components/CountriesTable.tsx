'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import MatchDetailModal from './modal/MatchDetailModal'

interface Countries {
  id: number;
  name: string;
  ranking: number;
  group_name: string;
}

export default function CountriesTable() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useLayoutEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries');
        const result = await response.json();

        if (result.status === 'success') {
          setCountries(result.data);
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

    fetchCountries();
  }, []);

  if (loading) return <div className="text-black bg-white p-4">読み込み中...</div>;
  if (error) return <div className="text-red-500 bg-white p-4">エラー: {error}</div>;

  const groupedCountries = countries.reduce((acc, country) => {
    if (!acc[country.group_name]) {
      acc[country.group_name] = [];
    }
    acc[country.group_name].push(country);
    return acc;
  }, {} as Record<string, Countries[]>);

  const handlePairingClick = () => {
    setIsModalOpen(true);
  }


  return (
    <div className="w-3/4 container m-auto bg-white p-4 rounded-lg shadow-md">
    <div className="space-y-8">
      {Object.entries(groupedCountries).map(([groupName, countries]) => (
        <div key={groupName} className="bg-white rounded-lg shadow-md overflow-hidden">
          <h3 className="text-2xl font-bold mb-2 p-2 bg-gray-100 text-gray-800">グループ {groupName}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
            {countries.map((country) => (
              <div key={country.id} className="flex flex-col items-center justify-center p-2 transition duration-300 ease-in-out transform hover:scale-110">
                <div className="w-24 h-16 relative overflow-hidden rounded-md shadow-md mb-2" onClick={() => handlePairingClick()}>
                  <Image
                    src={`/national_flag/${country.id}.png`}
                    alt={`${country.name} flag`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-120"
                  />
                </div>
                <span className="text-center text-gray-800 font-medium mt-2 text-sm sm:text-md ">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
      <MatchDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      >
        <div className='text-black'>
          モーダル
        </div>
      </MatchDetailModal>

   </div>
  );
}