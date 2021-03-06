import { Todo } from '@lib/TodoProvider';
import { ReactNode } from 'react';

export interface ChildProp {
  children: ReactNode;
}

export interface TodoProps {
  todo: Todo;
}
