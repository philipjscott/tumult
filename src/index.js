// Tumult, JavaScript noise generator
// Created by Philip Scott | ScottyFillups, 2017
// https://github.com/ScottyFillups

// Noise algorithms by Ken Perlin
// Uses "random-seed" package on NPM for seeding function


var rand = require('random-seed')
var rng
function lerp (a, b, t) {
  return a * (1 - t) + b * t
}
function fade (t) {
  return t * t * t * (10 + t * (-15 + t * 6))
}
function falloff (...args) {
  var dims = args.slice(1)
  const t = args[0] - dims.reduce((sum, val) => {
    return sum + val * val
  }, 0)
  return t * t * t * t 
}
var cut1 = falloff.bind(null, 1)
var cut = falloff.bind(null, 0.5)
var p = new Uint8Array(512)

class Noise {
  constructor (s) {
    this.seed(s)
  }
  gen () {}
  seed (s) {
    s = s || Math.random()
    rng = rand.create(s)
    var i
    for (i = 0; i < 256; i++) p[i] = i
    for (i = 0; i < 256; i++) {
      var r = rng(256)
      var temp = p[i]
      p[i] = p[r]
      p[r] = temp
    }
    for (i = 0; i < 256; i++) p[i + 256] = p[i]
  }
  transform (fn) {
    return (...args) => {
      return fn(this.gen.apply(this, args))
    }
  }
  /*octavate (octaves, options) {
    options = options || {}
    var persistance = options.persistance || 2
    var period = options.period || 6

    return function (...args) {
      // fn(this.gen.apply(args)
    }
  }*/
}


var g1 = [ new Vec1(1), new Vec1(-1) ]
function grad1 (x) {
  var hash = p[x] % g1.length
  return g1[hash]
}
function Vec1 (x) {
  this.x = x
}
Vec1.prototype.dot = function (x) {
  return this.x * x
}
export class Perlin1 extends Noise {
  constructor (s) {
    super(s)
  }
  gen (x) {
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = grad1(gx).dot(dx)
    var n1 = grad1(gx + 1).dot(dx - 1)

    return lerp(n0, n1, fade(dx))
  }
}
export class Simplex1 extends Noise {
  constructor (s) {
    super(s)
  }
  gen (x) {
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = cut1(dx) * grad1(gx).dot(dx)
    var n1 = cut1(dx - 1) * grad1(gx + 1).dot(dx - 1)

    return 0.5 * (n0 + n1)
  }
}
// noise, noise1 noise2 noise3, 
// then perlins, simplexes, etc
// this will be done when you want to split files
// typed array look up table?

var g2 = [
  new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
  new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
]
function grad2 (x, y) {
  var hash = p[x + p[y]] % g2.length
  return g2[hash]
}
function Vec2 (x, y) {
  this.x = x
  this.y = y
}
Vec2.prototype.dot = function (x, y) {
  return this.x * x + this.y * y
}
var S2_TO_C = 0.5 * (Math.sqrt(3) - 1)
var C_TO_S2 = (3 - Math.sqrt(3)) / 6
export class Perlin2 extends Noise {
  constructor (s) {
    super(s)
  }
  gen (x, y) {
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256

    var dx = x - gx
    var dy = y - gy

    var n00 = grad2(gx, gy).dot(dx, dy)
    var n10 = grad2(gx + 1, gy).dot(dx - 1, dy)
    var n01 = grad2(gx, gy + 1).dot(dx, dy - 1)
    var n11 = grad2(gx + 1, gy + 1).dot(dx - 1, dy - 1)

    return lerp(
      lerp(n00, n10, fade(dx)),
      lerp(n01, n11, fade(dx)),
      fade(dy)
    )
  }
}
export class Simplex2 extends Noise {
  constructor (s) {
    super(s)
  }
  gen (x, y) {
    var skew = (x + y) * S2_TO_C
    var i = Math.trunc(x + skew)
    var j = Math.trunc(y + skew)

    var unskew = (i + j) * C_TO_S2
    var gx = i - unskew
    var gy = j - unskew

    var dx0 = x - gx
    var dy0 = y - gy

    var di = dx0 > dy0 ? 1 : 0
    var dj = dx0 > dy0 ? 0 : 1

    // why isn't it + di - C_TO_S2?
    var dx1 = dx0 - di + C_TO_S2
    var dy1 = dy0 - dj + C_TO_S2
    var dx2 = dx0 - 1 + 2 * C_TO_S2
    var dy2 = dy0 - 1 + 2 * C_TO_S2

    var n0 = cut(dx0, dy0) * grad2(i, j).dot(dx0, dy0)
    var n1 = cut(dx1, dy1) * grad2(i + di, j + dj).dot(dx1, dy1)
    var n2 = cut(dx2, dy2) * grad2(i + 1, j + 1).dot(dx2, dy2)

    return 70 * (n0 + n1 + n2)
  }
}


