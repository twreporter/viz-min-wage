import styled, { keyframes } from 'styled-components'
import { colors } from '../styles/common-variables'

const Rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const Wrapper = styled.div`
  position: fixed;
  height: 2.8rem;
  width: 2.8rem;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1005;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 2px 1px 13px rgba(0, 0, 0, 0.25);
`

const Spinner = styled.div`
  height: 2rem;
  width: 2rem;
  animation: ${Rotate} 0.8s infinite linear;
  border: 4px solid ${colors.primaryColor};
  border-right-color: transparent;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
`

const Loading = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
)

export default Loading
