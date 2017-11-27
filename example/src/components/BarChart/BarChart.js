import React, { Component } from 'react'
import { scaleLinear, scale } from 'd3-scale';
import * as d3 from "d3";
import { max } from 'd3-array';
import { select } from 'd3-selection';

class BarChart extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const width = this.props.size[0];

    let testData = ['San Francisco', 'Oakland', 'Berkeley', 'Petaluma']

    let dataRange = testData.map((el, idx) => (idx+1)*(width/5)+5);

    console.log('dataRange: ', dataRange);
    dataRange.push(300);
    // dataRange.unshift(0);
    console.log('dataRange: ', dataRange);

    const x = d3.scaleOrdinal()
      .domain(testData)
      .range(dataRange)

    const xAxis = d3.axisBottom(x);

    const xScale = scaleLinear()
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, 300])

    const y = d3.scaleLinear()
      .domain([0, dataMax])
      .range([this.props.size[1], 0]);

    select(node)
      .append('g')
      .attr("transform", "translate(30, 30)")
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => (i+1)*(width/5)+5)
      .attr('y', d => (this.props.size[1] - yScale(d)))
      .attr('height', d => yScale(d))
      .attr('width', 25)

    select(node)
      .append("g")
      .attr("transform", "translate(30," + (this.props.size[1]+30) + ")")
      .call(xAxis)
      .selectAll("text").attr("transform", "rotate(90)");

    select(node)
      .append("g")
      .attr("transform", "translate(" + (this.props.size[0]+30) + ", 30)")
      .call(d3.axisRight(y));

    select(node)
      .append("text")
      .attr("y", this.props.size[1] + 50)
      .attr("x", 0 - (this.props.size[0]/2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Value");

  }

  render() {
    return <svg ref={node => this.node = node}
      width={this.props.size[0] + 100} height={this.props.size[1] + 100}>
    </svg>
   }
}

export default BarChart;
