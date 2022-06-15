import React, { createContext, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { PageProps } from './types/PageProps';
import error from 'next/error';

export interface todo 
{
    id: string;
    name: string;
    steps?: string;
    comments?: string;
    dateCreated: Date;
    dateDue?: Date;
    dateStarted?: Date;
    dateCompleted?: Date;
    dateDeleted?: Date;
    status: string;
    important: boolean;
}

export interface updateTodoFields {
    name: string;
    comments: string;
    dateDue: Date;
    status: string;
}

export const emptyTodo:todo = {id:'', name:'', dateCreated: new Date(), status: '', important: false};
const emptyTodos:todo[] = [];
const defaultTodoStatuses:string[] = ['created','started','completed','deleted'];
const defaultTodoLists:string[] = ['work', 'study', 'personnel'];

type TodoValue = {
    todos: todo[];
    todoStatuses: string[],
    todoLists: string[],
    selectedTodo: string;
    selectedList: string;
    updateTodo: (id:string, newFields:updateTodoFields) => void;
    toggleTodo: (id:string, status:string)              => void;
    toggleImportantTodo: (id:string)                     => void;
    deleteTodo: (id:string)                             => void;
    clearTodo: ()                                       => void;
    addTodo: (newTodo: todo)                            => void;
    addTodoStatuses: (name:string)                      => void;
    deleteTodoStatuses: (name:string)                   => void;
    addTodoLists: (name:string)                        => void;
    deleteTodoLists: (name:string)                     => void;
    setSelectedTodo: React.Dispatch<React.SetStateAction<string>>;
    setSelectedList: React.Dispatch<React.SetStateAction<string>>;
  };

const TodoContext = createContext<TodoValue | undefined>(undefined);

export default function TodoProvider({children}: PageProps) {
    const [todos, setTodos] = useState(emptyTodos);
    const [selectedTodo, setSelectedTodo] = useState('');
    const [todoStatuses, setTodoStatuses] = useState(defaultTodoStatuses);
    const [todoLists, setTodoLists] = useState(defaultTodoLists);
    const [selectedList, setSelectedList] = useState('Due Today');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos')
        if (storedTodos) {
            const temp:todo[] = JSON.parse(storedTodos);
            setTodos(temp);
        }

        const storedTodoStatuses = localStorage.getItem('todoStatuses')
        if (storedTodoStatuses) {
            const temp:string[] = JSON.parse(storedTodoStatuses);
            setTodoStatuses(temp);
        }

        const storedTodoLists = localStorage.getItem('todoLists')
        if (storedTodoLists) {
            const temp:string[] = JSON.parse(storedTodoLists);
            setTodoLists(temp);
        }
        
        
    }, []);

    const storeTodo = () => localStorage.setItem('todos', JSON.stringify(todos));

    const updateTodo = (id:string, newFields:updateTodoFields) => {
        const editedTodo = todos.find(todo => todo.id === id);
        if (editedTodo){
            if(newFields.status && newFields.status !== editedTodo.status) editedTodo.status = newFields.status;
            if(newFields.name && newFields.name !== editedTodo.name) editedTodo.name = newFields.name;
            if(newFields.comments && newFields.comments !== editedTodo.comments) editedTodo.comments = newFields.comments;
            if(newFields.dateDue && newFields.dateDue !== editedTodo.dateDue) editedTodo.dateDue = newFields.dateDue;
            const newTodos: todo[] = todos.filter(todo => todo.id !== id);
            newTodos.push(editedTodo);
            setTodos(newTodos);
        }
        storeTodo();
    }
    
    const toggleTodo = (id:string, status:string) => {
        const toggledTodo = todos.find(todo => todo.id === id);
        if (toggledTodo){
            toggledTodo.status = status;
            if(status === 'started') toggledTodo.dateStarted = new Date();
            if(status === 'completed') toggledTodo.dateCompleted = new Date();
            const newTodos: todo[] = todos.filter(todo => todo.id !== id);
            newTodos.push(toggledTodo);
            setTodos(newTodos);
        }
        storeTodo();
    }
    
    const toggleImportantTodo = (id:string) => {
      const toggledTodo = todos.find(todo => todo.id === id);
      if (toggledTodo){
            toggledTodo.important = !toggledTodo.important;
            const newTodos: todo[] = todos.filter(todo => todo.id !== id);
            newTodos.push(toggledTodo);
            setTodos(newTodos);
      }
      storeTodo();
  }

    // Toggles Deleted ToDos
    const deleteTodo = (id:string) => {
        const deletedTodo = todos.find(todo => todo.id === id);
        if(deletedTodo){
            deletedTodo.status = 'deleted';
            deletedTodo.dateDeleted = new Date();
            const newTodos: todo[] = todos.filter(todo => todo.id !== id);
            newTodos.push(deletedTodo);
            setTodos(newTodos);
        }
        storeTodo();
    }
    
    // Clears deleted ToDos
    const clearTodo = () => {
        const newTodos: todo[] = todos.filter(todo => todo.status !== 'deleted');
        setTodos(newTodos);
        storeTodo();
    }
    
    const addTodo = (newTodo: todo) => {
        if(newTodo){
            newTodo.id= nanoid();
            newTodo.status= 'created';
            newTodo.dateCreated= new Date();
        setTodos(prevTodos => {
            return [...prevTodos, newTodo];
        })
        }
        storeTodo();
    }

    const addTodoStatuses = (name:string) => {
        if(name){
            let newTodoStatuses = todoStatuses;
            newTodoStatuses.push(name);
        setTodoStatuses(newTodoStatuses);
        }
        localStorage.setItem('todoStatuses', JSON.stringify(todoStatuses));
    };

    const deleteTodoStatuses = (name:string) => {
        if(name){
            let newTodoStatuses = todoStatuses.filter(item => item !== name);
            setTodoStatuses(newTodoStatuses);   
        }
        localStorage.setItem('todoStatuses', JSON.stringify(todoStatuses));
    };

    const storeLists = () => localStorage.setItem('todoLists', JSON.stringify(todoLists));;

    const addTodoLists =  (name:string) => {
      if(name){
        let newTodoLists = todoLists;
        newTodoLists.push(name);
        setTodoLists(newTodoLists);
        storeLists();
      }
    };

    const deleteTodoLists = (name:string) => {
        if(name){
          console.log(name)
            let newTodoLists = todoLists.filter(item => item !== name);
            console.log(newTodoLists)
            setTodoLists(newTodoLists);   
            storeLists();
        }
    };

    return (
        <TodoContext.Provider value={{ todos, todoStatuses,  todoLists, selectedList, selectedTodo,
        updateTodo, toggleTodo, toggleImportantTodo, deleteTodo, clearTodo, addTodo,
        addTodoStatuses, deleteTodoStatuses,
        addTodoLists, deleteTodoLists, setSelectedList, setSelectedTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodoContext() {
    const context = useContext(TodoContext);
  
    if (context === undefined) {
      throw new Error('useTodoContext must be used inside TodoContext');
    }
  
    return context;
  };