'use strict'

const Noise = require('../util/noise')
const { grad2 } = require('../util/2d')
const { fade, lerp } = require('../util/math')

class Perlin2 extends Noise {
  gen (x, y) {
    const gx = Math.trunc(x) % 256
    const gy = Math.trunc(y) % 256

    const dx = x - gx
    const dy = y - gy

    const n00 = grad2(this.p, gx, gy).dot(dx, dy)
    const n10 = grad2(this.p, gx + 1, gy).dot(dx - 1, dy)
    const n01 = grad2(this.p, gx, gy + 1).dot(dx, dy - 1)
    const n11 = grad2(this.p, gx + 1, gy + 1).dot(dx - 1, dy - 1)

    return lerp(
      lerp(n00, n10, fade(dx)),
      lerp(n01, n11, fade(dx)),
      fade(dy)
    )
  }
}

module.exports = Perlin2
