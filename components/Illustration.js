/* eslint-disable no-return-assign */

import PropTypes from 'prop-types'
import React from 'react'
import anime from 'animejs'
import { colors, fonts } from '../styles/common-variables'
import { connect } from 'react-redux'
import { get, has } from 'lodash'
import { screen } from '../styles/utils'
import illustrationData from '../constants/illustrationData'
import styled from 'styled-components'


const _ = {
  get,
  has,
}

class Illustration extends React.Component {
  render() {
    const { sectionKey } = this.props
    const SvgComponent = _.get(illustrationData, `${sectionKey}.component`, null)

    return (
      <div>
        {SvgComponent}
      </div>
    )
  }
}

Illustration.defaultProps = {
  sectionKey: '',
}

Illustration.propTypes = {
  sectionKey: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    sectionKey: _.get(state, 'section.sectionKey', 0),
  }
}

export default connect(mapStateToProps)(Illustration)
