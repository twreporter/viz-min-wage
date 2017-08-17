import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { data } from './Data'
import { getColor } from './utils'
/*
 * we use original css syntax in this module
 */
class Line extends Component {
  constructor(props) {
    super(props)

    this.animate = this.animate.bind(this)
    this.draw = this.draw.bind(this)

    this.state = {
      drawn: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.draw(nextProps.painting.svg,
              nextProps.line,
              nextProps.name,
              nextProps.animate)
  }

  draw(svg, line, name, animate) {
    svg.append('path')
       .attr('id', name)
       .attr('d', line(data[name]))
       .attr('stroke', getColor(name))
       .attr('stroke-linecap', 'round')
       .attr('fill', 'none')
       .attr('stroke-width', '3')
       .attr('visibility', animate ? 'hidden' : 'visible')

    if (animate) {
      // use setTimeout to avoid getTotalLength from null
      setTimeout(this.animate, 0, name)
    }

    this.setState({ drawn: true })
  }

  animate(name) {
    const animateLine = d3.select(`#${name}`)
    const length = animateLine.node().getTotalLength()
    animateLine.attr('stroke-dasharray', `${length} ${length}`)
               .attr('stroke-dashoffset', length)
               .attr('visibility', 'visible')
               .transition()
               .duration(2000)
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
  name: PropTypes.string,
  animate: PropTypes.bool,
}

Line.defaultProps = {
  painting: undefined,
  line: undefined,
  name: '',
  animate: false,
}

export default Line
