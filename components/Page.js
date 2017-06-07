import AddCount from './AddCount'
import Clock from './Clock'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import styled from 'styled-components'

const _ = {
  get,
}

const Content = styled.div`
  width: 100%;
  overflow-x: hidden;
`

class Page extends React.Component {
  render() {
    const { children, title, lastUpdate, light, linkTo } = this.props

    return (
      <Content>
        <div>{this.props.children}</div>
        <h1>{title}</h1>
        <Clock lastUpdate={lastUpdate} light={light} />
        <AddCount />
        <nav>
          <Link href={linkTo}><a>Navigate</a></Link>
        </nav>
      </Content>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node,
}

Page.defaultProps = {
  children: null,
}

function mapStateToProps(state) {
  return {
    title: _.get(state, 'title'),
    lastUpdate: _.get(state, 'lastUpdate'),
    light: _.get(state, 'light'),
    linkTo: _.get(state, 'linkTo'),
  }
}

export default connect(mapStateToProps)(Page)
