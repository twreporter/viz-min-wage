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

const _ = {
  get,
}

const Container = styled.div`
  width: 100%;
  height: 115%;
  background: ${colors.dark};
  position: absolute;
  top: -15%;
  padding-top: 25%;
  left: 0;
`
const TitleBox = styled.h1`
  padding: 1.5rem;
  color: ${colors.white};
  line-height: 1.3;
  text-align: center;
  font-size: ${fonts.size.h1};

  ${screen.largeThanMobile`
    font-size: ${fonts.size.h1Desktop};
  `}
`

class Footer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { sectionIndex } = this.props
    const nextIndex = nextProps.sectionIndex
    const hasSlided = sectionIndex !== nextIndex
    if (hasSlided && nextIndex === 0) {
      // enter the footer
      anime({ targets: this.footerWrapper,
        opacity: 1,
        delay: 100,
        duration: 600,
        easing: 'easeInOutSine',
      })
    } else if (hasSlided && nextIndex === 1) {
      // leaving the footer
      anime({ targets: this.footerWrapper,
        opacity: 0,
        delay: 50,
        duration: 600,
        easing: 'easeInOutSine',
      })
    }
  }

  render() {
    const { title } = this.props
    return (
      <Container innerRef={ref => this.footerWrapper = ref}>
        <Row>
          <TitleBox>
            { title }
          </TitleBox>
        </Row>
      </Container>)
  }
}

Footer.defaultProps = {
  title: '',
  sectionIndex: 0,
}

Footer.propTypes = {
  title: PropTypes.string,
  sectionIndex: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  }
}

export default connect(mapStateToProps)(Footer)
