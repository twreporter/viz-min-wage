import React, {Component} from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import HourlyRate from './HourlyRate'
import MonthlyRate from './MonthlyRate'
import { setSvg, setChartSize } from '../actions/chart'

const D3Container = styled.div`
  width: 100%
`

class D3Graph extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.getChart = this.getChart.bind(this)

    this.state = {
      hourly: true
    }
  }

  componentWillMount () {
    // create new faux dom element called 'chart'
    const faux = this.props.connectFauxDOM('div', 'chart')

    // chart data setup
    let { margin } = this.props
    let width = this.props.width - margin.left - margin.right
    let height = this.props.height - margin.top - margin.bottom

    // add a svg element
    d3.select(faux)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('id', 'd3Chart')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    this.props.setChartSize({width, height})
  }

  componentDidMount () {
    this.getChart()
  }

  getChart () {
    let selection = d3.select("#d3Chart")
    if( selection.empty() ){
      setTimeout(this.getChart, 1000)
    }else{
      this.props.setSvg(selection)
    }
  }

  handleClick (e) {
    this.setState({ hourly: false })
  }

  render () {
    return (
      <D3Container onClick={this.handleClick}>
        <h3>Here is D3</h3>
        {this.props.chart}
        {this.state.hourly ?
         <HourlyRate /> :
         <MonthlyRate />
        }
      </D3Container>
    )
  }
}

D3Graph.defaultProps = {
  chart:  'loading',
  margin: {top: 30, right: 20, bottom: 30, left: 50},
  width:  500,
  height: 300
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    setSvg: bindActionCreators(setSvg, dispatch),
    setChartSize: bindActionCreators(setChartSize, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withFauxDOM(D3Graph) )
