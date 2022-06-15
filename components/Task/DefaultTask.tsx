import { ChildProp } from '@components/types';
import { Card } from '@nextail/core';
import React from 'react';

function DefaultTask(props: ChildProp) {
  return (
    <Card mainStylings={{ border: { borderWidth: 'border-2' } }}>
      {props.children}
    </Card>
  );
}

export default DefaultTask;
