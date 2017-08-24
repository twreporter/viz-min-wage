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

const Container = styled.div`
  width: 100%;
`

const Grid = styled.div`
  width: 50%;
  padding: 0 0.1rem;
  display: inline-block;
  vertical-align:top;
  margin-top: 0.5rem;

  p {
    margin-top: 0.3rem;

    ${screen.largeThanMobile`
      margin: 1rem 0.5rem;
    `}
  }

  svg {
    max-width: 100%;
    max-height: 98.5%;
    padding: 1rem;

    ${screen.mobile`
      padding: 0.5rem;
    `}
  }
`

class InnerSlide extends React.Component {
  render() {
    const { content } = this.props
    const { title, text, sideImg } = content
    const TextBox = <ReactMarkdown source={text} />

    return (
      <Row>
        <OverlayText>
          {/* Title */}
          {title ? <ReactMarkdown source={title} /> : null}
          {/* Content */}
          {!sideImg ? TextBox :
          <Container>
            <Grid>
              {sideImg}
            </Grid>
            <Grid>
              {TextBox}
            </Grid>
          </Container>
          }
        </OverlayText>
      </Row>
    )
  }
}

InnerSlide.defaultProps = {
  content: '',
  sectionIndex: 0,
}

InnerSlide.propTypes = {
  content: PropTypes.object,
  sectionIndex: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  }
}

export default connect(mapStateToProps)(InnerSlide)
