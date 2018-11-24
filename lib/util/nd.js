'use strict'

import { lerp, fade } from './math'

function hashN (p, gs) {
  if (gs.length === 1) return p[gs[0]]

  return p[gs[0] + hashN(p, gs.slice(1))]
}

class VecN {
  constructor (R) {
    this.R = R
  }

  dot (R) {
    let val = 0

    for (let i = 0; i < R.length; i++) {
      val += this.R[i] * R[i]
    }

    return val
  }
}

export const gN = []
export function generateGN (dim) {
  for (let i = 0; i < dim * 2; i++) {
    const vec = new Array(dim).fill(0)

    vec[i % dim] = i / dim >= 1 ? 1 : -1
    gN[i] = new VecN(vec)
  }
}
export function lerpN (ns, ds) {
  if (ds.length === 1) return lerp(ns[0], ns[1], fade(ds[0]))

  const ns1 = ns.slice(0, Math.floor(ns.length / 2))
  const ns2 = ns.slice(Math.ceil(ns.length / 2))

  return lerp(
    lerpN(ns1, ds.slice(0, ds.length - 1)),
    lerpN(ns2, ds.slice(0, ds.length - 1)),
    fade(ds[ds.length - 1])
  )
}
export function getNs (p, dim, gs, ds) {
  const ns = []
  for (let i = 0; i < (2 << (dim - 1)); i++) {
    const gsPerm = gs.slice()
    const dsPerm = ds.slice()
    let temp = i

    for (let j = 0; j < dim; j++) {
      if (temp & 1) {
        gsPerm[j] += 1
        dsPerm[j] -= 1
      }
      temp = temp >> 1
    }
    ns[i] = gN[hashN(p, gsPerm) % gN.length].dot(dsPerm)
  }

  return ns
}
