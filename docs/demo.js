import terrapaint from 'terrapaint'
import { Simplex2, Perlin2 } from '../src/index'

var seed = Math.random()
var simplex = new Simplex2(seed).transform(function(x) {
  return Math.sin(x * Math.PI / 2)
  //return x
})
var perlin = new Perlin2(seed)

terrapaint(simplex, 256, 256, {
  offset: true
})
terrapaint(perlin.gen, 256, 256, {
  offset: true
})


/*import tumult from '../src/index'
tumult.seed(Math.random())
terrapaint(tumult.perlin2, 256, 256, {
  offset: true
})
terrapaint(tumult.perlinN, 256, 256, {
  offset: true
})*/
