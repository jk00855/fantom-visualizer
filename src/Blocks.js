// src/Blocks.js

import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_BLOCKS = gql`
  {
    blocks(count: 10) {
      totalCount
      pageInfo {
        first
        last
        hasNext
        hasPrevious
      }
      edges {
        cursor
        block {
          hash
          number
          timestamp
          transactionCount
        }
      }
    }
  }
`;

function Blocks() {
  const { loading, error, data } = useQuery(GET_BLOCKS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data.blocks.edges.map(({ cursor, block }) => (
    <div key={cursor}>
      <h2>Block Hash: {block.hash}</h2>
      <p>Block Number: {block.number}</p>
      <p>Timestamp: {block.timestamp}</p>
      <p>Transaction Count: {block.transactionCount}</p>
    </div>
  ));
}

export default Blocks;
