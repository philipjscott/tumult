'use strict'

const Noise = require('../util/noise')
const { lerpN, getNs } = require('../util/nd')

class PerlinN extends Noise {
  gen (...args) {
    const gs = []
    const ds = []

    for (let i = 0; i < args.length; i++) {
      gs[i] = Math.trunc(args[i]) % 256
      ds[i] = args[i] - gs[i]
    }

    const ns = getNs(this.p, args.length, gs, ds)

    return lerpN(ns, ds)
  }
}

module.exports = PerlinN
