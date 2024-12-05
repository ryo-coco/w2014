'use client';

import GroupNavigation from "./GroupNavigation";
import GroupLeague from "./GroupLeague";
import { GroupProvider } from "./GroupContext";

export default function GroupStage() {
  return (
    <GroupProvider>
      <div>
        <GroupNavigation />
        <GroupLeague />
      </div>
    </GroupProvider>
  );
}

