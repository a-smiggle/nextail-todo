import { TaskProps } from '@components/types';
import { useStore } from '@lib/TodoProvider';
import React from 'react';

import ToggleButton from '../ToggleButton';

function TaskContent(props: TaskProps) {
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

      <p className="text-xs">
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
  );
}

export default TaskContent;
