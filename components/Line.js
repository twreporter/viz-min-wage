import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import get from 'lodash/get'
import { connect } from 'react-redux'

import { data } from './Data'
import { getColor } from './utils'
import { chartsContent } from '../constants/chartsContent'
import { STROKE_WIDTH_STR, STROKE_ANIMATION_DURATION } from '../constants/chart-constants'

const _ = {
  get,
}

/*
 * we use original css syntax in this module
 */
class Line extends Component {
  constructor(props) {
    super(props)

    this.animate = this.animate.bind(this)
    this.draw = this.draw.bind(this)
  }

  componentDidMount() {
    this.draw(this.props.painting.svg,
              this.props.line,
              this.props.data.dataName,
              this.props.data.animate)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chartKey !== nextProps.chartKey) {
      d3.select(`#${this.props.data.dataName}`).remove()
    }

    if (nextProps.chartKey in chartsContent) {
      this.draw(nextProps.painting.svg,
                nextProps.line,
                nextProps.data.dataName,
                nextProps.data.animate)
    }
  }

  componentWillUnmount() {
    d3.select(`#${this.props.data.dataName}`).remove()
  }

  draw(svg, line, name, animate) {
    svg.append('path')
       .attr('id', name)
       .attr('d', line(data[name]))
       .attr('stroke', getColor(name))
       .attr('stroke-linecap', 'round')
       .attr('fill', 'none')
       .attr('stroke-width', STROKE_WIDTH_STR)
       .attr('visibility', animate ? 'hidden' : 'visible')

    if (animate) {
      // use setTimeout to avoid getTotalLength from null
      setTimeout(this.animate, 0, name)
    }
  }

  animate(name) {
    const animateLine = d3.select(`#${name}`)
    const length = animateLine.node().getTotalLength()
    animateLine.attr('stroke-dasharray', `${length} ${length}`)
               .attr('stroke-dashoffset', length)
               .attr('visibility', 'visible')
               .transition()
               .duration(STROKE_ANIMATION_DURATION)
               .ease(d3.easeLinear)
               .attr('stroke-dashoffset', 0)
  }

  render() {
    return (
      <div />
    )
  }
}

Line.propTypes = {
  line: PropTypes.func,
  data: PropTypes.object,
  painting: PropTypes.object,
  chartKey: PropTypes.string,
}

Line.defaultProps = {
  painting: { svg: undefined, width: 300, height: 500 },
  line: undefined,
  data: {},
  chartKey: '',
}

function mapStateToProps(state) {
  return ({
    chartKey: _.get(state, 'section.sectionKey', ''),
  })
}

export default connect(mapStateToProps)(Line)
