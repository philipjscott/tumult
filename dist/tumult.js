(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tumult", [], factory);
	else if(typeof exports === 'object')
		exports["tumult"] = factory();
	else
		root["tumult"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Noise; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_seed__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_seed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_random_seed__);


var Noise = function Noise (s) {
  this.p = new Uint8Array(512)
  this.seed(s)
};
Noise.prototype.gen = function gen () {};
Noise.prototype.seed = function seed (s) {
    var this$1 = this;

  s = s || Math.random()
  var rng = __WEBPACK_IMPORTED_MODULE_0_random_seed___default.a.create(s)
  var i
  for (i = 0; i < 256; i++) { this$1.p[i] = i }
  for (i = 0; i < 256; i++) {
    var r = rng(256)
    var temp = this$1.p[i]
    this$1.p[i] = this$1.p[r]
    this$1.p[r] = temp
  }
  for (i = 0; i < 256; i++) { this$1.p[i + 256] = this$1.p[i] }
};
Noise.prototype.transform = function transform (fn) {
    var this$1 = this;

  var transformedFn = function () {
      var dims = [], len = arguments.length;
      while ( len-- ) dims[ len ] = arguments[ len ];

    return fn.apply(this$1, dims)
  }
  return transformedFn.bind(this)
};
Noise.prototype.octavate = function octavate () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  var octaves = args[0]
  var dims = args.slice(1)
  var val = 0
  var max = 0
  for (var i = 0; i < octaves; i++) {
    var w = 1 << i
    val += this$1.gen.apply(this$1, dims.map(function (x) { return x * w; })) / w
  }
  for (var i = 0; i < octaves; i++) {
    max += 1 / (1 << i)
  }
  return val / max
};




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["c"] = fade;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cut1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cut; });
function falloff () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var dims = args.slice(1)
  var t = args[0] - dims.reduce(function (sum, val) {
    return sum + val * val
  }, 0)
  return t * t * t * t 
}

function lerp (a, b, t) {
  return a * (1 - t) + b * t
}
function fade (t) {
  return t * t * t * (10 + t * (-15 + t * 6))
}
var cut1 = falloff.bind(null, 1)
var cut = falloff.bind(null, 0.5)



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Noise__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_1d__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_math__ = __webpack_require__(1);




var Perlin1 = (function (Noise) {
  function Perlin1 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin1.__proto__ = Noise;
  Perlin1.prototype = Object.create( Noise && Noise.prototype );
  Perlin1.prototype.constructor = Perlin1;
  Perlin1.prototype.gen = function gen (x) {
    var grad1 = __WEBPACK_IMPORTED_MODULE_1__util_1d__["a" /* grad1 */].bind(null, this.p)
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = grad1(gx).dot(dx)
    var n1 = grad1(gx + 1).dot(dx - 1)

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0, n1, Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dx))
  };

  return Perlin1;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (Perlin1);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = grad1;
function Vec1 (x) {
  this.x = x
}
Vec1.prototype.dot = function (x) {
  return this.x * x
}
var g1 = [ new Vec1(1), new Vec1(-1) ]

function grad1 (p, x) {
  var hash = p[x] % g1.length
  return g1[hash]
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Noise__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_2d__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_math__ = __webpack_require__(1);




var Perlin2 = (function (Noise) {
  function Perlin2 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin2.__proto__ = Noise;
  Perlin2.prototype = Object.create( Noise && Noise.prototype );
  Perlin2.prototype.constructor = Perlin2;
  Perlin2.prototype.gen = function gen (x, y) {
    var grad2 = __WEBPACK_IMPORTED_MODULE_1__util_2d__["c" /* grad2 */].bind(null, this.p)
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256

    var dx = x - gx
    var dy = y - gy

    var n00 = grad2(gx, gy).dot(dx, dy)
    var n10 = grad2(gx + 1, gy).dot(dx - 1, dy)
    var n01 = grad2(gx, gy + 1).dot(dx, dy - 1)
    var n11 = grad2(gx + 1, gy + 1).dot(dx - 1, dy - 1)

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n00, n10, Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dx)),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n01, n11, Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dx)),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dy)
    )
  };

  return Perlin2;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (Perlin2);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = grad2;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return S2_TO_C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return C_TO_S2; });
function Vec2 (x, y) {
  this.x = x
  this.y = y
}
Vec2.prototype.dot = function (x, y) {
  return this.x * x + this.y * y
}
var g2 = [
  new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
  new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
]

function grad2 (p, x, y) {
  var hash = p[x + p[y]] % g2.length
  return g2[hash]
}
var S2_TO_C = 0.5 * (Math.sqrt(3) - 1)
var C_TO_S2 = (3 - Math.sqrt(3)) / 6



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Noise__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_3d__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_math__ = __webpack_require__(1);




var Perlin3 = (function (Noise) {
  function Perlin3 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin3.__proto__ = Noise;
  Perlin3.prototype = Object.create( Noise && Noise.prototype );
  Perlin3.prototype.constructor = Perlin3;
  Perlin3.prototype.gen = function gen (x, y, z) {
    var grad3 = __WEBPACK_IMPORTED_MODULE_1__util_3d__["a" /* grad3 */].bind(null, this.p)
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256
    var gz = Math.trunc(z) % 256

    var dx = x - gx
    var dy = y - gy
    var dz = z - gz

    var n000 = grad3(gx, gy, gz).dot(dx, dy, dz)
    var n100 = grad3(gx + 1, gy, gz).dot(dx - 1, dy, dz)
    var n010 = grad3(gx, gy + 1, gz).dot(dx, dy - 1, dz)
    var n110 = grad3(gx + 1, gy + 1, gz).dot(dx - 1, dy - 1, dz)
    var n001 = grad3(gx, gy, gz + 1).dot(dx, dy, dz - 1)
    var n101 = grad3(gx + 1, gy, gz + 1).dot(dx - 1, dy, dz - 1)
    var n011 = grad3(gx, gy + 1, gz + 1).dot(dx, dy - 1, dz - 1)
    var n111 = grad3(gx + 1, gy + 1, gz + 1).dot(dx - 1, dy - 1, dz - 1)

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n000, n100, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n010, n110, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dy)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n001, n101, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n011, n111, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dy)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dz)
    )
  };

  return Perlin3;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (Perlin3);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Noise__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_4d__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_math__ = __webpack_require__(1);




var Perlin4 = (function (Noise) {
  function Perlin4 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin4.__proto__ = Noise;
  Perlin4.prototype = Object.create( Noise && Noise.prototype );
  Perlin4.prototype.constructor = Perlin4;
  Perlin4.prototype.gen = function gen (x, y, z, t) {
    var grad4 = __WEBPACK_IMPORTED_MODULE_1__util_4d__["a" /* grad4 */].bind(null, this.p)
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256
    var gz = Math.trunc(z) % 256
    var gt = Math.trunc(t) % 256

    var dx = x - gx
    var dy = y - gy
    var dz = z - gz
    var dt = t - gt

    var n0000 = grad4(gx, gy, gz, gt).dot(dx, dy, dz, dt)
    var n1000 = grad4(gx + 1, gy, gz, gt).dot(dx - 1, dy, dz)
    var n0100 = grad4(gx, gy + 1, gz, gt).dot(dx, dy - 1, dz)
    var n1100 = grad4(gx + 1, gy + 1, gz, gt).dot(dx - 1, dy - 1, dz)
    var n0010 = grad4(gx, gy, gz + 1, gt).dot(dx, dy, dz - 1)
    var n1010 = grad4(gx + 1, gy, gz + 1, gt).dot(dx - 1, dy, dz - 1)
    var n0110 = grad4(gx, gy + 1, gz + 1, gt).dot(dx, dy - 1, dz - 1)
    var n1110 = grad4(gx + 1, gy + 1, gz + 1, gt).dot(dx - 1, dy - 1, dz - 1)
    var n0001 = grad4(gx, gy, gz, gt + 1).dot(dx, dy, dz, dt - 1)
    var n1001 = grad4(gx + 1, gy, gz, gt + 1).dot(dx - 1, dy, dz, dt - 1)
    var n0101 = grad4(gx, gy + 1, gz, gt + 1).dot(dx, dy - 1, dz, dt - 1)
    var n1101 = grad4(gx + 1, gy + 1, gz, gt + 1).dot(dx - 1, dy - 1, dz, dt - 1)
    var n0011 = grad4(gx, gy, gz + 1, gt + 1).dot(dx, dy, dz - 1, dt - 1)
    var n1011 = grad4(gx + 1, gy, gz + 1, gt + 1).dot(dx - 1, dy, dz - 1, dt - 1)
    var n0111 = grad4(gx, gy + 1, gz + 1, gt + 1).dot(dx, dy - 1, dz - 1, dt - 1)
    var n1111 = grad4(gx + 1, gy + 1, gz + 1, gt + 1).dot(dx - 1, dy - 1, dz - 1, dt - 1)

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0000, n1000, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0100, n1100, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0010, n1010, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0110, n1110, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dz)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0001, n1001, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0101, n1101, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0011, n1011, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["d" /* lerp */])(n0111, n1111, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dz)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* fade */])(dt)
    )
  };

  return Perlin4;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (Perlin4);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Noise__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_Nd__ = __webpack_require__(17);



var PerlinN = (function (Noise) {
  function PerlinN (s) {
    Noise.call(this, s)
  }

  if ( Noise ) PerlinN.__proto__ = Noise;
  PerlinN.prototype = Object.create( Noise && Noise.prototype );
  PerlinN.prototype.constructor = PerlinN;
  PerlinN.prototype.gen = function gen () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var getNs = __WEBPACK_IMPORTED_MODULE_1__util_Nd__["c" /* getNs */].bind(null, this.p)
    var gs = []
    var ds = []

    if (__WEBPACK_IMPORTED_MODULE_1__util_Nd__["a" /* gN */].length === 0) {
      Object(__WEBPACK_IMPORTED_MODULE_1__util_Nd__["b" /* generateGN */])(args.length)
    }

    var i
    for (i = 0; i < args.length; i++) {
      gs[i] = Math.trunc(args[i]) % 256
      ds[i] = args[i] - gs[i]
    }
    var ns = getNs(args.length, gs, ds)
    var res = Object(__WEBPACK_IMPORTED_MODULE_1__util_Nd__["d" /* lerpN */])(ns, ds)
    return res
  };

  return PerlinN;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (PerlinN);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Noise__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_1d__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_math__ = __webpack_require__(1);




var Simplex1 = (function (Noise) {
  function Simplex1 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Simplex1.__proto__ = Noise;
  Simplex1.prototype = Object.create( Noise && Noise.prototype );
  Simplex1.prototype.constructor = Simplex1;
  Simplex1.prototype.gen = function gen (x) {
    var grad1 = __WEBPACK_IMPORTED_MODULE_1__util_1d__["a" /* grad1 */].bind(null, this.p)
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* cut1 */])(dx) * grad1(gx).dot(dx)
    var n1 = Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* cut1 */])(dx - 1) * grad1(gx + 1).dot(dx - 1)

    return 0.5 * (n0 + n1)
  };

  return Simplex1;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (Simplex1);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Noise__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_2d__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_math__ = __webpack_require__(1);




