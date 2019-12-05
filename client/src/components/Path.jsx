import React, { Component } from 'react'

const HEIGHT = 425
const WIDTH = 600

class Path extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ciclos: props.ciclos,
    }
  }
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    var gradient = ctx.createLinearGradient(0, 0, WIDTH, 0)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(1, 'blue')

    ctx.beginPath()
    ctx.moveTo(100, 150)
    ctx.lineTo(450, 50)
    ctx.lineTo(450, 400)
    ctx.lineTo(100, 150)
    ctx.lineTo(450, 50)
    ctx.lineWidth = 10

    // set line color
    ctx.strokeStyle = gradient
    ctx.stroke()
  }

  render() {
    console.log(this.state.ciclos)
    return <canvas ref="canvas" width={WIDTH} height={HEIGHT} />
  }
}

export default Path
