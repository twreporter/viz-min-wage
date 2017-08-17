import React, { Component } from 'react'
import * as d3 from 'd3'

import get from 'lodash/get'
import { connect } from 'react-redux'
import { chartsContent } from '../constants/chartsContent'
/*
 * we use original css syntax in this module
 */

 const _ = {
   get,
 }

class Marker extends Component {
  constructor(props) {
    super(props)

    this.draw = this.draw.bind(this)

    // this.state = {
    //   drawn: false,
    // }
  }

  componentDidMount() {
    this.draw(this.props.xScale)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chartKey !== nextProps.chartKey) {
      d3.select(`#marker${this.props.pos.start}`).remove()
    }

    if (nextProps.chartKey in chartsContent) {
      this.draw(nextProps.xScale)
    }
  }

  componentWillUnmount() {
    d3.select(`#marker${this.props.pos.start}`).remove()
  }

  draw(xScale) {
    const { painting, pos } = this.props
    const { svg, height } = painting
    svg.append('rect')
       .attr('id', `marker${pos.start}`)
       .attr('x', xScale(pos.start))
       .attr('y', 0)
       .attr('rx', 10)
       .attr('ry', 10)
       .attr('height', height)
       .attr('width', 0)
       .attr('fill', 'darkred')
       .attr('opacity', '0.8')
       .transition()
       .duration(1000)
       .attr('width', xScale(pos.end) - xScale(pos.start))

    // this.setState({ drawn: true })
  }

  render() {
    return (
      <div />
    )
  }
}

function mapStateToProps(state) {
  return ({
    chartKey: _.get(state, 'section.sectionKey', ''),
  })
}

export default connect(mapStateToProps)(Marker)
