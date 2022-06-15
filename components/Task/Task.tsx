import { TaskProps } from '@components/types';
import React from 'react';

import CompletedTask from './CompletedTask';
import DefaultTask from './DefaultTask';
import DeletedTask from './DeletedTask';
import StartedTask from './StartedTask';
import TaskContent from './TaskContent';

function Task(props: TaskProps) {
  if (props.todo.status === 'created')
    return (
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <DefaultTask>
          <TaskContent todo={props.todo} />
        </DefaultTask>
      </div>
    );
  if (props.todo.status === 'started')
    return (
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <StartedTask>
          <TaskContent todo={props.todo} />
        </StartedTask>
      </div>
    );
  if (props.todo.status === 'completed')
    return (
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <CompletedTask>
          <TaskContent todo={props.todo} />
        </CompletedTask>
      </div>
    );
  if (props.todo.status === 'deleted')
    return (
      <div
        className={`rounded h-fit ${
          props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
        }`}
      >
        <DeletedTask>
          <TaskContent todo={props.todo} />
        </DeletedTask>
      </div>
    );
  return (
    <div
      className={`rounded h-fit ${
        props.todo.important ? 'ring-2 ring-yellow-600 ring-offset-2' : ''
      }`}
    >
      <DefaultTask>
        <TaskContent todo={props.todo} />
      </DefaultTask>
    </div>
  );
}

export default Task;
