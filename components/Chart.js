import styled from 'styled-components'
import { breakpoints } from '../styles/common-variables'
import { rem, screen } from '../styles/utils'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  position: relative;
  max-width: ${rem(breakpoints.large.min)};
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`

const ChartContainer = styled.div`
  position: absolute;
  border: 2px solid #39CCCC;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 50%;

  ${screen.largeThanMobile`
    top: 50%;
    right: 50%;
    transform: translate(0, -50%);
    width: 50%;
    height: 50vh;
    min-height: 16rem;
    max-width: ${rem(breakpoints.large.min / 2)};
  `}
`

const Chart = () => (
  <Container>
    <Wrapper>
      <ChartContainer />
    </Wrapper>
  </Container>
  )

export default Chart
