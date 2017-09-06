import terrapaint from 'terrapaint'
import { seed, simplex2, perlinN } from '../src/index'
seed()
terrapaint(simplex2, 256, 256, {
  offset: true
})
terrapaint(perlinN, 256, 256, {
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
