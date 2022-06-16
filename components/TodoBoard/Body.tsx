import TodoComponent from '@components/TodoComponent/TodoComponent';
import { Todo, useStore } from '@lib/TodoProvider';
import React from 'react';

function Body() {
  const { todos, selectedList, selectedTodo } = useStore();
  return (
    <div className="relative h-full w-full overflow-auto rounded border-2 border-emerald-500 p-4">
      <div
        className={`grid gap-2 overflow-auto md:grid-cols-2  ${
          selectedTodo ? 'lg:grid-cols-2' : 'lg:grid-cols-4'
        }`}
      >
        {todos
          .sort(
            (a: Todo, b: Todo) =>
              new Date(a.dateCreated).getTime() -
              new Date(b.dateCreated).getTime()
          )
          .map((todo, index) => {
            if (todo.list === selectedList && todo.status !== 'deleted')
              return <TodoComponent key={index} todo={todo} />;
            if (selectedList === 'Deleted' && todo.status === 'deleted')
              return <TodoComponent key={index} todo={todo} />;
            if (selectedList === 'Important' && todo.important === true)
              return <TodoComponent key={index} todo={todo} />;
            const date = new Date();
            if (
              selectedList === 'Overdue' &&
              todo.status !== 'deleted' &&
              todo.dateDue &&
              new Date(todo.dateDue).getUTCDate() - (date.getUTCDate() - 1) <= 0
            )
              return <TodoComponent key={index} todo={todo} />;
            if (
              selectedList === 'Due Today' &&
              todo.status !== 'deleted' &&
              todo.dateDue &&
              new Date(todo.dateDue).getUTCDate() === date.getUTCDate()
            )
              return <TodoComponent key={index} todo={todo} />;
            if (
              selectedList === 'Scheduled' &&
              todo.status !== 'deleted' &&
              todo.dateDue &&
              new Date(todo.dateDue).getUTCDate() - date.getUTCDate() >= 1
            )
              return <TodoComponent key={index} todo={todo} />;
            return null;
          })}
      </div>
    </div>
  );
}

export default Body;
