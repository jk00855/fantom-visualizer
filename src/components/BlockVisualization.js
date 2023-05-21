// File: components/BlockVisualization.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function BlockVisualization({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);

    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map((d, i) => i + 1)); // Use index as x-axis label
    y.domain([0, d3.max(data, (d) => d.transactionCount)]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Transaction Count");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(i + 1)) // Use index as x-axis label
      .attr("y", (d) => y(d.transactionCount))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.transactionCount))
      .on("click", (event, d) => {
        alert(`Block hash: ${d.hash}`);
      });
  }, [data]);

  return (
    <svg ref={ref} width="960" height="500" />
  );
}

export default BlockVisualization;
