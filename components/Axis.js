import React, { Component } from 'react'
import * as d3 from 'd3'

import { ELEMENT_TYPE } from '../constants/chart-types'
import { chartsContent } from '../constants/chartsContent'
import Line from './Line'
import Marker from './Marker'
// import Elements from './Elements'
// import { scripts } from './Scripts'

class Axis extends Component {
  constructor(props) {
    super(props)

    this.drawAxis = this.drawAxis.bind(this)
    this.drawElements = this.drawElements.bind(this)

    this.state = {
    //   initDone: false,
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
      // this.props.setFunc(undefined, undefined)
      this.setState({ line: undefined, xScale: undefined })

      if (nextProps.chartKey in chartsContent) {
        this.drawAxis(nextProps.painting, nextProps.chartKey)
      }
    }
  //   if (this.props.name !== nextProps.name) {
  //     d3.selectAll('#Axis').remove()
  //     d3.select('#grid').remove()
  //
  //     this.draw(nextProps.name, nextProps.painting)
  //   }
  }

  drawAxis(painting, chartKey) {
    const { xRange, yRange } = chartsContent[chartKey].range
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
    // this.props.setFunc(line, xScale)

    // draw grid
    svg.append('g')
       .attr('id', 'grid')
       .call(
         d3.axisLeft(yScale)
           .ticks(5)
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
              name={val.dataName}
              painting={this.props.painting}
              line={this.state.line}
              animate={val.animate}
            />
          )
        }

        if (val.type === ELEMENT_TYPE.marker) {
          arr.push(
            <Marker
              key={idx}
              painting={this.props.painting}
              xScale={this.state.xScale}
              pos={val.pos}
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
        {alreadySetState ? (this.drawElements()) : <div />}
      </div>
    )
  }
}

export default Axis
