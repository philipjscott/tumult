import { Perlin1, Perlin2, Perlin3, Perlin4, PerlinN } from './perlin/index'
import { Simplex1, Simplex2 } from './simplex/index'

export { default as Perlin1 } from './perlin/Perlin1'
export { default as Perlin2 } from './perlin/Perlin2'
export { default as Perlin3 } from './perlin/Perlin3'
export { default as Perlin4 } from './perlin/Perlin4'
export { default as PerlinN } from './perlin/PerlinN'
export { default as Simplex1 } from './simplex/Simplex1'
export { default as Simplex2 } from './simplex/Simplex2'

export default {
  Simplex1: Simplex1,
  Simplex2: Simplex2,
  Perlin1: Perlin1,
  Perlin2: Perlin2,
  Perlin3: Perlin3,
  Perlin4: Perlin4,
  PerlinN: PerlinN
}
