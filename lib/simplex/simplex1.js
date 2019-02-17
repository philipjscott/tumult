'use strict'

const Noise = require('../util/noise')
const { grad1 } = require('../util/1d')
const { cut1 } = require('../util/math')

class Simplex1 extends Noise {
  gen (x) {
    const gx = Math.floor(x) % 256
    const dx = x - gx

    const n0 = cut1(dx) * grad1(this.p, gx).dot(dx)
    const n1 = cut1(dx - 1) * grad1(this.p, gx + 1).dot(dx - 1)

    return 0.5 * (n0 + n1)
  }
}

module.exports = Simplex1
