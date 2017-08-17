import React, { Component } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { connect } from 'react-redux'

import { chartsContent } from '../constants/chartsContent'
import { ELEMENT_TYPE } from '../constants/chart-types'
// import { scripts } from './Scripts'
import Axis from './Axis'
import Line from './Line'
import Marker from './Marker'

const _ = {
  get,
}

class Elements extends Component {
  constructor(props) {
    super(props)

    // this.setElementArr = this.setElementArr.bind(this)
    this.setFuncState = this.setFuncState.bind(this)

    this.state = {
      line: undefined,
      xScale: undefined,
    }

    // this.showElements = this.showElements.bind(this)

    // this.state = {
    //   elementArr: [],
    //   elementNames: [],
    // }
  }

  // componentDidMount() {
  //   this.showElements(this.props.sectionIndex,
  //                     this.props.parent,
  //                     this.props.line,
  //                     this.props.painting,
  //                     this.props.xScale)
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.sectionIndex !== nextProps.sectionIndex) {
  //     this.state.elementNames.map((name) => {
  //       d3.select(`#${name}`).remove()
  //     })
  //     this.setState({ elementArr: [], elementNames: [] })
  //
  //     this.showElements(nextProps.sectionIndex,
  //                       nextProps.parent,
  //                       nextProps.line,
  //                       nextProps.painting,
  //                       nextProps.xScale)
  //   }
  // }

  // showElements(index, scetionName, line, painting, xScale) {
  //   const script = scripts[scetionName]
  //   const section = `sectionIndex${index}`
  //   const names = []
  //   const arr = []
  //
  //   if (section in script) {
  //     script[section].map((element, idx) => {
  //       if (element.type === ELEMENT_TYPE.line) {
  //         arr.push(
  //           <Line
  //             key={idx}
  //             name={element.dataName}
  //             painting={painting}
  //             line={line}
  //             animate={element.animate}
  //           />
  //         )
  //         names.push(element.dataName)
  //       }
  //       if (element.type === ELEMENT_TYPE.marker) {
  //         arr.push(
  //           <Marker
  //             key={idx}
  //             painting={painting}
  //             xScale={xScale}
  //             pos={element.pos}
  //           />
  //         )
  //         names.push(`marker${element.pos.start}`)
  //       }
  //     })
  //
  //     this.setState({ elementArr: arr, elementNames: names })
  //   }
  // }
  setFuncState(line, xScale) {
    this.setState({ line, xScale })
  }

  // setElementArr() {
  //   const arr = []
  //
  //   if (this.state.line === undefined) {
  //     return []
  //   }
  //
  //   if (this.props.chartKey in chartsContent) {
  //     chartsContent[this.props.chartKey].elements.map((val, idx) => {
  //
  //       if (val.type === ELEMENT_TYPE.line) {
  //         arr.push(
  //           <Line
  //             key={idx}
  //             name={val.dataName}
  //             painting={this.props.painting}
  //             line={this.state.line}
  //             animate={val.animate}
  //           />
  //         )
  //       }
  //
  //     })
  //   }
  //   // console.log(arr)
  //   return arr
  // }

  render() {
    return (

        <Axis
           chartKey={this.props.chartKey}
           painting={this.props.painting}
           setFunc={this.setFuncState}
        />

    )
  }
}

export default Elements
