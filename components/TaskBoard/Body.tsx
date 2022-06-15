import Task from '@components/Task/Task';
import { Todo, useStore } from '@lib/TodoProvider';
import React from 'react';

function Body() {
  const { todos, selectedList } = useStore();
  return (
    <div className="h-full w-full rounded border-2 border-emerald-500 p-4">
      <div className="grid gap-2 md:grid-cols-4">
        {todos
          .sort(
            (a: Todo, b: Todo) =>
              new Date(a.dateCreated).getTime() -
              new Date(b.dateCreated).getTime()
          )
          .map((todo, index) => {
            if (todo.list === selectedList && todo.status !== 'deleted')
              return <Task key={index} todo={todo} />;
            if (selectedList === 'Deleted' && todo.status === 'deleted')
              return <Task key={index} todo={todo} />;
            if (selectedList === 'Important' && todo.important === true)
              return <Task key={index} todo={todo} />;
            const date = new Date();
            if (
              selectedList === 'Overdue' &&
              todo.status !== 'deleted' &&
              todo.dateDue &&
              new Date(todo.dateDue).getUTCDate() - (date.getUTCDate() - 1) <= 0
            )
              return <Task key={index} todo={todo} />;
            if (
              selectedList === 'Due Today' &&
              todo.status !== 'deleted' &&
              todo.dateDue &&
              new Date(todo.dateDue).getUTCDate() === date.getUTCDate()
            )
              return <Task key={index} todo={todo} />;
            if (
              selectedList === 'Scheduled' &&
              todo.status !== 'deleted' &&
              todo.dateDue &&
              new Date(todo.dateDue).getUTCDate() - date.getUTCDate() >= 1
            )
              return <Task key={index} todo={todo} />;
            return null;
          })}
      </div>
    </div>
  );
}

export default Body;
