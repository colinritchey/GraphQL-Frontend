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

    console.log(d3);

    var x = d3.scaleLinear()
      .domain(["A", "B", "C", "D", "E"])
      .range([0, 1/4 * width, 2/4 * width, 3/4 * width, width]);

    var xAxis = d3.axisBottom(x)
      .tickValues(["a", "b", "c", "d", "e"])
      // .orient("bottom");

    const xScale = scaleLinear().range([0, width]);

    // console.log('xScale: ', scaleLinear().range([0, this.props.size[0]]));

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
      .attr('x', (d,i) => i*35)
      .attr('y', d => (this.props.size[1] - yScale(d)))
      .attr('height', d => yScale(d))
      .attr('width', 25)

    select(node)
      .append("g")
      .attr("transform", "translate(30," + (this.props.size[1]+30) + ")")
      .call(d3.axisBottom(xScale));

    select(node)
      .append("g")
      .attr("transform", "translate(" + (this.props.size[0]+30) + ", 30)")
      .call(d3.axisRight(y));

    select(node)
      .append("text")
      .attr("transform", "rotate(-90)")
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
