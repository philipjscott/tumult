'use strict'

import { Noise } from '../util/noise'
import { grad1 as grad } from '../util/1d'
import { cut1 } from '../util/math'

export default class Simplex1 extends Noise {
  gen (x) {
    const grad1 = grad.bind(null, this.p)
    const gx = Math.floor(x) % 256
    const dx = x - gx

    const n0 = cut1(dx) * grad1(gx).dot(dx)
    const n1 = cut1(dx - 1) * grad1(gx + 1).dot(dx - 1)

    return 0.5 * (n0 + n1)
  }
}
