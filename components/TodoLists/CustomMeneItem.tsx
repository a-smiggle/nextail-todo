import { useStore } from '@lib/TodoProvider';
import { ErrorOutlineButton, Modal, SuccessOutlineButton } from '@nextail/core';
import React, { Fragment, useState } from 'react';

const listIcon = (
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
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const styles = {
  base: 'my-2 flex items-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100',
  selected:
    'text-emerald-600 font-bold hover:text-emerald-800 dark:text-emerald-400 dark:hover:bg-gray-600 dark:hover:text-emerald-500',
  unselected:
    'text-gray-600 font-semibold hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white',
  addList:
    'text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-emerald-500',
};

function CustomMeneItem() {
  const [addListModal, setAddListModal] = useState(false);
  const [newListValue, setNewListValue] = useState('');
  const { selectedList, setSelectedList, addTodoList, todoLists } = useStore();

  const handleAddList = () => {
    const newList: string = newListValue;
    setNewListValue('');
    addTodoList(newList);
    setAddListModal(false);
  };

  const handleCancelAddList = () => {
    setNewListValue('');
    setAddListModal(false);
  };

  return (
    <Fragment>
      {todoLists.map((item: string, index: number) => (
        <a
          key={index}
          className={`${styles.base} ${
            selectedList === item ? styles.selected : styles.unselected
          }`}
          href="#"
          onClick={() => setSelectedList(item)}
        >
          {listIcon}
          <span className="mx-4 text-lg capitalize">{item}</span>
          <span className="grow text-right"></span>
        </a>
      ))}
      <a
        className={`${styles.base} ${styles.addList}`}
        href="#"
        onClick={() => setAddListModal(true)}
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
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="mx-4 text-lg font-normal">Add new list</span>
        <span className="grow text-right"></span>
      </a>
      <Modal
        mainStylings={{
          sizing: { width: 'w-1/5' },
          background: { backgroundColor: 'bg-white dark:bg-slate-700' },
        }}
        open={addListModal}
        toggle={setAddListModal}
      >
        <h2 className="pb-4 font-bold text-emerald-500">Add New List</h2>
        <label>List Name</label>
        <input
          type="text"
          value={newListValue}
          onChange={(e) => setNewListValue(e.target.value)}
          className="w-full rounded border-2 border-emerald-200 px-2 dark:bg-slate-700"
        ></input>
        <div className="flex justify-end gap-4 pt-4">
          <ErrorOutlineButton
            onClick={() => handleCancelAddList()}
            mainStylings={{
              background: { backgroundColor: 'hover:bg-red-500' },
            }}
          >
            Cancel
          </ErrorOutlineButton>
          <SuccessOutlineButton
            onClick={() => handleAddList()}
            mainStylings={{
              border: { borderColor: 'border-emerald-500' },
              background: { backgroundColor: 'hover:bg-emerald-500' },
              text: { textColor: 'text-emerald-500 hover:text-white' },
            }}
          >
            Submit
          </SuccessOutlineButton>
        </div>
      </Modal>
    </Fragment>
  );
}

export default CustomMeneItem;
