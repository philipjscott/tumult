import { Noise } from '../util/Noise'
import { grad1 as grad } from '../util/1d'
import { lerp, fade } from '../util/math'

export default class Perlin1 extends Noise {
  constructor(s) {
    super(s)
  }
  gen(x) {
    var grad1 = grad.bind(null, this.p)
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = grad1(gx).dot(dx)
    var n1 = grad1(gx + 1).dot(dx - 1)

    return lerp(n0, n1, fade(dx))
  }
}

