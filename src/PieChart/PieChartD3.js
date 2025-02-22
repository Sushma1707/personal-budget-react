import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChartD3 = ({ dataSource }) => {
    const svgRef = useRef();

    useEffect(() => {
        console.log("PieChartD3 Data:", dataSource);
        if (!dataSource || dataSource.length === 0) return;
  
        const svg = d3.select(svgRef.current);
        const width = 400, height = 400, radius = Math.min(width, height) / 2;

        var colorScale = d3.scaleOrdinal()
            .domain(dataSource.map((v) => v.title))
            .range([
                "#FF5733", "#33FF57", "#3357FF", "#FF33A8",
                "#F3FF33", "#33FFF0", "#A833FF", "#FF8C33"
            ]);

        const pie = d3.pie().value((d) => d.budget);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        g.selectAll('path')
            .data(pie(dataSource))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => colorScale(d.data.title))
            .attr('stroke', '#121926')
            .style('stroke-width', '1px');

        const labelLocation = d3.arc().innerRadius(100).outerRadius(radius);

        g.selectAll('text')
            .data(pie(dataSource))
            .enter()
            .append('text')
            .text((d) => d.data.title)
            .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
            .style('text-anchor', 'middle')
            .style('font-size', 15);

    }, [dataSource]);

    return (
        <div className="chart-container" style={{ width: 500, height: 500 }}>
            <h2 style={{ textAlign: "center" }}>D3JS Pie Chart</h2>
            <svg ref={svgRef} width={400} height={400}>
                {dataSource.length === 0 && (
                    <text x="50%" y="50%" textAnchor="middle">Loading...</text>
                )}
            </svg>
        </div>
    );
};

export default PieChartD3;
