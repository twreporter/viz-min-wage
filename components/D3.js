import React, {Component} from 'react'
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'

class D3Graph extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const faux = this.props.connectFauxDOM('div', 'chart')
    d3.select(faux)
      .append('div')
      .html('Hello World!')
    this.props.animateFauxDOM(800)
  }

  render () {
    return (
      <div>
        <h2>Here is D3</h2>
        <div>
          {this.props.chart}
        </div>
      </div>
    )
  }
}

D3Graph.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(D3Graph)
