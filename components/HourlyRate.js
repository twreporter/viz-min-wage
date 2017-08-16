import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

import Line from './Line'

const xRange = [0, 10]
const yRange = [0, 100]

class HourlyRate extends Component {
  constructor (props) {
    super(props)

    this.draw = this.draw.bind(this)

    this.state = {
      init: false,
      xScale: undefined,
      yScale: undefined,
      line: undefined
    }
  }

  componentWillReceiveProps (nextProps) {
    // we need to wait until svg has been setted up

    if( this.state.init == false){

      let svg = this.props.svg || nextProps.svg
      let width = this.props.width || nextProps.width
      let height = this.props.height || nextProps.height

      this.draw(svg, width, height)

    }
  }

  componentDidMount () {

    if( this.state.init == false){
      let { svg, width, height } = this.props
      this.draw(svg, width, height)
    }
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

    // add axis
    svg.append("g")
       .attr("transform","translate(0," + height + ")")
       .call(d3.axisBottom(xScale))
    svg.append("g")
       .attr("id", "hourlyAxis")
       .call(d3.axisLeft(yScale))

    this.setState({
      init: true, xScale, yScale, line
    })
  }

  render () {
    return (
      <div>
        <Line svg={this.props.svg} line={this.state.line} name={'basedata'} color={'black'} animate={false} />
        <Line svg={this.props.svg} line={this.state.line} name={'testdata'} color={'orange'} animate={true} />
      </div>
    )
  }
}

export default HourlyRate
