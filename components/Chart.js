/* eslint-disable no-return-assign */
import React from 'react'
import PropTypes from 'prop-types'
import { breakpoints } from '../styles/common-variables'
import { rem, screen } from '../styles/utils'
import { connect } from 'react-redux'
import { get, has } from 'lodash'
import illustrationData from '../constants/illustrationData'
import { chartsContent } from '../constants/chartsContent'
import styled from 'styled-components'
import Illustration from './Illustration'
import D3Graph from './D3Graph'
import { scaleInAnimation } from '../styles/common-variables'

const _ = {
  get,
  has,
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  max-width: ${rem(breakpoints.large.min)};
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ChartOuter = styled.div`
  position: absolute;
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

  > div {
    position: relative;
    width: 100%;
    height: 100%;
  }
`

const AnimationContainer = styled.div`
  width: 100%;
  height: 100%;
  transition: ${scaleInAnimation.transition};
  transform: ${scaleInAnimation.hide.transform};
  opacity: ${scaleInAnimation.hide.opacity};

  ${screen.mobile`
    background: linear-gradient(to bottom, rgba(239,239,239,1) 0%, rgba(239,239,239,0.88) 80%, rgba(239,239,239,0) 100%);
  `}
`

class Chart extends React.Component {
  render() {
    const { sectionKey } = this.props
    const isIllustration = _.has(illustrationData, sectionKey)
    const isD3Graph = _.has(chartsContent, sectionKey)

    return (
      <Container>
        <ChartContainer>
          <ChartOuter>
            <AnimationContainer style={isIllustration ? scaleInAnimation.show : scaleInAnimation.hide}>
              <Illustration />
            </AnimationContainer>
          </ChartOuter>
          <ChartOuter innerRef={comp => this.containerRef = comp}>
            <AnimationContainer style={isD3Graph ? scaleInAnimation.show : scaleInAnimation.hide}>
              <D3Graph containerRef={this.containerRef} />
            </AnimationContainer>
          </ChartOuter>
        </ChartContainer>
      </Container>
    )
  }
}


function mapStateToProps(state) {
  return {
    sectionKey: _.get(state, 'section.sectionKey', 0),
  }
}

Chart.defaultProps = {
  sectionKey: '',
}

Chart.propTypes = {
  sectionKey: PropTypes.string,
}

export default connect(mapStateToProps)(Chart)
