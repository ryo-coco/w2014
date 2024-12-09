'use client';

import PairingsTable from "./PairingsTable";
import { useStageContext } from "./context/StageContext";

export default function KnockoutStage() {
  const { selectedStage} = useStageContext();
  
  return (
    <div>
      <PairingsTable /> 
    </div>
  );
}