var g3 = [
  new Vec3(1, 1, 1), new Vec3(-1, 1, 1), new Vec3(1, -1, 1), new Vec3(-1, -1, 1),
  new Vec3(1, 1, 0), new Vec3(-1, 1, 0), new Vec3(1, -1, 0), new Vec3(-1, -1, 0),
  new Vec3(1, 1, -1), new Vec3(-1, 1, -1), new Vec3(1, -1, -1), new Vec3(-1, -1, -1)
]
function grad3 (x, y, z) {
  var hash = p[x + p[y + p[z]]] % g3.length
  return g3[hash]
}
function Vec3 (x, y, z) {
  this.x = x
  this.y = y
  this.z = z
}
Vec3.prototype.dot = function (x, y, z) {
  return this.x * x + this.y * y + this.z * z
}
export class Perlin3 extends Noise {
  constructor (s) {
    super(s)
  }
  gen (x, y, z) {
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256
    var gz = Math.trunc(z) % 256

    var dx = x - gx
    var dy = y - gy
    var dz = z - gz

    var n000 = grad3(gx, gy, gz).dot(dx, dy, dz)
    var n100 = grad3(gx + 1, gy, gz).dot(dx - 1, dy, dz)
    var n010 = grad3(gx, gy + 1, gz).dot(dx, dy - 1, dz)
    var n110 = grad3(gx + 1, gy + 1, gz).dot(dx - 1, dy - 1, dz)
    var n001 = grad3(gx, gy, gz + 1).dot(dx, dy, dz - 1)
    var n101 = grad3(gx + 1, gy, gz + 1).dot(dx - 1, dy, dz - 1)
    var n011 = grad3(gx, gy + 1, gz + 1).dot(dx, dy - 1, dz - 1)
    var n111 = grad3(gx + 1, gy + 1, gz + 1).dot(dx - 1, dy - 1, dz - 1)

    return lerp(
      lerp(
        lerp(n000, n100, dx),
        lerp(n010, n110, dx),
        fade(dy)
      ),
      lerp(
        lerp(n001, n101, dx),
        lerp(n011, n111, dx),
        fade(dy)
      ),
      fade(dz)
    )
  }
}


