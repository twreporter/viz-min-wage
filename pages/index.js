/* eslint-disable no-return-assign */

import { debounce, get } from 'lodash'

import Chart from '../components/Chart'
import Loading from '../components/Loading'
import Content from '../components/Content'
import ProgressBar from '../components/ProgressBar'
import Head from 'next/head'
import Page from '../components/Page'
import PropTypes from 'prop-types'
import React from 'react'
import Swipeable from 'react-swipeable'
import anime from 'animejs'
import { appConfig, scrollConfig, debounceTime, swipeConfig } from '../config'
import { slidesCnt } from '../constants/slidesContent'
import { setSectionIndex } from '../actions/section'
import { initStore } from '../store'
import { screen } from '../styles/utils'
import styled from 'styled-components'
import withRedux from 'next-redux-wrapper'

const _ = {
  debounce,
  get,
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
  ${screen.mobile`
    height: 100%;
  `}
`

class Home extends React.Component {
  static getInitialProps({ isServer }) {
    return { isServer }
  }

  constructor(props) {
    super(props)
    this.state = {
      topY: 0,
      deltaY: 0,
      isMoving: false,  // if the content is moving automatically after users triggered a swipe
      percent: 0,       // track the reading progress
      isLoaded: false,
    }

    this._swiping = this._swiping.bind(this)
    this._swiped = this._swiped.bind(this)
    this._onSwipeNext = this._onSwipeNext.bind(this)
    this._onSwipeBack = this._onSwipeBack.bind(this)
    this._getSwipeThreshold = this._getSwipeThreshold.bind(this)
    this._moveContentByY = this._moveContentByY.bind(this)
    this._onScroll = this._onScroll.bind(this)
    this.debouncedOnScroll = _.debounce(this._onScroll, debounceTime.scroll.threshold, { maxWait: debounceTime.scroll.maxWait })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debouncedOnScroll)
    this.setState({ isLoaded: true })

    // send GA Tracking
    if (ga) {
      ga('send', {
        hitType: 'event',
        eventCategory: `${appConfig.projectName}-Viewing`,
        eventAction: 'Section',
        eventLabel: 'section-cover',
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  _getSwipeThreshold() {
    return swipeConfig.threshold * this.props.windowHeight
  }

  // on swiping
  _swiping(e, deltaX, deltaY) {
    // console.log("You're Swiping...", e, deltaX, deltaY)
    e.preventDefault()      // disable Chrome's pull to refresh feature
    if (!this.state.isMoving) {
      this.setState({ deltaY })
    }
  }

  // on swipe stopped
  _swiped(e, deltaX, deltaY) {
    // console.log("You Swiped...", e, deltaX, deltaY)
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

  _onScroll() {
    const { sectionIndex, windowHeight } = this.props
    const doc = document.documentElement
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    const cIndex = Math.floor((top / windowHeight) + scrollConfig.offset)
    const pageHeight = document.body.scrollHeight
    const percent = Math.round((100 * top) / (pageHeight - windowHeight))
    this.setState({ percent })
    if (cIndex !== sectionIndex) {
      this.props.setSectionIndex(cIndex)
    }
  }

  // a viable swipe: move into next section
  _onSwipeNext() {
    this.setState({ isMoving: true })
    const { sectionIndex, windowHeight } = this.props
    const { deltaY } = this.state
    let nextIndex = (deltaY > 0) ? sectionIndex + 1 : sectionIndex - 1
    if (nextIndex < 0 || nextIndex >= slidesCnt) {
      nextIndex = sectionIndex
    }

    const newTop = -1 * nextIndex * windowHeight
    const percent = Math.round((100 * nextIndex) / (slidesCnt - 1))
    this.props.setSectionIndex(nextIndex)
    this.setState({ percent })
    this._moveContentByY(newTop, swipeConfig.duration, 'easeInOutQuart')
  }

  // not a viable swipe: move back to the previous position
  _onSwipeBack() {
    this.setState({ isMoving: true })
    const { sectionIndex, windowHeight } = this.props
    const newTop = -1 * sectionIndex * windowHeight
    this._moveContentByY(newTop, swipeConfig.sDuration, 'easeInOutSine')
  }

  _moveContentByY(newTop, duration, easeOption) {
    if (this.contentWrapper) {
      anime({ targets: this.contentWrapper,
        top: newTop,
        duration,
        easing: easeOption,
      }).finished.then(() => {
        this.setState({ isMoving: false, topY: newTop, deltaY: 0 })
      })
    }
  }

  render() {
    const { topY, deltaY, percent, isLoaded } = this.state
    const { isMobile } = this.props
    const LoadingIcon = isLoaded ? null : <Loading />
    const ogImgUrl = `${appConfig.url}/static/home_og_img.jpg`

    return (
      <Page title="Home Page" linkTo="/other">
        <Head>
          <title>{appConfig.title}</title>
          <link rel="canonical" href={appConfig.url} />
          <meta name="description" content={appConfig.description} />
          <meta property="og:title" content={appConfig.title} />
          <meta property="og:description" content={appConfig.description} />
          <meta property="og:url" content={appConfig.url} />
          <meta property="og:image" content={ogImgUrl} />
          <meta name="twitter:image" content={ogImgUrl} />
          <meta name="twitter:title" content={appConfig.title} />
          <meta name="twitter:description" content={appConfig.description} />
        </Head>
        <OuterCropper>
          { LoadingIcon }
          { !isMobile ? <Chart /> : null }
          {
            isMobile ? (<Swipeable
              onSwiping={this._swiping}
              onSwiped={this._swiped}
              style={{ position: 'fixed', width: '100%', height: '100%' }}
            >
              <Wrapper innerRef={ref => this.contentWrapper = ref} style={{ top: topY - deltaY }}>
                <Content />
                <Chart />
              </Wrapper>
            </Swipeable>) : <Content />
          }
        </OuterCropper>
        <ProgressBar percent={percent} />
      </Page>
    )
  }
}

Home.defaultProps = {
  isMobile: false,
  setSectionIndex: null,
  windowHeight: 600,
  sectionIndex: 0,
}

Home.propTypes = {
  isMobile: PropTypes.bool,
  setSectionIndex: PropTypes.func,
  windowHeight: PropTypes.number,
  sectionIndex: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    isMobile: _.get(state, 'section.isMobile', false),
    windowWidth: _.get(state, 'section.windowWidth', 600),
    windowHeight: _.get(state, 'section.windowHeight', 600),
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  }
}

export default withRedux(initStore, mapStateToProps, { setSectionIndex })(Home)
