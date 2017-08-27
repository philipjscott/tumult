import terrapaint from 'terrapaint'
import tumult from '../src/index'
var noise = tumult(Math.random())
terrapaint(noise.perlinN, 512, 512, {
  offset: true
})
