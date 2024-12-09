'use client';

import GroupNavigation from "./GroupNavigation";
import GroupLeague from "./GroupLeague";
import PairingsTable from "./PairingsTable";

export default function GroupStage() {
  return (
      <div>
        <GroupNavigation />
        <GroupLeague />
        <PairingsTable /> 
      </div>
  );
}

