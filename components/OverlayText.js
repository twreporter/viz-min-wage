import styled from 'styled-components'
import { fonts, colors } from '../styles/common-variables'
import { screen } from '../styles/utils'

const OverlayText = styled.div`
  position: absolute;
  left: 50%;
  padding: 3rem 1.9rem 2rem 2.1rem;
  top: 5vh;
  font-size: ${fonts.size.large};
  color: ${colors.textGrey};

  ${screen.mobile`
    left: 0;
    padding: 0.5rem 1rem 2rem 1rem;
    top: 50%;
    height: 50%;
    line-height: 1.56;
    font-size: ${fonts.size.medium};
  `}

  h2 {
    font-size: ${fonts.size.h2Large};
    margin: 0.5rem 0 0 0;
    text-align: center;

    ${screen.mobile`
      font-size: ${fonts.size.h2};
    `}
  }

  h2 + p {
    margin-top: 0.3rem;
  }

  h4 {
    text-align: center;
    color: ${colors.textLightGrey};
  }

  p {
    ${screen.mobile`
      margin: 0.25rem 0;
    `}
    margin: 0.7rem 0;
  }

  u {
    text-decoration: none;
    background-size: -0.05rem 1rem;
    box-shadow:
      inset 0 -0.675rem ${colors.lightPrimary},
      inset 0 -0.7rem ${colors.bgColor};
    display: inline;
  }
`
export default OverlayText
