import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { withFauxDOM } from 'react-faux-dom'
import { get } from 'lodash'

import { LEGEND_CONFIG } from '../constants/chart-constants'
import Axis from './Axis'

const _ = {
  get,
}

class D3Graph extends React.Component {
  constructor(props) {
    super(props)

    this.getChart = this.getChart.bind(this)
    this.getContainerSize = this.getContainerSize.bind(this)
    this.setGraphSize = this.setGraphSize.bind(this)
    this.drawGraph = this.drawGraph.bind(this)

    this.state = {
      svg: undefined,
      margin: {
        top: 30,
        right: 35,
        bottom: 10 + LEGEND_CONFIG.height,
        left: 50,
      },
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
  }

  componentDidMount() {
    const size = this.getContainerSize(this.props.containerRef)
    if (size.width !== undefined) {
      this.setGraphSize(size.width, size.height)
    }
    this.getChart()
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.windowWidth !== nextProps.windowWidth)
    || (this.props.windowHeight !== nextProps.windowHeight)
    || (this.props.containerRef !== nextProps.containerRef)) {
      // screen size changed, adjust graph size
      const size = this.getContainerSize(nextProps.containerRef)
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

  getContainerSize(containerRef) {
    if (containerRef !== undefined) {
      const size = {
        width: containerRef.clientWidth,
        height: containerRef.clientHeight,
      }
      return size
    }
    return { width: undefined, height: undefined }
  }

  setGraphSize(width, height) {
    const container = d3.select('#graphContainer')
    const group = d3.select('#graphGroup')
    const margin = this.state.margin

    if (this.props.isMobile) {
      margin.top = 50
    }

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
      <div>
        { this.props.graph }
        { this.drawGraph() }
      </div>
    )
  }
}

D3Graph.defaultProps = {
  graph: 'loading',
  isMobile: false,
  windowHeight: 300,
  windowWidth: 500,
  sectionKey: '',
}

D3Graph.propTypes = {
  isMobile: PropTypes.bool,
  sectionKey: PropTypes.string,
  windowHeight: PropTypes.number,
  windowWidth: PropTypes.number,
}

function mapStateToProps(state) {
  return ({
    windowWidth: _.get(state, 'section.windowWidth', 500),
    windowHeight: _.get(state, 'section.windowHeight', 300),
    sectionKey: _.get(state, 'section.sectionKey', ''),
    isMobile: _.get(state, 'section.isMobile', true),
  })
}

export default connect(mapStateToProps)(withFauxDOM(D3Graph))
