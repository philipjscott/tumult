'use strict'

class Vec2 {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  dot (x, y) {
    return this.x * x + this.y * y
  }
}

const g2 = [
  new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
  new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
]

function grad2 (p, x, y) {
  const hash = p[x + p[y]] % g2.length
  return g2[hash]
}
const S2_TO_C = 0.5 * (Math.sqrt(3) - 1)
const C_TO_S2 = (3 - Math.sqrt(3)) / 6

module.exports = {
  grad2,
  S2_TO_C,
  C_TO_S2
}
