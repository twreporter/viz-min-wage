import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../styles/common-variables'
import { rem, screen } from '../styles/utils'
import { connect } from 'react-redux'
import { withFauxDOM } from 'react-faux-dom'
import get from 'lodash/get'
import * as d3 from 'd3'

import HourlyRate from './HourlyRate'
import MonthlyRate from './MonthlyRate'

const _ = {
  get,
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  position: relative;
  max-width: ${rem(breakpoints.large.min)};
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`

const ChartContainer = styled.div`
  position: absolute;
  background-color: #39CCCC;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 50%;

  ${screen.largeThanMobile`
    top: 50%;
    right: 50%;
    transform: translate(0, -50%);
    width: 50%;
    height: 8rem;
    max-width: ${rem(breakpoints.large.min / 2)};
  `}
`
class Chart extends React.Component {
  constructor (props) {
    super(props)

    this.getChart = this.getChart.bind(this)
    this.getContainerSize = this.getContainerSize.bind(this)
    this.setGraphSize = this.setGraphSize.bind(this)
    this.drawGraph = this.drawGraph.bind(this)

    this.state = {
      svg: undefined,
      margin: {top: 30, right: 20, bottom: 30, left: 50},
      marginMobile: {top: 20, right: 10, bottom: 30, left: 35},
      chartSize: {
        width: 500,
        height: 300
      }
    }
  }

  componentWillMount () {
    const faux = this.props.connectFauxDOM('div', 'graph')

    let { margin } = this.state
    let { width, height } = this.state.chartSize

    d3.select(faux)
      .append('svg')
      .attr('id', 'graphContainer')
      .attr('width', width)
	    .attr('height', height)
      .append('g')
      .attr('id', 'graphGroup')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  }

  componentWillReceiveProps (nextProps) {
    if( (this.props.windowWidth != nextProps.windowWidth)
    ||  (this.props.windowHeight != nextProps.windowHeight)){
      //screen size changed, adjust graph size
      let size = this.getContainerSize()
      if( size.width != undefined ){
        this.setGraphSize(size.width, size.height)
      }
    }
  }

  componentDidMount () {
    let size = this.getContainerSize()
    if( size.width != undefined ){
      this.setGraphSize(size.width, size.height)
    }
    this.getChart()
  }

  getChart () {
    let selection = d3.select("#graphGroup")

    if( selection.empty() ){
      setTimeout(this.getChart, 1000)
      return undefined
    }

    if( this.state.svg == undefined ){
      this.setState({svg: selection})
    }

    return selection
  }

  getContainerSize () {
    if( this.containerRef != null ){
      let size = {
        width: this.containerRef.clientWidth,
        height: this.containerRef.clientHeight
      }
      return size
    }
    return {width: undefined, height: undefined}
  }

  setGraphSize (width, height) {
    let container = d3.select("#graphContainer")
    let group = d3.select("#graphGroup")
    let margin = (this.props.isMobile) ? this.state.marginMobile : this.state.margin

    if( (!container.empty()) && (!group.empty()) ){
      let size = {
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom
      }
      container.attr("width", width)
               .attr("height", height)
      group.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      this.setState({chartSize: size})

      return true
    }
    setTimeout(this.setGraphSize, 1000, width, height)
  }

  drawGraph () {
    if( this.state.svg == undefined ){
      return (<div />)
    }

    if( this.props.sectionIndex < 1 ){
      return (
        <HourlyRate svg={this.state.svg}
                    width={this.state.chartSize.width}
                    height={this.state.chartSize.height} />
      )
    }else{
      return (
        <MonthlyRate svg={this.state.svg}
                     width={this.state.chartSize.width}
                     height={this.state.chartSize.height} />
      )
    }
  }

  render () {
    return (
      <Container>
        <Wrapper>
          <ChartContainer innerRef={comp => this.containerRef = comp}>
          { this.props.graph }
          { this.drawGraph() }
          </ChartContainer>
        </Wrapper>
      </Container>
    )
  }
}

Chart.defaultProps = {
  graph: 'loading'
}

function mapStateToProps (state) {
  return ({
    windowWidth: _.get(state, 'section.windowWidth', 600),
    windowHeight: _.get(state, 'section.windowHeight', 600),
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
    isMobile: _.get(state, 'section.isMobile', true)
  })
}

export default connect(mapStateToProps)( withFauxDOM(Chart) )
