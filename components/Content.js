import React from 'react'
import styled from 'styled-components'
import Slide from './Slide'
import Cover from './Cover'
import Footer from './Footer'
import InnerSlide from './InnerSlide'
import { screen } from '../styles/utils'
import { slidesContent, slideBeginingKey, slideEndingKey } from '../constants/slidesContent'

const Wrapper = styled.div`
  height: 100%;
  ${screen.largeThanMobile`
    overflow-y: hidden;
  `}
`

class Content extends React.Component {
  render() {
    const MainSlides = slidesContent.map((slide, index) =>
      (<Slide key={slide.key} index={index + 1}>
        <InnerSlide content={slide} />
      </Slide>),
    )

    return (
      <Wrapper>
        <Slide key={slideBeginingKey} index={0}>
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

export default Content
