import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

/*
 * we use original css syntax in this module
 * props needed:
 *  svg: for drawing rect
 *  xScale, height: decide rect size
 *  pos {start, end}: rect start x and end x
 */
class Marker extends Component {
  constructor (props) {
    super(props)

    this.draw = this.draw.bind(this)

    this.state = {
      drawn: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if( this.state.drawn == false){
      let xScale = this.props.xScale || nextProps.xScale
      if( xScale != undefined ){
        this.draw(xScale)
      }
    }
  }

  componentDidMount () {
    if( this.state.drawn == false){
      let xScale = this.props.xScale
      if( xScale != undefined ){
        this.draw(xScale)
      }
    }
  }

  componentWillUnmount () {
    d3.select("#marker").remove()
  }

  draw (xScale) {
    let { svg, height, pos } = this.props
    svg.append("rect")
       .attr("id", "marker")
       .attr("x", xScale(pos.start))
       .attr("y", 0)
       .attr("rx", 10)
       .attr("ry", 10)
       .attr("height", height)
       .attr("width", 0)
       .attr("fill", "darkred")
       .attr("opacity", "0.8")
       .transition()
       .duration(1000)
       .attr("width", xScale(pos.end) - xScale(pos.start))

    this.setState({drawn: true})
  }

  render () {
    return (
      <div />
    )
  }
}

export default Marker
