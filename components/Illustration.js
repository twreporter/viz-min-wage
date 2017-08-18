/* eslint-disable no-return-assign */

import PropTypes from 'prop-types'
import React from 'react'
import anime from 'animejs'
import { connect } from 'react-redux'
import { get, has, map } from 'lodash'
import { scaleInAnimation } from '../styles/common-variables'
import illustrationData from '../constants/illustrationData'
import styled from 'styled-components'

const SvgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: ${scaleInAnimation.transition};
  transform: ${scaleInAnimation.hide.transform};
  opacity: ${scaleInAnimation.hide.opacity};

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

class Illustration extends React.Component {
  render() {
    const { sectionKey } = this.props
    const SvgIllustrations = _.map(illustrationData, (svg, key) => {
      const isShown = sectionKey === key
      return (
        <SvgWrapper key={`i-${key}`} style={isShown ? scaleInAnimation.show : scaleInAnimation.hide}>
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
