'use strict'

class Vec1 {
  constructor (x) {
    this.x = x
  }

  dot (x) {
    return this.x * x
  }
}

const g1 = [ new Vec1(1), new Vec1(-1) ]

export function grad1 (p, x) {
  return g1[p[x] % g1.length]
}
