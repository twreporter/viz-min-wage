import { addCount, initStore, serverRenderClock, startClock } from '../store'

import Head from 'next/head'
import Page from '../components/Page'
import React from 'react'
import { appConfig } from '../config'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import D3Graph from '../components/D3'


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
        <div>testtest</div>
        <D3Graph />
      </Page>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  addCount: bindActionCreators(addCount, dispatch),
  startClock: bindActionCreators(startClock, dispatch),
})

export default withRedux(initStore, null, mapDispatchToProps)(Counter)
