var rand = require('random-seed')

function tumultFactory (seed) {
  seed = seed || Math.random()

  var rng = rand.create(seed)
  var p = new Uint8Array(512)
  var grad2 = [
    new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
    new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
  ]
  var grad3 = [
    new Vec3(1, 1, 1), new Vec3(-1, 1, 1), new Vec3(1, -1, 1), new Vec3(-1, -1, 1),
    new Vec3(1, 1, 0), new Vec3(-1, 1, 0), new Vec3(1, -1, 0), new Vec3(-1, -1, 0),
    new Vec3(1, 1, -1), new Vec3(-1, 1, -1), new Vec3(1, -1, -1), new Vec3(-1, -1, -1)
  ]
  function lerp (a, b, t) {
    return a * (1 - t) + b * t
  }
  function fade (t) {
    return t * t * t * (10 + t * (-15 + t * 6))
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
  Vec2.prototype.dot = function (x, y) {
    return this.x * x + this.y * y
  }
  Vec3.prototype.dot = function (x, y, z) {
    return this.x * x + this.y * y + this.z * z
  }

  for (var i = 0; i < 256; i++) p[i] = i
  for (var i = 0; i < 256; i++) {
    var r = rng(256)
    var temp = p[i]
    p[i] = p[r]
    p[r] = temp
  }
  for (var i = 0; i < 256; i++) p[i + 256] = p[i]

  var module = {
    perlin2: function (x, y) {
      var gx = Math.trunc(x) % 255
      var gy = Math.trunc(y) % 255

      var dx = x - gx
      var dy = y - gy

      var n00 = grad2[p[(gx + p[gy])] % 8].dot(dx, dy)
      var n10 = grad2[p[(gx + 1 + p[gy])] % 8].dot(dx - 1, dy)
      var n01 = grad2[p[(gx + p[gy + 1])] % 8].dot(dx, dy - 1)
      var n11 = grad2[p[(gx + 1 + p[gy + 1])] % 8].dot(dx - 1, dy - 1)

      return lerp(
        lerp(n00, n10, fade(dx)),
        lerp(n01, n11, fade(dx)),
        fade(dy)
      )
    },
    perlin3: function (x, y, z) {

    }
  }
  
  return module
}

module.exports = tumultFactory
