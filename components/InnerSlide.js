/* eslint-disable no-return-assign */

import PropTypes from 'prop-types'
import React from 'react'
import Row from './Row'
import anime from 'animejs'
import { colors, fonts } from '../styles/common-variables'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { screen } from '../styles/utils'
import styled from 'styled-components'
import OverlayText from './OverlayText'
import ReactMarkdown from 'react-markdown'

const _ = {
  get,
}

class InnerSlide extends React.Component {
  render() {
    const { text } = this.props
    return (
      <Row>
        <OverlayText>
          <ReactMarkdown source={text} />
        </OverlayText>
      </Row>
    )
  }
}

InnerSlide.defaultProps = {
  text: '',
  sectionIndex: 0,
}

InnerSlide.propTypes = {
  text: PropTypes.string,
  sectionIndex: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  }
}

export default connect(mapStateToProps)(InnerSlide)
