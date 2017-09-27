# tumult

**Javascript noise library**. Demonstrations [here](http://scottyfillups.github.io/tumult). Currently supports perlin noise for any arbitrary dimension and simplex[1-2]. Eventually going to support:
* Simplex[3-4]
* OpenSimplex _(Maybe)_

### Installation

`npm install tumult --save`

Or, you can find the library files in the [GitHub repo](https://github.com/ScottyFillups/tumult). Once you download it, you can do the following:

```html
<script src="./tumult.min.js"></script>
```

### Usage

```js
// CommonJS syntax:
// var tumult = require('tumult')
import tumult from 'tumult'

var simplex2 = new tumult.Simplex2('some_seed')
for (var x = 0; x < 10; x++) {
  for (var y = 0; y < 10; y++) {
    var a = simplex2.gen(x / 64, y / 64)
    var b = simplex2.octavate(3, x / 64, y / 64)
    console.log(a, b)
  }
}
```

If you can also import specific noise functions using ES6 modules, if you only plan on using a few types:

```js
import { PerlinN } from 'tumult'
var perlinN = new PerlinN('yet_another_seed')
```

### Documentation

#### tumult (default export)
Object that stores all the noise generator constructors. Below are the following noise constructors provided as of `3.0.0`:

* **tumult.Simplex1(seed)**
* **tumult.Simplex2(seed)**
* **tumult.Perlin1(seed)**
* **tumult.Perlin2(seed)**
* **tumult.Perlin3(seed)**
* **tumult.Perlin4(seed)**
* **tumult.PerlinN(seed)**

All constructors must be invoked using `new`, and returns a noise generator object. Every generator has the following methods:

#### noiseGenerator.seed(string)
Re-seeds the permutation look-up table. If a number is passed, it will be converted to a string which will seed the generator. If no string is passed, `.seed()` defaults to using `Math.random()`

#### noiseGenerator.gen(x, y, z...)
Generates a noise value given the appropriate dimensions (eg. a simplex2 generator should take two arguments, a perlin3 generator should take three arguments, etc.)

#### noiseGenerator.octavate(octaves, x, y, z...)
Applies [fractal Brownian motion](https://thebookofshaders.com/13/), summing iterations of the noise (# of iterations = `octaves`). With each successive iteration, the frequency is doubled and the weight is halved. 

Note that the generator created by `tumult.PerlinN` is variadic, meaning you can get Nth dimensional perlin noise by passing N arguments. Note that the gradient lookup table for `perlinN` isn't optimised, so calling `perlinN(x, y)` will likely produce less "attractive" noise than `perlin2(x, y)`.

For quickly displaying heightmaps, I highly recommend using [terrapaint](https://www.npmjs.com/package/terrapaint).

#### noiseGenerator.transform(fn)
Takes in a function which will its `this` bound to noiseGenerator object, meaning you can call `gen` and `octavate` using `this.gen`, etc. This function should take in the dimensions as parameters, and return a value. `.transform` will return the new transformed noise function. For example, suppose you want a function which will return `sin(1/noise(x/32,y/32))`, you can do the following:

```js
import tumult from 'tumult'

var simplex2 = new tumult.Simplex2('seed')
var noise = simplex2.transform(function (x, y) {
  return sin(1 / this.gen(x/32, y/32))
})
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    console.log(noise(i, j))
  }
}
```

TL;DR, `noiseGenerator.transform` is essentially a helper function that lets you wrap the noise function with your own function.

### Acknowledgements

Perlin noise was invented in 1985 by Ken Perlin.
