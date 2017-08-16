import styled from 'styled-components'
import { screen } from '../styles/utils'

const Slide = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  ${screen.mobile`
    height: 100%;
  `}
`
export default Slide
