'use client';

export default function TournamentImage() {

  return (
    <div className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <div className="text-xl font-bold mb-4 text-black my-4">決勝トーナメント</div>
      <img src={`/tournament/img_tournament.png`} alt="Tournament Image" className="w-full h-auto" />
      <h6 className="text-gray-500 text-xs">JFAより流用</h6>
    </div>
  );
}