import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'

import { basedata, testdata2 } from './Data'

const D3Container = styled.div`
  width: 100%
`

class D3Graph extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      step: 0
    }
  }

  componentDidMount () {
    // create new faux dom element called 'chart'
    const faux = this.props.connectFauxDOM('div', 'chart')

    let margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom

    // add a svg element
    let svg = d3.select(faux)
                .append('svg')
                .attr("id", "D3svg")
                .attr('width', width + margin.left + margin.right)
          	    .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // setup axis
    let xScale = d3.scaleLinear()
                   .domain(d3.extent(basedata, function(d){return d.x}))
                   .range([0, width])
    let yScale = d3.scaleLinear()
                   .domain([0, d3.max(basedata, function(d){return d.y})])
                   .range([height, 0])

    // add axis
    svg.append("g")
       .attr("transform",
             "translate(0," + height + ")")
       .call(d3.axisBottom(xScale))

    svg.append("g")
       .call(d3.axisLeft(yScale))

    // setup gradient
    let areaGradient = svg.append("defs")
                          .append("linearGradient")
                          .attr("id","areaGradient")
                          .attr("x1", "0%").attr("y1", "0%")
                          .attr("x2", "0%").attr("y2", "100%")

    areaGradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "gray")
                .attr("stop-opacity", 0.8)
    areaGradient.append("stop")
                .attr("offset", "80%")
                .attr("stop-color", "white")
                .attr("stop-opacity", 0)

    // setup line
    this.line = d3.line()
                  .x(function(d){ return xScale(d.x) })
                  .y(function(d){ return yScale(d.y) })
    // setup area
    this.area = d3.area()
                  .x(function(d){ return xScale(d.x) })
                  .y0(height)
                  .y1(function(d){ return yScale(d.y) })

    // draw baseline
    svg.append("path")
       .attr("id", "baseline")
       .attr("d", this.line(basedata))
       .attr("stroke", "black")
       .attr("fill", "none")
       .attr("strokeWidth", "3")

    // draw line
    let part1 = testdata2.slice(0, 4)
    let part2 = testdata2.slice(3, 7)
    let part3 = testdata2.slice(6)

    svg.append("path")
       .attr("d", this.line(part1))
       .attr("id", "part1")
       .attr("stroke", "orange")
       .attr("fill", "none")
       .attr("strokeWidth", "3")

    svg.append("path")
       .attr("d", this.line(part2))
       .attr("id", "part2")
       .attr("stroke", "gray")
       .attr("fill", "none")
       .attr("strokeWidth", "3")
       .attr("visibility", "hidden")

    svg.append("path")
       .datum(part2)
       .attr("id", "part2Area")
       .attr("d", this.area)
       .attr("strokeWidth", "0")
       .attr("fill", "url(#areaGradient)")
       .attr("visibility", "hidden")

    svg.append("path")
       .attr("d", this.line(part3))
       .attr("id", "part3")
       .attr("stroke", "red")
       .attr("fill", "none")
       .attr("strokeWidth", "3")
       .attr("visibility", "hidden")

    svg.append("path")
       .datum(part3)
       .attr("id", "part3Area")
       .attr("d", this.area)
       .attr("strokeWidth", "0")
       .attr("fill", "red")
       .attr("opacity", "0.5")
       .attr("visibility", "hidden")

    // setup marker
    let markerX = 2.5, markerWidth = 4

    // add maker area
    svg.append("rect")
       .attr("x", xScale(markerX))
       .attr("y", 0)
       .attr("height", height)
       .attr("width", xScale(markerX + markerWidth) - xScale(markerX))
       .attr("rx", "10")
       .attr("ry", "10")
       .attr("fill", "DarkSeaGreen")
       .attr("stroke", "green")
       .attr("opacity", "0.5")
       .attr("strokeWidth", "2")
       .attr("visibility", "hidden")
       .on("mouseover", function () {
         d3.select("#text4Rect")
           .transition()
           .duration(800)
           .ease(d3.easeCubic)
           .attr("opacity", "1")
       })
       .on("mouseout", function () {
         d3.select("#text4Rect")
           .transition()
           .duration(800)
           .ease(d3.easeCubic)
           .attr("opacity", "0")
       })
    // setup maker text
    svg.append("text")
       .attr("id", "text4Rect")
       .attr("x", xScale(markerX+markerWidth/2))
       .attr("y", height/5)
       .attr("textAnchor", "middle")
       .attr("stroke", "none")
       .attr("fill", "Purple")
       .attr("fontSize", "24px")
       .text("Here is the text!")
       .attr("opacity", "0")
  }

  handleClick (e) {
    let length

    switch (this.state.step) {
      case 0:
        let part2Line = d3.select("#part2")
        length = part2Line.node().getTotalLength()
        part2Line.attr("stroke-dasharray", length+" "+length)
                 .attr("stroke-dashoffset", length)
                 .attr("visibility", "visible")
                 .transition()
                 .duration(2000)
                 .ease(d3.easeLinear)
                 .attr("stroke-dashoffset", 0)
                 .on("end", function () {
                   d3.select('#part2Area')
                     .attr("visibility", "visible")
                 })

        this.setState({step: 1})
        break
      case 1:
        let part3Line = d3.select("#part3")
        length = part3Line.node().getTotalLength()
        part3Line.attr("stroke-dasharray", length+" "+length)
                 .attr("stroke-dashoffset", length)
                 .attr("visibility", "visible")
                 .transition()
                 .duration(2000)
                 .ease(d3.easeLinear)
                 .attr("stroke-dashoffset", 0)
                 .on("end", function () {
                   d3.select("#part3Area")
                     .attr("visibility", "visible")
                 })
        this.setState({step: 2})
        break
      case 2:
        d3.select("rect")
          .attr("visibility", "visible")
        this.setState({step: 3})
      default:
    }

  }

  render () {
    return (
      <D3Container onClick={this.handleClick}>
        <h3>Here is D3</h3>
        {this.props.chart}
      </D3Container>
    )
  }
}

D3Graph.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(D3Graph)
