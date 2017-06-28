import React, { Component, PropTypes } from 'react'
import isNode from 'detect-node'

class Canvas extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  /**
     * Render our container that will store our PixiJS game canvas. Store the ref
     **/
  render() {
    return <div className="game-canvas-container" ref="gameCanvas" />
  }
}


Canvas.propTypes = {
  zoomLevel: PropTypes.number.isRequired,
}

export default Canvas
