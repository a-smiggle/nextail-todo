import React from 'react';

import Body from './Body';
import Heading from './Heading';

function index() {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <Heading />
      <Body />
    </div>
  );
}

export default index;
