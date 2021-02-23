/**
 * Default configuration for the ball.
 * @type {{color: string, bounce: number, radius: number}}
 */

const defaultProps = {
  bounce: 0.75,
  radius: 30,
  color: '#00666C'
}

export class Ball {

  constructor (x = 0, y = 0, playGroundProps, props) {
    this.props = {
      ...defaultProps,
      startVelX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
      startVelY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
      ...props
    }
    this.playGroundProps = playGroundProps

    this.x = x
    this.y = y
    this.velX = this.props.startVelX
    this.velY = this.props.startVelY
  }

  /**
   * Drawing the ball on the playground.
   * @param ctx where it should be drawn.
   */
  draw (ctx) {
    const { x, y, props } = this

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = props.color
    ctx.arc(
      x, y,
      props.radius,
      0, Math.PI * 2
    )
    ctx.fill()
    ctx.restore()
  }

  /**
   *
   * Remove the ball from the playground if it's in the bottom right corner.
   *
   * @returns {boolean} true if ball should be kept in the list of balls, otherwise false
   */
  clear(ctx) {
    const { props, playGroundProps } = this
    let rightBound = this.x + props.radius >= playGroundProps.width
    // clear the object only if it's near to near to bottom not on top
    let cornerCase = this.y - props.radius >= (playGroundProps.height-playGroundProps.height/4);
    if (rightBound && cornerCase) {
      ctx.clearRect(0, 0, playGroundProps.width, playGroundProps.height)
      return false;
    }
   return true;
  }

  /**
   * Update the ball and depending on which bound is touched the calculations are updated.
   */
  update () {
    const { props, playGroundProps } = this

    // floor
    let bottomBound = this.y + props.radius >= playGroundProps.height
    if (bottomBound) {
      this.velY *= -props.bounce
      this.y = playGroundProps.height - props.radius
      this.velX *= playGroundProps.friction
    }
    // ceiling
    let topBound = this.y - props.radius <= 0
    if (topBound) {
      this.velY *= -props.bounce
      this.y = props.radius
      this.velX *= playGroundProps.friction
    }

    // left bound
    let leftBound = this.x - props.radius <= 0
    if (leftBound) {
      this.velX *= -props.bounce
      this.x = props.radius
    }
    // right bound
    let rightBound = this.x + props.radius >= playGroundProps.width
    if (rightBound) {
      this.velX *= -props.bounce
      this.x = playGroundProps.width - props.radius
    }

    // apply friction only when the ball is moving
    if (this.velX < 0.01 && this.velX > -0.01) {
      this.velX = 0
    }
    if (this.velY < 0.01 && this.velY > -0.01) {
      this.velY = 0
    }

    // update position
    this.velY += playGroundProps.gravity
    this.x += this.velX
    this.y += this.velY
  }
}

export default Ball
