import Ball from './Ball'

// default configuration
const defaultConfig = {
  width: 600,
  height: 600,
  gravity: 0.25,
  friction: 0.98,
  balls: [],
  colors: ['#00666C']
}

/**
 * class PlayGround that represents where the balls will be added and how they will be managed.
 */
export class PlayGround {
  // constructor function
  constructor (canvasId = 'animation', config) {
    // get the canvas and context
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')

    // world/physics settings
    // merge default config & any passed in config
    this.config = {
      ...defaultConfig,
      ...config
    }

    // set the canvas size
    this.colors = this.config.colors
    this.canvas.width = this.config.width
    this.canvas.height = this.config.height
    this.balls = []

    // register the events
    document.addEventListener('DOMContentLoaded', () => this.update())
    document.addEventListener('mousedown', () => this.addNewBall(event))
  }

  /**
   * Adds new ball in the playground.
   * @param event is passed to check if it's clicked on the playground or not
   */
  addNewBall (event) {
    const { config, balls, colors, canvas } = this
    // calculate if the ball is in the target
    if(canvas.contains(event.target)) {
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top;
      balls.push(
        new Ball(

          x, y,
          {
            ...config
          },
          // ball properties
          {
            // random calculation for radius
            radius: Math.random() * 20 + 10,
            // random color
            color: colors[Math.floor(Math.random() * colors.length)]
          }
        )
      )
    }

  }

  /**
   * Update the playground.
   * This method redraw everything again, take care of the balls that are in the playground.
   * Also removes the balls that are near to bottom right corner.
   */
  update () {
    const { ctx, config, balls } = this

    // queue the next update
    window.requestAnimationFrame(() => this.update())

    // clear the canvas
    ctx.clearRect(0, 0, config.width, config.height)

    // update objects
    balls.forEach(ball => ball.update())

    // draw objects
    balls.forEach(ball => ball.draw(ctx))

    // clear objects and remove them from canvas
    let filteredBalls = balls.filter(ball => ball.clear(ctx))

    this.balls = filteredBalls;
  }
}

export default PlayGround
