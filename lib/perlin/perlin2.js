'use strict'

import { Noise } from '../util/noise'
import { grad2 as grad } from '../util/2d'
import { fade, lerp } from '../util/math'

export default class Perlin2 extends Noise {
  gen (x, y) {
    const grad2 = grad.bind(null, this.p)
    const gx = Math.trunc(x) % 256
    const gy = Math.trunc(y) % 256

    const dx = x - gx
    const dy = y - gy

    const n00 = grad2(gx, gy).dot(dx, dy)
    const n10 = grad2(gx + 1, gy).dot(dx - 1, dy)
    const n01 = grad2(gx, gy + 1).dot(dx, dy - 1)
    const n11 = grad2(gx + 1, gy + 1).dot(dx - 1, dy - 1)

    return lerp(
      lerp(n00, n10, fade(dx)),
      lerp(n01, n11, fade(dx)),
      fade(dy)
    )
  }
}
