import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Line from './Line'
import { setChartFunc } from '../store'

const xRange = [0, 10]
const yRange = [0, 100]

class HourlyRate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      init: false
    }
  }

  componentWillReceiveProps (nextProps) {
    // we need to wait until svg has been setted up

    if( this.state.init == false){
      let svg = this.props.svg || nextProps.svg
      let width = this.props.chartSize.width || nextProps.chartSize.width
      let height = this.props.chartSize.height || nextProps.chartSize.height

      if( (svg != undefined )
       && ( width != undefined )
       && ( height != undefined )
      ){

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
    }
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

const mapStateToProps = ({ svg, chartSize }) => ({ svg, chartSize })

const mapDispatchToProps = (dispatch) => {
  return {
    setChartFunc: bindActionCreators(setChartFunc, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HourlyRate)