var Simplex2 = (function (Noise) {
  function Simplex2 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Simplex2.__proto__ = Noise;
  Simplex2.prototype = Object.create( Noise && Noise.prototype );
  Simplex2.prototype.constructor = Simplex2;
  Simplex2.prototype.gen = function gen (x, y) {
    if (this === undefined) {
      console.log(this)
    }
    var grad2 = __WEBPACK_IMPORTED_MODULE_1__util_2d__["c" /* grad2 */].bind(null, this.p)
    var skew = (x + y) * __WEBPACK_IMPORTED_MODULE_1__util_2d__["b" /* S2_TO_C */]
    var i = Math.trunc(x + skew)
    var j = Math.trunc(y + skew)

    var unskew = (i + j) * __WEBPACK_IMPORTED_MODULE_1__util_2d__["a" /* C_TO_S2 */]
    var gx = i - unskew
    var gy = j - unskew

    var dx0 = x - gx
    var dy0 = y - gy

    var di = dx0 > dy0 ? 1 : 0
    var dj = dx0 > dy0 ? 0 : 1

    // why isn't it + di - C_TO_S2?
    var dx1 = dx0 - di + __WEBPACK_IMPORTED_MODULE_1__util_2d__["a" /* C_TO_S2 */]
    var dy1 = dy0 - dj + __WEBPACK_IMPORTED_MODULE_1__util_2d__["a" /* C_TO_S2 */]
    var dx2 = dx0 - 1 + 2 * __WEBPACK_IMPORTED_MODULE_1__util_2d__["a" /* C_TO_S2 */]
    var dy2 = dy0 - 1 + 2 * __WEBPACK_IMPORTED_MODULE_1__util_2d__["a" /* C_TO_S2 */]

    var n0 = Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["a" /* cut */])(dx0, dy0) * grad2(i, j).dot(dx0, dy0)
    var n1 = Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["a" /* cut */])(dx1, dy1) * grad2(i + di, j + dj).dot(dx1, dy1)
    var n2 = Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["a" /* cut */])(dx2, dy2) * grad2(i + 1, j + 1).dot(dx2, dy2)

    return 70 * (n0 + n1 + n2)
  };

  return Simplex2;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (Simplex2);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__perlin_index__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simplex_index__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__perlin_Perlin1__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin1", function() { return __WEBPACK_IMPORTED_MODULE_2__perlin_Perlin1__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__perlin_Perlin2__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin2", function() { return __WEBPACK_IMPORTED_MODULE_3__perlin_Perlin2__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perlin_Perlin3__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin3", function() { return __WEBPACK_IMPORTED_MODULE_4__perlin_Perlin3__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__perlin_Perlin4__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin4", function() { return __WEBPACK_IMPORTED_MODULE_5__perlin_Perlin4__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__perlin_PerlinN__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PerlinN", function() { return __WEBPACK_IMPORTED_MODULE_6__perlin_PerlinN__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__simplex_Simplex1__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Simplex1", function() { return __WEBPACK_IMPORTED_MODULE_7__simplex_Simplex1__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__simplex_Simplex2__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Simplex2", function() { return __WEBPACK_IMPORTED_MODULE_8__simplex_Simplex2__["a"]; });











/* harmony default export */ __webpack_exports__["default"] = ({
  Simplex1: __WEBPACK_IMPORTED_MODULE_1__simplex_index__["a" /* Simplex1 */],
  Simplex2: __WEBPACK_IMPORTED_MODULE_1__simplex_index__["b" /* Simplex2 */],
  Perlin1: __WEBPACK_IMPORTED_MODULE_0__perlin_index__["a" /* Perlin1 */],
  Perlin2: __WEBPACK_IMPORTED_MODULE_0__perlin_index__["b" /* Perlin2 */],
  Perlin3: __WEBPACK_IMPORTED_MODULE_0__perlin_index__["c" /* Perlin3 */],
  Perlin4: __WEBPACK_IMPORTED_MODULE_0__perlin_index__["d" /* Perlin4 */],
  PerlinN: __WEBPACK_IMPORTED_MODULE_0__perlin_index__["e" /* PerlinN */]
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Perlin1__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Perlin1__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Perlin2__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Perlin2__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Perlin3__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__Perlin3__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Perlin4__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__Perlin4__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PerlinN__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__PerlinN__["a"]; });







/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * random-seed
 * https://github.com/skratchdot/random-seed
 *
 * This code was originally written by Steve Gibson and can be found here:
 *
 * https://www.grc.com/otg/uheprng.htm
 *
 * It was slightly modified for use in node, to pass jshint, and a few additional
 * helper functions were added.
 *
 * Copyright (c) 2013 skratchdot
 * Dual Licensed under the MIT license and the original GRC copyright/license
 * included below.
 */
/*	============================================================================
									Gibson Research Corporation
				UHEPRNG - Ultra High Entropy Pseudo-Random Number Generator
	============================================================================
	LICENSE AND COPYRIGHT:  THIS CODE IS HEREBY RELEASED INTO THE PUBLIC DOMAIN
	Gibson Research Corporation releases and disclaims ALL RIGHTS AND TITLE IN
	THIS CODE OR ANY DERIVATIVES. Anyone may be freely use it for any purpose.
	============================================================================
	This is GRC's cryptographically strong PRNG (pseudo-random number generator)
	for JavaScript. It is driven by 1536 bits of entropy, stored in an array of
	48, 32-bit JavaScript variables.  Since many applications of this generator,
	including ours with the "Off The Grid" Latin Square generator, may require
	the deteriministic re-generation of a sequence of PRNs, this PRNG's initial
	entropic state can be read and written as a static whole, and incrementally
	evolved by pouring new source entropy into the generator's internal state.
	----------------------------------------------------------------------------
	ENDLESS THANKS are due Johannes Baagoe for his careful development of highly
	robust JavaScript implementations of JS PRNGs.  This work was based upon his
	JavaScript "Alea" PRNG which is based upon the extremely robust Multiply-
	With-Carry (MWC) PRNG invented by George Marsaglia. MWC Algorithm References:
	http://www.GRC.com/otg/Marsaglia_PRNGs.pdf
	http://www.GRC.com/otg/Marsaglia_MWC_Generators.pdf
	----------------------------------------------------------------------------
	The quality of this algorithm's pseudo-random numbers have been verified by
	multiple independent researchers. It handily passes the fermilab.ch tests as
	well as the "diehard" and "dieharder" test suites.  For individuals wishing
	to further verify the quality of this algorithm's pseudo-random numbers, a
	256-megabyte file of this algorithm's output may be downloaded from GRC.com,
	and a Microsoft Windows scripting host (WSH) version of this algorithm may be
	downloaded and run from the Windows command prompt to generate unique files
	of any size:
	The Fermilab "ENT" tests: http://fourmilab.ch/random/
	The 256-megabyte sample PRN file at GRC: https://www.GRC.com/otg/uheprng.bin
	The Windows scripting host version: https://www.GRC.com/otg/wsh-uheprng.js
	----------------------------------------------------------------------------
	Qualifying MWC multipliers are: 187884, 686118, 898134, 1104375, 1250205,
	1460910 and 1768863. (We use the largest one that's < 2^21)
	============================================================================ */

var stringify = __webpack_require__(14);

/*	============================================================================
This is based upon Johannes Baagoe's carefully designed and efficient hash
function for use with JavaScript.  It has a proven "avalanche" effect such
that every bit of the input affects every bit of the output 50% of the time,
which is good.	See: http://baagoe.com/en/RandomMusings/hash/avalanche.xhtml
============================================================================
*/
var Mash = function () {
	var n = 0xefc8249d;
	var mash = function (data) {
		if (data) {
			data = data.toString();
			for (var i = 0; i < data.length; i++) {
				n += data.charCodeAt(i);
				var h = 0.02519603282416938 * n;
				n = h >>> 0;
				h -= n;
				h *= n;
				n = h >>> 0;
				h -= n;
				n += h * 0x100000000; // 2^32
			}
			return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
		} else {
			n = 0xefc8249d;
		}
	};
	return mash;
};

var uheprng = function (seed) {
	return (function () {
		var o = 48; // set the 'order' number of ENTROPY-holding 32-bit values
		var c = 1; // init the 'carry' used by the multiply-with-carry (MWC) algorithm
		var p = o; // init the 'phase' (max-1) of the intermediate variable pointer
		var s = new Array(o); // declare our intermediate variables array
		var i; // general purpose local
		var j; // general purpose local
		var k = 0; // general purpose local

		// when our "uheprng" is initially invoked our PRNG state is initialized from the
		// browser's own local PRNG. This is okay since although its generator might not
		// be wonderful, it's useful for establishing large startup entropy for our usage.
		var mash = new Mash(); // get a pointer to our high-performance "Mash" hash

		// fill the array with initial mash hash values
		for (i = 0; i < o; i++) {
			s[i] = mash(Math.random());
		}

		// this PRIVATE (internal access only) function is the heart of the multiply-with-carry
		// (MWC) PRNG algorithm. When called it returns a pseudo-random number in the form of a
		// 32-bit JavaScript fraction (0.0 to <1.0) it is a PRIVATE function used by the default
		// [0-1] return function, and by the random 'string(n)' function which returns 'n'
		// characters from 33 to 126.
		var rawprng = function () {
			if (++p >= o) {
				p = 0;
			}
			var t = 1768863 * s[p] + c * 2.3283064365386963e-10; // 2^-32
			return s[p] = t - (c = t | 0);
		};

		// this EXPORTED function is the default function returned by this library.
		// The values returned are integers in the range from 0 to range-1. We first
		// obtain two 32-bit fractions (from rawprng) to synthesize a single high
		// resolution 53-bit prng (0 to <1), then we multiply this by the caller's
		// "range" param and take the "floor" to return a equally probable integer.
		var random = function (range) {
			return Math.floor(range * (rawprng() + (rawprng() * 0x200000 | 0) * 1.1102230246251565e-16)); // 2^-53
		};

		// this EXPORTED function 'string(n)' returns a pseudo-random string of
		// 'n' printable characters ranging from chr(33) to chr(126) inclusive.
		random.string = function (count) {
			var i;
			var s = '';
			for (i = 0; i < count; i++) {
				s += String.fromCharCode(33 + random(94));
			}
			return s;
		};

		// this PRIVATE "hash" function is used to evolve the generator's internal
		// entropy state. It is also called by the EXPORTED addEntropy() function
		// which is used to pour entropy into the PRNG.
		var hash = function () {
			var args = Array.prototype.slice.call(arguments);
			for (i = 0; i < args.length; i++) {
				for (j = 0; j < o; j++) {
					s[j] -= mash(args[i]);
					if (s[j] < 0) {
						s[j] += 1;
					}
				}
			}
		};

		// this EXPORTED "clean string" function removes leading and trailing spaces and non-printing
		// control characters, including any embedded carriage-return (CR) and line-feed (LF) characters,
		// from any string it is handed. this is also used by the 'hashstring' function (below) to help
		// users always obtain the same EFFECTIVE uheprng seeding key.
		random.cleanString = function (inStr) {
			inStr = inStr.replace(/(^\s*)|(\s*$)/gi, ''); // remove any/all leading spaces
			inStr = inStr.replace(/[\x00-\x1F]/gi, ''); // remove any/all control characters
			inStr = inStr.replace(/\n /, '\n'); // remove any/all trailing spaces
			return inStr; // return the cleaned up result
		};

		// this EXPORTED "hash string" function hashes the provided character string after first removing
		// any leading or trailing spaces and ignoring any embedded carriage returns (CR) or Line Feeds (LF)
		random.hashString = function (inStr) {
			inStr = random.cleanString(inStr);
			mash(inStr); // use the string to evolve the 'mash' state
			for (i = 0; i < inStr.length; i++) { // scan through the characters in our string
				k = inStr.charCodeAt(i); // get the character code at the location
				for (j = 0; j < o; j++) { //	"mash" it into the UHEPRNG state
					s[j] -= mash(k);
					if (s[j] < 0) {
						s[j] += 1;
					}
				}
			}
		};

		// this EXPORTED function allows you to seed the random generator.
		random.seed = function (seed) {
			if (typeof seed === 'undefined' || seed === null) {
				seed = Math.random();
			}
			if (typeof seed !== 'string') {
				seed = stringify(seed, function (key, value) {
					if (typeof value === 'function') {
						return (value).toString();
					}
					return value;
				});
			}
			random.initState();
			random.hashString(seed);
		};

		// this handy exported function is used to add entropy to our uheprng at any time
		random.addEntropy = function ( /* accept zero or more arguments */ ) {
			var args = [];
			for (i = 0; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			hash((k++) + (new Date().getTime()) + args.join('') + Math.random());
		};

		// if we want to provide a deterministic startup context for our PRNG,
		// but without directly setting the internal state variables, this allows
		// us to initialize the mash hash and PRNG's internal state before providing
		// some hashing input
		random.initState = function () {
			mash(); // pass a null arg to force mash hash to init
			for (i = 0; i < o; i++) {
				s[i] = mash(' '); // fill the array with initial mash hash values
			}
			c = 1; // init our multiply-with-carry carry
			p = o; // init our phase
		};

		// we use this (optional) exported function to signal the JavaScript interpreter
		// that we're finished using the "Mash" hash function so that it can free up the
		// local "instance variables" is will have been maintaining.  It's not strictly
		// necessary, of course, but it's good JavaScript citizenship.
		random.done = function () {
			mash = null;
		};

		// if we called "uheprng" with a seed value, then execute random.seed() before returning
		if (typeof seed !== 'undefined') {
			random.seed(seed);
		}

		// Returns a random integer between 0 (inclusive) and range (exclusive)
		random.range = function (range) {
			return random(range);
		};

		// Returns a random float between 0 (inclusive) and 1 (exclusive)
		random.random = function () {
			return random(Number.MAX_VALUE - 1) / Number.MAX_VALUE;
		};

		// Returns a random float between min (inclusive) and max (exclusive)
		random.floatBetween = function (min, max) {
			return random.random() * (max - min) + min;
		};

		// Returns a random integer between min (inclusive) and max (inclusive)
		random.intBetween = function (min, max) {
			return Math.floor(random.random() * (max - min + 1)) + min;
		};

		// when our main outer "uheprng" function is called, after setting up our
		// initial variables and entropic state, we return an "instance pointer"
		// to the internal anonymous function which can then be used to access
		// the uheprng's various exported functions.  As with the ".done" function
		// above, we should set the returned value to 'null' once we're finished
		// using any of these functions.
		return random;
	}());
};

// Modification for use in node:
uheprng.create = function (seed) {
	return new uheprng(seed);
};
module.exports = uheprng;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = grad3;
function Vec3 (x, y, z) {
  this.x = x
  this.y = y
  this.z = z
}
Vec3.prototype.dot = function (x, y, z) {
  return this.x * x + this.y * y + this.z * z
}
var g3 = [
  new Vec3(1, 1, 1), new Vec3(-1, 1, 1), new Vec3(1, -1, 1), new Vec3(-1, -1, 1),
  new Vec3(1, 1, 0), new Vec3(-1, 1, 0), new Vec3(1, -1, 0), new Vec3(-1, -1, 0),
  new Vec3(1, 1, -1), new Vec3(-1, 1, -1), new Vec3(1, -1, -1), new Vec3(-1, -1, -1)
]

function grad3 (p, x, y, z) {
  var hash = p[x + p[y + p[z]]] % g3.length
  return g3[hash]
}



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = grad4;
function Vec4 (x, y, z, t) {
  this.x = x
  this.y = y
  this.z = z
  this.t = t
}
Vec4.prototype.dot = function (x, y, z, t) {
  return this.x * x + this.y * y + this.z * z + this.t * t
}
var g4 = [
  new Vec4(0, 1, 1, 1), new Vec4(0, 1, 1, -1), new Vec4(0, 1, -1, 1), new Vec4(0, 1, -1, -1),
  new Vec4(0, -1, 1, 1), new Vec4(0, -1, 1, -1), new Vec4(0, -1, -1, 1), new Vec4(0, -1, -1, -1),
  new Vec4(1, 0, 1, 1), new Vec4(1, 0, 1, -1), new Vec4(1, 0, -1, 1), new Vec4(1, 0, -1, -1),
  new Vec4(-1, 0, 1, 1), new Vec4(-1, 0, 1, -1), new Vec4(-1, 0, -1, 1), new Vec4(-1, 0, -1, -1),
  new Vec4(1, 1, 0, 1), new Vec4(1, 1, 0, -1), new Vec4(1, -1, 0, 1), new Vec4(1, -1, 0, -1),
  new Vec4(-1, 1, 0, 1), new Vec4(-1, 1, 0, -1), new Vec4(-1, -1, 0, 1), new Vec4(-1, -1, 0, -1),
  new Vec4(1, 1, 1, 0), new Vec4(1, 1, -1, 0), new Vec4(1, -1, 1, 0), new Vec4(1, -1, -1, 0),
  new Vec4(-1, 1, 1, 0), new Vec4(-1, 1, -1, 0), new Vec4(-1, -1, 1, 0), new Vec4(-1, -1, -1, 0)
]

function grad4 (p, x, y, z, t) {
  var hash = p[x + p[y + p[z + p[t]]]] % g4.length
  return g4[hash]
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gN; });
/* harmony export (immutable) */ __webpack_exports__["b"] = generateGN;
/* harmony export (immutable) */ __webpack_exports__["d"] = lerpN;
/* harmony export (immutable) */ __webpack_exports__["c"] = getNs;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(1);


function hashN (p, gs) {
  if (gs.length === 1) { return p[gs[0]] }
  return p[gs[0] + hashN(p, gs.slice(1))]
}
function VecN(R) {
  this.R = R
}
VecN.prototype.dot = function (R) {
  var this$1 = this;

  var val = 0
  for (var i = 0; i < R.length; i++) {
    val += this$1.R[i] * R[i]
  }
  return val
}

var gN = []
function generateGN (dim) {
  for (var i = 0; i < dim * 2; i++) {
    var vec = new Array(dim).fill(0)
    vec[i % dim] = i / dim >= 1 ? 1 : -1
    gN[i] = new VecN(vec)
  }
}
function lerpN (ns, ds) {
  if (ds.length === 1) { return Object(__WEBPACK_IMPORTED_MODULE_0__math__["d" /* lerp */])(ns[0], ns[1], Object(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* fade */])(ds[0])) }
  var ns1 = ns.slice(0, Math.floor(ns.length / 2))
  var ns2 = ns.slice(Math.ceil(ns.length / 2))
  return Object(__WEBPACK_IMPORTED_MODULE_0__math__["d" /* lerp */])(
    lerpN(ns1, ds.slice(0, ds.length - 1)),
    lerpN(ns2, ds.slice(0, ds.length - 1)),
    Object(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* fade */])(ds[ds.length - 1])
  )
}
function getNs (p, dim, gs, ds) {
  var ns = []
  for (var i = 0; i < (2 << (dim - 1)); i++) {
    var gsPerm = gs.slice()
    var dsPerm = ds.slice()
    var temp = i

    for (var j = 0; j < dim; j++) {
      if (temp & 1) {
        gsPerm[j] += 1
        dsPerm[j] -= 1
      }
      temp = temp >> 1
    }
    ns[i] = gN[hashN(p, gsPerm) % gN.length].dot(dsPerm)
  }
  return ns
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Simplex1__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Simplex1__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Simplex2__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Simplex2__["a"]; });




