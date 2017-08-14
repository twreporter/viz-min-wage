import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import Line from './Line'
import Marker from './Marker'
import { setChartFunc } from '../actions/chart'

const _ = {
  get,
}
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

const mapStateToProps = (state) => ({
  svg: _.get(state, 'chart.svg', undefined),
  height: _.get(state, 'chart.chartSize.height', undefined),
  xScale: _.get(state, 'chart.chartFunc.xScale', undefined)
 })

const mapDispatchToProps = (dispatch) => {
  return {
    setChartFunc: bindActionCreators(setChartFunc, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyRate)
