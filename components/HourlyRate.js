import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

import Line from './Line'

const xRange = [0, 10]
const yRange = [0, 100]

/*
 * props needed: svg, width, height
 */

class HourlyRate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      line: undefined
    }
  }

  componentDidMount () {
    let { svg, width, height } = this.props
    let xScale = d3.scaleLinear()
                   .domain(xRange)
                   .range([0, width])
    let yScale = d3.scaleLinear()
                   .domain(yRange)
                   .range([height, 0])
    let line = d3.line()
                 .x(function(d){ return xScale(d.x) })
                 .y(function(d){ return yScale(d.y) })

    // draw grid
    svg.append("g")
       .attr("id", "grid")
       .call(
         d3.axisLeft(yScale)
           .ticks(5)
           .tickSize(-width)
           .tickFormat("")
      )
    // draw axis
    svg.append("g")
       .attr("id", "hourlyAxisX")
       .attr("transform","translate(0," + height + ")")
       .call(d3.axisBottom(xScale))
    svg.append("g")
       .attr("id", "hourlyAxisY")
       .call(d3.axisLeft(yScale))

    d3.selectAll(".domain").remove()
    d3.selectAll("#hourlyAxisX .tick line").remove()
    d3.selectAll("#hourlyAxisY .tick line").remove()

    this.setState({ line })
  }

  componentWillUnmount () {
    d3.select("#hourlyAxisY").remove()
    d3.select("#hourlyAxisX").remove()
    d3.select("#basedata").remove()
    d3.select("#testdata").remove()
    d3.select("#grid").remove()
  }

  render () {
    return (
      <div>
        <Line svg={this.props.svg} line={this.state.line} name={'basedata'} animate={false} />
        <Line svg={this.props.svg} line={this.state.line} name={'testdata'} animate={true} />
      </div>
    )
  }
}

export default HourlyRate
