import { Drawer } from '@nextail/core';
import { useInnerWidth } from '@nextail/hooks';
import { useLayoutContext } from '@nextail/providers';
import React from 'react';

import BaseMenuItem from './BaseMenuItem';
import CustomMeneItem from './CustomMeneItem';

function TodoListMenu() {
  const width = useInnerWidth();

  const { leftDrawerOpen, setLeftDrawerOpen } = useLayoutContext();

  if (width && width <= 425)
    return (
      <Drawer
        open={leftDrawerOpen}
        toggle={setLeftDrawerOpen}
        mainStylings={{
          className:
            'fixed top-0 h-full bg-white dark:bg-slate-700 w-4/5 border-r-2 border-slate-300 p-4 dark:border-slate-600',
        }}
      >
        <nav className="mt-2 px-6">
          <BaseMenuItem />
        </nav>
        <div className="mt-6 overflow-auto border-t-2 border-red-400 px-6 pt-4">
          <CustomMeneItem />
        </div>
      </Drawer>
    );

  if (width && width >= 425 && leftDrawerOpen)
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
  return null;
}

export default TodoListMenu;
