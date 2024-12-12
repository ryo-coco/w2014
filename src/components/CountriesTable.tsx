'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';

interface Country {
  id: number;
  name: string;
  ranking: number;
  group_name: string;
}

export default function CountriesTable() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="w-3/4 container m-auto bg-white p-4 rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-black font-semibold">ID</th>
            <th className="border border-gray-300 p-2 text-black font-semibold">国名</th>
            <th className="border border-gray-300 p-2 text-black font-semibold">ランキング</th>
            <th className="border border-gray-300 p-2 text-black font-semibold">グループ</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2 text-black text-center">
                  {country.id}
              </td>
              <td className="border border-gray-300 p-2 text-black">
                <div className="flex items-center ">
                  <Image
                      src={`/national_flag/${country.id}.png`}
                      alt={`${country.name} flag`}
                      width={24}
                      height={16}
                      className="mr-2"
                    />
                {country.name}
                </div>
              </td>
              <td className="border border-gray-300 p-2 text-black text-center">{country.ranking}</td>
              <td className="border border-gray-300 p-2 text-black text-center">{country.group_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}