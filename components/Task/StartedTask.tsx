import { ChildProp } from '@components/types';
import { Card } from '@nextail/core';
import React from 'react';

function StartedTask(props: ChildProp) {
  return (
    <Card
      mainStylings={{
        border: { borderWidth: 'border-2', borderColor: 'border-yellow-500' },
        background: { backgroundColor: 'bg-yellow-200 hover:bg-yellow-300' },
        text: { textColor: 'text-black' },
      }}
    >
      {props.children}
    </Card>
  );
}

export default StartedTask;
