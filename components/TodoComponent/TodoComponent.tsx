import { TodoProps } from '@components/types';
import React from 'react';

import CompletedTodo from './CompletedTodo';
import DefaultTodo from './DefaultTodo';
import DeletedTodo from './DeletedTodo';
import StartedTodo from './StartedTodo';
import TodoContent from './TodoContent';

function TodoComponent(props: TodoProps) {
  if (props.todo.status === 'created')
    return (
      <div className="h-fit rounded">
        <DefaultTodo>
          <TodoContent todo={props.todo} />
        </DefaultTodo>
      </div>
    );
  if (props.todo.status === 'started')
    return (
      <div className="h-fit rounded">
        <StartedTodo>
          <TodoContent todo={props.todo} />
        </StartedTodo>
      </div>
    );
  if (props.todo.status === 'completed')
    return (
      <div className="h-fit rounded">
        <CompletedTodo>
          <TodoContent todo={props.todo} />
        </CompletedTodo>
      </div>
    );
  if (props.todo.status === 'deleted')
    return (
      <div className="h-fit rounded">
        <DeletedTodo>
          <TodoContent todo={props.todo} />
        </DeletedTodo>
      </div>
    );
  return (
    <div className="h-fit rounded">
      <DefaultTodo>
        <TodoContent todo={props.todo} />
      </DefaultTodo>
    </div>
  );
}

export default TodoComponent;
