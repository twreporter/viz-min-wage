import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import Line from './Line'
import { setChartFunc } from '../actions/chart'

const _ = {
  get,
}
const xRange = [0, 10]
const yRange = [0, 100]

class HourlyRate extends Component {
  constructor (props) {
    super(props)

    this.draw = this.draw.bind(this)

    this.state = {
      init: false
    }
  }

  componentWillReceiveProps (nextProps) {
    // we need to wait until svg has been setted up

    if( this.state.init == false){

      let svg = this.props.svg || nextProps.svg
      let width = this.props.width || nextProps.width
      let height = this.props.height || nextProps.height

      if( (svg != undefined) &&
          (width != undefined) &&
          (height != undefined) ){
        this.draw(svg, width, height)
      }
    }
  }

  componentDidMount () {

    if( this.state.init == false){
      let { svg, width, height } = this.props
      if( (svg != undefined ) &&
          (width != undefined) &&
          (height != undefined) ){
        this.draw(svg, width, height)
      }
    }
  }

  draw (svg, width, height) {

    let xScale = d3.scaleLinear()
                   .domain(xRange)
                   .range([0, width])
    let yScale = d3.scaleLinear()
                   .domain(yRange)
                   .range([height, 0])
    let line = d3.line()
                 .x(function(d){ return xScale(d.x) })
                 .y(function(d){ return yScale(d.y) })

    // add axis
    svg.append("g")
       .attr("transform","translate(0," + height + ")")
       .call(d3.axisBottom(xScale))
    svg.append("g")
       .attr("id", "hourlyAxis")
       .call(d3.axisLeft(yScale))

    this.props.setChartFunc({xScale, yScale, line})
    this.setState({init: true})
  }

  render () {
    return (
      <div>
        <Line name={'basedata'} color={'black'} animate={false} />
        <Line name={'testdata'} color={'orange'} animate={true} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  svg: _.get(state, 'chart.svg', undefined),
  width: _.get(state, 'chart.chartSize.width', undefined),
  height: _.get(state, 'chart.chartSize.height', undefined)
 })

const mapDispatchToProps = (dispatch) => {
  return {
    setChartFunc: bindActionCreators(setChartFunc, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HourlyRate)
