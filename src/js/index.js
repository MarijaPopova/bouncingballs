/**
 * This class handles the logic that it's shown on the index page.
 *
 */
import PlayGround from './animation/PlayGround'
import Ball from './animation/Ball'

/**
 * It is possible to define the playground width, height.
 * Also it's possible to predefine the number of colors used for filling up the balls.
 * Behavior: gravity — force added to the vertical velocity of an object
   Friction — the energy lost when an object moves on a playground.
 */
const config = {
  width: 800,
  height: 800,
  gravity: 0.25,
  friction: 0.98,
  balls: [ new Ball()],
  colors: ['#00666C', 'red', 'orange', 'blue', 'green']
}
const playGround = new PlayGround('animation', config)
