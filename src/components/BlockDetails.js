// File: src/components/BlockDetails.js

import React from 'react';

function BlockDetails({ block }) {
  return (
    <div>
      <h2>Block Details</h2>
      <p>Hash: {block.hash}</p>
      <p>Timestamp: {block.timestamp}</p>
      <p>Transaction Count: {block.transactionCount}</p>
      <h3>Transactions</h3>
      {block.transactions.edges.map(edge => (
        <div key={edge.node.hash}>
          <p>Hash: {edge.node.hash}</p>
          <p>From: {edge.node.from}</p>
          <p>To: {edge.node.to}</p>
          <p>Value: {edge.node.value}</p>
        </div>
      ))}
    </div>
  );
}

export default BlockDetails;
