import { debounce } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slide from './Slide'
import Cover from './Cover'
import Footer from './Footer'
import InnerSlide from './InnerSlide'
import { connect } from 'react-redux'
import { screen } from '../styles/utils'
import { detectWindowSize } from '../actions/section'
import { debounceTime } from '../config'
import { slidesContent, slideBeginingKey, slideEndingKey } from '../constants/slidesContent'

const _ = {
  debounce,
}

const Wrapper = styled.div`
  height: 100%;
  ${screen.largeThanMobile`
    overflow-y: hidden;
  `}
`

class Content extends React.Component {
  constructor(props) {
    super(props)
    this._onWindowResize = this._onWindowResize.bind(this)
    this.debouncedBrowserResize = _.debounce(this._onWindowResize, debounceTime.window.threshold, { maxWait: debounceTime.window.maxWait })
  }

  componentDidMount() {
    this._onWindowResize()
    setTimeout(this._onWindowResize, 800)
    window.addEventListener('resize', this.debouncedBrowserResize)
  }

  _onWindowResize() {
    if (this.coverContainer) {
      this.props.detectWindowSize(this.coverContainer.clientWidth, this.coverContainer.clientHeight)
    }
  }

  render() {
    const MainSlides = slidesContent.map((slide, index) =>
      (<Slide key={slide.key} index={index + 1}>
        <InnerSlide content={slide} />
      </Slide>),
    )

    return (
      <Wrapper>
        <Slide key={slideBeginingKey} index={0} innerRef={ref => this.coverContainer = ref}>
          <Cover />
        </Slide>
        { MainSlides }
        <Slide key={slideEndingKey} index={slidesContent.length + 1}>
          <Footer />
        </Slide>
      </Wrapper>
    )
  }

}

Content.defaultProps = {
  detectWindowSize: null,
}

Content.propTypes = {
  detectWindowSize: PropTypes.func,
}

export default connect(null, { detectWindowSize })(Content)
