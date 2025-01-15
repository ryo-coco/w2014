import React from 'react';
import { Player } from './types/players';
import { Countries } from './types/countries';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  country: Countries | null ;
  players: Player[];
}

function calculateAge(birthDate: string | undefined): number | null {
  if (!birthDate) return null;

  const today = new Date();
  const birthDateObj = new Date(birthDate);

  if (isNaN(birthDateObj.getTime())) return null;
  
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, country, players }) => {

  console.log(players[0]);
  
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-black">{ country?.name}の選手</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {players.map((player) => (
            <div key={player.id} className="bg-gray-50 p-2 rounded-lg shadow text-black">
              <div className="flex items-center mb-1">
                <span className="text-xl font-bold mr-1">{player.number}</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">{player.position}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{player.name}</h3>
              <div className="text-sm text-gray-600">
                <p>所属クラブ: {player.club}</p>
                <p>生年月日: {player.birthdate} ({calculateAge(player.birthdate)}歳)</p>
                <p>身長/体重: {player.height}cm / {player.weight}kg</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default SidePanel;

