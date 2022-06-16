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
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <DefaultTodo>
          <TodoContent todo={props.todo} />
        </DefaultTodo>
      </div>
    );
  if (props.todo.status === 'started')
    return (
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <StartedTodo>
          <TodoContent todo={props.todo} />
        </StartedTodo>
      </div>
    );
  if (props.todo.status === 'completed')
    return (
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <CompletedTodo>
          <TodoContent todo={props.todo} />
        </CompletedTodo>
      </div>
    );
  if (props.todo.status === 'deleted')
    return (
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <DeletedTodo>
          <TodoContent todo={props.todo} />
        </DeletedTodo>
      </div>
    );
  return (
    <div
      className={`rounded h-fit ${
        props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
      }`}
    >
      <DefaultTodo>
        <TodoContent todo={props.todo} />
      </DefaultTodo>
    </div>
  );
}

export default TodoComponent;
