'use client';

import { useGroupContext } from "./GroupContext";

export default function GroupNavigation() {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const { setSelectedGroup } = useGroupContext();

  return (
    <nav aria-label="グループナビゲーション" className="p-4">
      <ul className="flex flex-wrap items-center gap-2">
        {groups.map((group, index) => (
          <li key={group} className="flex items-center">
            <a
              href={`#group-${group.toLowerCase()}`}
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
              onClick={(e) => {
                e.preventDefault();
                setSelectedGroup(group);
              }}
            >
              グループ{group}
            </a>
            {index < groups.length - 1 && (
              <span className="ml-2 text-gray-400">|</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

