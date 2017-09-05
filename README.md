# tumult

Javascript noise library. Currently supports perlin noise for any arbitrary dimension. Soon going to support:
* Simplex[1-4]
* OpenSimplex _(Maybe)_

### Installation

`npm install tumult --save`

Or,

```html
<script src="https://scottyfillups.github.io/tumult/tumult.js"></script>
```

### Usage

```js
// CommonJS syntax:
// var tumult = require('tumult')
import tumult from 'tumult'

tumult.seed('myseed')
console.log(tumult.perlin2(5, 5))
console.log(tumult.perlinN(1, 2, 3, 4, 5, 6))
```

If you can also import specific noise functions using ES6 modules, if you only plan to use a few types:

```js
import { seed, perlin2, perlinN } from 'tumult'
seed() // Equivalent to seed(Math.random())

console.log(perlin2(5, 5)
console.log(perlinN(1, 2, 3, 4, 5, 6)
```

### Documentation

#### tumult.seed(seed)
Seeds the noise generator with a `string`. If the seed is not a `string`, it will be converted into a `string`. Not providing a seed will result in `Math.random()` being used. The seed must be set before calling noise functions.

Below are the following noise functions supported as of `2.0.0`:

#### tumult.perlin1(x)
#### tumult.perlin2(x, y)
#### tumult.perlin3(x, y, z)
#### tumult.perlin4(x, y, z, t)
#### tumult.perlinN( ... )

`tumult.perlinN` is variadic, meaning you can get Nth dimensional perlin noise by passing N arguments. Note that the gradient lookup table for `perlinN` isn't optimised, so calling `perlin2(x, y)` will likely produce more "attractive" noise than `perlinN(x, y)`.

For quickly displaying heightmaps, I highly recommend using [terrapaint](https://www.npmjs.com/package/terrapaint).

### Acknowledgements

Perlin noise was invented in 1985 by Ken Perlin.
