import React, { Component } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { connect } from 'react-redux'

import { ELEMENT_TYPE } from '../constants/chart-types'
import { scripts } from './Scripts'
import Line from './Line'
import Marker from './Marker'

const _ = {
  get,
}

class Elements extends Component {
  constructor(props) {
    super(props)

    this.showElements = this.showElements.bind(this)

    this.state = {
      elementArr: [],
      elementNames: [],
    }
  }

  componentDidMount() {
    this.showElements(this.props.sectionIndex,
                      this.props.parent,
                      this.props.line,
                      this.props.painting,
                      this.props.xScale)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sectionIndex !== nextProps.sectionIndex) {
      this.state.elementNames.map((name) => {
        d3.select(`#${name}`).remove()
      })
      this.setState({ elementArr: [], elementNames: [] })

      this.showElements(nextProps.sectionIndex,
                        nextProps.parent,
                        nextProps.line,
                        nextProps.painting,
                        nextProps.xScale)
    }
  }

  showElements(index, scetionName, line, painting, xScale) {
    const script = scripts[scetionName]
    const section = `sectionIndex${index}`
    const names = []
    const arr = []

    if (section in script) {
      script[section].map((element, idx) => {
        if (element.type === ELEMENT_TYPE.line) {
          arr.push(
            <Line
              key={idx}
              name={element.dataName}
              painting={painting}
              line={line}
              animate={element.animate}
            />
          )
          names.push(element.dataName)
        }
        if (element.type === ELEMENT_TYPE.marker) {
          arr.push(
            <Marker
              key={idx}
              painting={painting}
              xScale={xScale}
              pos={element.pos}
            />
          )
          names.push(`marker${element.pos.start}`)
        }
      })

      this.setState({ elementArr: arr, elementNames: names })
    }
  }

  render() {
    return (
      <div>
        {this.state.elementArr}
      </div>
    )
  }
}

Elements.propTypes = {
  line: PropTypes.func,
  sectionIndex: PropTypes.number,
  parent: PropTypes.string,
  xScale: PropTypes.func,
}

Elements.defaultProps = {
  sectionIndex: 0,
  line: undefined,
  parent: '',
  xScale: undefined,
}

function mapStateToProps(state) {
  return ({
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  })
}

export default connect(mapStateToProps)(Elements)
