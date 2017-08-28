import terrapaint from 'terrapaint'
import tumult from '../src/index'
var noise = tumult(Math.random())
terrapaint(noise.perlinN, 256, 256, {
  offset: true
})
terrapaint(noise.perlin2, 256, 256, {
  offset: true
})
