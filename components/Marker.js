import React, { Component } from 'react'

/*
 * we use original css syntax in this module
 */
class Marker extends Component {
  constructor(props) {
    super(props)

    this.draw = this.draw.bind(this)

    this.state = {
      drawn: false,
    }
  }

  componentDidMount() {
    this.draw(this.props.xScale)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.drawn === false) {
      this.draw(nextProps.xScale)
    }
  }

  draw(xScale) {
    const { painting, pos } = this.props
    const { svg, height } = painting
    svg.append('rect')
       .attr('id', `marker${pos.start}`)
       .attr('x', xScale(pos.start))
       .attr('y', 0)
       .attr('rx', 10)
       .attr('ry', 10)
       .attr('height', height)
       .attr('width', 0)
       .attr('fill', 'darkred')
       .attr('opacity', '0.8')
       .transition()
       .duration(1000)
       .attr('width', xScale(pos.end) - xScale(pos.start))

    this.setState({ drawn: true })
  }

  render() {
    return (
      <div />
    )
  }
}

export default Marker
