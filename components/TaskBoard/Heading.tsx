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
  const { selectedList, addTodo, deleteTodoList, setSelectedList } = useStore();
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);

  function handleDeleteList() {
    setSelectedList('Due Today');
    deleteTodoList(selectedList);
    setDeleteListModal(false);
  }

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
      important: event.target.important.checked,
    };
    event.target.reset();
    addTodo(newTodo);
    setAddTaskModal(false);
  };
  return (
    <div className="flex justify-between pb-4">
      <div className="flex gap-2">
        <h2 className="capitalize text-emerald-500">{selectedList}</h2>
        {selectedList !== 'Due Today' &&
        selectedList !== 'Overdue' &&
        selectedList !== 'Favorites' &&
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
            sizing: { width: 'w-1/5' },
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
      {selectedList !== 'Due Today' &&
      selectedList !== 'Overdue' &&
      selectedList !== 'Favorites' &&
      selectedList !== 'Deleted' ? (
        <Fragment>
          <Button
            onClick={() => setAddTaskModal(true)}
            mainStylings={{
              className:
                'text-emerald-500 border-2 px-2 border-emerald-500 rounded hover:bg-emerald-500 hover:text-white transition-all',
            }}
          >
            Add Task
          </Button>
          <Modal
            mainStylings={{
              sizing: { width: 'w-1/5' },
              background: {
                backgroundColor: 'bg-white dark:bg-slate-700',
              },
            }}
            open={addTaskModal}
            toggle={setAddTaskModal}
          >
            <h2 className="pb-4 font-bold text-emerald-500">Add Task</h2>
            <form onSubmit={handleAddTodo}>
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
                <div>
                  <label htmlFor="important">Important</label>
                  <input
                    type={'checkbox'}
                    id="important"
                    name="important"
                  ></input>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <ErrorOutlineButton onClick={() => setAddTaskModal(false)}>
                  Cancel
                </ErrorOutlineButton>
                <SuccessOutlineButton type="submit">Add</SuccessOutlineButton>
              </div>
            </form>
          </Modal>
        </Fragment>
      ) : null}
    </div>
  );
}

export default Heading;
