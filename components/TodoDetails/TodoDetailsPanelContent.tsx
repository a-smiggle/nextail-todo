import ToggleButton from '@components/ToggleButton';
import { Todo, TodoStep, useStore } from '@lib/TodoProvider';
import {
  Button,
  Card,
  ErrorModal,
  ErrorOutlineButton,
  Modal,
  SuccessOutlineButton,
} from '@nextail/core';
import { nanoid } from 'nanoid';
import React, { Fragment, useEffect, useState } from 'react';

import TodoSteps from './TodoSteps';

function TodoDetailsPanelContent() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addStepModal, setAddStepModal] = useState(false);
  const { selectedTodo, setSelectedTodo, toggleTodo, updateTodo, addTodoStep } =
    useStore();
  const [checkbox, setCheckbox] = useState(
    selectedTodo?.important ? selectedTodo.important : false
  );

  useEffect(() => {
    setCheckbox(selectedTodo?.important ? selectedTodo?.important : false);
  }, [selectedTodo?.important]);

  function handleDeleteTask() {
    if (selectedTodo) toggleTodo(selectedTodo?.id, 'deleted');
    setDeleteModal(false);
  }

  const handleCancelAddStep = () => {
    (document?.getElementById('add-step-form') as HTMLFormElement).reset();
    setAddStepModal(false);
  };

  const handleAddStep = async (event: any) => {
    event.preventDefault();
    if (selectedTodo) {
      const newStep: TodoStep = {
        id: nanoid(),
        dateCreated: new Date(),
        name: event.target.name.value,
        completed: false,
        todo: selectedTodo?.id,
      };
      event.target.reset();
      addTodoStep(newStep);
    }
    setAddStepModal(false);
  };

  const handleCancelEdit = () => {
    (document?.getElementById('edit-todo-form') as HTMLFormElement).reset();
    setEditModal(false);
  };

  const handleEdit = async (event: any) => {
    event.preventDefault();
    const updatedTodo: Todo | undefined = selectedTodo;
    if (updatedTodo) {
      updatedTodo.name = event.target.name.value;
      updatedTodo.dateDue = new Date(event.target.dateDue.value);
      updatedTodo.comments = event.target.comments.value;
      updatedTodo.important = checkbox;
      updateTodo(updatedTodo);
    }
    event.target.reset();
    setEditModal(false);
  };

  function actionButton() {
    switch (selectedTodo?.status) {
      case 'created':
        return (
          <Button
            mainStylings={{ className: ' ' }}
            title="Start"
            onClick={() => toggleTodo(selectedTodo?.id, 'started')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 hover:text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        );
      case 'started':
        return (
          <Button
            mainStylings={{ className: ' ' }}
            title="Complete"
            onClick={() => toggleTodo(selectedTodo?.id, 'completed')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 hover:fill-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
          </Button>
        );
      case 'completed':
        return (
          <Button
            mainStylings={{ className: ' ' }}
            title="Restart"
            onClick={() => toggleTodo(selectedTodo?.id, 'started')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 hover:text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        );
      case 'deleted':
        return (
          <Fragment>
            <Button
              mainStylings={{ className: ' ' }}
              title="Start"
              onClick={() => toggleTodo(selectedTodo?.id, 'started')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 hover:text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>

            <Button
              mainStylings={{ className: ' ' }}
              title="Complete"
              onClick={() => toggleTodo(selectedTodo?.id, 'completed')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 hover:fill-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </Button>
          </Fragment>
        );
      default:
        return <></>;
    }
  }

  return (
    <Fragment>
      <div className="flex justify-between pb-4">
        <div title="Close">
          <Button
            title="Close Panel"
            mainStylings={{ className: ' ' }}
            onClick={() => setSelectedTodo('')}
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
        <div>{actionButton()}</div>
        <div className="flex gap-2 ">
          <Button
            title="Edit Task"
            onClick={() => setEditModal(true)}
            mainStylings={{ className: ' ' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Button>
          <Modal
            mainStylings={{
              sizing: { width: 'lg:w-1/5' },
              background: {
                backgroundColor: 'bg-white dark:bg-slate-700',
              },
            }}
            open={editModal}
            toggle={setEditModal}
          >
            <h2 className="pb-4 font-bold text-emerald-500">Edit Task</h2>
            <form id="edit-todo-form" onSubmit={handleEdit}>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedTodo?.name}
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
                    defaultValue={
                      selectedTodo?.dateDue
                        ? new Date(selectedTodo?.dateDue)
                            .toISOString()
                            .split('T')[0]
                        : undefined
                    }
                    id="dateDue"
                    className="w-full rounded border-2 border-emerald-200 px-2 dark:bg-slate-700"
                  />
                </div>

                <div>
                  <label htmlFor="comments">Comments</label>
                  <textarea
                    id="comments"
                    name="comments"
                    defaultValue={selectedTodo?.comments}
                    rows={3}
                    placeholder="Comments: "
                    className="w-full rounded border-2 border-emerald-200 px-2 dark:bg-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4 pt-4">
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
                  <ErrorOutlineButton onClick={() => handleCancelEdit()}>
                    Cancel
                  </ErrorOutlineButton>
                  <SuccessOutlineButton type="submit">
                    Update
                  </SuccessOutlineButton>
                </div>
              </div>
            </form>
          </Modal>
          <Button
            title="Delete Task"
            mainStylings={{ className: ' ' }}
            onClick={() => setDeleteModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 hover:fill-red-200"
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
          <ErrorModal
            mainStylings={{
              sizing: { width: 'w-1/5' },
            }}
            toggle={setDeleteModal}
            open={deleteModal}
            header={<h1>Delete Task</h1>}
            body={<p>Are you sure you want to delete {selectedTodo?.name}?</p>}
            footer={
              <div className="flex justify-end gap-2 pt-4">
                <SuccessOutlineButton onClick={() => setDeleteModal(false)}>
                  Cancel
                </SuccessOutlineButton>
                <ErrorOutlineButton onClick={() => handleDeleteTask()}>
                  Confirm
                </ErrorOutlineButton>
              </div>
            }
          ></ErrorModal>
        </div>
      </div>
      <Card>
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <h2>{selectedTodo?.name}</h2>
          {selectedTodo?.dateDue ? (
            <p className="text-sm">
              Due Date: {new Date(selectedTodo?.dateDue).toDateString()}
            </p>
          ) : null}

          <ToggleButton todo={selectedTodo} />
        </div>
      </Card>
      <div className="flex flex-col gap-2 pt-4">
        <Card>
          <div className="flex justify-between">
            <h3>Steps</h3>
            <Button
              title="Add Step"
              onClick={() => setAddStepModal(true)}
              mainStylings={{ className: ' ' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
            <Modal
              mainStylings={{
                sizing: { width: 'lg:w-1/5' },
                background: {
                  backgroundColor: 'bg-white dark:bg-slate-700',
                },
              }}
              toggle={setAddStepModal}
              open={addStepModal}
            >
              <h2 className="pb-4 font-bold text-emerald-500">Add Step</h2>
              <form id="add-step-form" onSubmit={handleAddStep}>
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
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <ErrorOutlineButton onClick={() => handleCancelAddStep()}>
                    Cancel
                  </ErrorOutlineButton>
                  <SuccessOutlineButton type="submit">
                    Update
                  </SuccessOutlineButton>
                </div>
              </form>
            </Modal>
          </div>
          <TodoSteps todo={selectedTodo?.id} />
        </Card>
        <Card>
          <h3>Comments</h3>
          <p>{selectedTodo?.comments}</p>
        </Card>
        <Card>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>
              <h3>Created Date</h3>
              {selectedTodo?.dateCreated
                ? new Date(selectedTodo?.dateCreated).toDateString()
                : '-'}
            </div>
            <div>
              <h3>Started Date</h3>
              {selectedTodo?.dateStarted
                ? new Date(selectedTodo?.dateStarted).toDateString()
                : '-'}
            </div>
            <div>
              <h3>Completed Date</h3>
              {selectedTodo?.dateCompleted
                ? new Date(selectedTodo?.dateCompleted).toDateString()
                : '-'}
            </div>
          </div>
        </Card>
      </div>
    </Fragment>
  );
}

export default TodoDetailsPanelContent;
