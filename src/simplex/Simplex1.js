import { Noise } from '../util/Noise'
import { grad1 as grad } from '../util/1d'
import { cut1 } from '../util/math'

export default class Simplex1 extends Noise {
  constructor (s) {
    super(s)
  }
  gen (x) {
    var grad1 = grad.bind(null, this.p)
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = cut1(dx) * grad1(gx).dot(dx)
    var n1 = cut1(dx - 1) * grad1(gx + 1).dot(dx - 1)

    return 0.5 * (n0 + n1)
  }
}
