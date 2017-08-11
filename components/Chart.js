import styled from 'styled-components'
import { breakpoints, rem } from '../styles/common-variables'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  max-width: ${rem(breakpoints.large.min)};
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  border: 2px blue solid;
`

const ChartContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(0, -50%);
  width: 50%;
  max-width: ${rem(breakpoints.large.min / 2)};
  height: 8rem;
  background-color: red;
`

const Chart = () => (
  <Container>
    <Wrapper>
      <ChartContainer />
    </Wrapper>
  </Container>
  )

export default Chart
