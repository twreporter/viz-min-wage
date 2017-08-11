import { addCount, initStore, serverRenderClock, startClock } from '../store'

import Head from 'next/head'
import Page from '../components/Page'
import React from 'react'
import { appConfig } from '../config'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import OverlayText from '../components/OverlayText'
import Slide from '../components/Slide'
import Row from '../components/Row'
import Chart from '../components/Chart'

class Counter extends React.Component {
  static getInitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer))
    store.dispatch(addCount())

    return { isServer }
  }

  componentDidMount() {
    this.timer = this.props.startClock()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <Page title="Index Page" linkTo="/other">
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


const mapDispatchToProps = dispatch => ({
  addCount: bindActionCreators(addCount, dispatch),
  startClock: bindActionCreators(startClock, dispatch),
})

export default withRedux(initStore, null, mapDispatchToProps)(Counter)
