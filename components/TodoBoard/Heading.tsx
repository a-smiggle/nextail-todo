import { Todo, useStore } from '@lib/TodoProvider';
import {
  Button,
  ErrorModal,
  ErrorOutlineButton,
  Modal,
  SuccessOutlineButton,
} from '@nextail/core';
import { nanoid } from 'nanoid';
import React, { Fragment, useState } from 'react';

function Heading() {
  const {
    selectedList,
    addTodo,
    deleteTodoList,
    setSelectedList,
    clearDeleteTodo,
  } = useStore();
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [addTodoModal, setAddTodoModal] = useState(false);
  const [clearDeleted, setClearDeleted] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  function handleDeleteList() {
    setSelectedList('Due Today');
    deleteTodoList(selectedList);
    setDeleteListModal(false);
  }

  const handleCancelAdd = () => {
    (document?.getElementById('add-todo-form') as HTMLFormElement).reset();
    setCheckbox(false);
    setAddTodoModal(false);
  };

  const handleAddTodo = async (event: any) => {
    event.preventDefault();
    const newTodo: Todo = {
      name: event.target.name.value,
      id: nanoid(),
      list: selectedList,
      status: 'created',
      dateCreated: new Date(),
      dateDue: new Date(event.target.dateDue.value),
      comments: event.target.comments.value,
      important: checkbox,
    };
    event.target.reset();
    setCheckbox(false);
    addTodo(newTodo);
    setAddTodoModal(false);
  };

  const handleClearDeleted = () => {
    clearDeleteTodo();
    setClearDeleted(false);
  };

  const CreateButtons = () => {
    if (selectedList === 'Deleted')
      return (
        <Fragment>
          <ErrorOutlineButton
            mainStylings={{ background: { backgroundColor: ' ' } }}
            onClick={() => setClearDeleted(true)}
          >
            Clear Deleted
          </ErrorOutlineButton>
          <ErrorModal
            mainStylings={{
              sizing: { width: 'lg:w-1/5' },
            }}
            open={clearDeleted}
            toggle={setClearDeleted}
            header={<h1>Clear Deleted</h1>}
            body={<p>Are you sure you want to clear all delete todos?</p>}
            footer={
              <div className="flex justify-end gap-2 pt-4">
                <SuccessOutlineButton onClick={() => setClearDeleted(false)}>
                  Cancel
                </SuccessOutlineButton>
                <ErrorOutlineButton onClick={() => handleClearDeleted()}>
                  Confirm
                </ErrorOutlineButton>
              </div>
            }
          ></ErrorModal>
        </Fragment>
      );
    if (
      selectedList !== 'Due Today' &&
      selectedList !== 'Overdue' &&
      selectedList !== 'Favorites' &&
      selectedList !== 'Deleted'
    )
      return (
        <Fragment>
          <Button
            onClick={() => setAddTodoModal(true)}
            mainStylings={{
              className:
                'text-emerald-500 border-2 px-2 border-emerald-500 rounded hover:bg-emerald-500 hover:text-white transition-all',
            }}
          >
            Add Todo
          </Button>
          <Modal
            mainStylings={{
              sizing: { width: 'lg:w-1/5' },
              background: {
                backgroundColor: 'bg-white dark:bg-slate-700',
              },
            }}
            open={addTodoModal}
            toggle={setAddTodoModal}
          >
            <h2 className="pb-4 font-bold text-emerald-500">Add Todo</h2>
            <form id="add-todo-form" onSubmit={handleAddTodo}>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full rounded border-2 border-emerald-200 px-2 dark:bg-slate-700"
                  />
                </div>

                <div>
                  <label htmlFor="dateDue">Date Due</label>
                  <input
                    type="date"
                    name="dateDue"
                    id="dateDue"
                    defaultValue={undefined}
                    className="w-full rounded border-2 border-emerald-200 px-2 dark:bg-slate-700"
                  />
                </div>

                <div>
                  <label htmlFor="comments">Comments</label>
                  <textarea
                    id="comments"
                    name="comments"
                    rows={3}
                    placeholder="Comments: "
                    defaultValue={''}
                    className="w-full rounded border-2 border-emerald-200 px-2 dark:bg-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  title="Toggle Important"
                  onClick={() => {
                    setCheckbox(!checkbox);
                  }}
                  mainStylings={{ className: ' ' }}
                >
                  {checkbox === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 fill-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 fill-gray-300 hover:fill-yellow-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </Button>
                <div className="flex justify-between gap-4">
                  <ErrorOutlineButton onClick={() => handleCancelAdd()}>
                    Cancel
                  </ErrorOutlineButton>
                  <SuccessOutlineButton type="submit">Add</SuccessOutlineButton>
                </div>
              </div>
            </form>
          </Modal>
        </Fragment>
      );
    return null;
  };

  return (
    <div className="flex justify-between pb-4">
      <div className="flex gap-2">
        <h2 className="capitalize text-emerald-500">{selectedList}</h2>
        {selectedList !== 'Due Today' &&
        selectedList !== 'Overdue' &&
        selectedList !== 'Scheduled' &&
        selectedList !== 'Favorites' &&
        selectedList !== 'Important' &&
        selectedList !== 'Deleted' ? (
          <Button
            onClick={() => setDeleteListModal(true)}
            mainStylings={{
              className:
                'dark:text-slate-300 hover:text-red-500 dark:hover:text-red-500 ',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        ) : null}
        <ErrorModal
          mainStylings={{
            sizing: { width: 'lg:w-1/5' },
          }}
          open={deleteListModal}
          toggle={setDeleteListModal}
          header={<h1>Delete List</h1>}
          body={<p>Are you sure you want to delete {selectedList} list?</p>}
          footer={
            <div className="flex justify-end gap-2 pt-4">
              <SuccessOutlineButton onClick={() => setDeleteListModal(false)}>
                Cancel
              </SuccessOutlineButton>
              <ErrorOutlineButton onClick={() => handleDeleteList()}>
                Confirm
              </ErrorOutlineButton>
            </div>
          }
        ></ErrorModal>
      </div>
      {CreateButtons()}
    </div>
  );
}

export default Heading;
