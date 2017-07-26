import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  max-width: 75rem;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  border: 2px blue solid;
`

const ChartContainer = styled.div`
  position: absolute;
  right: 50%;
  top: 0;
  width: 50%;
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
