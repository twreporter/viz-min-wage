/* eslint-disable no-return-assign */

import PropTypes from 'prop-types'
import React from 'react'
import Row from './Row'
import { colors, fonts } from '../styles/common-variables'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { screen, truncateText } from '../styles/utils'
import styled from 'styled-components'
import { authorsText, footerText } from '../constants/slidesContent'
import Logo from '../static/footer-logo.svg'
import { appConfig } from '../config'

const _ = {
  get,
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(239,239,239,0) 0%, rgba(239,239,239,1) 10%, rgba(239,239,239,1) 100%);
  ${screen.largeThanMobile`
    padding-top: 1.5%;
  `}
`

const EndText = styled.p`
  text-align: left;
  padding: 0.8rem 0;
  a {
    border-bottom: 2px solid ${colors.green};
    transition: all 0.5s;
    &:hover {
      background: ${colors.lightGreen};
    }
  }
`

const OverlayText = styled.div`
  width: 100%;
  padding: 3rem 2rem;
  font-size: ${fonts.size.medium};
  color: ${colors.textMidGrey};
  text-align: center;
  max-width: 37.5rem;
  margin-left: auto;
  margin-right: auto;

  ${screen.mobile`
    padding: 3rem 0.8rem;
    line-height: 1.6;
    font-size: ${fonts.size.base};
  `}

  p {
    margin: 0.2rem;
  }
`

const AuthorBox = styled.div`
  margin-top: 2.5rem;
`

const LinkBox = styled.a`
  margin-top: 1rem;
  transition: all 0.5s ease;
  cursor: pointer;
  display: block;
  text-align: left;

  &:hover {
    transform: translateY(-0.2rem);
  }
`

const LogoLink = styled(LinkBox)`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  padding: 0.8rem;
`

const BannerLink = styled(LinkBox)`
  margin-top: 1rem;
`

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  ${screen.mobile`
    height: 55px;
    margin-bottom: 10px;
  `}
  ${screen.largeThanMobile`
    height: 100px;
    margin-bottom: 20px;
  `}
  ${screen.desktop`
    &:hover {
      box-shadow:  0px 3px 15px 0px rgba(50, 50, 50, 0.2);
    }
  `}
`

const ImgContainer = styled.div`
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  ${screen.mobile`
    width: 55px;
    flex-basis: 55px;
    height: 55px;
  `}
  ${screen.largeThanMobile`
    width: 100px;
    flex-basis: 100px;
    height: 100px;
  `}
`

const Title = styled.h3`
  font-weight: ${fonts.weight.bold};
  letter-spacing: .7px;
  line-height: 1.2;
  margin: 0.1rem 0;
  ${screen.mobile`
    font-size: ${fonts.size.base};
    ${truncateText(1.2, 2, colors.grey)};
  `}
  ${screen.largeThanMobile`
    font-size: ${fonts.size.large};
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

const Img = styled.img`
  object-fit: cover;
  ${screen.mobile`
    width: 55px;
    height: 55px;
  `}
  ${screen.largeThanMobile`
    width: 100px;
    height: 100px;
  `}
`

const Desc = styled.div`
  flex-shrink: 0;
  ${screen.mobile`
    display: none;
  `}
  ${screen.largeThanMobile`
    margin-top: 3px;
    width: 100%;
    color: ${colors.textGrey};
    font-weight: ${fonts.weight.regular};
    letter-spacing: .5px;
    line-height: 1.5;
    font-size: ${fonts.size.medium};
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

const TextContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  background-color: ${colors.grey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${screen.mobile`
    height: 55px;
    padding: 8px 24px 8px 15px;
  `}
  ${screen.largeThanMobile`
    height: 100px;
    padding: 5px 20px;
  `}
`

class Footer extends React.Component {
  render() {
    return (
      <Container innerRef={ref => this.footerWrapper = ref}>
        <Row>
          <OverlayText>
            <EndText dangerouslySetInnerHTML={{ __html: footerText }} />
            <LinkBox href="https://www.twreporter.org/a/review-tsai-labor-policy" target="_blank" rel="noreferrer noopener">
              <ArticleContainer>
                <ImgContainer><Img src={'https://www.twreporter.org/images/20170519135127-8477fe439b38b48305dee77b1a769886-mobile.jpg'} /></ImgContainer>
                <TextContainer>
                  <Title>蔡英文執政一年　勞動政見落實多少？</Title>
                  <Desc className="show-for-medium">根據《報導者》最新更新的「蔡英文勞動政策追蹤平台」，僅有一項政見完全落實。到底，政府的勞動政見落實了多少？為什麼政府說法跟民間感受落差這麼大？</Desc>
                </TextContainer>
              </ArticleContainer>
            </LinkBox>
            <BannerLink href="https://tsai-tracker.twreporter.org/" target="_blank" rel="noreferrer noopener">
              <img alt="蔡英文勞動政策追蹤平台" src={'../static/tsaitracker-banner-twreporter.jpg'} />
            </BannerLink>
            <AuthorBox>
              <p dangerouslySetInnerHTML={{ __html: authorsText }} />
            </AuthorBox>
            <LogoLink href="https://twreporter.org/" target="_blank" rel="noreferrer noopener">
              <Logo />
            </LogoLink>
            <div dangerouslySetInnerHTML={{ __html:
              `<iframe src="https://www.facebook.com/plugins/like.php?href=${encodeURI(appConfig.url)}&width=450&layout=standard&action=like&size=large&show_faces=true&share=true&height=80&appId=299222990098378" width="450" height="80" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>` }}
            />
          </OverlayText>
        </Row>
      </Container>)
  }
}

Footer.defaultProps = {
  sectionIndex: 0,
}

Footer.propTypes = {
  sectionIndex: PropTypes.number,
}

function mapStateToProps(state) {
  return {
    sectionIndex: _.get(state, 'section.sectionIndex', 0),
  }
}

export default connect(mapStateToProps)(Footer)
