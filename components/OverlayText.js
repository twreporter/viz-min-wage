import styled from 'styled-components'
import { fonts, colors, breakpoints} from '../styles/common-variables'
import { screen } from '../styles/utils'

const OverlayText = styled.div`
  position: absolute;
  left: 50%;
  padding: 3rem 5.2% 10% 2.5%;
  top: 5vh;
  font-size: ${fonts.size.large};
  color: ${colors.textGrey};

  ${screen.mobile`
    left: 0;
    padding: 0.6rem 1rem 2rem 1rem;
    top: 50%;
    height: 50%;
    line-height: 1.6;
    font-size: ${fonts.size.medium};
    letter-spacing: 0.25px;
  `}

  ${screen.iphone5`
    font-size: ${fonts.size.base};
    line-height: 1.45;
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
    margin-top: 1.2rem;

    ${screen.mobile`
      margin-top: 0.28rem;
    `}

    ${screen.iphone5`
      font-size: ${fonts.size.base};
      line-height: 0.2rem;
    `}
  }

  h4 {
    text-align: center;
    color: ${colors.textLightGrey};
  }

  p {
    ${screen.mobile`
      margin: 0.25rem 0;
    `}

    margin: 1.2rem 0;
    font-weight: ${fonts.weight.normal};

    a {
      border-bottom: 2px solid ${colors.green};
      transition: all 0.5s;
      &:hover {
        background: ${colors.lightGreen};
      }
    }
  }

  u {
    text-decoration: none;
    background-size: -0.05rem 1rem;
    box-shadow:
      inset 0 -0.725rem ${colors.lightPrimary},
      inset 0 -0.75rem ${colors.bgColor};
    display: inline;
  }

  small {
    color: ${colors.textLightGrey};
    padding-top: 4.5rem;

    ${screen.mobile`
      padding-top: 2.5rem;
      line-height: 1.3;
    `}
  }
`
export default OverlayText
