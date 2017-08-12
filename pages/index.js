/* eslint-disable no-return-assign */

import anime from 'animejs'
import Content from '../components/Content'
import Head from 'next/head'
import Page from '../components/Page'
import PropTypes from 'prop-types'
import React from 'react'
import { appConfig } from '../config'
import { debounce, get } from 'lodash'
import { detectWindowSize } from '../actions/section'
import { initStore } from '../store'
import { screen } from '../styles/utils'
import styled from 'styled-components'
import withRedux from 'next-redux-wrapper'

const _ = {
  debounce,
  get,
}

const debounceTime = {
  window: {
    threshold: 60,
    maxWait: 180,
  },
  scroll: {
    threshold: 30,
    maxWait: 60,
  },
}

const ContentWrapper = styled.div`
  ${screen.mobile`
    position: relative;
    height: 100vh;
    overflow: hidden;
  `}
`

class Home extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer }
  }

  constructor(props) {
    super(props)

    this.debouncedBrowserResize = _.debounce(() => {
      this.props.detectWindowSize()
    }, debounceTime.window.threshold, { maxWait: debounceTime.window.maxWait })
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedBrowserResize)
    this.props.detectWindowSize()

    // test the content move effect
    anime({ targets: this.contentWrapper,
      top: '-500px',
      opacity: 0.2,
      delay: 1000,
    }).finished.then(() => {
      console.log('finished')
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <Page title="Home Page" linkTo="/other">
        <Head>
          <title>{appConfig.title}</title>
        </Head>
        <ContentWrapper>
          <h1 ref={ref => this.contentWrapper = ref}>test test</h1>
          <Content />
        </ContentWrapper>
      </Page>
    )
  }
}

Home.defaultProps = {
  detectWindowSize: null,
}

Home.propTypes = {
  detectWindowSize: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    windowWidth: _.get(state, 'section.windowWidth', 600),
    windowHeight: _.get(state, 'section.windowHeight', 600),
  }
}

export default withRedux(initStore, mapStateToProps, { detectWindowSize })(Home)
