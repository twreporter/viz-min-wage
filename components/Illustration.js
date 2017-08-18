/* eslint-disable no-return-assign */

import PropTypes from 'prop-types'
import React from 'react'
import anime from 'animejs'
import { connect } from 'react-redux'
import { get, has, map } from 'lodash'
import { screen } from '../styles/utils'
import illustrationData from '../constants/illustrationData'
import styled from 'styled-components'

const SvgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.5s ease-in-out;
  transform: scale(0.8);
  opacity: 0;

  svg {
    max-width: 100%;
    max-height: 100%;
  }
`

const _ = {
  get,
  has,
  map,
}

const cssSettings = {
  show: {
    opacity: 1,
    transform: 'scale(1)',
  },
  hide: {
    opacity: 0,
    transform: 'scale(0.8)',
  },
}

class Illustration extends React.Component {
  render() {
    const { sectionKey } = this.props
    const SvgIllustrations = _.map(illustrationData, (svg, key) => {
      const isShown = sectionKey === key
      return (
        <SvgWrapper key={`i-${key}`} style={isShown ? cssSettings.show : cssSettings.hide}>
          {svg.component}
        </SvgWrapper>
      )
    })

    return (
      <div>
        {SvgIllustrations}
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
