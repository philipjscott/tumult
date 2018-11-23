'use strict'

import rand from 'random-seed'

export class Noise {
  constructor (s) {
    this.p = new Uint8Array(512)
    this.seed(s)
  }

  gen () {}

  seed (s) {
    const rng = rand.create(s || Math.random())

    for (let i = 0; i < 256; i++) this.p[i] = i
    for (let i = 0; i < 256; i++) {
      const r = rng(256)
      const temp = this.p[i]
      this.p[i] = this.p[r]
      this.p[r] = temp
    }
    for (let i = 0; i < 256; i++) this.p[i + 256] = this.p[i]
  }

  transform (fn) {
    const transformedFn = (...dims) => fn.apply(this, dims)

    return transformedFn.bind(this)
  }

  octavate (...args) {
    const octaves = args[0]
    const dims = args.slice(1)
    let val = 0
    let max = 0

    for (let i = 0; i < octaves; i++) {
      const w = 1 << i
      val += this.gen.apply(this, dims.map(x => x * w)) / w
    }

    for (let i = 0; i < octaves; i++) {
      max += 1 / (1 << i)
    }

    return val / max
  }
}
