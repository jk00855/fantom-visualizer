// App.js

import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useSubscription, useQuery } from '@apollo/client';
import BlockVisualization from './components/BlockVisualization';
import LineChart from './components/LineChart';

const client = new ApolloClient({
  uri: 'https://xapi.fantom.network',
  cache: new InMemoryCache()
});

const GET_BLOCKS = gql`
  query GetBlocks {
    blocks(cursor: null, count: 10) {
      edges {
        cursor
        block {
          hash
          timestamp
          transactionCount
        }
      }
    }
  }
`;

const NEW_BLOCK_SUBSCRIPTION = gql`
  subscription onNewBlock {
    onBlock {
      number
      hash
      timestamp
      transactionCount
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <FantomData />
    </ApolloProvider>
  );
}

function FantomData() {
  const { loading, error, data, refetch } = useQuery(GET_BLOCKS);
  const { data: newBlockData } = useSubscription(NEW_BLOCK_SUBSCRIPTION);

  useEffect(() => {
    if (newBlockData) {
      refetch();
    }
  }, [newBlockData, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const blocks = data.blocks.edges.map(edge => edge.block);
  const transactionCount = blocks.reduce((total, block) => total + block.transactionCount, 0);

  // Calculate block propagation times
  const propagationTimes = blocks.map((block, i) => {
    if (i === 0) return 0;
    return block.timestamp - blocks[i - 1].timestamp;
  });

  return (
    <div className="App">
      <h1>Fantom Block Data</h1>
      {blocks.length > 0 && <BlockVisualization data={blocks} />}
      <h2>Total Transactions in Last 10 Blocks: {transactionCount}</h2>
      <h3>Block Propagation Times</h3>
      <LineChart data={propagationTimes} />
    </div>
  );
}

export default App;