/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzNDc1ODBlZTUxMDA2M2I0NTEyZSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9Ob2lzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9tYXRoLmpzIiwid2VicGFjazovLy8uL3NyYy9wZXJsaW4vUGVybGluMS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC8xZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL1BlcmxpbjIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvMmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Blcmxpbi9QZXJsaW4zLmpzIiwid2VicGFjazovLy8uL3NyYy9wZXJsaW4vUGVybGluNC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL1Blcmxpbk4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZXgvU2ltcGxleDEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZXgvU2ltcGxleDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wZXJsaW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JhbmRvbS1zZWVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC8zZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC80ZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9OZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2ltcGxleC9pbmRleC5qcyJdLCJuYW1lcyI6WyJ0aGlzIiwiY29uc3QiLCJzdXBlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM1QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7O0lBRXBFLE9BQU8sZ0VBQUk7TUFDVCxnRUFBSTtRQUNGLGdFQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsZ0VBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNwQixnRUFBSSxDQUFDLEVBQUUsQ0FBQztPQUNUO01BQ0QsZ0VBQUk7UUFDRixnRUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLGdFQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsZ0VBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELGdFQUFJLENBQUMsRUFBRSxDQUFDO0tBQ1Q7R0FDRixDQUNGOzs7RUFyQ29DLDBEQXFDcEM7O2tFQUFBOzs7Ozs7Ozs7OztBQ3pDb0M7QUFDSztBQUNEOztBQUUxQixJQUFNLE9BQU8sR0FBYztFQUN4QyxnQkFBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ2RBLEtBQUssTUFBQyxPQUFDLENBQUM7R0FDVDs7OzswQ0FBQTtFQUNELHFCQUFJLGlCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNmLElBQUksS0FBSyxHQUFHLHVEQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25DLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRzs7SUFFNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7O0lBRWYsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDckQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN6RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNqRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0UsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM1FBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUJBO0FBQUEsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ1g7QUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3RDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQzVDO0FBQ0QsSUFBSSxFQUFFLEdBQUc7RUFDUCxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDOUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ25GOztBQUVNLFNBQVMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNqQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTTtFQUN6QyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7Q0FDaEI7Ozs7Ozs7OztBQ2pCRDtBQUFBLFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN6QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDWDtBQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3pDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ3pEO0FBQ0QsSUFBSSxFQUFFLEdBQUc7RUFDUCxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMxRixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDOUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM5RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUs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RyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtNQUM1QixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO09BQ2Y7TUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7S0FDakI7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7R0FDckQ7RUFDRCxPQUFPLEVBQUU7Q0FDVjs7Ozs7Ozs7Ozs7O0FDcEQrQztBQUNBIiwiZmlsZSI6InR1bXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidHVtdWx0XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInR1bXVsdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0dW11bHRcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM0NzU4MGVlNTEwMDYzYjQ1MTJlIiwiaW1wb3J0IHJhbmQgZnJvbSAncmFuZG9tLXNlZWQnXG5cbmV4cG9ydCBjbGFzcyBOb2lzZSB7XG4gIGNvbnN0cnVjdG9yIChzKSB7XG4gICAgdGhpcy5wID0gbmV3IFVpbnQ4QXJyYXkoNTEyKVxuICAgIHRoaXMuc2VlZChzKVxuICB9XG4gIGdlbiAoKSB7fVxuICBzZWVkIChzKSB7XG4gICAgcyA9IHMgfHwgTWF0aC5yYW5kb20oKVxuICAgIHZhciBybmcgPSByYW5kLmNyZWF0ZShzKVxuICAgIHZhciBpXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB0aGlzLnBbaV0gPSBpXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICB2YXIgciA9IHJuZygyNTYpXG4gICAgICB2YXIgdGVtcCA9IHRoaXMucFtpXVxuICAgICAgdGhpcy5wW2ldID0gdGhpcy5wW3JdXG4gICAgICB0aGlzLnBbcl0gPSB0ZW1wXG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykgdGhpcy5wW2kgKyAyNTZdID0gdGhpcy5wW2ldXG4gIH1cbiAgdHJhbnNmb3JtIChmbikge1xuICAgIHZhciB0cmFuc2Zvcm1lZEZuID0gKC4uLmRpbXMpID0+IHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBkaW1zKVxuICAgIH1cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRGbi5iaW5kKHRoaXMpXG4gIH1cbiAgb2N0YXZhdGUgKC4uLmFyZ3MpIHtcbiAgICB2YXIgb2N0YXZlcyA9IGFyZ3NbMF1cbiAgICB2YXIgZGltcyA9IGFyZ3Muc2xpY2UoMSlcbiAgICB2YXIgdmFsID0gMFxuICAgIHZhciBtYXggPSAwXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvY3RhdmVzOyBpKyspIHtcbiAgICAgIHZhciB3ID0gMSA8PCBpXG4gICAgICB2YWwgKz0gdGhpcy5nZW4uYXBwbHkodGhpcywgZGltcy5tYXAoeCA9PiB4ICogdykpIC8gd1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9jdGF2ZXM7IGkrKykge1xuICAgICAgbWF4ICs9IDEgLyAoMSA8PCBpKVxuICAgIH1cbiAgICByZXR1cm4gdmFsIC8gbWF4XG4gIH1cbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9Ob2lzZS5qcyIsImZ1bmN0aW9uIGZhbGxvZmYgKC4uLmFyZ3MpIHtcbiAgdmFyIGRpbXMgPSBhcmdzLnNsaWNlKDEpXG4gIGNvbnN0IHQgPSBhcmdzWzBdIC0gZGltcy5yZWR1Y2UoKHN1bSwgdmFsKSA9PiB7XG4gICAgcmV0dXJuIHN1bSArIHZhbCAqIHZhbFxuICB9LCAwKVxuICByZXR1cm4gdCAqIHQgKiB0ICogdCBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAgKGEsIGIsIHQpIHtcbiAgcmV0dXJuIGEgKiAoMSAtIHQpICsgYiAqIHRcbn1cbmV4cG9ydCBmdW5jdGlvbiBmYWRlICh0KSB7XG4gIHJldHVybiB0ICogdCAqIHQgKiAoMTAgKyB0ICogKC0xNSArIHQgKiA2KSlcbn1cbmV4cG9ydCB2YXIgY3V0MSA9IGZhbGxvZmYuYmluZChudWxsLCAxKVxuZXhwb3J0IHZhciBjdXQgPSBmYWxsb2ZmLmJpbmQobnVsbCwgMC41KVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9tYXRoLmpzIiwiaW1wb3J0IHsgTm9pc2UgfSBmcm9tICcuLi91dGlsL05vaXNlJ1xyXG5pbXBvcnQgeyBncmFkMSBhcyBncmFkIH0gZnJvbSAnLi4vdXRpbC8xZCdcclxuaW1wb3J0IHsgbGVycCwgZmFkZSB9IGZyb20gJy4uL3V0aWwvbWF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcmxpbjEgZXh0ZW5kcyBOb2lzZSB7XHJcbiAgY29uc3RydWN0b3IgKHMpIHtcclxuICAgIHN1cGVyKHMpXHJcbiAgfVxyXG4gIGdlbiAoeCkge1xyXG4gICAgdmFyIGdyYWQxID0gZ3JhZC5iaW5kKG51bGwsIHRoaXMucClcclxuICAgIHZhciBneCA9IE1hdGguZmxvb3IoeCkgJSAyNTZcclxuICAgIHZhciBkeCA9IHggLSBneFxyXG5cclxuICAgIHZhciBuMCA9IGdyYWQxKGd4KS5kb3QoZHgpXHJcbiAgICB2YXIgbjEgPSBncmFkMShneCArIDEpLmRvdChkeCAtIDEpXHJcblxyXG4gICAgcmV0dXJuIGxlcnAobjAsIG4xLCBmYWRlKGR4KSlcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Blcmxpbi9QZXJsaW4xLmpzIiwiZnVuY3Rpb24gVmVjMSAoeCkge1xuICB0aGlzLnggPSB4XG59XG5WZWMxLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gdGhpcy54ICogeFxufVxudmFyIGcxID0gWyBuZXcgVmVjMSgxKSwgbmV3IFZlYzEoLTEpIF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyYWQxIChwLCB4KSB7XG4gIHZhciBoYXNoID0gcFt4XSAlIGcxLmxlbmd0aFxuICByZXR1cm4gZzFbaGFzaF1cbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC8xZC5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcclxuaW1wb3J0IHsgZ3JhZDIgYXMgZ3JhZCB9IGZyb20gJy4uL3V0aWwvMmQnXHJcbmltcG9ydCB7IGZhZGUsIGxlcnAgfSBmcm9tICcuLi91dGlsL21hdGgnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJsaW4yIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgsIHkpIHtcclxuICAgIHZhciBncmFkMiA9IGdyYWQuYmluZChudWxsLCB0aGlzLnApXHJcbiAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XHJcblxyXG4gICAgdmFyIGR4ID0geCAtIGd4XHJcbiAgICB2YXIgZHkgPSB5IC0gZ3lcclxuXHJcbiAgICB2YXIgbjAwID0gZ3JhZDIoZ3gsIGd5KS5kb3QoZHgsIGR5KVxyXG4gICAgdmFyIG4xMCA9IGdyYWQyKGd4ICsgMSwgZ3kpLmRvdChkeCAtIDEsIGR5KVxyXG4gICAgdmFyIG4wMSA9IGdyYWQyKGd4LCBneSArIDEpLmRvdChkeCwgZHkgLSAxKVxyXG4gICAgdmFyIG4xMSA9IGdyYWQyKGd4ICsgMSwgZ3kgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEpXHJcblxyXG4gICAgcmV0dXJuIGxlcnAoXHJcbiAgICAgIGxlcnAobjAwLCBuMTAsIGZhZGUoZHgpKSxcclxuICAgICAgbGVycChuMDEsIG4xMSwgZmFkZShkeCkpLFxyXG4gICAgICBmYWRlKGR5KVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGVybGluL1BlcmxpbjIuanMiLCJmdW5jdGlvbiBWZWMyICh4LCB5KSB7XG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxufVxuVmVjMi5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5XG59XG52YXIgZzIgPSBbXG4gIG5ldyBWZWMyKDEsIDApLCBuZXcgVmVjMigxLCAxKSwgbmV3IFZlYzIoMCwgMSksIG5ldyBWZWMyKC0xLCAxKSxcbiAgbmV3IFZlYzIoLTEsIDApLCBuZXcgVmVjMigtMSwgLTEpLCBuZXcgVmVjMigwLCAtMSksIG5ldyBWZWMyKDEsIC0xKVxuXVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JhZDIgKHAsIHgsIHkpIHtcbiAgdmFyIGhhc2ggPSBwW3ggKyBwW3ldXSAlIGcyLmxlbmd0aFxuICByZXR1cm4gZzJbaGFzaF1cbn1cbmV4cG9ydCB2YXIgUzJfVE9fQyA9IDAuNSAqIChNYXRoLnNxcnQoMykgLSAxKVxuZXhwb3J0IHZhciBDX1RPX1MyID0gKDMgLSBNYXRoLnNxcnQoMykpIC8gNlxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC8yZC5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcclxuaW1wb3J0IHsgZ3JhZDMgYXMgZ3JhZCB9IGZyb20gJy4uL3V0aWwvM2QnXHJcbmltcG9ydCB7IGZhZGUsIGxlcnAgfSBmcm9tICcuLi91dGlsL21hdGgnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJsaW4zIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgsIHksIHopIHtcclxuICAgIHZhciBncmFkMyA9IGdyYWQuYmluZChudWxsLCB0aGlzLnApXHJcbiAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XHJcbiAgICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XHJcblxyXG4gICAgdmFyIGR4ID0geCAtIGd4XHJcbiAgICB2YXIgZHkgPSB5IC0gZ3lcclxuICAgIHZhciBkeiA9IHogLSBnelxyXG5cclxuICAgIHZhciBuMDAwID0gZ3JhZDMoZ3gsIGd5LCBneikuZG90KGR4LCBkeSwgZHopXHJcbiAgICB2YXIgbjEwMCA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6KS5kb3QoZHggLSAxLCBkeSwgZHopXHJcbiAgICB2YXIgbjAxMCA9IGdyYWQzKGd4LCBneSArIDEsIGd6KS5kb3QoZHgsIGR5IC0gMSwgZHopXHJcbiAgICB2YXIgbjExMCA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneikuZG90KGR4IC0gMSwgZHkgLSAxLCBkeilcclxuICAgIHZhciBuMDAxID0gZ3JhZDMoZ3gsIGd5LCBneiArIDEpLmRvdChkeCwgZHksIGR6IC0gMSlcclxuICAgIHZhciBuMTAxID0gZ3JhZDMoZ3ggKyAxLCBneSwgZ3ogKyAxKS5kb3QoZHggLSAxLCBkeSwgZHogLSAxKVxyXG4gICAgdmFyIG4wMTEgPSBncmFkMyhneCwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCwgZHkgLSAxLCBkeiAtIDEpXHJcbiAgICB2YXIgbjExMSA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxKVxyXG5cclxuICAgIHJldHVybiBsZXJwKFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMCwgbjEwMCwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMCwgbjExMCwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAxLCBuMTAxLCBkeCksXHJcbiAgICAgICAgbGVycChuMDExLCBuMTExLCBkeCksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKSxcclxuICAgICAgZmFkZShkeilcclxuICAgIClcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Blcmxpbi9QZXJsaW4zLmpzIiwiaW1wb3J0IHsgTm9pc2UgfSBmcm9tICcuLi91dGlsL05vaXNlJ1xyXG5pbXBvcnQgeyBncmFkNCBhcyBncmFkIH0gZnJvbSAnLi4vdXRpbC80ZCdcclxuaW1wb3J0IHsgZmFkZSwgbGVycCB9IGZyb20gJy4uL3V0aWwvbWF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcmxpbjQgZXh0ZW5kcyBOb2lzZSB7XHJcbiAgY29uc3RydWN0b3IgKHMpIHtcclxuICAgIHN1cGVyKHMpXHJcbiAgfVxyXG4gIGdlbiAoeCwgeSwgeiwgdCkge1xyXG4gICAgdmFyIGdyYWQ0ID0gZ3JhZC5iaW5kKG51bGwsIHRoaXMucClcclxuICAgIHZhciBneCA9IE1hdGgudHJ1bmMoeCkgJSAyNTZcclxuICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcclxuICAgIHZhciBneiA9IE1hdGgudHJ1bmMoeikgJSAyNTZcclxuICAgIHZhciBndCA9IE1hdGgudHJ1bmModCkgJSAyNTZcclxuXHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuICAgIHZhciBkeSA9IHkgLSBneVxyXG4gICAgdmFyIGR6ID0geiAtIGd6XHJcbiAgICB2YXIgZHQgPSB0IC0gZ3RcclxuXHJcbiAgICB2YXIgbjAwMDAgPSBncmFkNChneCwgZ3ksIGd6LCBndCkuZG90KGR4LCBkeSwgZHosIGR0KVxyXG4gICAgdmFyIG4xMDAwID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3osIGd0KS5kb3QoZHggLSAxLCBkeSwgZHopXHJcbiAgICB2YXIgbjAxMDAgPSBncmFkNChneCwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCwgZHkgLSAxLCBkeilcclxuICAgIHZhciBuMTEwMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHopXHJcbiAgICB2YXIgbjAwMTAgPSBncmFkNChneCwgZ3ksIGd6ICsgMSwgZ3QpLmRvdChkeCwgZHksIGR6IC0gMSlcclxuICAgIHZhciBuMTAxMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6ICsgMSwgZ3QpLmRvdChkeCAtIDEsIGR5LCBkeiAtIDEpXHJcbiAgICB2YXIgbjAxMTAgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxKVxyXG4gICAgdmFyIG4xMTEwID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6ICsgMSwgZ3QpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxKVxyXG4gICAgdmFyIG4wMDAxID0gZ3JhZDQoZ3gsIGd5LCBneiwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiwgZHQgLSAxKVxyXG4gICAgdmFyIG4xMDAxID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3osIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6LCBkdCAtIDEpXHJcbiAgICB2YXIgbjAxMDEgPSBncmFkNChneCwgZ3kgKyAxLCBneiwgZ3QgKyAxKS5kb3QoZHgsIGR5IC0gMSwgZHosIGR0IC0gMSlcclxuICAgIHZhciBuMTEwMSA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6LCBkdCAtIDEpXHJcbiAgICB2YXIgbjAwMTEgPSBncmFkNChneCwgZ3ksIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiAtIDEsIGR0IC0gMSlcclxuICAgIHZhciBuMTAxMSA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSwgZHogLSAxLCBkdCAtIDEpXHJcbiAgICB2YXIgbjAxMTEgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxyXG4gICAgdmFyIG4xMTExID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxyXG5cclxuICAgIHJldHVybiBsZXJwKFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAoXHJcbiAgICAgICAgICBsZXJwKG4wMDAwLCBuMTAwMCwgZHgpLFxyXG4gICAgICAgICAgbGVycChuMDEwMCwgbjExMDAsIGR4KSxcclxuICAgICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICAgKSxcclxuICAgICAgICBsZXJwKFxyXG4gICAgICAgICAgbGVycChuMDAxMCwgbjEwMTAsIGR4KSxcclxuICAgICAgICAgIGxlcnAobjAxMTAsIG4xMTEwLCBkeCksXHJcbiAgICAgICAgICBmYWRlKGR5KVxyXG4gICAgICAgICksXHJcbiAgICAgICAgZmFkZShkeilcclxuICAgICAgKSxcclxuICAgICAgbGVycChcclxuICAgICAgICBsZXJwKFxyXG4gICAgICAgICAgbGVycChuMDAwMSwgbjEwMDEsIGR4KSxcclxuICAgICAgICAgIGxlcnAobjAxMDEsIG4xMTAxLCBkeCksXHJcbiAgICAgICAgICBmYWRlKGR5KVxyXG4gICAgICAgICksXHJcbiAgICAgICAgbGVycChcclxuICAgICAgICAgIGxlcnAobjAwMTEsIG4xMDExLCBkeCksXHJcbiAgICAgICAgICBsZXJwKG4wMTExLCBuMTExMSwgZHgpLFxyXG4gICAgICAgICAgZmFkZShkeSlcclxuICAgICAgICApLFxyXG4gICAgICAgIGZhZGUoZHopXHJcbiAgICAgICksXHJcbiAgICAgIGZhZGUoZHQpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wZXJsaW4vUGVybGluNC5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcclxuaW1wb3J0IHsgZ04sIGxlcnBOLCBnZXROcyBhcyBnZXROLCBnZW5lcmF0ZUdOIH0gZnJvbSAnLi4vdXRpbC9OZCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcmxpbk4gZXh0ZW5kcyBOb2lzZSB7XHJcbiAgY29uc3RydWN0b3IgKHMpIHtcclxuICAgIHN1cGVyKHMpXHJcbiAgfVxyXG4gIGdlbiAoLi4uYXJncykge1xyXG4gICAgdmFyIGdldE5zID0gZ2V0Ti5iaW5kKG51bGwsIHRoaXMucClcclxuICAgIHZhciBncyA9IFtdXHJcbiAgICB2YXIgZHMgPSBbXVxyXG5cclxuICAgIGlmIChnTi5sZW5ndGggPT09IDApIHtcclxuICAgICAgZ2VuZXJhdGVHTihhcmdzLmxlbmd0aClcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZ3NbaV0gPSBNYXRoLnRydW5jKGFyZ3NbaV0pICUgMjU2XHJcbiAgICAgIGRzW2ldID0gYXJnc1tpXSAtIGdzW2ldXHJcbiAgICB9XHJcbiAgICB2YXIgbnMgPSBnZXROcyhhcmdzLmxlbmd0aCwgZ3MsIGRzKVxyXG4gICAgdmFyIHJlcyA9IGxlcnBOKG5zLCBkcylcclxuICAgIHJldHVybiByZXNcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Blcmxpbi9QZXJsaW5OLmpzIiwiaW1wb3J0IHsgTm9pc2UgfSBmcm9tICcuLi91dGlsL05vaXNlJ1xyXG5pbXBvcnQgeyBncmFkMSBhcyBncmFkIH0gZnJvbSAnLi4vdXRpbC8xZCdcclxuaW1wb3J0IHsgY3V0MSB9IGZyb20gJy4uL3V0aWwvbWF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZXgxIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgpIHtcclxuICAgIHZhciBncmFkMSA9IGdyYWQuYmluZChudWxsLCB0aGlzLnApXHJcbiAgICB2YXIgZ3ggPSBNYXRoLmZsb29yKHgpICUgMjU2XHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuXHJcbiAgICB2YXIgbjAgPSBjdXQxKGR4KSAqIGdyYWQxKGd4KS5kb3QoZHgpXHJcbiAgICB2YXIgbjEgPSBjdXQxKGR4IC0gMSkgKiBncmFkMShneCArIDEpLmRvdChkeCAtIDEpXHJcblxyXG4gICAgcmV0dXJuIDAuNSAqIChuMCArIG4xKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxleC9TaW1wbGV4MS5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcclxuaW1wb3J0IHsgZ3JhZDIgYXMgZ3JhZCwgUzJfVE9fQywgQ19UT19TMiB9IGZyb20gJy4uL3V0aWwvMmQnXHJcbmltcG9ydCB7IGN1dCB9IGZyb20gJy4uL3V0aWwvbWF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZXgyIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgsIHkpIHtcclxuICAgIGlmICh0aGlzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcylcclxuICAgIH1cclxuICAgIHZhciBncmFkMiA9IGdyYWQuYmluZChudWxsLCB0aGlzLnApXHJcbiAgICB2YXIgc2tldyA9ICh4ICsgeSkgKiBTMl9UT19DXHJcbiAgICB2YXIgaSA9IE1hdGgudHJ1bmMoeCArIHNrZXcpXHJcbiAgICB2YXIgaiA9IE1hdGgudHJ1bmMoeSArIHNrZXcpXHJcblxyXG4gICAgdmFyIHVuc2tldyA9IChpICsgaikgKiBDX1RPX1MyXHJcbiAgICB2YXIgZ3ggPSBpIC0gdW5za2V3XHJcbiAgICB2YXIgZ3kgPSBqIC0gdW5za2V3XHJcblxyXG4gICAgdmFyIGR4MCA9IHggLSBneFxyXG4gICAgdmFyIGR5MCA9IHkgLSBneVxyXG5cclxuICAgIHZhciBkaSA9IGR4MCA+IGR5MCA/IDEgOiAwXHJcbiAgICB2YXIgZGogPSBkeDAgPiBkeTAgPyAwIDogMVxyXG5cclxuICAgIC8vIHdoeSBpc24ndCBpdCArIGRpIC0gQ19UT19TMj9cclxuICAgIHZhciBkeDEgPSBkeDAgLSBkaSArIENfVE9fUzJcclxuICAgIHZhciBkeTEgPSBkeTAgLSBkaiArIENfVE9fUzJcclxuICAgIHZhciBkeDIgPSBkeDAgLSAxICsgMiAqIENfVE9fUzJcclxuICAgIHZhciBkeTIgPSBkeTAgLSAxICsgMiAqIENfVE9fUzJcclxuXHJcbiAgICB2YXIgbjAgPSBjdXQoZHgwLCBkeTApICogZ3JhZDIoaSwgaikuZG90KGR4MCwgZHkwKVxyXG4gICAgdmFyIG4xID0gY3V0KGR4MSwgZHkxKSAqIGdyYWQyKGkgKyBkaSwgaiArIGRqKS5kb3QoZHgxLCBkeTEpXHJcbiAgICB2YXIgbjIgPSBjdXQoZHgyLCBkeTIpICogZ3JhZDIoaSArIDEsIGogKyAxKS5kb3QoZHgyLCBkeTIpXHJcblxyXG4gICAgcmV0dXJuIDcwICogKG4wICsgbjEgKyBuMilcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NpbXBsZXgvU2ltcGxleDIuanMiLCJpbXBvcnQgeyBQZXJsaW4xLCBQZXJsaW4yLCBQZXJsaW4zLCBQZXJsaW40LCBQZXJsaW5OIH0gZnJvbSAnLi9wZXJsaW4vaW5kZXgnXHJcbmltcG9ydCB7IFNpbXBsZXgxLCBTaW1wbGV4MiB9IGZyb20gJy4vc2ltcGxleC9pbmRleCdcclxuXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluMSB9IGZyb20gJy4vcGVybGluL1BlcmxpbjEnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluMiB9IGZyb20gJy4vcGVybGluL1BlcmxpbjInXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluMyB9IGZyb20gJy4vcGVybGluL1BlcmxpbjMnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluNCB9IGZyb20gJy4vcGVybGluL1BlcmxpbjQnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluTiB9IGZyb20gJy4vcGVybGluL1Blcmxpbk4nXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2ltcGxleDEgfSBmcm9tICcuL3NpbXBsZXgvU2ltcGxleDEnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2ltcGxleDIgfSBmcm9tICcuL3NpbXBsZXgvU2ltcGxleDInXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgU2ltcGxleDE6IFNpbXBsZXgxLFxyXG4gIFNpbXBsZXgyOiBTaW1wbGV4MixcclxuICBQZXJsaW4xOiBQZXJsaW4xLFxyXG4gIFBlcmxpbjI6IFBlcmxpbjIsXHJcbiAgUGVybGluMzogUGVybGluMyxcclxuICBQZXJsaW40OiBQZXJsaW40LFxyXG4gIFBlcmxpbk46IFBlcmxpbk5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjEgfSBmcm9tICcuL1BlcmxpbjEnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjIgfSBmcm9tICcuL1BlcmxpbjInXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjMgfSBmcm9tICcuL1BlcmxpbjMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjQgfSBmcm9tICcuL1BlcmxpbjQnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbk4gfSBmcm9tICcuL1Blcmxpbk4nXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGVybGluL2luZGV4LmpzIiwiLypcbiAqIHJhbmRvbS1zZWVkXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc2tyYXRjaGRvdC9yYW5kb20tc2VlZFxuICpcbiAqIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IFN0ZXZlIEdpYnNvbiBhbmQgY2FuIGJlIGZvdW5kIGhlcmU6XG4gKlxuICogaHR0cHM6Ly93d3cuZ3JjLmNvbS9vdGcvdWhlcHJuZy5odG1cbiAqXG4gKiBJdCB3YXMgc2xpZ2h0bHkgbW9kaWZpZWQgZm9yIHVzZSBpbiBub2RlLCB0byBwYXNzIGpzaGludCwgYW5kIGEgZmV3IGFkZGl0aW9uYWxcbiAqIGhlbHBlciBmdW5jdGlvbnMgd2VyZSBhZGRlZC5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMgc2tyYXRjaGRvdFxuICogRHVhbCBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgYW5kIHRoZSBvcmlnaW5hbCBHUkMgY29weXJpZ2h0L2xpY2Vuc2VcbiAqIGluY2x1ZGVkIGJlbG93LlxuICovXG4vKlx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcdFx0XHRcdFx0XHRcdFx0R2lic29uIFJlc2VhcmNoIENvcnBvcmF0aW9uXG5cdFx0XHRcdFVIRVBSTkcgLSBVbHRyYSBIaWdoIEVudHJvcHkgUHNldWRvLVJhbmRvbSBOdW1iZXIgR2VuZXJhdG9yXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0TElDRU5TRSBBTkQgQ09QWVJJR0hUOiAgVEhJUyBDT0RFIElTIEhFUkVCWSBSRUxFQVNFRCBJTlRPIFRIRSBQVUJMSUMgRE9NQUlOXG5cdEdpYnNvbiBSZXNlYXJjaCBDb3Jwb3JhdGlvbiByZWxlYXNlcyBhbmQgZGlzY2xhaW1zIEFMTCBSSUdIVFMgQU5EIFRJVExFIElOXG5cdFRISVMgQ09ERSBPUiBBTlkgREVSSVZBVElWRVMuIEFueW9uZSBtYXkgYmUgZnJlZWx5IHVzZSBpdCBmb3IgYW55IHB1cnBvc2UuXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0VGhpcyBpcyBHUkMncyBjcnlwdG9ncmFwaGljYWxseSBzdHJvbmcgUFJORyAocHNldWRvLXJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yKVxuXHRmb3IgSmF2YVNjcmlwdC4gSXQgaXMgZHJpdmVuIGJ5IDE1MzYgYml0cyBvZiBlbnRyb3B5LCBzdG9yZWQgaW4gYW4gYXJyYXkgb2Zcblx0NDgsIDMyLWJpdCBKYXZhU2NyaXB0IHZhcmlhYmxlcy4gIFNpbmNlIG1hbnkgYXBwbGljYXRpb25zIG9mIHRoaXMgZ2VuZXJhdG9yLFxuXHRpbmNsdWRpbmcgb3VycyB3aXRoIHRoZSBcIk9mZiBUaGUgR3JpZFwiIExhdGluIFNxdWFyZSBnZW5lcmF0b3IsIG1heSByZXF1aXJlXG5cdHRoZSBkZXRlcmltaW5pc3RpYyByZS1nZW5lcmF0aW9uIG9mIGEgc2VxdWVuY2Ugb2YgUFJOcywgdGhpcyBQUk5HJ3MgaW5pdGlhbFxuXHRlbnRyb3BpYyBzdGF0ZSBjYW4gYmUgcmVhZCBhbmQgd3JpdHRlbiBhcyBhIHN0YXRpYyB3aG9sZSwgYW5kIGluY3JlbWVudGFsbHlcblx0ZXZvbHZlZCBieSBwb3VyaW5nIG5ldyBzb3VyY2UgZW50cm9weSBpbnRvIHRoZSBnZW5lcmF0b3IncyBpbnRlcm5hbCBzdGF0ZS5cblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRFTkRMRVNTIFRIQU5LUyBhcmUgZHVlIEpvaGFubmVzIEJhYWdvZSBmb3IgaGlzIGNhcmVmdWwgZGV2ZWxvcG1lbnQgb2YgaGlnaGx5XG5cdHJvYnVzdCBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9ucyBvZiBKUyBQUk5Hcy4gIFRoaXMgd29yayB3YXMgYmFzZWQgdXBvbiBoaXNcblx0SmF2YVNjcmlwdCBcIkFsZWFcIiBQUk5HIHdoaWNoIGlzIGJhc2VkIHVwb24gdGhlIGV4dHJlbWVseSByb2J1c3QgTXVsdGlwbHktXG5cdFdpdGgtQ2FycnkgKE1XQykgUFJORyBpbnZlbnRlZCBieSBHZW9yZ2UgTWFyc2FnbGlhLiBNV0MgQWxnb3JpdGhtIFJlZmVyZW5jZXM6XG5cdGh0dHA6Ly93d3cuR1JDLmNvbS9vdGcvTWFyc2FnbGlhX1BSTkdzLnBkZlxuXHRodHRwOi8vd3d3LkdSQy5jb20vb3RnL01hcnNhZ2xpYV9NV0NfR2VuZXJhdG9ycy5wZGZcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRUaGUgcXVhbGl0eSBvZiB0aGlzIGFsZ29yaXRobSdzIHBzZXVkby1yYW5kb20gbnVtYmVycyBoYXZlIGJlZW4gdmVyaWZpZWQgYnlcblx0bXVsdGlwbGUgaW5kZXBlbmRlbnQgcmVzZWFyY2hlcnMuIEl0IGhhbmRpbHkgcGFzc2VzIHRoZSBmZXJtaWxhYi5jaCB0ZXN0cyBhc1xuXHR3ZWxsIGFzIHRoZSBcImRpZWhhcmRcIiBhbmQgXCJkaWVoYXJkZXJcIiB0ZXN0IHN1aXRlcy4gIEZvciBpbmRpdmlkdWFscyB3aXNoaW5nXG5cdHRvIGZ1cnRoZXIgdmVyaWZ5IHRoZSBxdWFsaXR5IG9mIHRoaXMgYWxnb3JpdGhtJ3MgcHNldWRvLXJhbmRvbSBudW1iZXJzLCBhXG5cdDI1Ni1tZWdhYnl0ZSBmaWxlIG9mIHRoaXMgYWxnb3JpdGhtJ3Mgb3V0cHV0IG1heSBiZSBkb3dubG9hZGVkIGZyb20gR1JDLmNvbSxcblx0YW5kIGEgTWljcm9zb2Z0IFdpbmRvd3Mgc2NyaXB0aW5nIGhvc3QgKFdTSCkgdmVyc2lvbiBvZiB0aGlzIGFsZ29yaXRobSBtYXkgYmVcblx0ZG93bmxvYWRlZCBhbmQgcnVuIGZyb20gdGhlIFdpbmRvd3MgY29tbWFuZCBwcm9tcHQgdG8gZ2VuZXJhdGUgdW5pcXVlIGZpbGVzXG5cdG9mIGFueSBzaXplOlxuXHRUaGUgRmVybWlsYWIgXCJFTlRcIiB0ZXN0czogaHR0cDovL2ZvdXJtaWxhYi5jaC9yYW5kb20vXG5cdFRoZSAyNTYtbWVnYWJ5dGUgc2FtcGxlIFBSTiBmaWxlIGF0IEdSQzogaHR0cHM6Ly93d3cuR1JDLmNvbS9vdGcvdWhlcHJuZy5iaW5cblx0VGhlIFdpbmRvd3Mgc2NyaXB0aW5nIGhvc3QgdmVyc2lvbjogaHR0cHM6Ly93d3cuR1JDLmNvbS9vdGcvd3NoLXVoZXBybmcuanNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRRdWFsaWZ5aW5nIE1XQyBtdWx0aXBsaWVycyBhcmU6IDE4Nzg4NCwgNjg2MTE4LCA4OTgxMzQsIDExMDQzNzUsIDEyNTAyMDUsXG5cdDE0NjA5MTAgYW5kIDE3Njg4NjMuIChXZSB1c2UgdGhlIGxhcmdlc3Qgb25lIHRoYXQncyA8IDJeMjEpXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbid1c2Ugc3RyaWN0JztcbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5cbi8qXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5UaGlzIGlzIGJhc2VkIHVwb24gSm9oYW5uZXMgQmFhZ29lJ3MgY2FyZWZ1bGx5IGRlc2lnbmVkIGFuZCBlZmZpY2llbnQgaGFzaFxuZnVuY3Rpb24gZm9yIHVzZSB3aXRoIEphdmFTY3JpcHQuICBJdCBoYXMgYSBwcm92ZW4gXCJhdmFsYW5jaGVcIiBlZmZlY3Qgc3VjaFxudGhhdCBldmVyeSBiaXQgb2YgdGhlIGlucHV0IGFmZmVjdHMgZXZlcnkgYml0IG9mIHRoZSBvdXRwdXQgNTAlIG9mIHRoZSB0aW1lLFxud2hpY2ggaXMgZ29vZC5cdFNlZTogaHR0cDovL2JhYWdvZS5jb20vZW4vUmFuZG9tTXVzaW5ncy9oYXNoL2F2YWxhbmNoZS54aHRtbFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKi9cbnZhciBNYXNoID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgbiA9IDB4ZWZjODI0OWQ7XG5cdHZhciBtYXNoID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0ZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcblx0XHRcdFx0dmFyIGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcblx0XHRcdFx0biA9IGggPj4+IDA7XG5cdFx0XHRcdGggLT0gbjtcblx0XHRcdFx0aCAqPSBuO1xuXHRcdFx0XHRuID0gaCA+Pj4gMDtcblx0XHRcdFx0aCAtPSBuO1xuXHRcdFx0XHRuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIChuID4+PiAwKSAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG5cdFx0fSBlbHNlIHtcblx0XHRcdG4gPSAweGVmYzgyNDlkO1xuXHRcdH1cblx0fTtcblx0cmV0dXJuIG1hc2g7XG59O1xuXG52YXIgdWhlcHJuZyA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdHJldHVybiAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBvID0gNDg7IC8vIHNldCB0aGUgJ29yZGVyJyBudW1iZXIgb2YgRU5UUk9QWS1ob2xkaW5nIDMyLWJpdCB2YWx1ZXNcblx0XHR2YXIgYyA9IDE7IC8vIGluaXQgdGhlICdjYXJyeScgdXNlZCBieSB0aGUgbXVsdGlwbHktd2l0aC1jYXJyeSAoTVdDKSBhbGdvcml0aG1cblx0XHR2YXIgcCA9IG87IC8vIGluaXQgdGhlICdwaGFzZScgKG1heC0xKSBvZiB0aGUgaW50ZXJtZWRpYXRlIHZhcmlhYmxlIHBvaW50ZXJcblx0XHR2YXIgcyA9IG5ldyBBcnJheShvKTsgLy8gZGVjbGFyZSBvdXIgaW50ZXJtZWRpYXRlIHZhcmlhYmxlcyBhcnJheVxuXHRcdHZhciBpOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblx0XHR2YXIgajsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cdFx0dmFyIGsgPSAwOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblxuXHRcdC8vIHdoZW4gb3VyIFwidWhlcHJuZ1wiIGlzIGluaXRpYWxseSBpbnZva2VkIG91ciBQUk5HIHN0YXRlIGlzIGluaXRpYWxpemVkIGZyb20gdGhlXG5cdFx0Ly8gYnJvd3NlcidzIG93biBsb2NhbCBQUk5HLiBUaGlzIGlzIG9rYXkgc2luY2UgYWx0aG91Z2ggaXRzIGdlbmVyYXRvciBtaWdodCBub3Rcblx0XHQvLyBiZSB3b25kZXJmdWwsIGl0J3MgdXNlZnVsIGZvciBlc3RhYmxpc2hpbmcgbGFyZ2Ugc3RhcnR1cCBlbnRyb3B5IGZvciBvdXIgdXNhZ2UuXG5cdFx0dmFyIG1hc2ggPSBuZXcgTWFzaCgpOyAvLyBnZXQgYSBwb2ludGVyIHRvIG91ciBoaWdoLXBlcmZvcm1hbmNlIFwiTWFzaFwiIGhhc2hcblxuXHRcdC8vIGZpbGwgdGhlIGFycmF5IHdpdGggaW5pdGlhbCBtYXNoIGhhc2ggdmFsdWVzXG5cdFx0Zm9yIChpID0gMDsgaSA8IG87IGkrKykge1xuXHRcdFx0c1tpXSA9IG1hc2goTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhpcyBQUklWQVRFIChpbnRlcm5hbCBhY2Nlc3Mgb25seSkgZnVuY3Rpb24gaXMgdGhlIGhlYXJ0IG9mIHRoZSBtdWx0aXBseS13aXRoLWNhcnJ5XG5cdFx0Ly8gKE1XQykgUFJORyBhbGdvcml0aG0uIFdoZW4gY2FsbGVkIGl0IHJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIG51bWJlciBpbiB0aGUgZm9ybSBvZiBhXG5cdFx0Ly8gMzItYml0IEphdmFTY3JpcHQgZnJhY3Rpb24gKDAuMCB0byA8MS4wKSBpdCBpcyBhIFBSSVZBVEUgZnVuY3Rpb24gdXNlZCBieSB0aGUgZGVmYXVsdFxuXHRcdC8vIFswLTFdIHJldHVybiBmdW5jdGlvbiwgYW5kIGJ5IHRoZSByYW5kb20gJ3N0cmluZyhuKScgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyAnbidcblx0XHQvLyBjaGFyYWN0ZXJzIGZyb20gMzMgdG8gMTI2LlxuXHRcdHZhciByYXdwcm5nID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCsrcCA+PSBvKSB7XG5cdFx0XHRcdHAgPSAwO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHQgPSAxNzY4ODYzICogc1twXSArIGMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXHRcdFx0cmV0dXJuIHNbcF0gPSB0IC0gKGMgPSB0IHwgMCk7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gaXMgdGhlIGRlZmF1bHQgZnVuY3Rpb24gcmV0dXJuZWQgYnkgdGhpcyBsaWJyYXJ5LlxuXHRcdC8vIFRoZSB2YWx1ZXMgcmV0dXJuZWQgYXJlIGludGVnZXJzIGluIHRoZSByYW5nZSBmcm9tIDAgdG8gcmFuZ2UtMS4gV2UgZmlyc3Rcblx0XHQvLyBvYnRhaW4gdHdvIDMyLWJpdCBmcmFjdGlvbnMgKGZyb20gcmF3cHJuZykgdG8gc3ludGhlc2l6ZSBhIHNpbmdsZSBoaWdoXG5cdFx0Ly8gcmVzb2x1dGlvbiA1My1iaXQgcHJuZyAoMCB0byA8MSksIHRoZW4gd2UgbXVsdGlwbHkgdGhpcyBieSB0aGUgY2FsbGVyJ3Ncblx0XHQvLyBcInJhbmdlXCIgcGFyYW0gYW5kIHRha2UgdGhlIFwiZmxvb3JcIiB0byByZXR1cm4gYSBlcXVhbGx5IHByb2JhYmxlIGludGVnZXIuXG5cdFx0dmFyIHJhbmRvbSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IocmFuZ2UgKiAocmF3cHJuZygpICsgKHJhd3BybmcoKSAqIDB4MjAwMDAwIHwgMCkgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2KSk7IC8vIDJeLTUzXG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gJ3N0cmluZyhuKScgcmV0dXJucyBhIHBzZXVkby1yYW5kb20gc3RyaW5nIG9mXG5cdFx0Ly8gJ24nIHByaW50YWJsZSBjaGFyYWN0ZXJzIHJhbmdpbmcgZnJvbSBjaHIoMzMpIHRvIGNocigxMjYpIGluY2x1c2l2ZS5cblx0XHRyYW5kb20uc3RyaW5nID0gZnVuY3Rpb24gKGNvdW50KSB7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHZhciBzID0gJyc7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdFx0XHRzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMzMgKyByYW5kb20oOTQpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIFBSSVZBVEUgXCJoYXNoXCIgZnVuY3Rpb24gaXMgdXNlZCB0byBldm9sdmUgdGhlIGdlbmVyYXRvcidzIGludGVybmFsXG5cdFx0Ly8gZW50cm9weSBzdGF0ZS4gSXQgaXMgYWxzbyBjYWxsZWQgYnkgdGhlIEVYUE9SVEVEIGFkZEVudHJvcHkoKSBmdW5jdGlvblxuXHRcdC8vIHdoaWNoIGlzIHVzZWQgdG8gcG91ciBlbnRyb3B5IGludG8gdGhlIFBSTkcuXG5cdFx0dmFyIGhhc2ggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbzsgaisrKSB7XG5cdFx0XHRcdFx0c1tqXSAtPSBtYXNoKGFyZ3NbaV0pO1xuXHRcdFx0XHRcdGlmIChzW2pdIDwgMCkge1xuXHRcdFx0XHRcdFx0c1tqXSArPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIFwiY2xlYW4gc3RyaW5nXCIgZnVuY3Rpb24gcmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXMgYW5kIG5vbi1wcmludGluZ1xuXHRcdC8vIGNvbnRyb2wgY2hhcmFjdGVycywgaW5jbHVkaW5nIGFueSBlbWJlZGRlZCBjYXJyaWFnZS1yZXR1cm4gKENSKSBhbmQgbGluZS1mZWVkIChMRikgY2hhcmFjdGVycyxcblx0XHQvLyBmcm9tIGFueSBzdHJpbmcgaXQgaXMgaGFuZGVkLiB0aGlzIGlzIGFsc28gdXNlZCBieSB0aGUgJ2hhc2hzdHJpbmcnIGZ1bmN0aW9uIChiZWxvdykgdG8gaGVscFxuXHRcdC8vIHVzZXJzIGFsd2F5cyBvYnRhaW4gdGhlIHNhbWUgRUZGRUNUSVZFIHVoZXBybmcgc2VlZGluZyBrZXkuXG5cdFx0cmFuZG9tLmNsZWFuU3RyaW5nID0gZnVuY3Rpb24gKGluU3RyKSB7XG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9naSwgJycpOyAvLyByZW1vdmUgYW55L2FsbCBsZWFkaW5nIHNwYWNlc1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC9bXFx4MDAtXFx4MUZdL2dpLCAnJyk7IC8vIHJlbW92ZSBhbnkvYWxsIGNvbnRyb2wgY2hhcmFjdGVyc1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC9cXG4gLywgJ1xcbicpOyAvLyByZW1vdmUgYW55L2FsbCB0cmFpbGluZyBzcGFjZXNcblx0XHRcdHJldHVybiBpblN0cjsgLy8gcmV0dXJuIHRoZSBjbGVhbmVkIHVwIHJlc3VsdFxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIFwiaGFzaCBzdHJpbmdcIiBmdW5jdGlvbiBoYXNoZXMgdGhlIHByb3ZpZGVkIGNoYXJhY3RlciBzdHJpbmcgYWZ0ZXIgZmlyc3QgcmVtb3Zpbmdcblx0XHQvLyBhbnkgbGVhZGluZyBvciB0cmFpbGluZyBzcGFjZXMgYW5kIGlnbm9yaW5nIGFueSBlbWJlZGRlZCBjYXJyaWFnZSByZXR1cm5zIChDUikgb3IgTGluZSBGZWVkcyAoTEYpXG5cdFx0cmFuZG9tLmhhc2hTdHJpbmcgPSBmdW5jdGlvbiAoaW5TdHIpIHtcblx0XHRcdGluU3RyID0gcmFuZG9tLmNsZWFuU3RyaW5nKGluU3RyKTtcblx0XHRcdG1hc2goaW5TdHIpOyAvLyB1c2UgdGhlIHN0cmluZyB0byBldm9sdmUgdGhlICdtYXNoJyBzdGF0ZVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGluU3RyLmxlbmd0aDsgaSsrKSB7IC8vIHNjYW4gdGhyb3VnaCB0aGUgY2hhcmFjdGVycyBpbiBvdXIgc3RyaW5nXG5cdFx0XHRcdGsgPSBpblN0ci5jaGFyQ29kZUF0KGkpOyAvLyBnZXQgdGhlIGNoYXJhY3RlciBjb2RlIGF0IHRoZSBsb2NhdGlvblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbzsgaisrKSB7IC8vXHRcIm1hc2hcIiBpdCBpbnRvIHRoZSBVSEVQUk5HIHN0YXRlXG5cdFx0XHRcdFx0c1tqXSAtPSBtYXNoKGspO1xuXHRcdFx0XHRcdGlmIChzW2pdIDwgMCkge1xuXHRcdFx0XHRcdFx0c1tqXSArPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2VlZCB0aGUgcmFuZG9tIGdlbmVyYXRvci5cblx0XHRyYW5kb20uc2VlZCA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdFx0XHRpZiAodHlwZW9mIHNlZWQgPT09ICd1bmRlZmluZWQnIHx8IHNlZWQgPT09IG51bGwpIHtcblx0XHRcdFx0c2VlZCA9IE1hdGgucmFuZG9tKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHNlZWQgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHNlZWQgPSBzdHJpbmdpZnkoc2VlZCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlKS50b1N0cmluZygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmFuZG9tLmluaXRTdGF0ZSgpO1xuXHRcdFx0cmFuZG9tLmhhc2hTdHJpbmcoc2VlZCk7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgaGFuZHkgZXhwb3J0ZWQgZnVuY3Rpb24gaXMgdXNlZCB0byBhZGQgZW50cm9weSB0byBvdXIgdWhlcHJuZyBhdCBhbnkgdGltZVxuXHRcdHJhbmRvbS5hZGRFbnRyb3B5ID0gZnVuY3Rpb24gKCAvKiBhY2NlcHQgemVybyBvciBtb3JlIGFyZ3VtZW50cyAqLyApIHtcblx0XHRcdHZhciBhcmdzID0gW107XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0fVxuXHRcdFx0aGFzaCgoaysrKSArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgKyBhcmdzLmpvaW4oJycpICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fTtcblxuXHRcdC8vIGlmIHdlIHdhbnQgdG8gcHJvdmlkZSBhIGRldGVybWluaXN0aWMgc3RhcnR1cCBjb250ZXh0IGZvciBvdXIgUFJORyxcblx0XHQvLyBidXQgd2l0aG91dCBkaXJlY3RseSBzZXR0aW5nIHRoZSBpbnRlcm5hbCBzdGF0ZSB2YXJpYWJsZXMsIHRoaXMgYWxsb3dzXG5cdFx0Ly8gdXMgdG8gaW5pdGlhbGl6ZSB0aGUgbWFzaCBoYXNoIGFuZCBQUk5HJ3MgaW50ZXJuYWwgc3RhdGUgYmVmb3JlIHByb3ZpZGluZ1xuXHRcdC8vIHNvbWUgaGFzaGluZyBpbnB1dFxuXHRcdHJhbmRvbS5pbml0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtYXNoKCk7IC8vIHBhc3MgYSBudWxsIGFyZyB0byBmb3JjZSBtYXNoIGhhc2ggdG8gaW5pdFxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG87IGkrKykge1xuXHRcdFx0XHRzW2ldID0gbWFzaCgnICcpOyAvLyBmaWxsIHRoZSBhcnJheSB3aXRoIGluaXRpYWwgbWFzaCBoYXNoIHZhbHVlc1xuXHRcdFx0fVxuXHRcdFx0YyA9IDE7IC8vIGluaXQgb3VyIG11bHRpcGx5LXdpdGgtY2FycnkgY2Fycnlcblx0XHRcdHAgPSBvOyAvLyBpbml0IG91ciBwaGFzZVxuXHRcdH07XG5cblx0XHQvLyB3ZSB1c2UgdGhpcyAob3B0aW9uYWwpIGV4cG9ydGVkIGZ1bmN0aW9uIHRvIHNpZ25hbCB0aGUgSmF2YVNjcmlwdCBpbnRlcnByZXRlclxuXHRcdC8vIHRoYXQgd2UncmUgZmluaXNoZWQgdXNpbmcgdGhlIFwiTWFzaFwiIGhhc2ggZnVuY3Rpb24gc28gdGhhdCBpdCBjYW4gZnJlZSB1cCB0aGVcblx0XHQvLyBsb2NhbCBcImluc3RhbmNlIHZhcmlhYmxlc1wiIGlzIHdpbGwgaGF2ZSBiZWVuIG1haW50YWluaW5nLiAgSXQncyBub3Qgc3RyaWN0bHlcblx0XHQvLyBuZWNlc3NhcnksIG9mIGNvdXJzZSwgYnV0IGl0J3MgZ29vZCBKYXZhU2NyaXB0IGNpdGl6ZW5zaGlwLlxuXHRcdHJhbmRvbS5kb25lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bWFzaCA9IG51bGw7XG5cdFx0fTtcblxuXHRcdC8vIGlmIHdlIGNhbGxlZCBcInVoZXBybmdcIiB3aXRoIGEgc2VlZCB2YWx1ZSwgdGhlbiBleGVjdXRlIHJhbmRvbS5zZWVkKCkgYmVmb3JlIHJldHVybmluZ1xuXHRcdGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJhbmRvbS5zZWVkKHNlZWQpO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIHJhbmdlIChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLnJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tKHJhbmdlKTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIDEgKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20ucmFuZG9tID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbShOdW1iZXIuTUFYX1ZBTFVFIC0gMSkgLyBOdW1iZXIuTUFYX1ZBTFVFO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20uZmxvYXRCZXR3ZWVuID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChpbmNsdXNpdmUpXG5cdFx0cmFuZG9tLmludEJldHdlZW4gPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHJhbmRvbS5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG5cdFx0fTtcblxuXHRcdC8vIHdoZW4gb3VyIG1haW4gb3V0ZXIgXCJ1aGVwcm5nXCIgZnVuY3Rpb24gaXMgY2FsbGVkLCBhZnRlciBzZXR0aW5nIHVwIG91clxuXHRcdC8vIGluaXRpYWwgdmFyaWFibGVzIGFuZCBlbnRyb3BpYyBzdGF0ZSwgd2UgcmV0dXJuIGFuIFwiaW5zdGFuY2UgcG9pbnRlclwiXG5cdFx0Ly8gdG8gdGhlIGludGVybmFsIGFub255bW91cyBmdW5jdGlvbiB3aGljaCBjYW4gdGhlbiBiZSB1c2VkIHRvIGFjY2Vzc1xuXHRcdC8vIHRoZSB1aGVwcm5nJ3MgdmFyaW91cyBleHBvcnRlZCBmdW5jdGlvbnMuICBBcyB3aXRoIHRoZSBcIi5kb25lXCIgZnVuY3Rpb25cblx0XHQvLyBhYm92ZSwgd2Ugc2hvdWxkIHNldCB0aGUgcmV0dXJuZWQgdmFsdWUgdG8gJ251bGwnIG9uY2Ugd2UncmUgZmluaXNoZWRcblx0XHQvLyB1c2luZyBhbnkgb2YgdGhlc2UgZnVuY3Rpb25zLlxuXHRcdHJldHVybiByYW5kb207XG5cdH0oKSk7XG59O1xuXG4vLyBNb2RpZmljYXRpb24gZm9yIHVzZSBpbiBub2RlOlxudWhlcHJuZy5jcmVhdGUgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRyZXR1cm4gbmV3IHVoZXBybmcoc2VlZCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB1aGVwcm5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmFuZG9tLXNlZWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuZXhwb3J0cy5nZXRTZXJpYWxpemUgPSBzZXJpYWxpemVyXG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXMsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlciksIHNwYWNlcylcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlcikge1xuICB2YXIgc3RhY2sgPSBbXSwga2V5cyA9IFtdXG5cbiAgaWYgKGN5Y2xlUmVwbGFjZXIgPT0gbnVsbCkgY3ljbGVSZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2tbMF0gPT09IHZhbHVlKSByZXR1cm4gXCJbQ2lyY3VsYXIgfl1cIlxuICAgIHJldHVybiBcIltDaXJjdWxhciB+LlwiICsga2V5cy5zbGljZSgwLCBzdGFjay5pbmRleE9mKHZhbHVlKSkuam9pbihcIi5cIikgKyBcIl1cIlxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHRoaXNQb3MgPSBzdGFjay5pbmRleE9mKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IHN0YWNrLnNwbGljZSh0aGlzUG9zICsgMSkgOiBzdGFjay5wdXNoKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IGtleXMuc3BsaWNlKHRoaXNQb3MsIEluZmluaXR5LCBrZXkpIDoga2V5cy5wdXNoKGtleSlcbiAgICAgIGlmICh+c3RhY2suaW5kZXhPZih2YWx1ZSkpIHZhbHVlID0gY3ljbGVSZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGVsc2Ugc3RhY2sucHVzaCh2YWx1ZSlcblxuICAgIHJldHVybiByZXBsYWNlciA9PSBudWxsID8gdmFsdWUgOiByZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzb24tc3RyaW5naWZ5LXNhZmUvc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBWZWMzICh4LCB5LCB6KSB7XG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxuICB0aGlzLnogPSB6XG59XG5WZWMzLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSwgeikge1xuICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHkgKyB0aGlzLnogKiB6XG59XG52YXIgZzMgPSBbXG4gIG5ldyBWZWMzKDEsIDEsIDEpLCBuZXcgVmVjMygtMSwgMSwgMSksIG5ldyBWZWMzKDEsIC0xLCAxKSwgbmV3IFZlYzMoLTEsIC0xLCAxKSxcbiAgbmV3IFZlYzMoMSwgMSwgMCksIG5ldyBWZWMzKC0xLCAxLCAwKSwgbmV3IFZlYzMoMSwgLTEsIDApLCBuZXcgVmVjMygtMSwgLTEsIDApLFxuICBuZXcgVmVjMygxLCAxLCAtMSksIG5ldyBWZWMzKC0xLCAxLCAtMSksIG5ldyBWZWMzKDEsIC0xLCAtMSksIG5ldyBWZWMzKC0xLCAtMSwgLTEpXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBncmFkMyAocCwgeCwgeSwgeikge1xuICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbel1dXSAlIGczLmxlbmd0aFxuICByZXR1cm4gZzNbaGFzaF1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvM2QuanMiLCJmdW5jdGlvbiBWZWM0ICh4LCB5LCB6LCB0KSB7XG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxuICB0aGlzLnogPSB6XG4gIHRoaXMudCA9IHRcbn1cblZlYzQucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4LCB5LCB6LCB0KSB7XG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeSArIHRoaXMueiAqIHogKyB0aGlzLnQgKiB0XG59XG52YXIgZzQgPSBbXG4gIG5ldyBWZWM0KDAsIDEsIDEsIDEpLCBuZXcgVmVjNCgwLCAxLCAxLCAtMSksIG5ldyBWZWM0KDAsIDEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgMSwgLTEsIC0xKSxcbiAgbmV3IFZlYzQoMCwgLTEsIDEsIDEpLCBuZXcgVmVjNCgwLCAtMSwgMSwgLTEpLCBuZXcgVmVjNCgwLCAtMSwgLTEsIDEpLCBuZXcgVmVjNCgwLCAtMSwgLTEsIC0xKSxcbiAgbmV3IFZlYzQoMSwgMCwgMSwgMSksIG5ldyBWZWM0KDEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoMSwgMCwgLTEsIDEpLCBuZXcgVmVjNCgxLCAwLCAtMSwgLTEpLFxuICBuZXcgVmVjNCgtMSwgMCwgMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAxLCAtMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgLTEpLFxuICBuZXcgVmVjNCgxLCAxLCAwLCAxKSwgbmV3IFZlYzQoMSwgMSwgMCwgLTEpLCBuZXcgVmVjNCgxLCAtMSwgMCwgMSksIG5ldyBWZWM0KDEsIC0xLCAwLCAtMSksXG4gIG5ldyBWZWM0KC0xLCAxLCAwLCAxKSwgbmV3IFZlYzQoLTEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAxKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAtMSksXG4gIG5ldyBWZWM0KDEsIDEsIDEsIDApLCBuZXcgVmVjNCgxLCAxLCAtMSwgMCksIG5ldyBWZWM0KDEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoMSwgLTEsIC0xLCAwKSxcbiAgbmV3IFZlYzQoLTEsIDEsIDEsIDApLCBuZXcgVmVjNCgtMSwgMSwgLTEsIDApLCBuZXcgVmVjNCgtMSwgLTEsIDEsIDApLCBuZXcgVmVjNCgtMSwgLTEsIC0xLCAwKVxuXVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JhZDQgKHAsIHgsIHksIHosIHQpIHtcbiAgdmFyIGhhc2ggPSBwW3ggKyBwW3kgKyBwW3ogKyBwW3RdXV1dICUgZzQubGVuZ3RoXG4gIHJldHVybiBnNFtoYXNoXVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvNGQuanMiLCJpbXBvcnQgeyBsZXJwLCBmYWRlIH0gZnJvbSAnLi9tYXRoJ1xuXG5mdW5jdGlvbiBoYXNoTiAocCwgZ3MpIHtcbiAgaWYgKGdzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBbZ3NbMF1dXG4gIHJldHVybiBwW2dzWzBdICsgaGFzaE4ocCwgZ3Muc2xpY2UoMSkpXVxufVxuZnVuY3Rpb24gVmVjTihSKSB7XG4gIHRoaXMuUiA9IFJcbn1cblZlY04ucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChSKSB7XG4gIHZhciB2YWwgPSAwXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgUi5sZW5ndGg7IGkrKykge1xuICAgIHZhbCArPSB0aGlzLlJbaV0gKiBSW2ldXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5leHBvcnQgdmFyIGdOID0gW11cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUdOIChkaW0pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW0gKiAyOyBpKyspIHtcbiAgICB2YXIgdmVjID0gbmV3IEFycmF5KGRpbSkuZmlsbCgwKVxuICAgIHZlY1tpICUgZGltXSA9IGkgLyBkaW0gPj0gMSA/IDEgOiAtMVxuICAgIGdOW2ldID0gbmV3IFZlY04odmVjKVxuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gbGVycE4gKG5zLCBkcykge1xuICBpZiAoZHMubGVuZ3RoID09PSAxKSByZXR1cm4gbGVycChuc1swXSwgbnNbMV0sIGZhZGUoZHNbMF0pKVxuICB2YXIgbnMxID0gbnMuc2xpY2UoMCwgTWF0aC5mbG9vcihucy5sZW5ndGggLyAyKSlcbiAgdmFyIG5zMiA9IG5zLnNsaWNlKE1hdGguY2VpbChucy5sZW5ndGggLyAyKSlcbiAgcmV0dXJuIGxlcnAoXG4gICAgbGVycE4obnMxLCBkcy5zbGljZSgwLCBkcy5sZW5ndGggLSAxKSksXG4gICAgbGVycE4obnMyLCBkcy5zbGljZSgwLCBkcy5sZW5ndGggLSAxKSksXG4gICAgZmFkZShkc1tkcy5sZW5ndGggLSAxXSlcbiAgKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE5zIChwLCBkaW0sIGdzLCBkcykge1xuICB2YXIgbnMgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8ICgyIDw8IChkaW0gLSAxKSk7IGkrKykge1xuICAgIHZhciBnc1Blcm0gPSBncy5zbGljZSgpXG4gICAgdmFyIGRzUGVybSA9IGRzLnNsaWNlKClcbiAgICB2YXIgdGVtcCA9IGlcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGltOyBqKyspIHtcbiAgICAgIGlmICh0ZW1wICYgMSkge1xuICAgICAgICBnc1Blcm1bal0gKz0gMVxuICAgICAgICBkc1Blcm1bal0gLT0gMVxuICAgICAgfVxuICAgICAgdGVtcCA9IHRlbXAgPj4gMVxuICAgIH1cbiAgICBuc1tpXSA9IGdOW2hhc2hOKHAsIGdzUGVybSkgJSBnTi5sZW5ndGhdLmRvdChkc1Blcm0pXG4gIH1cbiAgcmV0dXJuIG5zXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9OZC5qcyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgU2ltcGxleDEgfSBmcm9tICcuL1NpbXBsZXgxJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaW1wbGV4MiB9IGZyb20gJy4vU2ltcGxleDInXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxleC9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=