'use strict'

const Noise = require('../util/noise')
const { grad1 } = require('../util/1d')
const { lerp, fade } = require('../util/math')

class Perlin1 extends Noise {
  gen (x) {
    const gx = Math.floor(x) % 256
    const dx = x - gx

    const n0 = grad1(this.p, gx).dot(dx)
    const n1 = grad1(this.p, gx + 1).dot(dx - 1)

    return lerp(n0, n1, fade(dx))
  }
}

module.exports = Perlin1
