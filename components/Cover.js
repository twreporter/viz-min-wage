/* eslint-disable no-return-assign */

import PropTypes from 'prop-types'
import React from 'react'
import anime from 'animejs'
import { colors, fonts } from '../styles/common-variables'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { screen } from '../styles/utils'
import styled from 'styled-components'
import { coverTitle, coverSubTitle, publishedDate } from '../constants/slidesContent'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SalaryTop from '../static/salary-opening-1.svg'
import SalaryBottom from '../static/salary-opening-2.svg'
import Logo from '../static/salary-opening-logo.svg'


const _ = {
  get,
}

const SvgWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;

  svg {
    width: 100%;
    overflow: visible;
  }
`

const Container = styled.div`
  width: 100%;
  height: calc(100% + 40px);
  background: ${colors.white};
  position: absolute;
  top: -40px;
  padding-top: calc(10% + 40px);
  left: 0;
`

const GraphicsWrapper = styled.div`
  max-width: 75rem;
  width: 100%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -20%);
`

const HighlightBar = styled.div`
  position: absolute;
  width: 106%;
  height: 0.5rem;
  bottom: 0;
  left: -3%;
  background: ${colors.lightGreen};
  border-radius: 0.3rem;

  ${screen.largeThanMobile`
    height: 1rem;
    bottom: -0.2rem;
    border-radius: 0.6rem;
  `}
`

const TitleBox = styled.div`
  display: table;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;

  h1 {
    position: relative;
    color: ${colors.textMidGrey};
    line-height: 1.3;
    text-align: center;
    font-size: ${fonts.size.h1};
    font-weight: ${fonts.weight.heavy};
    margin-bottom: 0;

    ${screen.largeThanMobile`
      font-size: ${fonts.size.h1Desktop};
    `}
  }
`

const SubtitleBox = styled.h2`
  color: ${colors.textMidGrey};
  line-height: 1.3;
  text-align: center;
  font-weight: ${fonts.weight.regular};
  font-size: ${fonts.size.subTitle};
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;

  ${screen.largeThanMobile`
    font-size: ${fonts.size.subTitleLarge};
  `}
`

const PublishDate = styled.p`
  text-align: center;
  color: ${colors.textLighter};
  margin-top: -0.6rem;
  font-size: ${fonts.size.xsmall};
  ${screen.largeThanMobile`
    font-size: 15px;
  `}
`

const S1Wrapper = styled(SvgWrapper)`
  max-width: 66%;
  ${screen.largeThanMobile`
    max-height: 16%;
    max-width: 22rem;
  `}
`
const LogoWrapper = styled(SvgWrapper)`
  min-width: 5rem;
  max-width: 8rem;
  min-height: 1rem;
  margin-bottom: 2vh;
`
const S2Wrapper = styled(SvgWrapper)`
  max-width: 90%;
  ${screen.largeThanMobile`
    max-width: 25rem;
  `}
`

class Cover extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { sectionIndex } = this.props
    const nextIndex = nextProps.sectionIndex
    const hasSlided = sectionIndex !== nextIndex
    if (hasSlided && nextIndex === 0) {
      // enter the cover
      anime({ targets: this.coverWrapper,
        opacity: 1,
        delay: 100,
        duration: 600,
        easing: 'easeInOutSine',
      })
    } else if (hasSlided && nextIndex === 1) {
      // leaving the cover
      anime({ targets: this.coverWrapper,
        opacity: 0,
        delay: 50,
        duration: 600,
        easing: 'easeInOutSine',
      })
    }
  }

  render() {
    return (
      <Container innerRef={ref => this.coverWrapper = ref}>
        <GraphicsWrapper>
          <S1Wrapper>
            <SalaryTop />
          </S1Wrapper>
          <TitleBox>
            <ReactCSSTransitionGroup
              transitionName="scale"
              transitionAppear
              transitionLeaveTimeout={0}
            >
              <div className="scale-appear">
                <HighlightBar />
                <h1 itemProp="headline">{ coverTitle }</h1>
              </div>
            </ReactCSSTransitionGroup>
          </TitleBox>
          <ReactCSSTransitionGroup
            transitionName="element"
            transitionAppear
            transitionLeaveTimeout={0}
          >
            <div className="element-appear">
              <SubtitleBox itemProp="alternativeHeadline">
                { coverSubTitle }
              </SubtitleBox>
            </div>
          </ReactCSSTransitionGroup>
          <LogoWrapper>
            <Logo />
            <PublishDate itemProp="datePublished">
              { publishedDate }
            </PublishDate>
          </LogoWrapper>
          <S2Wrapper>
            <SalaryBottom />
          </S2Wrapper>
        </GraphicsWrapper>
      </Container>)
  }
}

Cover.defaultProps = {
  sectionIndex: 0,
}

Cover.propTypes = {
  sectionIndex: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  }
}

export default connect(mapStateToProps)(Cover)
