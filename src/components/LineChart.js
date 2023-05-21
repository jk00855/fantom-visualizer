import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return new Date(parseInt(d.timestamp) * 1000); }))
      .range([ 0, width ]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.transactionCount; })])
      .range([ height, 0 ]);

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(new Date(parseInt(d.timestamp) * 1000)); })
        .y(function(d) { return y(d.transactionCount); })
      )
  }, [data]);

  return (
    <svg ref={ref} width="460" height="400" />
  );
}

export default LineChart;
