/* eslint-disable no-return-assign */

import { debounce, get } from 'lodash'

import Chart from '../components/Chart'
import Content from '../components/Content'
import Head from 'next/head'
import Page from '../components/Page'
import PropTypes from 'prop-types'
import React from 'react'
import Swipeable from 'react-swipeable'
import anime from 'animejs'
import { appConfig, slideConfig } from '../config'
import { detectWindowSize, setSectionIndex } from '../actions/section'
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

const swipeConfig = {
  threshold: 0.1,   // 10% of the window height
  duration: 800,    // animation duration (ms)
}

const OuterCropper = styled.div`
  ${screen.mobile`
    position: relative;
    height: 100vh;
    overflow: hidden;
  `}
`

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

class Home extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer }
  }

  constructor(props) {
    super(props)
    this.state = {
      topY: 0,
      deltaY: 0,
      isMoving: false,  // if the content is moving automatically after users triggered a swipe
    }

    this.debouncedBrowserResize = _.debounce(() => {
      this.props.detectWindowSize()
    }, debounceTime.window.threshold, { maxWait: debounceTime.window.maxWait })
    this._swiping = this._swiping.bind(this)
    this._swiped = this._swiped.bind(this)
    this._onSwipeNext = this._onSwipeNext.bind(this)
    this._onSwipeBack = this._onSwipeBack.bind(this)
    this._getSwipeThreshold = this._getSwipeThreshold.bind(this)
    this._moveContentByY = this._moveContentByY.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedBrowserResize)
    this.props.detectWindowSize()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  _getSwipeThreshold() {
    return swipeConfig.threshold * this.props.windowHeight
  }

  // on swiping
  _swiping(e, deltaX, deltaY, absX, absY, velocity) {
    // console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    e.preventDefault()      // disable Chrome's pull to refresh feature
    if (!this.state.isMoving) {
      this.setState({ deltaY })
      if (Math.abs(deltaY) > this._getSwipeThreshold()) {
        this._onSwipeNext()
      }
    }
  }

  // on swipe stopped
  _swiped(e, deltaX, deltaY, isFlick, velocity) {
    // console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
    e.preventDefault()       // disable Chrome's pull to refresh feature
    if (!this.state.isMoving) {
      if (Math.abs(deltaY) > this._getSwipeThreshold()) {
        this._onSwipeNext()
      } else {
        // bounce back to the previous position
        this._onSwipeBack()
      }
    }
  }

  // a viable swipe: move into next section
  _onSwipeNext() {
    this.setState({ isMoving: true })
    const { sectionIndex, windowHeight } = this.props
    const { deltaY } = this.state
    let nextIndex = (deltaY > 0) ? sectionIndex + 1 : sectionIndex - 1
    if (nextIndex < 0 || nextIndex >= slideConfig.totalCnt) {
      nextIndex = sectionIndex
    }

    const newTop = -1 * nextIndex * windowHeight
    this.props.setSectionIndex(nextIndex)
    this._moveContentByY(newTop)
  }

  // not a viable swipe: move back to the previous position
  _onSwipeBack() {
    this.setState({ isMoving: true })
    const { sectionIndex, windowHeight } = this.props
    const newTop = -1 * sectionIndex * windowHeight
    this._moveContentByY(newTop)
  }

  _moveContentByY(newTop) {
    anime({ targets: this.contentWrapper,
      top: newTop,
      duration: swipeConfig.duration,
      easing: 'easeInOutSine',
      delay: 30,
    }).finished.then(() => {
      this.setState({ isMoving: false, topY: newTop, deltaY: 0 })
    })
  }

  render() {
    const { topY, deltaY } = this.state

    return (
      <Page title="Home Page" linkTo="/other">
        <Head>
          <title>{appConfig.title}</title>
        </Head>
        <OuterCropper>
          <Chart />
          <Swipeable
            onSwiping={this._swiping}
            onSwiped={this._swiped}
            style={{ position: 'fixed', width: '100%', height: '100%' }}
          >
            <Wrapper innerRef={ref => this.contentWrapper = ref} style={{ top: topY - deltaY }}>
              <Content />
            </Wrapper>
          </Swipeable>
        </OuterCropper>
      </Page>
    )
  }
}

Home.defaultProps = {
  detectWindowSize: null,
  setSectionIndex: null,
  windowHeight: 600,
  sectionIndex: 0,
}

Home.propTypes = {
  detectWindowSize: PropTypes.func,
  setSectionIndex: PropTypes.func,
  windowHeight: PropTypes.number,
  sectionIndex: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    windowWidth: _.get(state, 'section.windowWidth', 600),
    windowHeight: _.get(state, 'section.windowHeight', 600),
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  }
}

export default withRedux(initStore, mapStateToProps, { detectWindowSize, setSectionIndex })(Home)
