import React, { Component } from 'react'
import * as d3 from 'd3'

// import Elements from './Elements'
// import { scripts } from './Scripts'

class Axis extends Component {
  constructor(props) {
    super(props)

    this.draw = this.draw.bind(this)

    // this.state = {
    //   initDone: false,
    //   line: undefined,
    //   xScale: undefined,
    // }
  }

  componentDidMount() {
    this.draw()
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.name !== nextProps.name) {
  //     d3.selectAll('#Axis').remove()
  //     d3.select('#grid').remove()
  //
  //     this.draw(nextProps.name, nextProps.painting)
  //   }
  // }

  draw() {
    const { xRange, yRange } = this.props.range
    const { svg, width, height } = this.props.painting

    const xScale = d3.scaleLinear()
                     .domain(xRange)
                     .range([0, width])
    const yScale = d3.scaleLinear()
                     .domain(yRange)
                     .range([height, 0])
    const line = d3.line()
                   .x(function(d) { return xScale(d.x) })
                   .y(function(d) { return yScale(d.y) })

    // this.setState({ line, xScale })
    this.props.setFunc(line, xScale)

    // draw grid
    svg.append('g')
       .attr('id', 'grid')
       .call(
         d3.axisLeft(yScale)
           .ticks(5)
           .tickSize(-width)
           .tickFormat('')
      )
    // draw axis
    svg.append('g')
       .attr('id', 'Axis')
       .attr('transform', `translate(0,${height})`)
       .call(d3.axisBottom(xScale))
    svg.append('g')
       .attr('id', 'Axis')
       .call(d3.axisLeft(yScale))

    d3.selectAll('.domain').remove()
    d3.selectAll('#Axis .tick line').remove()
  }

  render() {
    // const alreadySetState = ((this.state.line !== undefined)
    //                      && (this.state.xScale !== undefined))
    return (
      <div>
      </div>

    )
  }
}

export default Axis
