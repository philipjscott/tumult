# tumult

My attempts at creating a noise library for Javascript. Currently supports Perlin2 and Perlin3. Soon going to support:
* Perlin1
* Perlin4
* Simplex[1-4]
* OpenSimplex[1-4]

### Installation

`npm install tumult --save`

Or,

```html
<script src="https://scottyfillups.github.io/tumult/tumult.js"></script>
```

### Usage

```js
// if using browserify or webpack:
// var tumult = require('tumult')

var noise = tumult('myseed')
console.log(noise.perlin2(5, 5))
console.log(noise.perlin3(5, 5, 5))
```

For quickly displaying heightmaps, I highly recommend using [terrapaint](https://www.npmjs.com/package/terrapaint).

### Acknowledgements

Perlin noise was invented in 1985 by Ken Perlin.
