import React, {Component} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import get from 'lodash/get'

import Line from './Line'
import Marker from './Marker'

const xRange = [0, 10]
const yRange = [0, 200]

const _ = {
  get,
}
/*
 * props needed: svg, width, height
 */

class MonthlyRate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      line: undefined,
      xScale: undefined
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
    // draw grid
    svg.append("g")
       .attr("id", "grid")
       .call(
         d3.axisLeft(yScale)
           .ticks(6)
           .tickSize(-width)
           .tickFormat("")
      )
    // draw axis
    svg.append("g")
       .attr("id", "monthlyAxisX")
       .attr("transform","translate(0," + height + ")")
       .call(d3.axisBottom(xScale))
    svg.append("g")
       .attr("id", "monthlyAxisY")
       .call(d3.axisLeft(yScale))

    d3.selectAll(".domain").remove()
    d3.selectAll("#monthlyAxisX .tick line").remove()
    d3.selectAll("#monthlyAxisY .tick line").remove()

    this.setState({ line, xScale })
  }

  componentWillUnmount () {
    d3.select("#monthlyAxisX").remove()
    d3.select("#monthlyAxisY").remove()
    d3.select("#testdata2").remove()
    d3.select("#testdata1").remove()
    d3.select("#grid").remove()
  }

  render () {
    let showMarker = (this.props.sectionIndex==2) ?
                     (<Marker svg={this.props.svg}
                             xScale={this.state.xScale}
                             height={this.props.height}
                             pos={{start: 3, end: 7}} />) : <div />
    return (
      <div>
        <Line svg={this.props.svg} line={this.state.line} name={'testdata1'} animate={false} />
        <Line svg={this.props.svg} line={this.state.line} name={'testdata2'} animate={true} />
        { showMarker }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return ({
    sectionIndex: _.get(state, 'section.sectionIndex', 0)
  })
}

export default connect(mapStateToProps)(MonthlyRate)
