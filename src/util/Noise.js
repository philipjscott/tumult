import rand from 'random-seed'

export class Noise {
  constructor (s) {
    this.p = new Uint8Array(512)
    this.seed(s)
  }
  gen () {}
  seed (s) {
    s = s || Math.random()
    var rng = rand.create(s)
    var i
    for (i = 0; i < 256; i++) this.p[i] = i
    for (i = 0; i < 256; i++) {
      var r = rng(256)
      var temp = this.p[i]
      this.p[i] = this.p[r]
      this.p[r] = temp
    }
    for (i = 0; i < 256; i++) this.p[i + 256] = this.p[i]
  }
  transform (fn) {
    var transformedFn = (...dims) => {
      return fn.apply(this, dims)
    }
    return transformedFn.bind(this)
  }
  octavate (...args) {
    var octaves = args[0]
    var dims = args.slice(1)
    var val = 0
    var max = 0
    for (var i = 0; i < octaves; i++) {
      var w = 1 << i
      val += this.gen.apply(this, dims.map(x => x * w)) / w
    }
    for (var i = 0; i < octaves; i++) {
      max += 1 / (1 << i)
    }
    return val / max
  }
}


