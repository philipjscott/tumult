'use strict'

const Noise = require('../util/noise')
const { grad2, S2_TO_C, C_TO_S2 } = require('../util/2d')
const { cut } = require('../util/math')

class Simplex2 extends Noise {
  gen (x, y) {
    const skew = (x + y) * S2_TO_C
    const i = Math.trunc(x + skew)
    const j = Math.trunc(y + skew)

    const unskew = (i + j) * C_TO_S2
    const gx = i - unskew
    const gy = j - unskew

    const dx0 = x - gx
    const dy0 = y - gy

    const di = dx0 > dy0 ? 1 : 0
    const dj = dx0 > dy0 ? 0 : 1

    const dx1 = dx0 - di + C_TO_S2
    const dy1 = dy0 - dj + C_TO_S2
    const dx2 = dx0 - 1 + 2 * C_TO_S2
    const dy2 = dy0 - 1 + 2 * C_TO_S2

    const n0 = cut(dx0, dy0) * grad2(this.p, i, j).dot(dx0, dy0)
    const n1 = cut(dx1, dy1) * grad2(this.p, i + di, j + dj).dot(dx1, dy1)
    const n2 = cut(dx2, dy2) * grad2(this.p, i + 1, j + 1).dot(dx2, dy2)

    return 70 * (n0 + n1 + n2)
  }
}

module.exports = Simplex2
