import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

import Line from './Line'
import Marker from './Marker'

const xRange = [0, 10]
const yRange = [0, 200]

class MonthlyRate extends Component {
  constructor (props) {
    super(props)

    d3.select("#hourlyAxis").remove()
    d3.select("#basedata").remove()
    d3.select("#testdata").remove()

    this.state = {
      xScale: undefined,
      yScale: undefined,
      animating: undefined
    }
  }

  componentDidMount () {
    let { svg, height, width } = this.props

    let xScale = d3.scaleLinear()
                   .domain(xRange)
                   .range([0, width])
    let yScale = d3.scaleLinear()
                   .domain(yRange)
                   .range([height, 0])
    let line = d3.line()
                 .x(function(d){ return xScale(d.x) })
                 .y(function(d){ return yScale(d.y) })

    svg.append("g")
       .attr("id", "monthlyAxis")
       .call(d3.axisLeft(yScale))
  }

  render () {
    return (
      <div>
        <Line svg={this.props.svg} line={this.state.line} name={'testdata1'} color={'blue'} animate={false} />
        <Line svg={this.props.svg} line={this.state.line} name={'testdata2'} color={'red'} animate={true} />
      </div>
    )
  }
}

export default MonthlyRate
