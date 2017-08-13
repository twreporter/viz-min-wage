import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Line from './Line'
import Marker from './Marker'
import { setChartFunc } from '../store'

const xRange = [0, 10]
const yRange = [0, 200]

class MonthlyRate extends Component {
  constructor (props) {
    super(props)

    d3.select("#hourlyAxis").remove()
    d3.select("#basedata").remove()
    d3.select("#testdata").remove()
    this.props.setChartFunc({line: undefined})
  }

  componentDidMount () {
    let { svg, height, xScale } = this.props

    let yScale = d3.scaleLinear()
                   .domain(yRange)
                   .range([height, 0])
    let line = d3.line()
                 .x(function(d){ return xScale(d.x) })
                 .y(function(d){ return yScale(d.y) })

    svg.append("g")
       .attr("id", "monthlyAxis")
       .call(d3.axisLeft(yScale))

    this.props.setChartFunc({yScale, line})
  }

  render () {
    return (
      <div>
        <Line name={'testdata1'} color={'blue'} animate={false} />
        <Line name={'testdata2'} color={'red'} animate={true} />
        <Marker pos={{start: 3, end: 7}} after={'testdata2'} />
      </div>
    )
  }
}

const mapStateToProps = ({ svg, chartSize, chartFunc }) => ({
  svg,
  height: chartSize.height,
  xScale: chartFunc.xScale
 })

const mapDispatchToProps = (dispatch) => {
  return {
    setChartFunc: bindActionCreators(setChartFunc, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyRate)
