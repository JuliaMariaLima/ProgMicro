import React, { Component } from 'react'

const HEIGHT = 425
const WIDTH = 600

class Path extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ciclos: props.ciclos,
      ctx: null,
      canvas: null,
    }
    this.x = WIDTH / 2
    this.y = HEIGHT
    this.gradient = null
  }
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    this.setState({ canvas })
    this.setState({ ctx })

    this.gradient = ctx.createLinearGradient(WIDTH / 2, 0, WIDTH / 2, HEIGHT)
    this.gradient.addColorStop(0, '#B50571')
    this.gradient.addColorStop(1, '#1e08bd')

    // ctx.beginPath()
    // ctx.moveTo(HEIGHT, WIDTH / 2)
    // ctx.lineTo(450, 50)
    // ctx.lineTo(450, 400)
    // ctx.lineTo(100, 150)
    // ctx.closePath()
    // ctx.lineWidth = 5
    // ctx.strokeStyle = this.gradient
    // ctx.stroke()
  }

  draw = ({ tipo, duracao, velocidade, angulo }) => {
    let { ctx } = this.state
    // console.log('drawing')
    if (tipo === 'frente') {
      this.y -= 200
      ctx.lineTo(this.x, this.y)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.ciclos) !== JSON.stringify(this.props.ciclos)
    ) {
      const { ctx, canvas } = this.state
      const { ciclos } = this.props

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.beginPath()
      ctx.moveTo(WIDTH / 2, HEIGHT)
      ciclos.forEach(({ movimentos, vezes }) => {
        if (!movimentos.length) {
          this.x = WIDTH / 2
          this.y = HEIGHT
        }
        const n = vezes || 1
        for (let i = 0; i < n; i++) {
          movimentos.forEach(this.draw)
        }
      })
      ctx.closePath()
      ctx.lineWidth = 5
      ctx.strokeStyle = this.gradient
      ctx.stroke()
    }
  }

  render() {
    return <canvas ref="canvas" width={WIDTH} height={HEIGHT} />
  }
}

export default Path
