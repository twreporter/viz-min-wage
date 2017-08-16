import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../styles/common-variables'

const ProgressContainer = styled.div`
  width: 100%;
  height: 0.45rem;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.35);
  background: ${colors.white};
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.8;
`
const ProgressIndicator = styled.div`
  height: 0.42rem;
  background: ${colors.red};
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
`

const ProgressBar = props => (
  <ProgressContainer>
    <ProgressIndicator style={{ width: `${props.percent}%` }} />
  </ProgressContainer>
)

ProgressBar.defaultProps = {
  percent: 0,
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
}

export default ProgressBar
