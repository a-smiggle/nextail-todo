import React from 'react';

import BaseMenuItem from './BaseMenuItem';
import CustomMeneItem from './CustomMeneItem';

function TodoListMenu() {
  return (
    <aside className="h-full w-1/5 border-r-2 border-slate-300 p-4 dark:border-slate-600">
      <nav className="mt-2 px-6">
        <BaseMenuItem />
      </nav>
      <div className="mt-6 overflow-auto border-t-2 border-emerald-400 px-6 pt-4">
        <CustomMeneItem />
      </div>
    </aside>
  );
}

export default TodoListMenu;
