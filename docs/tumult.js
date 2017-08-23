function tumult (seed) {
  seed = seed || Math.random()

  var rng = rand.create(seed)
  var p = new Uint8Array(512)
  var g2 = [
    new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
    new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
  ]
  var g3 = [
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
  function grad2(x, y) {
    var hash = p[x + p[y]] % g2.length
    return g2[hash]
  }
  function grad3(x, y, z) {
    var hash = p[x + p[y + p[z]]] % g3.length
    return g3[hash]
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
    seed: function (s) {
      rng = rand.create(s)
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
    }
  }
  
  return module
}
