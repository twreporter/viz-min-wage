import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { breakpoints } from '../styles/common-variables'
import { rem, screen } from '../styles/utils'
import { connect } from 'react-redux'
import { withFauxDOM } from 'react-faux-dom'
import get from 'lodash/get'
import * as d3 from 'd3'

import Axis from './Axis'

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
  border: 2px solid #39CCCC;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 50%;

  ${screen.largeThanMobile`
    top: 50%;
    right: 50%;
    transform: translate(0, -50%);
    width: 50%;
    height: 50vh;
    min-height: 16rem;
    max-width: ${rem(breakpoints.large.min / 2)};
  `}
`
class Chart extends React.Component {
  constructor(props) {
    super(props)

    this.getChart = this.getChart.bind(this)
    this.getContainerSize = this.getContainerSize.bind(this)
    this.setGraphSize = this.setGraphSize.bind(this)
    this.drawGraph = this.drawGraph.bind(this)

    this.state = {
      svg: undefined,
      margin: { top: 30, right: 20, bottom: 30, left: 50 },
      marginMobile: { top: 20, right: 10, bottom: 30, left: 35 },
      chartSize: {
        width: 500,
        height: 300,
      },
    }
  }

  componentWillMount() {
    const faux = this.props.connectFauxDOM('div', 'graph')

    const { margin } = this.state
    const { width, height } = this.state.chartSize

    d3.select(faux)
      .append('svg')
      .attr('id', 'graphContainer')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('id', 'graphGroup')
      .attr('transform', `translate(${margin.left},${margin.top})`)
  }

  componentDidMount() {
    const size = this.getContainerSize()
    if (size.width !== undefined) {
      this.setGraphSize(size.width, size.height)
    }
    this.getChart()
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.windowWidth !== nextProps.windowWidth)
    || (this.props.windowHeight !== nextProps.windowHeight)) {
      // screen size changed, adjust graph size
      const size = this.getContainerSize()
      if (size.width !== undefined) {
        this.setGraphSize(size.width, size.height)
      }
    }
  }

  getChart() {
    const selection = d3.select('#graphGroup')

    if (selection.empty()) {
      setTimeout(this.getChart, 1000)
      return undefined
    }

    if (this.state.svg === undefined) {
      this.setState({ svg: selection })
    }

    return selection
  }

  getContainerSize() {
    if (this.containerRef !== null) {
      const size = {
        width: this.containerRef.clientWidth,
        height: this.containerRef.clientHeight,
      }
      return size
    }
    return { width: undefined, height: undefined }
  }

  setGraphSize(width, height) {
    const container = d3.select('#graphContainer')
    const group = d3.select('#graphGroup')
    const margin = (this.props.isMobile) ? this.state.marginMobile : this.state.margin

    if ((!container.empty()) && (!group.empty())) {
      const size = {
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
      }
      container.attr('width', width)
               .attr('height', height)
      group.attr('transform', `translate(${margin.left},${margin.top})`)

      this.setState({ chartSize: size })

      return true
    }
    setTimeout(this.setGraphSize, 1000, width, height)
    return false
  }

  drawGraph() {
    if (this.state.svg === undefined) {
      return (<div />)
    }

    const paint = {
      svg: this.state.svg,
      width: this.state.chartSize.width,
      height: this.state.chartSize.height,
    }

    return (
      <Axis
        chartKey={this.props.sectionKey}
        painting={paint}
      />
    )
  }

  render() {
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
  graph: 'loading',
  isMobile: false,
  windowHeight: 300,
  windowWidth: 500,
  sectionKey: '',
}

Chart.propTypes = {
  isMobile: PropTypes.bool,
  sectionKey: PropTypes.string,
  windowHeight: PropTypes.number,
  windowWidth: PropTypes.number,
}

function mapStateToProps(state) {
  return ({
    windowWidth: _.get(state, 'section.windowWidth', 600),
    windowHeight: _.get(state, 'section.windowHeight', 600),
    sectionKey: _.get(state, 'section.sectionKey', ''),
    isMobile: _.get(state, 'section.isMobile', true),
  })
}

export default connect(mapStateToProps)(withFauxDOM(Chart))
