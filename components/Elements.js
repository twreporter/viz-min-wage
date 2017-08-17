import React, { Component } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { connect } from 'react-redux'

import { slidesContent } from '../constants/slidesContent'
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

    this.setElementArr = this.setElementArr.bind(this)
    this.setFuncState = this.setFuncState.bind(this)

    this.state = {
      line: undefined,
      xScale: undefined
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

  setElementArr(painting, line) {
    let arr = []
    if ((this.state.line!==undefined) && (this.state.xScale!==undefined)) {

      slidesContent.map((val, idx) => {
        if (val.key === this.props.chartKey) {
          val.elements.map((ele, index) => {
            if (ele.type === ELEMENT_TYPE.line) {
              arr.push(
                <Line
                  key={idx}
                  name={ele.dataName}
                  painting={painting}
                  line={line}
                  animate={ele.animate}
                />
              )
            }

            if (ele.type === ELEMENT_TYPE.marker) {
              arr.push(
                <Marker
                  key={idx}
                  pos={ele.pos}
                />
              )
            }
          })
        }
      })
    }

    return arr
  }

  render() {
    let range = {}
    slidesContent.map((val, idx) => {
      if (val.key === this.props.chartKey) {
        range = val.range
      }
    })
    return (
      <Axis
        painting={this.props.painting}
        range={range}
        setFunc={this.setFuncState}
      >
        { this.setElementArr(this.props.painting, this.state.line) }
      </Axis>
    )
  }
}

export default Elements
