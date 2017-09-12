import { Noise } from '../util/Noise'
import { grad2 as grad } from '../util/2d'
import { fade, lerp } from '../util/math'

export default class Perlin2 extends Noise {
  constructor(s) {
    super(s)
  }
  gen(x, y) {
    var grad2 = grad.bind(null, this.p)
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256

    var dx = x - gx
    var dy = y - gy

    var n00 = grad2(gx, gy).dot(dx, dy)
    var n10 = grad2(gx + 1, gy).dot(dx - 1, dy)
    var n01 = grad2(gx, gy + 1).dot(dx, dy - 1)
    var n11 = grad2(gx + 1, gy + 1).dot(dx - 1, dy - 1)

    return lerp(
      lerp(n00, n10, fade(dx)),
      lerp(n01, n11, fade(dx)),
      fade(dy)
    )
  }
}

