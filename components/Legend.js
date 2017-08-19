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
    const { rectWidth, rectHeight, interRectText } = LEGEND_CONFIG
    const legendHeight = LEGEND_CONFIG.height

    const legendSelection = svg.append('g')
                               .attr('id', 'Legend')
                               .attr('transform', `translate(0,${height + legendHeight})`)

    const legendItems = []
    chartsContent[chartKey].elements.map((val) => {
      if (val.type === ELEMENT_TYPE.line) {
        legendItems.push({
          text: val.legendText,
          color: val.color,
        })
      }
    })

    if (legendItems.length !== 0) {
      legendItems.map((item, idx) => {
        const boxLength = width / legendItems.length
        const rectStartPos = idx * boxLength
        const textStartPos = rectStartPos + rectWidth + interRectText

        legendSelection.append('rect')
                       .attr('x', rectStartPos)
                       .attr('y', -1 * (rectHeight / 2))
                       .attr('width', rectWidth)
                       .attr('height', rectHeight)
                       .attr('rx', 4)
                       .attr('ry', 4)
                       .style('fill', item.color)
        legendSelection.append('text')
                       .attr('x', textStartPos)
                       .attr('y', rectHeight)
                       .attr('fill', '#303030')
                       .attr('font-size', '0.8rem')
                       .text(item.text)
      })
    }
  }

  render() {
    return (
      <div />
    )
  }
}

export default Legend
