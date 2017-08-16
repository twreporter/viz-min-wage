import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

import Line from './Line'
import Marker from './Marker'

const xRange = [0, 10]
const yRange = [0, 200]

/*
 * props needed: svg, width, height
 */

class MonthlyRate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      line: undefined
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
       .attr("id", "monthlyAxisX")
       .attr("transform","translate(0," + height + ")")
       .call(d3.axisBottom(xScale))
    svg.append("g")
       .attr("id", "monthlyAxisY")
       .call(d3.axisLeft(yScale))

    this.setState({ line })
  }

  componentWillUnmount () {
    d3.select("#monthlyAxisX").remove()
    d3.select("#monthlyAxisY").remove()
    d3.select("#testdata2").remove()
    d3.select("#testdata1").remove()
  }

  render () {
    return (
      <div>
        <Line svg={this.props.svg} line={this.state.line} name={'testdata1'} animate={false} />
        <Line svg={this.props.svg} line={this.state.line} name={'testdata2'} animate={true} />
      </div>
    )
  }
}

export default MonthlyRate
