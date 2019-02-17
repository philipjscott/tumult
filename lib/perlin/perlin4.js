'use strict'

const Noise = require('../util/noise')
const { grad4 } = require('../util/4d')
const { fade, lerp } = require('../util/math')

class Perlin4 extends Noise {
  gen (x, y, z, t) {
    const gx = Math.trunc(x) % 256
    const gy = Math.trunc(y) % 256
    const gz = Math.trunc(z) % 256
    const gt = Math.trunc(t) % 256

    const dx = x - gx
    const dy = y - gy
    const dz = z - gz
    const dt = t - gt

    const n0000 = grad4(this.p, gx, gy, gz, gt).dot(dx, dy, dz, dt)
    const n1000 = grad4(this.p, gx + 1, gy, gz, gt).dot(dx - 1, dy, dz)
    const n0100 = grad4(this.p, gx, gy + 1, gz, gt).dot(dx, dy - 1, dz)
    const n1100 = grad4(this.p, gx + 1, gy + 1, gz, gt).dot(dx - 1, dy - 1, dz)
    const n0010 = grad4(this.p, gx, gy, gz + 1, gt).dot(dx, dy, dz - 1)
    const n1010 = grad4(this.p, gx + 1, gy, gz + 1, gt).dot(dx - 1, dy, dz - 1)
    const n0110 = grad4(this.p, gx, gy + 1, gz + 1, gt).dot(dx, dy - 1, dz - 1)
    const n1110 = grad4(this.p, gx + 1, gy + 1, gz + 1, gt).dot(dx - 1, dy - 1, dz - 1)
    const n0001 = grad4(this.p, gx, gy, gz, gt + 1).dot(dx, dy, dz, dt - 1)
    const n1001 = grad4(this.p, gx + 1, gy, gz, gt + 1).dot(dx - 1, dy, dz, dt - 1)
    const n0101 = grad4(this.p, gx, gy + 1, gz, gt + 1).dot(dx, dy - 1, dz, dt - 1)
    const n1101 = grad4(this.p, gx + 1, gy + 1, gz, gt + 1).dot(dx - 1, dy - 1, dz, dt - 1)
    const n0011 = grad4(this.p, gx, gy, gz + 1, gt + 1).dot(dx, dy, dz - 1, dt - 1)
    const n1011 = grad4(this.p, gx + 1, gy, gz + 1, gt + 1).dot(dx - 1, dy, dz - 1, dt - 1)
    const n0111 = grad4(this.p, gx, gy + 1, gz + 1, gt + 1).dot(dx, dy - 1, dz - 1, dt - 1)
    const n1111 = grad4(this.p, gx + 1, gy + 1, gz + 1, gt + 1).dot(dx - 1, dy - 1, dz - 1, dt - 1)

    return lerp(
      lerp(
        lerp(
          lerp(n0000, n1000, dx),
          lerp(n0100, n1100, dx),
          fade(dy)
        ),
        lerp(
          lerp(n0010, n1010, dx),
          lerp(n0110, n1110, dx),
          fade(dy)
        ),
        fade(dz)
      ),
      lerp(
        lerp(
          lerp(n0001, n1001, dx),
          lerp(n0101, n1101, dx),
          fade(dy)
        ),
        lerp(
          lerp(n0011, n1011, dx),
          lerp(n0111, n1111, dx),
          fade(dy)
        ),
        fade(dz)
      ),
      fade(dt)
    )
  }
}

module.exports = Perlin4
