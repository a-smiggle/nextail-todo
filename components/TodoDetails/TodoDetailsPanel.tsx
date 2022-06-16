import { useStore } from '@lib/TodoProvider';
import { Drawer } from '@nextail/core';
import { useInnerWidth } from '@nextail/hooks';
import React from 'react';

import TodoDetailsPanelContent from './TodoDetailsPanelContent';

function TodoDetailsPanel() {
  const { selectedTodo } = useStore();
  const width = useInnerWidth();

  if (width && width <= 768 && selectedTodo)
    return (
      <Drawer
        mainStylings={{
          className:
            'absolute h-full w-full overflow-auto border-l-2 border-slate-300 bg-slate-300 p-4 dark:border-slate-600 dark:bg-slate-600',
        }}
        open={!!selectedTodo}
      >
        <TodoDetailsPanelContent />
      </Drawer>
    );
  if (width && width >= 768 && selectedTodo)
    return (
      <aside className="relative h-full w-full overflow-auto border-l-2 border-slate-300 bg-slate-300 p-4 dark:border-slate-600 dark:bg-slate-600">
        <TodoDetailsPanelContent />
      </aside>
    );
  return null;
}

export default TodoDetailsPanel;
