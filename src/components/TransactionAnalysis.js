
import React from 'react';

function TransactionAnalysis({ data }) {
  const transactions = data.flatMap(block => block.transactions.edges.map(edge => edge.node));

  // Here you can analyze the transactions data
  // For example, you can find the most common addresses, the average transaction value, etc.

  return (
    <div>
      <h2>Transaction Analysis</h2>
      {/* Display your analysis results here */}
    </div>
  );
}

export default TransactionAnalysis;
