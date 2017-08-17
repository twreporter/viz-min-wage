import React from 'react'
import styled from 'styled-components'
import Slide from './Slide'
import Cover from './Cover'
import Footer from './Footer'
import InnerSlide from './InnerSlide'
import { slidesContent, coverTitle } from '../constants/slidesContent'

const Wrapper = styled.div`
  height: 100%;
`

class Content extends React.Component {
  render() {
    const MainSlides = slidesContent.map((slide, index) =>
      (<Slide key={slide.key} index={index + 1}>
        <InnerSlide text={slide.text} />
      </Slide>),
    )

    return (
      <Wrapper>
        <Slide key={'cover'} index={0}>
          <Cover title={coverTitle} />
        </Slide>
        { MainSlides }
        <Slide key={'footer'} index={slidesContent.length + 1}>
          <Footer title={'22K夠用嗎？基本工資 12 年凍漲的真相'} />
        </Slide>
      </Wrapper>
    )
  }

}

export default Content
