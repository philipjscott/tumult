'use strict'

const Noise = require('../util/noise')
const { grad3 } = require('../util/3d')
const { fade, lerp } = require('../util/math')

class Perlin3 extends Noise {
  gen (x, y, z) {
    const gx = Math.trunc(x) % 256
    const gy = Math.trunc(y) % 256
    const gz = Math.trunc(z) % 256

    const dx = x - gx
    const dy = y - gy
    const dz = z - gz

    const n000 = grad3(this.p, gx, gy, gz).dot(dx, dy, dz)
    const n100 = grad3(this.p, gx + 1, gy, gz).dot(dx - 1, dy, dz)
    const n010 = grad3(this.p, gx, gy + 1, gz).dot(dx, dy - 1, dz)
    const n110 = grad3(this.p, gx + 1, gy + 1, gz).dot(dx - 1, dy - 1, dz)
    const n001 = grad3(this.p, gx, gy, gz + 1).dot(dx, dy, dz - 1)
    const n101 = grad3(this.p, gx + 1, gy, gz + 1).dot(dx - 1, dy, dz - 1)
    const n011 = grad3(this.p, gx, gy + 1, gz + 1).dot(dx, dy - 1, dz - 1)
    const n111 = grad3(this.p, gx + 1, gy + 1, gz + 1).dot(dx - 1, dy - 1, dz - 1)

    return lerp(
      lerp(
        lerp(n000, n100, dx),
        lerp(n010, n110, dx),
        fade(dy)
      ),
      lerp(
        lerp(n001, n101, dx),
        lerp(n011, n111, dx),
        fade(dy)
      ),
      fade(dz)
    )
  }
}

module.exports = Perlin3
