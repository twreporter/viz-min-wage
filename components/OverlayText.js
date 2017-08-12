import styled from 'styled-components'
import { fonts } from '../styles/common-variables'
import { screen } from '../styles/utils'

const OverlayText = styled.div`
  position: absolute;
  left: 50%;
  padding: 3rem 2rem 2rem 1rem;
  top: 10vh;
  font-size: ${fonts.size.large};

  ${screen.mobile`
    left: 0;
    padding: 0.5rem 1rem 2rem 1rem;
    top: 50vh;
    height: 50vh;
    line-height: 1.65;
    font-size: ${fonts.size.medium};
  `}
`
export default OverlayText
