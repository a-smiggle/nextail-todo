import { TodoProps } from '@components/types';
import { useStore } from '@lib/TodoProvider';
import React from 'react';

import ToggleButton from '../ToggleButton';

function TodoContent(props: TodoProps) {
  const { setSelectedTodo } = useStore();
  return (
    <div
      onClick={() => setSelectedTodo(props.todo.id)}
      className="flex w-full flex-col overflow-hidden"
    >
      <div className="flex gap-2">
        <ToggleButton todo={props.todo} />
        <h3>{props.todo.name}</h3>
      </div>
      <div className="text-right">
        <p className="text-xs capitalize">
          {props.todo.status === 'created' ? 'Not Started' : props.todo.status}
        </p>
        <p className="text-xs">
          Created: {new Date(props.todo.dateCreated).toDateString()}
        </p>
        {props.todo.dateDue ? (
          <p className="text-xs">
            Due: {new Date(props.todo.dateDue).toDateString()}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default TodoContent;
