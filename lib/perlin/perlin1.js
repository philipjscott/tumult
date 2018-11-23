'use strict'

import { Noise } from '../util/Noise'
import { grad1 as grad } from '../util/1d'
import { lerp, fade } from '../util/math'

export default class Perlin1 extends Noise {
  gen (x) {
    const grad1 = grad.bind(null, this.p)
    const gx = Math.floor(x) % 256
    const dx = x - gx

    const n0 = grad1(gx).dot(dx)
    const n1 = grad1(gx + 1).dot(dx - 1)

    return lerp(n0, n1, fade(dx))
  }
}
