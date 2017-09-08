import terrapaint from 'terrapaint'
import { Simplex2, PerlinN } from '../src/index'

var seed = Math.random()
var simplex = new Simplex2(seed).transform(function(x, y) {
  return Math.abs(Math.sin((x * 3 + this.octavate(3, x, y)) * 5)) * 2 - 1
})

var perlin = new PerlinN(seed).transform(function(x, y) {
  return this.octavate(2, x, y)
})

terrapaint(simplex, 256, 256, {
  offset: true
})
terrapaint(perlin, 256, 256, {
  offset: true
})



/*
 * var n = this.octavate(3, x * 2, y * 2)
 * return (Math.sin(x + n * 5) + n) / 2
 *
 * return Math.abs(this.octavate(3, x / 4, y / 4)) * 2 - 1
 *
 * return Math.sin(x * this.octavate(3, x, y) * Math.PI)
 *
 * return this.octavate(3, x + this.octavate(3, x, y), y)
 * return this.octavate(3, x + this.gen(x, y), y)
 * return this.octavate(3, x + this.gen(x, y), y * x / 10)
 * return Math.sin(this.octavate(3, Math.abs(this.gen(x, y)) * x, y))
 *
 * return Math.sin(1 / this.octavate(3, x / 4, y / 4))
 *
 * return Math.sin(x + 1 / this.octavate(3, x / 2, y / 2))
 * return Math.sin(x * 4 + this.octavate(3, x, y))
 * return Math.sin((x * 3 + this.octavate(3, x, y)) * 4)
 * return Math.abs(Math.sin((x * 3 + this.octavate(3, x, y)) * 5)) * 2 - 1
















/*import tumult from '../src/index'
tumult.seed(Math.random())
terrapaint(tumult.perlin2, 256, 256, {
  offset: true
})
terrapaint(tumult.perlinN, 256, 256, {
  offset: true
})*/
