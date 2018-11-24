'use strict'

class Vec3 {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  dot (x, y, z) {
    return this.x * x + this.y * y + this.z * z
  }
}

const g3 = [
  new Vec3(1, 1, 1), new Vec3(-1, 1, 1), new Vec3(1, -1, 1), new Vec3(-1, -1, 1),
  new Vec3(1, 1, 0), new Vec3(-1, 1, 0), new Vec3(1, -1, 0), new Vec3(-1, -1, 0),
  new Vec3(1, 1, -1), new Vec3(-1, 1, -1), new Vec3(1, -1, -1), new Vec3(-1, -1, -1)
]

export function grad3 (p, x, y, z) {
  const hash = p[x + p[y + p[z]]] % g3.length
  return g3[hash]
}
