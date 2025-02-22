import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChartD3 = ({ dataSource }) => {
  const svgRef = useRef();

  useEffect(() => {
    console.log("PieChartD3 Data:", dataSource); // ✅ Debug incoming data

    if (dataSource.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    var colorScale = d3
      .scaleOrdinal()
      .domain(dataSource.map((v) => v.title)) // ✅ Ensure correct key name
      .range([
        "#FF5733", "#33FF57", "#3357FF", "#FF33A8",
        "#F3FF33", "#33FFF0", "#A833FF", "#FF8C33"
      ]);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.budget); // ✅ Ensure correct key name

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    g.selectAll("pieces")
      .data(pie(dataSource))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.title)) // ✅ Ensure correct key
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

  }, [dataSource]);

  return (
    <div className="chart-container" style={{ width: 500, height: 500 }}>
      <h2 style={{ textAlign: "center" }}>D3JS Pie Chart</h2>
      <svg ref={svgRef} width={400} height={400}></svg>
    </div>
  );
};

export default PieChartD3;
