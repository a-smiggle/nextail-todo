import { ChildProp } from '@components/types';
import { Card } from '@nextail/core';
import React from 'react';

function DeletedTask(props: ChildProp) {
  return (
    <Card
      mainStylings={{
        border: { borderWidth: 'border-2', borderColor: 'border-red-500' },
        background: { backgroundColor: 'bg-red-200 hover:bg-red-300' },
        text: { textColor: 'text-black' },
      }}
    >
      {props.children}
    </Card>
  );
}

export default DeletedTask;
