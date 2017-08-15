import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import { data } from './Data'
import { setAnimating } from '../actions/chart'

const _ = {
  get,
}

/*
 * we use original css syntax in this module
 */
class Line extends Component {
  constructor (props) {
    super(props)

    this.animate = this.animate.bind(this)
    this.draw = this.draw.bind(this)

    this.state = {
      drawn: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if( this.state.drawn == false){

      let svg = this.props.svg || nextProps.svg
      let line = this.props.line || nextProps.line

      if( (svg!=undefined) && (line!=undefined) ){
        this.draw(svg, line)
      }
    }
  }

  componentDidMount () {
    if( this.state.drawn == false){

      let svg = this.props.svg
      let line = this.props.line

      if( (svg!=undefined) && (line!=undefined) ){
        this.draw(svg, line)
      }
    }
  }

  draw (svg, line) {
    svg.append("path")
       .attr("id", this.props.name)
       .attr("d", line(data[this.props.name]))
       .attr("stroke", this.props.color)
       .attr("fill", "none")
       .attr("stroke-width", "3")
       .attr("visibility", this.props.animate?"hidden":"visible")

    if( this.props.animate ){
      // use setTimeout to avoid getTotalLength from null
      setTimeout(this.animate, 0)
    }

    this.setState({drawn: true})
  }

  animate () {
    let name = this.props.name
    let animateLine = d3.select("#"+name)
    let that = this
    let length = animateLine.node().getTotalLength()
    animateLine.attr("stroke-dasharray", length+" "+length)
               .attr("stroke-dashoffset", length)
               .attr("visibility", "visible")
               .transition()
               .duration(2000)
               .ease(d3.easeLinear)
               .attr("stroke-dashoffset", 0)
               .on('end', function () {
                 that.props.setAnimating(name)
               })
  }

  render () {
    return (
      <div />
    )
  }
}

const mapStateToProps = (state) => ({
  svg: _.get(state, 'chart.svg', undefined),
  line: _.get(state, 'chart.chartFunc.line', undefined)
})

const mapDispatchToProps = (dispatch) => {
  return {
    setAnimating: bindActionCreators(setAnimating, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Line)