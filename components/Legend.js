import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { LEGEND_CONFIG, ELEMENT_TYPE } from '../constants/chart-constants'
import { chartsContent } from '../constants/chartsContent'

class Legend extends Component {
  constructor(props) {
    super(props)

    this.drawLegend = this.drawLegend.bind(this)
  }

  componentDidMount() {
    if (this.props.chartKey in chartsContent) {
      this.drawLegend(this.props.painting, this.props.chartKey)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chartKey !== nextProps.chartKey) {
      d3.selectAll('#Legend').remove()

      if (nextProps.chartKey in chartsContent) {
        this.drawLegend(nextProps.painting, nextProps.chartKey)
      }
    }
  }

  drawLegend(painting, chartKey) {
    const { svg, height, width } = painting
    const { rectWidth, rectHeight, interRectText, minItemWidth } = LEGEND_CONFIG
    const legendHeight = LEGEND_CONFIG.height

    const legendSelection = svg.append('g')
                               .attr('id', 'Legend')
                               .attr('transform', `translate(0,${height + legendHeight})`)

    let position = width / chartsContent[chartKey].elements.length
    if (position > minItemWidth) {
      position = minItemWidth
    }
    let item = 1
    chartsContent[chartKey].elements.map((val) => {
      if (val.type === ELEMENT_TYPE.line) {

        legendSelection.append('rect')
                       .attr('x', position)
                       .attr('y', -1 * (rectHeight / 2))
                       .attr('width', rectWidth)
                       .attr('height', rectHeight)
                       .attr('rx', 4)
                       .attr('ry', 4)
                       .style('fill', val.color)
        legendSelection.append('text')
                       .attr('x', position + rectWidth + interRectText)
                       .attr('y', rectHeight)
                       .attr('fill', '#303030')
                       .text(val.legendText)
        item = item + 1
        position = (item * position) + rectWidth + interRectText
      }
    })
  }

  render() {
    return (
      <div />
    )
  }
}

export default Legend