var g4 = [
  new Vec4(0, 1, 1, 1), new Vec4(0, 1, 1, -1), new Vec4(0, 1, -1, 1), new Vec4(0, 1, -1, -1),
  new Vec4(0, -1, 1, 1), new Vec4(0, -1, 1, -1), new Vec4(0, -1, -1, 1), new Vec4(0, -1, -1, -1),
  new Vec4(1, 0, 1, 1), new Vec4(1, 0, 1, -1), new Vec4(1, 0, -1, 1), new Vec4(1, 0, -1, -1),
  new Vec4(-1, 0, 1, 1), new Vec4(-1, 0, 1, -1), new Vec4(-1, 0, -1, 1), new Vec4(-1, 0, -1, -1),
  new Vec4(1, 1, 0, 1), new Vec4(1, 1, 0, -1), new Vec4(1, -1, 0, 1), new Vec4(1, -1, 0, -1),
  new Vec4(-1, 1, 0, 1), new Vec4(-1, 1, 0, -1), new Vec4(-1, -1, 0, 1), new Vec4(-1, -1, 0, -1),
  new Vec4(1, 1, 1, 0), new Vec4(1, 1, -1, 0), new Vec4(1, -1, 1, 0), new Vec4(1, -1, -1, 0),
  new Vec4(-1, 1, 1, 0), new Vec4(-1, 1, -1, 0), new Vec4(-1, -1, 1, 0), new Vec4(-1, -1, -1, 0)
]
function grad4 (x, y, z, t) {
  var hash = p[x + p[y + p[z + p[t]]]] % g4.length
  return g4[hash]
}
function Vec4 (x, y, z, t) {
  this.x = x
  this.y = y
  this.z = z
  this.t = t
}
Vec4.prototype.dot = function (x, y, z, t) {
  return this.x * x + this.y * y + this.z * z + this.t * t
}
export class Perlin4 extends Noise {
  constructor (s) {
    super(s)
  }
  gen (x, y, z, t) {
  var gx = Math.trunc(x) % 256
  var gy = Math.trunc(y) % 256
  var gz = Math.trunc(z) % 256
  var gt = Math.trunc(t) % 256

  var dx = x - gx
  var dy = y - gy
  var dz = z - gz
  var dt = t - gt

  var n0000 = grad4(gx, gy, gz, gt).dot(dx, dy, dz, dt)
  var n1000 = grad4(gx + 1, gy, gz, gt).dot(dx - 1, dy, dz)
  var n0100 = grad4(gx, gy + 1, gz, gt).dot(dx, dy - 1, dz)
  var n1100 = grad4(gx + 1, gy + 1, gz, gt).dot(dx - 1, dy - 1, dz)
  var n0010 = grad4(gx, gy, gz + 1, gt).dot(dx, dy, dz - 1)
  var n1010 = grad4(gx + 1, gy, gz + 1, gt).dot(dx - 1, dy, dz - 1)
  var n0110 = grad4(gx, gy + 1, gz + 1, gt).dot(dx, dy - 1, dz - 1)
  var n1110 = grad4(gx + 1, gy + 1, gz + 1, gt).dot(dx - 1, dy - 1, dz - 1)
  var n0001 = grad4(gx, gy, gz, gt + 1).dot(dx, dy, dz, dt - 1)
  var n1001 = grad4(gx + 1, gy, gz, gt + 1).dot(dx - 1, dy, dz, dt - 1)
  var n0101 = grad4(gx, gy + 1, gz, gt + 1).dot(dx, dy - 1, dz, dt - 1)
  var n1101 = grad4(gx + 1, gy + 1, gz, gt + 1).dot(dx - 1, dy - 1, dz, dt - 1)
  var n0011 = grad4(gx, gy, gz + 1, gt + 1).dot(dx, dy, dz - 1, dt - 1)
  var n1011 = grad4(gx + 1, gy, gz + 1, gt + 1).dot(dx - 1, dy, dz - 1, dt - 1)
  var n0111 = grad4(gx, gy + 1, gz + 1, gt + 1).dot(dx, dy - 1, dz - 1, dt - 1)
  var n1111 = grad4(gx + 1, gy + 1, gz + 1, gt + 1).dot(dx - 1, dy - 1, dz - 1, dt - 1)

  return lerp(
    lerp(
      lerp(
        lerp(n0000, n1000, dx),
        lerp(n0100, n1100, dx),
        fade(dy)
      ),
      lerp(
        lerp(n0010, n1010, dx),
        lerp(n0110, n1110, dx),
        fade(dy)
      ),
      fade(dz)
    ),
    lerp(
      lerp(
        lerp(n0001, n1001, dx),
        lerp(n0101, n1101, dx),
        fade(dy)
      ),
      lerp(
        lerp(n0011, n1011, dx),
        lerp(n0111, n1111, dx),
        fade(dy)
      ),
      fade(dz)
    ),
    fade(dt)
  )
  }
}


var gN = []
// generates a gradient look up table, where each gradient has one positive
// or negative unit vector in one dimension. For example, calling perlin with 2 dims:
// [1, 0], [-1, 0], [0, 1], [0, -1]
function generateGN (dim) {
  for (var i = 0; i < dim * 2; i++) {
    var vec = new Array(dim).fill(0)
    vec[i % dim] = i / dim >= 1 ? 1 : -1
    gN[i] = new VecN(vec)
  }
}
function lerpN (ns, ds) {
  if (ds.length === 1) return lerp(ns[0], ns[1], fade(ds[0]))
  var ns1 = ns.slice(0, Math.floor(ns.length / 2))
  var ns2 = ns.slice(Math.ceil(ns.length / 2))
  return lerp(
    lerpN(ns1, ds.slice(0, ds.length - 1)),
    lerpN(ns2, ds.slice(0, ds.length - 1)),
    fade(ds[ds.length - 1])
  )
}
function hashN (gs) {
  if (gs.length === 1) return p[gs[0]]
  return p[gs[0] + hashN(gs.slice(1))]
}
function getNs (dim, gs, ds) {
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
    ns[i] = gN[hashN(gsPerm) % gN.length].dot(dsPerm)
  }
  return ns
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
export class PerlinN extends Noise {
  constructor (s) {
    super(s)
  }
  gen (...args) {
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


export default {
  Simplex1: Simplex1,
  Simplex2: Simplex2,
  Perlin1: Perlin1,
  Perlin2: Perlin2,
  Perlin3: Perlin3,
  Perlin4: Perlin4,
  PerlinN: PerlinN
}


function fixedLogger (target, method, count, debug) {
  var logger = {
    count: 0,
    log: function () {
      if (this.count < count && debug) {
        this.count++
        target[method].apply(this, ([].slice.call(arguments)))
      }
    }
  }
  return logger
}
