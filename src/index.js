var rand = require('random-seed')

// Tumult, JavaScript noise generator
// Created by Philip Scott | ScottyFillups, 2017
// https://github.com/ScottyFillups

// Noise algorithms by Ken Perlin
// Uses "random-seed" package on NPM for seeding function

function tumultFactory (seed) {
  seed = seed || Math.random()

  var rng = rand.create(seed)
  var p = new Uint8Array(512)
  var g1 = [ new Vec1(1), new Vec1(-1) ]
  var g2 = [
    new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
    new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
  ]
  var g3 = [
    new Vec3(1, 1, 1), new Vec3(-1, 1, 1), new Vec3(1, -1, 1), new Vec3(-1, -1, 1),
    new Vec3(1, 1, 0), new Vec3(-1, 1, 0), new Vec3(1, -1, 0), new Vec3(-1, -1, 0),
    new Vec3(1, 1, -1), new Vec3(-1, 1, -1), new Vec3(1, -1, -1), new Vec3(-1, -1, -1)
  ]
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
  var gN = []
  function generateGN (count) {
    for (var i = 0; i < count * 2; i++) {
      var vec = new Array(count).fill(0)
      vec[i % count] = i / count >= 1 ? 1 : -1
      gN[i] = new VecN(vec)
    }
  }
  function lerp (a, b, t) {
    return a * (1 - t) + b * t
  }
  // too many Ns
  function lerpN (ns, ds) {
    if (ds.length === 1) return lerp(ns[0], ns[1], ds[0])
    var ns1 = ns.slice(0, ns.length / 2)
    var ns2 = ns.slice(ns.length / 2)
    return lerp(
      lerpN(ns1, ds.slice(1)),
      lerpN(ns2, ds.slice(1)),
      fade(ds[0])
    )
  }
  function fade (t) {
    return t * t * t * (10 + t * (-15 + t * 6))
  }
  function grad1 (x) {
    var hash = p[x] % g1.length
    return g1[hash]
  }
  function grad2 (x, y) {
    var hash = p[x + p[y]] % g2.length
    return g2[hash]
  }
  function grad3 (x, y, z) {
    var hash = p[x + p[y + p[z]]] % g3.length
    return g3[hash]
  }
  function grad4 (x, y, z, t) {
    var hash = p[x + p[y + p[z + p[t]]]] % g4.length
    return g4[hash]
  }
  function hashN (gs) {
    if (gs.length === 1) return p[gs[0]]
    return p[gs[0] + hashN(gs.slice(1))]
  }
  function getNs (count, gs, ds) {
    var ns = []
    for (var i = 0; i < (2 << (count - 1)); i++) {
      var gsPerm = gs.slice()
      var dsPerm = ds.slice()
      var temp = i

      for (var j = 0; j < count; j++) {
        if (temp & 1) {
          gsPerm[j] += 1
          dsPerm[j] -= 1
        }
        temp = temp >> 1
      }
      ns[i] = gN[hashN(gsPerm) % (count * 2)].dot(dsPerm)
    }
    return ns
  }
  function Vec1 (x) {
    this.x = x
  }
  function Vec2 (x, y) {
    this.x = x
    this.y = y
  }
  function Vec3 (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  function Vec4 (x, y, z, t) {
    this.x = x
    this.y = y
    this.z = z
    this.t = t
  }
  function VecN(R) {
    this.R = R
  }
  Vec1.prototype.dot = function (x) {
    return this.x * x
  }
  Vec2.prototype.dot = function (x, y) {
    return this.x * x + this.y * y
  }
  Vec3.prototype.dot = function (x, y, z) {
    return this.x * x + this.y * y + this.z * z
  }
  Vec4.prototype.dot = function (x, y, z, t) {
    return this.x * x + this.y * y + this.z * z + this.t * t
  }
  VecN.prototype.dot = function (R) {
    var val = 0
    for (var i = 0; i < R.length; i++) {
      val += this.R[i] * R[i]
    }
    return val
  }

  var i
  for (i = 0; i < 256; i++) p[i] = i
  for (i = 0; i < 256; i++) {
    var r = rng(256)
    var temp = p[i]
    p[i] = p[r]
    p[r] = temp
  }
  for (i = 0; i < 256; i++) p[i + 256] = p[i]

  var module = {
    seed: function (s) {
      rng = rand.create(s)
    },
    perlin1: function (x) {
      var gx = Math.trunc(x) % 256
      var dx = x - gx

      var n0 = grad1(gx).dot(dx)
      var n1 = grad1(gx + 1).dot(dx - 1)

      return lerp(n0, n1, fade(dx))
    },
    perlin2: function (x, y) {
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
    },
    perlin3: function (x, y, z) {
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
    },
    perlin4: function (x, y, z, t) {
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
    },
    perlinN: function () {
      var gs = []
      var ds = []
      generateGN(arguments.length)

      var i
      for (i = 0; i < arguments.length; i++) {
        gs[i] = Math.trunc(arguments[i]) % 256
        ds[i] = arguments[i] - gs[i]
      }
      var ns = getNs(arguments.length, gs, ds)
      return lerpN(ns, ds.reverse())
    }
  }

  return module
}

module.exports = tumultFactory
