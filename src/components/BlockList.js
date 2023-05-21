// File: src/components/BlockList.js

import React from 'react';
import BlockDetails from './BlockDetails';

function BlockList({ blocks }) {
  return (
    <div>
      <h1>Block List</h1>
      {blocks.map(block => (
        <BlockDetails key={block.hash} block={block} />
      ))}
    </div>
  );
}

export default BlockList;
