import { ChildProp } from '@components/types';
import { Card } from '@nextail/core';
import React from 'react';

function CompletedTask(props: ChildProp) {
  return (
    <Card
      mainStylings={{
        border: { borderWidth: 'border-2', borderColor: 'border-emerald-500' },
        background: { backgroundColor: 'bg-emerald-200 hover:bg-emerald-300' },
        text: { textColor: 'text-black' },
      }}
    >
      {props.children}
    </Card>
  );
}

export default CompletedTask;
