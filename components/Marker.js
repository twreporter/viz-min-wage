import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { data } from './Data'
import { setAnimating } from '../store'
/*
 * we use original css syntax in this module
 */
class Marker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      drawn: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if( this.state.drawn == false){
      let { svg, xScale, height, pos, after } = this.props
      let that = this
      if( nextProps.animating == after ){
        svg.append("rect")
           .attr("x", xScale(pos.start))
           .attr("y", 0)
           .attr("height", height)
           .attr("width", 0)
           .attr("rx", "10")
           .attr("ry", "10")
           .attr("fill", "darkred")
           .attr("opacity", "0.5")
           .transition()
           .duration(1000)
           .attr("width", xScale(pos.end) - xScale(pos.start))
           .on("end", function () {
             that.props.setAnimating('marker')
           })
      }
    }
  }

  render () {
    return (
      <div />
    )
  }
}

const mapStateToProps = ({ svg, animating, chartSize, chartFunc }) => ({
  svg,
  animating,
  xScale: chartFunc.xScale,
  height: chartSize.height
 })

const mapDispatchToProps = (dispatch) => {
  return {
    setAnimating: bindActionCreators(setAnimating, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Marker)
