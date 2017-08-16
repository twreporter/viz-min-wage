import styled from 'styled-components'
import { screen } from '../styles/utils'

const Slide = styled.div`
  width: 100%;
  height: 100%;
  border: 3px red solid;
  ${screen.mobile`
    height: 100%;
  `}
`
export default Slide
