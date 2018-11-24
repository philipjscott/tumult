# tumult

Yet another **Javascript noise library**. Demonstrations [here](http://scottyfillups.github.io/tumult). Currently supports perlin noise for any arbitrary dimension and simplex[1-2]. Eventually going to support:
* Simplex[3-4]

### Installation

```sh
npm install tumult --save
```

The built files are also available on `unpkg`:


```html
<script src="https://unpkg.com/tumult@3.0.5/dist/tumult.min.js"></script>
```

### Usage

```js
import tumult from 'tumult'

const simplex2 = new tumult.Simplex2('some_seed')

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    console.log( simplex2.gen(x / 64, y / 64))
  }
}
```

### API

#### tumult

Object that stores noise constructors. Below is the full list of constructors:

* **tumult.Simplex1(seed)**
* **tumult.Simplex2(seed)**
* **tumult.Perlin1(seed)**
* **tumult.Perlin2(seed)**
* **tumult.Perlin3(seed)**
* **tumult.Perlin4(seed)**
* **tumult.PerlinN(seed)**

#### noise

Noise object constructed from a noise constructor. All noise objects share the same API:

##### noise.seed(string)

Re-seeds the permutation look-up table. If a number is passed, it will be converted to a string which will seed the generator. If no string is passed, `.seed()` defaults to using `Math.random()`

##### noise.gen(x, y, z...)

Generates a noise value given the appropriate dimensions (eg. a simplex2 generator should take two arguments, a perlin3 generator should take three arguments, etc.)

##### noise.octavate(octaves, x, y, z...)

Applies [fractal Brownian motion](https://thebookofshaders.com/13/), summing iterations of the noise (# of iterations = `octaves`). With each successive iteration, the frequency is doubled and the weight is halved. 

Note that the generator created by `tumult.PerlinN` is variadic, meaning you can get Nth dimensional perlin noise by passing N arguments. Note that the gradient lookup table for `perlinN` isn't optimised, so calling `perlinN(x, y)` will likely produce less "attractive" noise than `perlin2(x, y)`.

For quickly displaying heightmaps, I highly recommend using [terrapaint](https://www.npmjs.com/package/terrapaint).

##### noise.transform(fn)

Takes in a function which will its `this` bound to noiseGenerator object, meaning you can call `gen` and `octavate` using `this.gen`, etc. This function should take in the dimensions as parameters, and return a value. `.transform` will return the new transformed noise function. For example, suppose you want a function which will return `sin(1/noise(x/32,y/32))`, you can do the following:

```js
import tumult from 'tumult'

const simplex2 = new tumult.Simplex2('seed')
const noise = simplex2.transform(function (x, y) {
  return sin(1 / this.gen(x/32, y/32))
})

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    console.log(noise(i, j))
  }
}
```

TL;DR, `noise.transform` is essentially a helper function that lets you wrap the noise function with your own function.

### Acknowledgements

Perlin noise was invented in 1985 by Ken Perlin.
