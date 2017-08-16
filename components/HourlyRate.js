import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

import Line from './Line'

const xRange = [0, 10]
const yRange = [0, 100]

/*
 * props needed: svg, width, height
 */

class HourlyRate extends Component {
  constructor (props) {
    super(props)

    this.draw = this.draw.bind(this)

    this.state = {
      init: false,
      line: undefined
    }
  }

  componentWillReceiveProps (nextProps) {

    if( this.state.init == false){
      let svg = this.props.svg || nextProps.svg
      let width = this.props.width || nextProps.width
      let height = this.props.height || nextProps.height

      this.draw(svg, width, height)
    }

    if( this.props.sectionIndex != nextProps.sectionIndex ){

    }
  }

  componentDidMount () {

    if( this.state.init == false){
      let { svg, width, height } = this.props
      this.draw(svg, width, height)
    }
  }

  componentWillUnmount () {
    d3.select("#hourlyAxisY").remove()
    d3.select("#hourlyAxisX").remove()
    d3.select("#basedata").remove()
    d3.select("#testdata").remove()
  }

  draw (svg, width, height) {

    let xScale = d3.scaleLinear()
                   .domain(xRange)
                   .range([0, width])
    let yScale = d3.scaleLinear()
                   .domain(yRange)
                   .range([height, 0])
    let line = d3.line()
                 .x(function(d){ return xScale(d.x) })
                 .y(function(d){ return yScale(d.y) })

    svg.append("g")
       .attr("id", "hourlyAxisX")
       .attr("transform","translate(0," + height + ")")
       .call(d3.axisBottom(xScale))
    svg.append("g")
       .attr("id", "hourlyAxisY")
       .call(d3.axisLeft(yScale))

    this.setState({
      init: true, line
    })
  }

  render () {
    return (
      <div>
        <Line svg={this.props.svg} line={this.state.line} name={'basedata'} animate={false} />
        <Line svg={this.props.svg} line={this.state.line} name={'testdata'} animate={true} />
      </div>
    )
  }
}

export default HourlyRate
