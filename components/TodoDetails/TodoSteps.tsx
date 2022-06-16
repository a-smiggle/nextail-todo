import { TodoStep, useStore } from '@lib/TodoProvider';
import {
  Button,
  ErrorModal,
  ErrorOutlineButton,
  SuccessOutlineButton,
} from '@nextail/core';
import React, { useState } from 'react';

interface CustomProps {
  todo?: string;
}

function TodoSteps(props: CustomProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState<TodoStep | undefined>();
  const { todoSteps, toggleTodoStep, removeTodoStep } = useStore();

  const showDeleteModal = (step: TodoStep) => {
    setSelectedStep(step);
    setShowModal(true);
  };

  const handleDeleteStep = () => {
    if (selectedStep) removeTodoStep(selectedStep.id);
    setSelectedStep(undefined);
    setShowModal(false);
  };

  if (props.todo)
    return (
      <div className="flex flex-col gap-2 pt-2">
        {todoSteps
          .filter((step) => step.todo === props.todo)
          .sort(
            (a: TodoStep, b: TodoStep) =>
              new Date(a.dateCreated).getTime() -
              new Date(b.dateCreated).getTime()
          )
          .map((steps, index) => (
            <div key={index} className="flex w-full justify-between border p-4">
              <div className="flex gap-2 truncate">
                <Button
                  title="Complete Step"
                  mainStylings={{ className: ' ' }}
                  onClick={() => toggleTodoStep(steps.id)}
                >
                  {steps.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </Button>
                {steps.name}
              </div>
              <Button
                title="Delete Step"
                mainStylings={{ className: ' ' }}
                onClick={() => showDeleteModal(steps)}
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
            </div>
          ))}
        <ErrorModal
          mainStylings={{
            sizing: { width: 'w-1/5' },
          }}
          open={showModal}
          toggle={setShowModal}
          header={<h1>Delete List</h1>}
          body={<p>Are you sure you want to delete {selectedStep?.name}?</p>}
          footer={
            <div className="flex justify-end gap-2 pt-4">
              <SuccessOutlineButton onClick={() => setShowModal(false)}>
                Cancel
              </SuccessOutlineButton>
              <ErrorOutlineButton onClick={() => handleDeleteStep()}>
                Confirm
              </ErrorOutlineButton>
            </div>
          }
        ></ErrorModal>
      </div>
    );
  return null;
}

export default TodoSteps;
