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
  border: 2px blue solid;
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
    this.isContainerSizeChange = this.isContainerSizeChange.bind(this)
    this.setChartSize = this.setChartSize.bind(this)
    this.drawGraph = this.drawGraph.bind(this)

    this.state = {
      svg: undefined,
      margin: {top: 30, right: 20, bottom: 30, left: 50},
      chartSize: {
        width: 500,
        height: 300
      },
      chartFunc: {
        xScale: undefined,
        yScale: undefined,
        line: undefined
      }
    }
  }

  componentWillMount () {
    const faux = this.props.connectFauxDOM('div', 'graph')

    let { margin } = this.state
    // let width = this.props.width - margin.left - margin.right
    // let height = this.props.height - margin.top - margin.bottom
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

      let size = this.isContainerSizeChange()
      if( size.width != undefined ){
        if( this.getChart() != undefined ){
          this.setChartSize(size.width, size.height)
        }
      }

    }
  }

  componentDidMount () {
    let size = this.isContainerSizeChange()
    if( size.width != undefined ){
      if( this.getChart() != undefined ){
        this.setChartSize(size.width, size.height)
      }
    }
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

  isContainerSizeChange () {
    if( this.containerRef != null ){
      let width = this.containerRef.clientWidth
      let height = this.containerRef.clientHeight

      if( (width!=undefined) && (height!=undefined) ){
        let preWidth = this.state.chartSize.width
        let preHeight = this.state.chartSize.height
        if( (width!=preWidth) || (height!=preHeight) ){
          let size = {width, height}
          this.setState({chartSize: size})
          return size
        }
      }
    }
    return {width: undefined, height: undefined}
  }

  setChartSize (width, height) {
    let container = d3.select("#graphContainer")
    container.attr("width", width)
             .attr("height", height)

    // TODO: svg need to change margin too
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
      return (<MonthlyRate svg={this.state.svg}
                           width={this.state.chartSize.width}
                           height={this.state.chartSize.height} />)
    }
  }

  render () {
    return (
      <Container innerRef={comp => this.containerRef = comp}>
        <Wrapper>
          <ChartContainer>
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
  })
}

export default connect(mapStateToProps)( withFauxDOM(Chart) )
