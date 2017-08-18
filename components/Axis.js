import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { ELEMENT_TYPE } from '../constants/chart-constants'
import { chartsContent } from '../constants/chartsContent'
import Line from './Line'
import Marker from './Marker'
import Legend from './Legend'

class Axis extends Component {
  constructor(props) {
    super(props)

    this.drawAxis = this.drawAxis.bind(this)
    this.drawElements = this.drawElements.bind(this)

    this.state = {
      line: undefined,
      xScale: undefined,
    }
  }

  componentDidMount() {
    if (this.props.chartKey in chartsContent) {
      this.drawAxis(this.props.painting, this.props.chartKey)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chartKey !== nextProps.chartKey) {
      d3.selectAll('#Axis').remove()
      d3.selectAll('#grid').remove()
      this.setState({ line: undefined, xScale: undefined })

      if (nextProps.chartKey in chartsContent) {
        this.drawAxis(nextProps.painting, nextProps.chartKey)
      }
    }
  }

  drawAxis(painting, chartKey) {
    const { xRange, yRange } = chartsContent[chartKey].range
    const tick = chartsContent[chartKey].tick
    const { svg, width, height } = painting

    const xScale = d3.scaleLinear()
                     .domain(xRange)
                     .range([0, width])
    const yScale = d3.scaleLinear()
                     .domain(yRange)
                     .range([height, 0])
    const line = d3.line()
                   .x(function(d) { return xScale(d.x) })
                   .y(function(d) { return yScale(d.y) })

    this.setState({ line, xScale })

    // draw grid
    svg.append('g')
       .attr('id', 'grid')
       .call(
         d3.axisLeft(yScale)
           .ticks(tick)
           .tickSize(-width)
           .tickFormat('')
      )
    // draw axis
    svg.append('g')
       .attr('id', 'Axis')
       .attr('transform', `translate(0,${height})`)
       .call(d3.axisBottom(xScale))
    svg.append('g')
       .attr('id', 'Axis')
       .call(d3.axisLeft(yScale))

    d3.selectAll('.domain').remove()
    d3.selectAll('#Axis .tick line').remove()
  }

  drawElements() {
    const arr = []

    if (this.props.chartKey in chartsContent) {
      chartsContent[this.props.chartKey].elements.map((val, idx) => {

        if (val.type === ELEMENT_TYPE.line) {
          arr.push(
            <Line
              key={idx}
              data={val}
              painting={this.props.painting}
              line={this.state.line}
            />
          )
        }

        if (val.type === ELEMENT_TYPE.marker) {
          arr.push(
            <Marker
              key={idx}
              data={val}
              painting={this.props.painting}
              xScale={this.state.xScale}
            />
          )
        }
      })
    }

    return arr
  }

  render() {
    const alreadySetState = ((this.state.line !== undefined)
                         && (this.state.xScale !== undefined))
    return (
      <div>
        <Legend
          chartKey={this.props.chartKey}
          painting={this.props.painting}
        />
        {alreadySetState ? (this.drawElements()) : <div />}
      </div>
    )
  }
}

Axis.propTypes = {
  painting: PropTypes.object,
  chartKey: PropTypes.string,
}

Axis.defaultProps = {
  painting: { svg: undefined, width: 300, height: 500 },
  chartKey: '',
}

export default Axis
