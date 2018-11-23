'use strict'

import { lerp, fade } from './math'

function hashN (p, gs) {
  if (gs.length === 1) return p[gs[0]]
  return p[gs[0] + hashN(p, gs.slice(1))]
}

function VecN(R) {
  this.R = R
}
VecN.prototype.dot = function (R) {
  var val = 0
  for (var i = 0; i < R.length; i++) {
    val += this.R[i] * R[i]
  }
  return val
}

export var gN = []
export function generateGN (dim) {
  for (var i = 0; i < dim * 2; i++) {
    var vec = new Array(dim).fill(0)
    vec[i % dim] = i / dim >= 1 ? 1 : -1
    gN[i] = new VecN(vec)
  }
}
export function lerpN (ns, ds) {
  if (ds.length === 1) return lerp(ns[0], ns[1], fade(ds[0]))
  var ns1 = ns.slice(0, Math.floor(ns.length / 2))
  var ns2 = ns.slice(Math.ceil(ns.length / 2))
  return lerp(
    lerpN(ns1, ds.slice(0, ds.length - 1)),
    lerpN(ns2, ds.slice(0, ds.length - 1)),
    fade(ds[ds.length - 1])
  )
}
export function getNs (p, dim, gs, ds) {
  var ns = []
  for (var i = 0; i < (2 << (dim - 1)); i++) {
    var gsPerm = gs.slice()
    var dsPerm = ds.slice()
    var temp = i

    for (var j = 0; j < dim; j++) {
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
