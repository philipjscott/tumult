'use strict'

import Noise from '../util/noise'
import { gN, lerpN, getNs as getN, generateGN } from '../util/nd'

export default class PerlinN extends Noise {
  gen (...args) {
    const getNs = getN.bind(null, this.p)
    const gs = []
    const ds = []

    if (gN.length === 0) {
      generateGN(args.length)
    }

    for (let i = 0; i < args.length; i++) {
      gs[i] = Math.trunc(args[i]) % 256
      ds[i] = args[i] - gs[i]
    }

    const ns = getNs(args.length, gs, ds)

    return lerpN(ns, ds)
  }
}
