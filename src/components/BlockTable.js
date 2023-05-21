// File: components/BlockTable.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

function BlockTable({ blocks }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Block Hash</TableCell>
            <TableCell align="right">Timestamp</TableCell>
            <TableCell align="right">Transaction Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blocks.map((block) => (
            <TableRow key={block.hash}>
              <TableCell component="th" scope="row">
                {block.hash}
              </TableCell>
              <TableCell align="right">{new Date(block.timestamp * 1000).toLocaleString()}</TableCell>
              <TableCell align="right">{block.transactionCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BlockTable;
