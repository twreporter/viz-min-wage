import { initStore } from '../store'

import Chart from '../components/Chart'
import Head from 'next/head'
import OverlayText from '../components/OverlayText'
import Page from '../components/Page'
import PropTypes from 'prop-types'
import React from 'react'
import Row from '../components/Row'
import Slide from '../components/Slide'
import { appConfig } from '../config'
import { debounce } from 'lodash'
import { detectWindowSize } from '../actions/section'
import withRedux from 'next-redux-wrapper'

const _ = {
  debounce,
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
        <Chart />
        <Slide>
          <Row>
            <OverlayText>
              中華民國（臺灣）的基本工資制度依據《勞動基準法》及《基本工資審議辦法》，於每年第三季由勞動部邀請各界人士組成「基本工資審議委員會」進行審議，如會中決議調整，則將結果交由行政院核定公告後實施。 現行基本工資為月薪新臺幣21,009元、時薪新臺幣133元，在2016年9月19日由審議委員會通過，自2017年1月1日實施。
            </OverlayText>
          </Row>
        </Slide>
        <Slide>
          <Row>
            <OverlayText>
              2012年基本工資審議委員會於8月9日召開委員會議，時值遭逢歐債危機、大陸經濟成長減緩，導致臺灣出口產值下滑，但物價卻仍持續上升，為此次審議增添爭議性，工商團體亦是事隔3年後再次反對調整基本工資[13]。原決議基本工資調幅為1.42％（月薪制），為每月19,047元新臺幣，每小時109元新臺幣[14]，但此後上呈至行政院時，遭到院會以經濟前景不明為由拒絕提案
            </OverlayText>
          </Row>
        </Slide>
        <Slide>
          <Row>
            <OverlayText>
              提出經濟成長率須連兩季大於3%，以及失業率低於4%的兩項帶條件。[15]而時任勞委會主委王如玄，也因此請辭獲准。
            </OverlayText>
          </Row>
        </Slide>
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

export default withRedux(initStore, null, { detectWindowSize })(Home)
