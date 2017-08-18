import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import get from 'lodash/get'
import { connect } from 'react-redux'

import { chartsContent } from '../constants/chartsContent'
import { MARKER_OPACITY_STR, MARKER_COLOR, MARKER_ANIMATION_DURATION } from '../constants/chart-constants'

const _ = {
  get,
}

 /*
  * we use original css syntax in this module
  */
class Marker extends Component {
  constructor(props) {
    super(props)

    this.draw = this.draw.bind(this)
  }

  componentDidMount() {
    this.draw(this.props.painting.svg,
              this.props.xScale,
              this.props.painting.height,
              this.props.data.pos)
  }

  componentWillReceiveProps(nextProps) {
    const { start, end } = this.props.data.pos
    d3.select(`#marker${start}${end}`).remove()

    if (nextProps.chartKey in chartsContent) {
      this.draw(nextProps.painting.svg,
                nextProps.xScale,
                nextProps.painting.height,
                nextProps.data.pos)
    }
  }

  componentWillUnmount() {
    const { start, end } = this.props.data.pos
    d3.select(`#marker${start}${end}`).remove()
  }

  draw(svg, xScale, height, pos) {
    const markerId = `marker${pos.start}${pos.end}`

    svg.append('rect')
       .attr('id', markerId)
       .attr('x', xScale(pos.start))
       .attr('y', 0)
       .attr('height', height)
       .attr('width', 0)
       .attr('fill', MARKER_COLOR)
       .attr('opacity', MARKER_OPACITY_STR)
       .transition()
       .duration(MARKER_ANIMATION_DURATION)
       .attr('width', xScale(pos.end) - xScale(pos.start))
  }

  render() {
    return (
      <div />
    )
  }
}

Marker.propTypes = {
  xScale: PropTypes.func,
  data: PropTypes.object,
  painting: PropTypes.object,
  chartKey: PropTypes.string,
}

Marker.defaultProps = {
  painting: { svg: undefined, width: 300, height: 500 },
  xScale: undefined,
  data: {},
  chartKey: '',
}

function mapStateToProps(state) {
  return ({
    chartKey: _.get(state, 'section.sectionKey', ''),
  })
}

export default connect(mapStateToProps)(Marker)
