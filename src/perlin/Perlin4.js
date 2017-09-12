import { Noise } from '../util/Noise'
import { grad4 as grad } from '../util/4d'
import { fade, lerp } from '../util/math'

export default class Perlin4 extends Noise {
  constructor(s) {
    super(s)
  }
  gen(x, y, z, t) {
    var grad4 = grad.bind(null, this.p)
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256
    var gz = Math.trunc(z) % 256
    var gt = Math.trunc(t) % 256

    var dx = x - gx
    var dy = y - gy
    var dz = z - gz
    var dt = t - gt

    var n0000 = grad4(gx, gy, gz, gt).dot(dx, dy, dz, dt)
    var n1000 = grad4(gx + 1, gy, gz, gt).dot(dx - 1, dy, dz)
    var n0100 = grad4(gx, gy + 1, gz, gt).dot(dx, dy - 1, dz)
    var n1100 = grad4(gx + 1, gy + 1, gz, gt).dot(dx - 1, dy - 1, dz)
    var n0010 = grad4(gx, gy, gz + 1, gt).dot(dx, dy, dz - 1)
    var n1010 = grad4(gx + 1, gy, gz + 1, gt).dot(dx - 1, dy, dz - 1)
    var n0110 = grad4(gx, gy + 1, gz + 1, gt).dot(dx, dy - 1, dz - 1)
    var n1110 = grad4(gx + 1, gy + 1, gz + 1, gt).dot(dx - 1, dy - 1, dz - 1)
    var n0001 = grad4(gx, gy, gz, gt + 1).dot(dx, dy, dz, dt - 1)
    var n1001 = grad4(gx + 1, gy, gz, gt + 1).dot(dx - 1, dy, dz, dt - 1)
    var n0101 = grad4(gx, gy + 1, gz, gt + 1).dot(dx, dy - 1, dz, dt - 1)
    var n1101 = grad4(gx + 1, gy + 1, gz, gt + 1).dot(dx - 1, dy - 1, dz, dt - 1)
    var n0011 = grad4(gx, gy, gz + 1, gt + 1).dot(dx, dy, dz - 1, dt - 1)
    var n1011 = grad4(gx + 1, gy, gz + 1, gt + 1).dot(dx - 1, dy, dz - 1, dt - 1)
    var n0111 = grad4(gx, gy + 1, gz + 1, gt + 1).dot(dx, dy - 1, dz - 1, dt - 1)
    var n1111 = grad4(gx + 1, gy + 1, gz + 1, gt + 1).dot(dx - 1, dy - 1, dz - 1, dt - 1)

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

