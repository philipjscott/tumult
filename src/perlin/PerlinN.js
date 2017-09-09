import { Noise } from '../util/Noise'
import { gN, lerpN, getNs, generateGN } from '../util/Nd'

export default class PerlinN extends Noise {
  constructor (s) {
    super(s)
  }
  gen (...args) {
    var getNs = getNs.bind(null, this.p)
    var gs = []
    var ds = []

    if (gN.length === 0) {
      generateGN(args.length)
    }

    var i
    for (i = 0; i < args.length; i++) {
      gs[i] = Math.trunc(args[i]) % 256
      ds[i] = args[i] - gs[i]
    }
    var ns = getNs(args.length, gs, ds)
    var res = lerpN(ns, ds)
    return res
  }
}

