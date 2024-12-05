import { useState, useEffect } from 'react';
import { useGroupContext } from "./GroupContext";

interface GroupLeague {
  id: number;
  countryname: string;
  groupname: string;
  winpoints: number;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goals: number;
  goalsagainst: number;
  goalsdiff: number;
}

export default function GroupLeague() {
  const [groupLeague, setGroupLeague] = useState<GroupLeague[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedGroup } = useGroupContext();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/groupLeague?group=${selectedGroup}`);
        const result = await response.json();

        if (result.status === 'success') {
          setGroupLeague(result.data);
        } else {
          setError(result.message || '不明なエラーが発生しました');
          // console.error('API Error:', result);
        }
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [selectedGroup]);

  if (loading) return <div className="text-black bg-white p-4">読み込み中...</div>;
  if (error) return <div className="text-red-500 bg-white p-4">エラー: {error}</div>;

  const groupedLeague = groupLeague.reduce((acc, country) => {
    if (!acc[country.groupname]) {
      acc[country.groupname] = [];
    }
    acc[country.groupname].push(country);
    return acc;
  }, {} as Record<string, GroupLeague[]>);

  return (
    <div className="w-full space-y-8 bg-white p-4 rounded-lg shadow-md">
      {/* <h2>グループ {selectedGroup} </h2> */}
      {Object.entries(groupedLeague).map(([groupName, countries]) => (
        <div key={groupName} className="overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 text-black">グループ {groupName}</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 w-1/4 p-2 text-black font-semibold">国名</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">勝点</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">試合数</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">勝数</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">引分数</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">負点</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">得点</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">失点</th>
                <th className="border border-gray-300 p-2 text-black font-semibold">得失点</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country, index) => (
                <tr 
                  key={country.id} 
                  className={`hover:bg-blue-50 ${index < 2 ? 'bg-yellow-100' : ''}`}
                >
                  <td className="border border-gray-300 p-2 text-black text-center">{country.countryname}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.winpoints}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.games}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.wins}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.draws}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.losses}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.goals}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.goalsagainst}</td>
                  <td className="border border-gray-300 p-2 text-black text-center">{country.goalsdiff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

