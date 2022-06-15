import create from "zustand";
import { persist } from "zustand/middleware"

export interface Todo 
{
    id: string;
    name: string;
    comments?: string;
    dateCreated: Date;
    dateDue?: Date;
    dateStarted?: Date;
    dateCompleted?: Date;
    dateDeleted?: Date;
    list: string;
    status: string;
    important: boolean;
}

export interface TodoStep {
  id: string;
  dateCreated: Date;
  name: string;
  completed: boolean;
  todo: string;
}

interface TodoState {
  todos: Todo[];
  todoSteps: TodoStep[],
  todoStatuses: string[],
  todoLists: string[],
  selectedTodo?: Todo;
  selectedList: string;
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id:string, status:string)              => void;
  toggleImportantTodo: (id:string)                     => void;
  updateTodo: (updatedTodo: Todo) => void;
  clearDeleteTodo: ()                             => void;
  addTodoStep: (newStep: TodoStep) => void;
  removeTodoStep: (id: string) => void;
  toggleTodoStep: (id:string)              => void;
  addTodoStatus: (name:string)                      => void;
  deleteTodoStatus: (name:string)                   => void;
  addTodoList: (name:string)                        => void;
  deleteTodoList: (name:string)                     => void;
  setSelectedTodo: (id: string) => void;
  setSelectedList: (name: string)=> void;
}

const defaultTodoStatuses:string[] = ['created','started','completed','deleted'];
const defaultTodoLists:string[] = ['work', 'study', 'personnel'];

export const useStore = create<TodoState>()(persist(
  (set, get) => 
({
  // initial state
  todos: [],
  todoSteps: [],
  todoStatuses: defaultTodoStatuses,
  todoLists: defaultTodoLists,
  selectedTodo: undefined,
  selectedList: '',
  // methods for manipulating state
  addTodo: (newTodo: Todo) => {
    set((state) => ({
      todos: [
        ...state.todos,
        newTodo
      ],
    }));
  },
  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  toggleTodo: (id, status) => {
    const toggledTodo = get().todos.find(todo => todo.id === id);
    if (toggledTodo){
      toggledTodo.status = status;
      if(status === 'started') toggledTodo.dateStarted = new Date();
      if(status === 'completed') toggledTodo.dateCompleted = new Date();
      if(status === 'deleted') toggledTodo.dateDeleted = new Date();
      get().removeTodo(id)
      set((state) => ({
        todos: [
          ...state.todos,
          toggledTodo
        ],
      }));
    }
  },
  toggleImportantTodo: (id) => {
    const toggledTodo = get().todos.find(todo => todo.id === id);
    if (toggledTodo){
      toggledTodo.important = !toggledTodo.important;
      get().removeTodo(id)
      set((state) => ({
        todos: [
          ...state.todos,
          toggledTodo
        ],
      }));
    }
  },
  clearDeleteTodo: () => {
    set((state) => ({
      todos: state.todos.filter(todo => todo.status !== 'deleted'),
    }));
  },
  updateTodo: (updatedTodo) =>
 {
  set((state) => ({
    todos: state.todos.filter(todo => todo.id !== updatedTodo.id),
  }));
  set((state) => ({
    todos: [
      ...state.todos,
      updatedTodo
    ],
  }));
 },
   addTodoStep: (newStep) => {
    set((state) => ({
      todoSteps: [
        ...state.todoSteps,
        newStep
      ],
    }));
  },
  removeTodoStep: (id) => {
    set((state) => ({
      todoSteps: state.todoSteps.filter((todoStep) => todoStep.id !== id),
    }));
  },
  toggleTodoStep: (id) => {
    const toggledTodoStep = get().todoSteps.find(todoStep => todoStep.id === id);
    if (toggledTodoStep){
      toggledTodoStep.completed = !toggledTodoStep.completed;
      get().removeTodoStep(id)
      set((state) => ({
        todoSteps: [
          ...state.todoSteps,
          toggledTodoStep
        ],
      }));
    }
  },
  addTodoStatus: (name) => {
    let newTodoStatuses = get().todoStatuses;
    let index = newTodoStatuses.indexOf(name.toLowerCase());
    if(index === -1)set((state) => ({todoStatuses : [
      ...state.todoStatuses,
      name.toLowerCase()
    ],
  }));
  },
  deleteTodoStatus: (name) => {
    set((state) => ({
      todoStatuses: state.todoStatuses.filter(todoStatuses => todoStatuses !== name),
    }));
  },
  addTodoList: (name) => {
    let newTodolist = get().todoLists;
    let index = newTodolist.indexOf(name.toLowerCase());
    if(index === -1)set((state) => ({todoLists : [
      ...state.todoLists,
      name.toLowerCase()
    ],
  }));
  },
  deleteTodoList: (name) => {
    set((state) => ({
      todoLists: state.todoLists.filter(todoLists => todoLists !== name),
    }));
  },
  setSelectedTodo: (id) => {
    let selectedTodo = get().todos.find(todo => todo.id === id);;
    set(() => ({selectedTodo : selectedTodo}))
  },
  setSelectedList: (name) => {
    set(() => ({selectedList : name}))
  }
}),
{
  name: "todo-storage",
}
));