/******/ (function(modules) { // webpackBootstrap
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
/* harmony export (immutable) */ __webpack_exports__["c"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["b"] = fade;
/* unused harmony export cut1 */
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
    var grad1 = grad1.bind(null, this.p)
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = grad1(gx).dot(dx)
    var n1 = grad1(gx + 1).dot(dx - 1)

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0, n1, Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dx))
  };

  return Perlin1;
}(__WEBPACK_IMPORTED_MODULE_0__util_Noise__["a" /* Noise */]));

/* harmony default export */ __webpack_exports__["a"] = (Perlin1);



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export grad1 */
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
    var grad2 = grad2.bind(null, this.p)
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256

    var dx = x - gx
    var dy = y - gy

    var n00 = grad2(gx, gy).dot(dx, dy)
    var n10 = grad2(gx + 1, gy).dot(dx - 1, dy)
    var n01 = grad2(gx, gy + 1).dot(dx, dy - 1)
    var n11 = grad2(gx + 1, gy + 1).dot(dx - 1, dy - 1)

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n00, n10, Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dx)),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n01, n11, Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dx)),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dy)
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
    var grad3 = grad3.bind(null, this.p)
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

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n000, n100, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n010, n110, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dy)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n001, n101, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n011, n111, dx),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dy)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dz)
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
    var grad4 = grad4.bind(null, this.p)
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

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0000, n1000, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0100, n1100, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0010, n1010, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0110, n1110, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dz)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0001, n1001, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0101, n1101, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0011, n1011, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["c" /* lerp */])(n0111, n1111, dx),
          Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dy)
        ),
        Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dz)
      ),
      Object(__WEBPACK_IMPORTED_MODULE_2__util_math__["b" /* fade */])(dt)
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

    var getNs = getNs.bind(null, this.p)
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
    var res = Object(__WEBPACK_IMPORTED_MODULE_1__util_Nd__["c" /* lerpN */])(ns, ds)
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
    var grad1 = grad1.bind(null, this.p)
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = cut1(dx) * grad1(gx).dot(dx)
    var n1 = cut1(dx - 1) * grad1(gx + 1).dot(dx - 1)

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
/* unused harmony export grad3 */
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
/* unused harmony export grad4 */
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
/* harmony export (immutable) */ __webpack_exports__["c"] = lerpN;
/* unused harmony export getNs */
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
  if (ds.length === 1) { return Object(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* lerp */])(ns[0], ns[1], Object(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* fade */])(ds[0])) }
  var ns1 = ns.slice(0, Math.floor(ns.length / 2))
  var ns2 = ns.slice(Math.ceil(ns.length / 2))
  return Object(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* lerp */])(
    lerpN(ns1, ds.slice(0, ds.length - 1)),
    lerpN(ns2, ds.slice(0, ds.length - 1)),
    Object(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* fade */])(ds[ds.length - 1])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTdkZjJkNjc5ZjU2M2RjZDA5N2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvTm9pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL1BlcmxpbjEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvMWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Blcmxpbi9QZXJsaW4yLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLzJkLmpzIiwid2VicGFjazovLy8uL3NyYy9wZXJsaW4vUGVybGluMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL1BlcmxpbjQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Blcmxpbi9QZXJsaW5OLmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGV4L1NpbXBsZXgxLmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGV4L1NpbXBsZXgyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvM2QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvNGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvTmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZXgvaW5kZXguanMiXSwibmFtZXMiOlsidGhpcyIsImNvbnN0Iiwic3VwZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDNUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7SUFFcEUsT0FBTyxnRUFBSTtNQUNULGdFQUFJO1FBQ0YsZ0VBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNwQixnRUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLGdFQUFJLENBQUMsRUFBRSxDQUFDO09BQ1Q7TUFDRCxnRUFBSTtRQUNGLGdFQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsZ0VBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNwQixnRUFBSSxDQUFDLEVBQUUsQ0FBQztPQUNUO01BQ0QsZ0VBQUksQ0FBQyxFQUFFLENBQUM7S0FDVDtHQUNGLENBQ0Y7OztFQXJDb0MsMERBcUNwQzs7a0VBQUE7Ozs7Ozs7Ozs7OztBQ3pDb0M7QUFDSDtBQUNPOztBQUUxQixJQUFNLE9BQU8sR0FBYztFQUN4QyxnQkFBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ2RBLEtBQUssTUFBQyxPQUFDLENBQUM7R0FDVDs7OzswQ0FBQTtFQUNELHFCQUFJLGlCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNmLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHOztJQUU1QixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTs7SUFFZixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNyRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0UsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0UsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7SUFFckYsT0FBTyxnRUFB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RTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzUUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxQkE7QUFBQSxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDWDtBQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDNUM7QUFDRCxJQUFJLEVBQUUsR0FBRztFQUNQLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDOUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM5RSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDbkY7O0FBRU0sU0FBUyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ2pDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNO0VBQ3pDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztDQUNoQjs7Ozs7Ozs7O0FDakJEO0FBQUEsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUNYO0FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDekMsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDekQ7QUFDRCxJQUFJLEVBQUUsR0FBRztFQUNQLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDOUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM5RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMxRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJ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QUFDO1FBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7T0FDZjtNQUNELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztLQUNqQjtJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztHQUNyRDtFQUNELE9BQU8sRUFBRTtDQUNWOzs7Ozs7Ozs7Ozs7QUNwRCtDO0FBQ0EiLCJmaWxlIjoidHVtdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3ZGYyZDY3OWY1NjNkY2QwOTdlIiwiaW1wb3J0IHJhbmQgZnJvbSAncmFuZG9tLXNlZWQnXG5cbmV4cG9ydCBjbGFzcyBOb2lzZSB7XG4gIGNvbnN0cnVjdG9yIChzKSB7XG4gICAgdGhpcy5wID0gbmV3IFVpbnQ4QXJyYXkoNTEyKVxuICAgIHRoaXMuc2VlZChzKVxuICB9XG4gIGdlbiAoKSB7fVxuICBzZWVkIChzKSB7XG4gICAgcyA9IHMgfHwgTWF0aC5yYW5kb20oKVxuICAgIHZhciBybmcgPSByYW5kLmNyZWF0ZShzKVxuICAgIHZhciBpXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB0aGlzLnBbaV0gPSBpXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICB2YXIgciA9IHJuZygyNTYpXG4gICAgICB2YXIgdGVtcCA9IHRoaXMucFtpXVxuICAgICAgdGhpcy5wW2ldID0gdGhpcy5wW3JdXG4gICAgICB0aGlzLnBbcl0gPSB0ZW1wXG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykgdGhpcy5wW2kgKyAyNTZdID0gdGhpcy5wW2ldXG4gIH1cbiAgdHJhbnNmb3JtIChmbikge1xuICAgIHZhciB0cmFuc2Zvcm1lZEZuID0gKC4uLmRpbXMpID0+IHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBkaW1zKVxuICAgIH1cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRGbi5iaW5kKHRoaXMpXG4gIH1cbiAgb2N0YXZhdGUgKC4uLmFyZ3MpIHtcbiAgICB2YXIgb2N0YXZlcyA9IGFyZ3NbMF1cbiAgICB2YXIgZGltcyA9IGFyZ3Muc2xpY2UoMSlcbiAgICB2YXIgdmFsID0gMFxuICAgIHZhciBtYXggPSAwXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvY3RhdmVzOyBpKyspIHtcbiAgICAgIHZhciB3ID0gMSA8PCBpXG4gICAgICB2YWwgKz0gdGhpcy5nZW4uYXBwbHkodGhpcywgZGltcy5tYXAoeCA9PiB4ICogdykpIC8gd1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9jdGF2ZXM7IGkrKykge1xuICAgICAgbWF4ICs9IDEgLyAoMSA8PCBpKVxuICAgIH1cbiAgICByZXR1cm4gdmFsIC8gbWF4XG4gIH1cbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9Ob2lzZS5qcyIsImZ1bmN0aW9uIGZhbGxvZmYgKC4uLmFyZ3MpIHtcbiAgdmFyIGRpbXMgPSBhcmdzLnNsaWNlKDEpXG4gIGNvbnN0IHQgPSBhcmdzWzBdIC0gZGltcy5yZWR1Y2UoKHN1bSwgdmFsKSA9PiB7XG4gICAgcmV0dXJuIHN1bSArIHZhbCAqIHZhbFxuICB9LCAwKVxuICByZXR1cm4gdCAqIHQgKiB0ICogdCBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAgKGEsIGIsIHQpIHtcbiAgcmV0dXJuIGEgKiAoMSAtIHQpICsgYiAqIHRcbn1cbmV4cG9ydCBmdW5jdGlvbiBmYWRlICh0KSB7XG4gIHJldHVybiB0ICogdCAqIHQgKiAoMTAgKyB0ICogKC0xNSArIHQgKiA2KSlcbn1cbmV4cG9ydCB2YXIgY3V0MSA9IGZhbGxvZmYuYmluZChudWxsLCAxKVxuZXhwb3J0IHZhciBjdXQgPSBmYWxsb2ZmLmJpbmQobnVsbCwgMC41KVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9tYXRoLmpzIiwiaW1wb3J0IHsgTm9pc2UgfSBmcm9tICcuLi91dGlsL05vaXNlJ1xuaW1wb3J0IHsgZ3JhZDEgfSBmcm9tICcuLi91dGlsLzFkJ1xuaW1wb3J0IHsgbGVycCwgZmFkZSB9IGZyb20gJy4uL3V0aWwvbWF0aCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVybGluMSBleHRlbmRzIE5vaXNlIHtcbiAgY29uc3RydWN0b3IgKHMpIHtcbiAgICBzdXBlcihzKVxuICB9XG4gIGdlbiAoeCkge1xuICAgIHZhciBncmFkMSA9IGdyYWQxLmJpbmQobnVsbCwgdGhpcy5wKVxuICAgIHZhciBneCA9IE1hdGguZmxvb3IoeCkgJSAyNTZcbiAgICB2YXIgZHggPSB4IC0gZ3hcblxuICAgIHZhciBuMCA9IGdyYWQxKGd4KS5kb3QoZHgpXG4gICAgdmFyIG4xID0gZ3JhZDEoZ3ggKyAxKS5kb3QoZHggLSAxKVxuXG4gICAgcmV0dXJuIGxlcnAobjAsIG4xLCBmYWRlKGR4KSlcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGVybGluL1BlcmxpbjEuanMiLCJmdW5jdGlvbiBWZWMxICh4KSB7XG4gIHRoaXMueCA9IHhcbn1cblZlYzEucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB0aGlzLnggKiB4XG59XG52YXIgZzEgPSBbIG5ldyBWZWMxKDEpLCBuZXcgVmVjMSgtMSkgXVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JhZDEgKHAsIHgpIHtcbiAgdmFyIGhhc2ggPSBwW3hdICUgZzEubGVuZ3RoXG4gIHJldHVybiBnMVtoYXNoXVxufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLzFkLmpzIiwiaW1wb3J0IHsgTm9pc2UgfSBmcm9tICcuLi91dGlsL05vaXNlJ1xuaW1wb3J0IHsgZ3JhZDIgfSBmcm9tICcuLi91dGlsLzJkJ1xuaW1wb3J0IHsgZmFkZSwgbGVycCB9IGZyb20gJy4uL3V0aWwvbWF0aCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVybGluMiBleHRlbmRzIE5vaXNlIHtcbiAgY29uc3RydWN0b3IgKHMpIHtcbiAgICBzdXBlcihzKVxuICB9XG4gIGdlbiAoeCwgeSkge1xuICAgIHZhciBncmFkMiA9IGdyYWQyLmJpbmQobnVsbCwgdGhpcy5wKVxuICAgIHZhciBneCA9IE1hdGgudHJ1bmMoeCkgJSAyNTZcbiAgICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XG5cbiAgICB2YXIgZHggPSB4IC0gZ3hcbiAgICB2YXIgZHkgPSB5IC0gZ3lcblxuICAgIHZhciBuMDAgPSBncmFkMihneCwgZ3kpLmRvdChkeCwgZHkpXG4gICAgdmFyIG4xMCA9IGdyYWQyKGd4ICsgMSwgZ3kpLmRvdChkeCAtIDEsIGR5KVxuICAgIHZhciBuMDEgPSBncmFkMihneCwgZ3kgKyAxKS5kb3QoZHgsIGR5IC0gMSlcbiAgICB2YXIgbjExID0gZ3JhZDIoZ3ggKyAxLCBneSArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSlcblxuICAgIHJldHVybiBsZXJwKFxuICAgICAgbGVycChuMDAsIG4xMCwgZmFkZShkeCkpLFxuICAgICAgbGVycChuMDEsIG4xMSwgZmFkZShkeCkpLFxuICAgICAgZmFkZShkeSlcbiAgICApXG4gIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Blcmxpbi9QZXJsaW4yLmpzIiwiZnVuY3Rpb24gVmVjMiAoeCwgeSkge1xuICB0aGlzLnggPSB4XG4gIHRoaXMueSA9IHlcbn1cblZlYzIucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeVxufVxudmFyIGcyID0gW1xuICBuZXcgVmVjMigxLCAwKSwgbmV3IFZlYzIoMSwgMSksIG5ldyBWZWMyKDAsIDEpLCBuZXcgVmVjMigtMSwgMSksXG4gIG5ldyBWZWMyKC0xLCAwKSwgbmV3IFZlYzIoLTEsIC0xKSwgbmV3IFZlYzIoMCwgLTEpLCBuZXcgVmVjMigxLCAtMSlcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyYWQyIChwLCB4LCB5KSB7XG4gIHZhciBoYXNoID0gcFt4ICsgcFt5XV0gJSBnMi5sZW5ndGhcbiAgcmV0dXJuIGcyW2hhc2hdXG59XG5leHBvcnQgdmFyIFMyX1RPX0MgPSAwLjUgKiAoTWF0aC5zcXJ0KDMpIC0gMSlcbmV4cG9ydCB2YXIgQ19UT19TMiA9ICgzIC0gTWF0aC5zcXJ0KDMpKSAvIDZcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvMmQuanMiLCJpbXBvcnQgeyBOb2lzZSB9IGZyb20gJy4uL3V0aWwvTm9pc2UnXG5pbXBvcnQgeyBncmFkMyB9IGZyb20gJy4uL3V0aWwvM2QnXG5pbXBvcnQgeyBmYWRlLCBsZXJwIH0gZnJvbSAnLi4vdXRpbC9tYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJsaW4zIGV4dGVuZHMgTm9pc2Uge1xuICBjb25zdHJ1Y3RvciAocykge1xuICAgIHN1cGVyKHMpXG4gIH1cbiAgZ2VuICh4LCB5LCB6KSB7XG4gICAgdmFyIGdyYWQzID0gZ3JhZDMuYmluZChudWxsLCB0aGlzLnApXG4gICAgdmFyIGd4ID0gTWF0aC50cnVuYyh4KSAlIDI1NlxuICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcbiAgICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XG5cbiAgICB2YXIgZHggPSB4IC0gZ3hcbiAgICB2YXIgZHkgPSB5IC0gZ3lcbiAgICB2YXIgZHogPSB6IC0gZ3pcblxuICAgIHZhciBuMDAwID0gZ3JhZDMoZ3gsIGd5LCBneikuZG90KGR4LCBkeSwgZHopXG4gICAgdmFyIG4xMDAgPSBncmFkMyhneCArIDEsIGd5LCBneikuZG90KGR4IC0gMSwgZHksIGR6KVxuICAgIHZhciBuMDEwID0gZ3JhZDMoZ3gsIGd5ICsgMSwgZ3opLmRvdChkeCwgZHkgLSAxLCBkeilcbiAgICB2YXIgbjExMCA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneikuZG90KGR4IC0gMSwgZHkgLSAxLCBkeilcbiAgICB2YXIgbjAwMSA9IGdyYWQzKGd4LCBneSwgZ3ogKyAxKS5kb3QoZHgsIGR5LCBkeiAtIDEpXG4gICAgdmFyIG4xMDEgPSBncmFkMyhneCArIDEsIGd5LCBneiArIDEpLmRvdChkeCAtIDEsIGR5LCBkeiAtIDEpXG4gICAgdmFyIG4wMTEgPSBncmFkMyhneCwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCwgZHkgLSAxLCBkeiAtIDEpXG4gICAgdmFyIG4xMTEgPSBncmFkMyhneCArIDEsIGd5ICsgMSwgZ3ogKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSlcblxuICAgIHJldHVybiBsZXJwKFxuICAgICAgbGVycChcbiAgICAgICAgbGVycChuMDAwLCBuMTAwLCBkeCksXG4gICAgICAgIGxlcnAobjAxMCwgbjExMCwgZHgpLFxuICAgICAgICBmYWRlKGR5KVxuICAgICAgKSxcbiAgICAgIGxlcnAoXG4gICAgICAgIGxlcnAobjAwMSwgbjEwMSwgZHgpLFxuICAgICAgICBsZXJwKG4wMTEsIG4xMTEsIGR4KSxcbiAgICAgICAgZmFkZShkeSlcbiAgICAgICksXG4gICAgICBmYWRlKGR6KVxuICAgIClcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGVybGluL1BlcmxpbjMuanMiLCJpbXBvcnQgeyBOb2lzZSB9IGZyb20gJy4uL3V0aWwvTm9pc2UnXG5pbXBvcnQgeyBncmFkNCB9IGZyb20gJy4uL3V0aWwvNGQnXG5pbXBvcnQgeyBmYWRlLCBsZXJwIH0gZnJvbSAnLi4vdXRpbC9tYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJsaW40IGV4dGVuZHMgTm9pc2Uge1xuICBjb25zdHJ1Y3RvciAocykge1xuICAgIHN1cGVyKHMpXG4gIH1cbiAgZ2VuICh4LCB5LCB6LCB0KSB7XG4gICAgdmFyIGdyYWQ0ID0gZ3JhZDQuYmluZChudWxsLCB0aGlzLnApXG4gICAgdmFyIGd4ID0gTWF0aC50cnVuYyh4KSAlIDI1NlxuICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcbiAgICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XG4gICAgdmFyIGd0ID0gTWF0aC50cnVuYyh0KSAlIDI1NlxuXG4gICAgdmFyIGR4ID0geCAtIGd4XG4gICAgdmFyIGR5ID0geSAtIGd5XG4gICAgdmFyIGR6ID0geiAtIGd6XG4gICAgdmFyIGR0ID0gdCAtIGd0XG5cbiAgICB2YXIgbjAwMDAgPSBncmFkNChneCwgZ3ksIGd6LCBndCkuZG90KGR4LCBkeSwgZHosIGR0KVxuICAgIHZhciBuMTAwMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6LCBndCkuZG90KGR4IC0gMSwgZHksIGR6KVxuICAgIHZhciBuMDEwMCA9IGdyYWQ0KGd4LCBneSArIDEsIGd6LCBndCkuZG90KGR4LCBkeSAtIDEsIGR6KVxuICAgIHZhciBuMTEwMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHopXG4gICAgdmFyIG4wMDEwID0gZ3JhZDQoZ3gsIGd5LCBneiArIDEsIGd0KS5kb3QoZHgsIGR5LCBkeiAtIDEpXG4gICAgdmFyIG4xMDEwID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3ogKyAxLCBndCkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSlcbiAgICB2YXIgbjAxMTAgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxKVxuICAgIHZhciBuMTExMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSlcbiAgICB2YXIgbjAwMDEgPSBncmFkNChneCwgZ3ksIGd6LCBndCArIDEpLmRvdChkeCwgZHksIGR6LCBkdCAtIDEpXG4gICAgdmFyIG4xMDAxID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3osIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6LCBkdCAtIDEpXG4gICAgdmFyIG4wMTAxID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3osIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6LCBkdCAtIDEpXG4gICAgdmFyIG4xMTAxID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6LCBndCArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHosIGR0IC0gMSlcbiAgICB2YXIgbjAwMTEgPSBncmFkNChneCwgZ3ksIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiAtIDEsIGR0IC0gMSlcbiAgICB2YXIgbjEwMTEgPSBncmFkNChneCArIDEsIGd5LCBneiArIDEsIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSwgZHQgLSAxKVxuICAgIHZhciBuMDExMSA9IGdyYWQ0KGd4LCBneSArIDEsIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxLCBkdCAtIDEpXG4gICAgdmFyIG4xMTExID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxuXG4gICAgcmV0dXJuIGxlcnAoXG4gICAgICBsZXJwKFxuICAgICAgICBsZXJwKFxuICAgICAgICAgIGxlcnAobjAwMDAsIG4xMDAwLCBkeCksXG4gICAgICAgICAgbGVycChuMDEwMCwgbjExMDAsIGR4KSxcbiAgICAgICAgICBmYWRlKGR5KVxuICAgICAgICApLFxuICAgICAgICBsZXJwKFxuICAgICAgICAgIGxlcnAobjAwMTAsIG4xMDEwLCBkeCksXG4gICAgICAgICAgbGVycChuMDExMCwgbjExMTAsIGR4KSxcbiAgICAgICAgICBmYWRlKGR5KVxuICAgICAgICApLFxuICAgICAgICBmYWRlKGR6KVxuICAgICAgKSxcbiAgICAgIGxlcnAoXG4gICAgICAgIGxlcnAoXG4gICAgICAgICAgbGVycChuMDAwMSwgbjEwMDEsIGR4KSxcbiAgICAgICAgICBsZXJwKG4wMTAxLCBuMTEwMSwgZHgpLFxuICAgICAgICAgIGZhZGUoZHkpXG4gICAgICAgICksXG4gICAgICAgIGxlcnAoXG4gICAgICAgICAgbGVycChuMDAxMSwgbjEwMTEsIGR4KSxcbiAgICAgICAgICBsZXJwKG4wMTExLCBuMTExMSwgZHgpLFxuICAgICAgICAgIGZhZGUoZHkpXG4gICAgICAgICksXG4gICAgICAgIGZhZGUoZHopXG4gICAgICApLFxuICAgICAgZmFkZShkdClcbiAgICApXG4gIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Blcmxpbi9QZXJsaW40LmpzIiwiaW1wb3J0IHsgTm9pc2UgfSBmcm9tICcuLi91dGlsL05vaXNlJ1xuaW1wb3J0IHsgZ04sIGxlcnBOLCBnZXROcywgZ2VuZXJhdGVHTiB9IGZyb20gJy4uL3V0aWwvTmQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcmxpbk4gZXh0ZW5kcyBOb2lzZSB7XG4gIGNvbnN0cnVjdG9yIChzKSB7XG4gICAgc3VwZXIocylcbiAgfVxuICBnZW4gKC4uLmFyZ3MpIHtcbiAgICB2YXIgZ2V0TnMgPSBnZXROcy5iaW5kKG51bGwsIHRoaXMucClcbiAgICB2YXIgZ3MgPSBbXVxuICAgIHZhciBkcyA9IFtdXG5cbiAgICBpZiAoZ04ubGVuZ3RoID09PSAwKSB7XG4gICAgICBnZW5lcmF0ZUdOKGFyZ3MubGVuZ3RoKVxuICAgIH1cblxuICAgIHZhciBpXG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdzW2ldID0gTWF0aC50cnVuYyhhcmdzW2ldKSAlIDI1NlxuICAgICAgZHNbaV0gPSBhcmdzW2ldIC0gZ3NbaV1cbiAgICB9XG4gICAgdmFyIG5zID0gZ2V0TnMoYXJncy5sZW5ndGgsIGdzLCBkcylcbiAgICB2YXIgcmVzID0gbGVycE4obnMsIGRzKVxuICAgIHJldHVybiByZXNcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGVybGluL1Blcmxpbk4uanMiLCJpbXBvcnQgeyBOb2lzZSB9IGZyb20gJy4uL3V0aWwvTm9pc2UnXG5pbXBvcnQgeyBncmFkMSB9IGZyb20gJy4uL3V0aWwvMWQnXG5pbXBvcnQgeyBmYWRlLCBsZXJwIH0gZnJvbSAnLi4vdXRpbC9tYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGV4MSBleHRlbmRzIE5vaXNlIHtcbiAgY29uc3RydWN0b3IgKHMpIHtcbiAgICBzdXBlcihzKVxuICB9XG4gIGdlbiAoeCkge1xuICAgIHZhciBncmFkMSA9IGdyYWQxLmJpbmQobnVsbCwgdGhpcy5wKVxuICAgIHZhciBneCA9IE1hdGguZmxvb3IoeCkgJSAyNTZcbiAgICB2YXIgZHggPSB4IC0gZ3hcblxuICAgIHZhciBuMCA9IGN1dDEoZHgpICogZ3JhZDEoZ3gpLmRvdChkeClcbiAgICB2YXIgbjEgPSBjdXQxKGR4IC0gMSkgKiBncmFkMShneCArIDEpLmRvdChkeCAtIDEpXG5cbiAgICByZXR1cm4gMC41ICogKG4wICsgbjEpXG4gIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NpbXBsZXgvU2ltcGxleDEuanMiLCJpbXBvcnQgeyBOb2lzZSB9IGZyb20gJy4uL3V0aWwvTm9pc2UnXG5pbXBvcnQgeyBncmFkMiBhcyBncmFkLCBTMl9UT19DLCBDX1RPX1MyIH0gZnJvbSAnLi4vdXRpbC8yZCdcbmltcG9ydCB7IGN1dCB9IGZyb20gJy4uL3V0aWwvbWF0aCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxleDIgZXh0ZW5kcyBOb2lzZSB7XG4gIGNvbnN0cnVjdG9yIChzKSB7XG4gICAgc3VwZXIocylcbiAgfVxuICBnZW4gKHgsIHkpIHtcbiAgICBpZiAodGhpcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzKVxuICAgIH1cbiAgICB2YXIgZ3JhZDIgPSBncmFkLmJpbmQobnVsbCwgdGhpcy5wKVxuICAgIHZhciBza2V3ID0gKHggKyB5KSAqIFMyX1RPX0NcbiAgICB2YXIgaSA9IE1hdGgudHJ1bmMoeCArIHNrZXcpXG4gICAgdmFyIGogPSBNYXRoLnRydW5jKHkgKyBza2V3KVxuXG4gICAgdmFyIHVuc2tldyA9IChpICsgaikgKiBDX1RPX1MyXG4gICAgdmFyIGd4ID0gaSAtIHVuc2tld1xuICAgIHZhciBneSA9IGogLSB1bnNrZXdcblxuICAgIHZhciBkeDAgPSB4IC0gZ3hcbiAgICB2YXIgZHkwID0geSAtIGd5XG5cbiAgICB2YXIgZGkgPSBkeDAgPiBkeTAgPyAxIDogMFxuICAgIHZhciBkaiA9IGR4MCA+IGR5MCA/IDAgOiAxXG5cbiAgICAvLyB3aHkgaXNuJ3QgaXQgKyBkaSAtIENfVE9fUzI/XG4gICAgdmFyIGR4MSA9IGR4MCAtIGRpICsgQ19UT19TMlxuICAgIHZhciBkeTEgPSBkeTAgLSBkaiArIENfVE9fUzJcbiAgICB2YXIgZHgyID0gZHgwIC0gMSArIDIgKiBDX1RPX1MyXG4gICAgdmFyIGR5MiA9IGR5MCAtIDEgKyAyICogQ19UT19TMlxuICAgIFxuICAgIHZhciBuMCA9IGN1dChkeDAsIGR5MCkgKiBncmFkMihpLCBqKS5kb3QoZHgwLCBkeTApXG4gICAgdmFyIG4xID0gY3V0KGR4MSwgZHkxKSAqIGdyYWQyKGkgKyBkaSwgaiArIGRqKS5kb3QoZHgxLCBkeTEpXG4gICAgdmFyIG4yID0gY3V0KGR4MiwgZHkyKSAqIGdyYWQyKGkgKyAxLCBqICsgMSkuZG90KGR4MiwgZHkyKVxuXG4gICAgcmV0dXJuIDcwICogKG4wICsgbjEgKyBuMilcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxleC9TaW1wbGV4Mi5qcyIsImltcG9ydCB7IFBlcmxpbjEsIFBlcmxpbjIsIFBlcmxpbjMsIFBlcmxpbjQsIFBlcmxpbk4gfSBmcm9tICcuL3Blcmxpbi9pbmRleCdcclxuaW1wb3J0IHsgU2ltcGxleDEsIFNpbXBsZXgyIH0gZnJvbSAnLi9zaW1wbGV4L2luZGV4J1xyXG5cclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW4xIH0gZnJvbSAnLi9wZXJsaW4vUGVybGluMSdcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW4yIH0gZnJvbSAnLi9wZXJsaW4vUGVybGluMidcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW4zIH0gZnJvbSAnLi9wZXJsaW4vUGVybGluMydcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW40IH0gZnJvbSAnLi9wZXJsaW4vUGVybGluNCdcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW5OIH0gZnJvbSAnLi9wZXJsaW4vUGVybGluTidcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaW1wbGV4MSB9IGZyb20gJy4vc2ltcGxleC9TaW1wbGV4MSdcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaW1wbGV4MiB9IGZyb20gJy4vc2ltcGxleC9TaW1wbGV4MidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBTaW1wbGV4MTogU2ltcGxleDEsXHJcbiAgU2ltcGxleDI6IFNpbXBsZXgyLFxyXG4gIFBlcmxpbjE6IFBlcmxpbjEsXHJcbiAgUGVybGluMjogUGVybGluMixcclxuICBQZXJsaW4zOiBQZXJsaW4zLFxyXG4gIFBlcmxpbjQ6IFBlcmxpbjQsXHJcbiAgUGVybGluTjogUGVybGluTlxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluMSB9IGZyb20gJy4vUGVybGluMSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluMiB9IGZyb20gJy4vUGVybGluMidcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluMyB9IGZyb20gJy4vUGVybGluMydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluNCB9IGZyb20gJy4vUGVybGluNCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGVybGluTiB9IGZyb20gJy4vUGVybGluTidcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wZXJsaW4vaW5kZXguanMiLCIvKlxuICogcmFuZG9tLXNlZWRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9za3JhdGNoZG90L3JhbmRvbS1zZWVkXG4gKlxuICogVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgU3RldmUgR2lic29uIGFuZCBjYW4gYmUgZm91bmQgaGVyZTpcbiAqXG4gKiBodHRwczovL3d3dy5ncmMuY29tL290Zy91aGVwcm5nLmh0bVxuICpcbiAqIEl0IHdhcyBzbGlnaHRseSBtb2RpZmllZCBmb3IgdXNlIGluIG5vZGUsIHRvIHBhc3MganNoaW50LCBhbmQgYSBmZXcgYWRkaXRpb25hbFxuICogaGVscGVyIGZ1bmN0aW9ucyB3ZXJlIGFkZGVkLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMyBza3JhdGNoZG90XG4gKiBEdWFsIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBhbmQgdGhlIG9yaWdpbmFsIEdSQyBjb3B5cmlnaHQvbGljZW5zZVxuICogaW5jbHVkZWQgYmVsb3cuXG4gKi9cbi8qXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFx0XHRcdFx0XHRcdFx0XHRHaWJzb24gUmVzZWFyY2ggQ29ycG9yYXRpb25cblx0XHRcdFx0VUhFUFJORyAtIFVsdHJhIEhpZ2ggRW50cm9weSBQc2V1ZG8tUmFuZG9tIE51bWJlciBHZW5lcmF0b3Jcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRMSUNFTlNFIEFORCBDT1BZUklHSFQ6ICBUSElTIENPREUgSVMgSEVSRUJZIFJFTEVBU0VEIElOVE8gVEhFIFBVQkxJQyBET01BSU5cblx0R2lic29uIFJlc2VhcmNoIENvcnBvcmF0aW9uIHJlbGVhc2VzIGFuZCBkaXNjbGFpbXMgQUxMIFJJR0hUUyBBTkQgVElUTEUgSU5cblx0VEhJUyBDT0RFIE9SIEFOWSBERVJJVkFUSVZFUy4gQW55b25lIG1heSBiZSBmcmVlbHkgdXNlIGl0IGZvciBhbnkgcHVycG9zZS5cblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRUaGlzIGlzIEdSQydzIGNyeXB0b2dyYXBoaWNhbGx5IHN0cm9uZyBQUk5HIChwc2V1ZG8tcmFuZG9tIG51bWJlciBnZW5lcmF0b3IpXG5cdGZvciBKYXZhU2NyaXB0LiBJdCBpcyBkcml2ZW4gYnkgMTUzNiBiaXRzIG9mIGVudHJvcHksIHN0b3JlZCBpbiBhbiBhcnJheSBvZlxuXHQ0OCwgMzItYml0IEphdmFTY3JpcHQgdmFyaWFibGVzLiAgU2luY2UgbWFueSBhcHBsaWNhdGlvbnMgb2YgdGhpcyBnZW5lcmF0b3IsXG5cdGluY2x1ZGluZyBvdXJzIHdpdGggdGhlIFwiT2ZmIFRoZSBHcmlkXCIgTGF0aW4gU3F1YXJlIGdlbmVyYXRvciwgbWF5IHJlcXVpcmVcblx0dGhlIGRldGVyaW1pbmlzdGljIHJlLWdlbmVyYXRpb24gb2YgYSBzZXF1ZW5jZSBvZiBQUk5zLCB0aGlzIFBSTkcncyBpbml0aWFsXG5cdGVudHJvcGljIHN0YXRlIGNhbiBiZSByZWFkIGFuZCB3cml0dGVuIGFzIGEgc3RhdGljIHdob2xlLCBhbmQgaW5jcmVtZW50YWxseVxuXHRldm9sdmVkIGJ5IHBvdXJpbmcgbmV3IHNvdXJjZSBlbnRyb3B5IGludG8gdGhlIGdlbmVyYXRvcidzIGludGVybmFsIHN0YXRlLlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdEVORExFU1MgVEhBTktTIGFyZSBkdWUgSm9oYW5uZXMgQmFhZ29lIGZvciBoaXMgY2FyZWZ1bCBkZXZlbG9wbWVudCBvZiBoaWdobHlcblx0cm9idXN0IEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb25zIG9mIEpTIFBSTkdzLiAgVGhpcyB3b3JrIHdhcyBiYXNlZCB1cG9uIGhpc1xuXHRKYXZhU2NyaXB0IFwiQWxlYVwiIFBSTkcgd2hpY2ggaXMgYmFzZWQgdXBvbiB0aGUgZXh0cmVtZWx5IHJvYnVzdCBNdWx0aXBseS1cblx0V2l0aC1DYXJyeSAoTVdDKSBQUk5HIGludmVudGVkIGJ5IEdlb3JnZSBNYXJzYWdsaWEuIE1XQyBBbGdvcml0aG0gUmVmZXJlbmNlczpcblx0aHR0cDovL3d3dy5HUkMuY29tL290Zy9NYXJzYWdsaWFfUFJOR3MucGRmXG5cdGh0dHA6Ly93d3cuR1JDLmNvbS9vdGcvTWFyc2FnbGlhX01XQ19HZW5lcmF0b3JzLnBkZlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFRoZSBxdWFsaXR5IG9mIHRoaXMgYWxnb3JpdGhtJ3MgcHNldWRvLXJhbmRvbSBudW1iZXJzIGhhdmUgYmVlbiB2ZXJpZmllZCBieVxuXHRtdWx0aXBsZSBpbmRlcGVuZGVudCByZXNlYXJjaGVycy4gSXQgaGFuZGlseSBwYXNzZXMgdGhlIGZlcm1pbGFiLmNoIHRlc3RzIGFzXG5cdHdlbGwgYXMgdGhlIFwiZGllaGFyZFwiIGFuZCBcImRpZWhhcmRlclwiIHRlc3Qgc3VpdGVzLiAgRm9yIGluZGl2aWR1YWxzIHdpc2hpbmdcblx0dG8gZnVydGhlciB2ZXJpZnkgdGhlIHF1YWxpdHkgb2YgdGhpcyBhbGdvcml0aG0ncyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMsIGFcblx0MjU2LW1lZ2FieXRlIGZpbGUgb2YgdGhpcyBhbGdvcml0aG0ncyBvdXRwdXQgbWF5IGJlIGRvd25sb2FkZWQgZnJvbSBHUkMuY29tLFxuXHRhbmQgYSBNaWNyb3NvZnQgV2luZG93cyBzY3JpcHRpbmcgaG9zdCAoV1NIKSB2ZXJzaW9uIG9mIHRoaXMgYWxnb3JpdGhtIG1heSBiZVxuXHRkb3dubG9hZGVkIGFuZCBydW4gZnJvbSB0aGUgV2luZG93cyBjb21tYW5kIHByb21wdCB0byBnZW5lcmF0ZSB1bmlxdWUgZmlsZXNcblx0b2YgYW55IHNpemU6XG5cdFRoZSBGZXJtaWxhYiBcIkVOVFwiIHRlc3RzOiBodHRwOi8vZm91cm1pbGFiLmNoL3JhbmRvbS9cblx0VGhlIDI1Ni1tZWdhYnl0ZSBzYW1wbGUgUFJOIGZpbGUgYXQgR1JDOiBodHRwczovL3d3dy5HUkMuY29tL290Zy91aGVwcm5nLmJpblxuXHRUaGUgV2luZG93cyBzY3JpcHRpbmcgaG9zdCB2ZXJzaW9uOiBodHRwczovL3d3dy5HUkMuY29tL290Zy93c2gtdWhlcHJuZy5qc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFF1YWxpZnlpbmcgTVdDIG11bHRpcGxpZXJzIGFyZTogMTg3ODg0LCA2ODYxMTgsIDg5ODEzNCwgMTEwNDM3NSwgMTI1MDIwNSxcblx0MTQ2MDkxMCBhbmQgMTc2ODg2My4gKFdlIHVzZSB0aGUgbGFyZ2VzdCBvbmUgdGhhdCdzIDwgMl4yMSlcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcblxuLypcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblRoaXMgaXMgYmFzZWQgdXBvbiBKb2hhbm5lcyBCYWFnb2UncyBjYXJlZnVsbHkgZGVzaWduZWQgYW5kIGVmZmljaWVudCBoYXNoXG5mdW5jdGlvbiBmb3IgdXNlIHdpdGggSmF2YVNjcmlwdC4gIEl0IGhhcyBhIHByb3ZlbiBcImF2YWxhbmNoZVwiIGVmZmVjdCBzdWNoXG50aGF0IGV2ZXJ5IGJpdCBvZiB0aGUgaW5wdXQgYWZmZWN0cyBldmVyeSBiaXQgb2YgdGhlIG91dHB1dCA1MCUgb2YgdGhlIHRpbWUsXG53aGljaCBpcyBnb29kLlx0U2VlOiBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2hhc2gvYXZhbGFuY2hlLnhodG1sXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qL1xudmFyIE1hc2ggPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBuID0gMHhlZmM4MjQ5ZDtcblx0dmFyIG1hc2ggPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuXHRcdFx0XHR2YXIgaCA9IDAuMDI1MTk2MDMyODI0MTY5MzggKiBuO1xuXHRcdFx0XHRuID0gaCA+Pj4gMDtcblx0XHRcdFx0aCAtPSBuO1xuXHRcdFx0XHRoICo9IG47XG5cdFx0XHRcdG4gPSBoID4+PiAwO1xuXHRcdFx0XHRoIC09IG47XG5cdFx0XHRcdG4gKz0gaCAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcblx0XHR9IGVsc2Uge1xuXHRcdFx0biA9IDB4ZWZjODI0OWQ7XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbWFzaDtcbn07XG5cbnZhciB1aGVwcm5nID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0cmV0dXJuIChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG8gPSA0ODsgLy8gc2V0IHRoZSAnb3JkZXInIG51bWJlciBvZiBFTlRST1BZLWhvbGRpbmcgMzItYml0IHZhbHVlc1xuXHRcdHZhciBjID0gMTsgLy8gaW5pdCB0aGUgJ2NhcnJ5JyB1c2VkIGJ5IHRoZSBtdWx0aXBseS13aXRoLWNhcnJ5IChNV0MpIGFsZ29yaXRobVxuXHRcdHZhciBwID0gbzsgLy8gaW5pdCB0aGUgJ3BoYXNlJyAobWF4LTEpIG9mIHRoZSBpbnRlcm1lZGlhdGUgdmFyaWFibGUgcG9pbnRlclxuXHRcdHZhciBzID0gbmV3IEFycmF5KG8pOyAvLyBkZWNsYXJlIG91ciBpbnRlcm1lZGlhdGUgdmFyaWFibGVzIGFycmF5XG5cdFx0dmFyIGk7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXHRcdHZhciBqOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblx0XHR2YXIgayA9IDA7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXG5cdFx0Ly8gd2hlbiBvdXIgXCJ1aGVwcm5nXCIgaXMgaW5pdGlhbGx5IGludm9rZWQgb3VyIFBSTkcgc3RhdGUgaXMgaW5pdGlhbGl6ZWQgZnJvbSB0aGVcblx0XHQvLyBicm93c2VyJ3Mgb3duIGxvY2FsIFBSTkcuIFRoaXMgaXMgb2theSBzaW5jZSBhbHRob3VnaCBpdHMgZ2VuZXJhdG9yIG1pZ2h0IG5vdFxuXHRcdC8vIGJlIHdvbmRlcmZ1bCwgaXQncyB1c2VmdWwgZm9yIGVzdGFibGlzaGluZyBsYXJnZSBzdGFydHVwIGVudHJvcHkgZm9yIG91ciB1c2FnZS5cblx0XHR2YXIgbWFzaCA9IG5ldyBNYXNoKCk7IC8vIGdldCBhIHBvaW50ZXIgdG8gb3VyIGhpZ2gtcGVyZm9ybWFuY2UgXCJNYXNoXCIgaGFzaFxuXG5cdFx0Ly8gZmlsbCB0aGUgYXJyYXkgd2l0aCBpbml0aWFsIG1hc2ggaGFzaCB2YWx1ZXNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRzW2ldID0gbWFzaChNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cblx0XHQvLyB0aGlzIFBSSVZBVEUgKGludGVybmFsIGFjY2VzcyBvbmx5KSBmdW5jdGlvbiBpcyB0aGUgaGVhcnQgb2YgdGhlIG11bHRpcGx5LXdpdGgtY2Fycnlcblx0XHQvLyAoTVdDKSBQUk5HIGFsZ29yaXRobS4gV2hlbiBjYWxsZWQgaXQgcmV0dXJucyBhIHBzZXVkby1yYW5kb20gbnVtYmVyIGluIHRoZSBmb3JtIG9mIGFcblx0XHQvLyAzMi1iaXQgSmF2YVNjcmlwdCBmcmFjdGlvbiAoMC4wIHRvIDwxLjApIGl0IGlzIGEgUFJJVkFURSBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBkZWZhdWx0XG5cdFx0Ly8gWzAtMV0gcmV0dXJuIGZ1bmN0aW9uLCBhbmQgYnkgdGhlIHJhbmRvbSAnc3RyaW5nKG4pJyBmdW5jdGlvbiB3aGljaCByZXR1cm5zICduJ1xuXHRcdC8vIGNoYXJhY3RlcnMgZnJvbSAzMyB0byAxMjYuXG5cdFx0dmFyIHJhd3BybmcgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoKytwID49IG8pIHtcblx0XHRcdFx0cCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdCA9IDE3Njg4NjMgKiBzW3BdICsgYyAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG5cdFx0XHRyZXR1cm4gc1twXSA9IHQgLSAoYyA9IHQgfCAwKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiBpcyB0aGUgZGVmYXVsdCBmdW5jdGlvbiByZXR1cm5lZCBieSB0aGlzIGxpYnJhcnkuXG5cdFx0Ly8gVGhlIHZhbHVlcyByZXR1cm5lZCBhcmUgaW50ZWdlcnMgaW4gdGhlIHJhbmdlIGZyb20gMCB0byByYW5nZS0xLiBXZSBmaXJzdFxuXHRcdC8vIG9idGFpbiB0d28gMzItYml0IGZyYWN0aW9ucyAoZnJvbSByYXdwcm5nKSB0byBzeW50aGVzaXplIGEgc2luZ2xlIGhpZ2hcblx0XHQvLyByZXNvbHV0aW9uIDUzLWJpdCBwcm5nICgwIHRvIDwxKSwgdGhlbiB3ZSBtdWx0aXBseSB0aGlzIGJ5IHRoZSBjYWxsZXInc1xuXHRcdC8vIFwicmFuZ2VcIiBwYXJhbSBhbmQgdGFrZSB0aGUgXCJmbG9vclwiIHRvIHJldHVybiBhIGVxdWFsbHkgcHJvYmFibGUgaW50ZWdlci5cblx0XHR2YXIgcmFuZG9tID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihyYW5nZSAqIChyYXdwcm5nKCkgKyAocmF3cHJuZygpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTYpKTsgLy8gMl4tNTNcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiAnc3RyaW5nKG4pJyByZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBzdHJpbmcgb2Zcblx0XHQvLyAnbicgcHJpbnRhYmxlIGNoYXJhY3RlcnMgcmFuZ2luZyBmcm9tIGNocigzMykgdG8gY2hyKDEyNikgaW5jbHVzaXZlLlxuXHRcdHJhbmRvbS5zdHJpbmcgPSBmdW5jdGlvbiAoY291bnQpIHtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIHMgPSAnJztcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cdFx0XHRcdHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMyArIHJhbmRvbSg5NCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgUFJJVkFURSBcImhhc2hcIiBmdW5jdGlvbiBpcyB1c2VkIHRvIGV2b2x2ZSB0aGUgZ2VuZXJhdG9yJ3MgaW50ZXJuYWxcblx0XHQvLyBlbnRyb3B5IHN0YXRlLiBJdCBpcyBhbHNvIGNhbGxlZCBieSB0aGUgRVhQT1JURUQgYWRkRW50cm9weSgpIGZ1bmN0aW9uXG5cdFx0Ly8gd2hpY2ggaXMgdXNlZCB0byBwb3VyIGVudHJvcHkgaW50byB0aGUgUFJORy5cblx0XHR2YXIgaGFzaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHtcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goYXJnc1tpXSk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJjbGVhbiBzdHJpbmdcIiBmdW5jdGlvbiByZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlcyBhbmQgbm9uLXByaW50aW5nXG5cdFx0Ly8gY29udHJvbCBjaGFyYWN0ZXJzLCBpbmNsdWRpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlLXJldHVybiAoQ1IpIGFuZCBsaW5lLWZlZWQgKExGKSBjaGFyYWN0ZXJzLFxuXHRcdC8vIGZyb20gYW55IHN0cmluZyBpdCBpcyBoYW5kZWQuIHRoaXMgaXMgYWxzbyB1c2VkIGJ5IHRoZSAnaGFzaHN0cmluZycgZnVuY3Rpb24gKGJlbG93KSB0byBoZWxwXG5cdFx0Ly8gdXNlcnMgYWx3YXlzIG9idGFpbiB0aGUgc2FtZSBFRkZFQ1RJVkUgdWhlcHJuZyBzZWVkaW5nIGtleS5cblx0XHRyYW5kb20uY2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoaW5TdHIpIHtcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2dpLCAnJyk7IC8vIHJlbW92ZSBhbnkvYWxsIGxlYWRpbmcgc3BhY2VzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1tcXHgwMC1cXHgxRl0vZ2ksICcnKTsgLy8gcmVtb3ZlIGFueS9hbGwgY29udHJvbCBjaGFyYWN0ZXJzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1xcbiAvLCAnXFxuJyk7IC8vIHJlbW92ZSBhbnkvYWxsIHRyYWlsaW5nIHNwYWNlc1xuXHRcdFx0cmV0dXJuIGluU3RyOyAvLyByZXR1cm4gdGhlIGNsZWFuZWQgdXAgcmVzdWx0XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJoYXNoIHN0cmluZ1wiIGZ1bmN0aW9uIGhhc2hlcyB0aGUgcHJvdmlkZWQgY2hhcmFjdGVyIHN0cmluZyBhZnRlciBmaXJzdCByZW1vdmluZ1xuXHRcdC8vIGFueSBsZWFkaW5nIG9yIHRyYWlsaW5nIHNwYWNlcyBhbmQgaWdub3JpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlIHJldHVybnMgKENSKSBvciBMaW5lIEZlZWRzIChMRilcblx0XHRyYW5kb20uaGFzaFN0cmluZyA9IGZ1bmN0aW9uIChpblN0cikge1xuXHRcdFx0aW5TdHIgPSByYW5kb20uY2xlYW5TdHJpbmcoaW5TdHIpO1xuXHRcdFx0bWFzaChpblN0cik7IC8vIHVzZSB0aGUgc3RyaW5nIHRvIGV2b2x2ZSB0aGUgJ21hc2gnIHN0YXRlXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgaW5TdHIubGVuZ3RoOyBpKyspIHsgLy8gc2NhbiB0aHJvdWdoIHRoZSBjaGFyYWN0ZXJzIGluIG91ciBzdHJpbmdcblx0XHRcdFx0ayA9IGluU3RyLmNoYXJDb2RlQXQoaSk7IC8vIGdldCB0aGUgY2hhcmFjdGVyIGNvZGUgYXQgdGhlIGxvY2F0aW9uXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHsgLy9cdFwibWFzaFwiIGl0IGludG8gdGhlIFVIRVBSTkcgc3RhdGVcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goayk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZWVkIHRoZSByYW5kb20gZ2VuZXJhdG9yLlxuXHRcdHJhbmRvbS5zZWVkID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0XHRcdGlmICh0eXBlb2Ygc2VlZCA9PT0gJ3VuZGVmaW5lZCcgfHwgc2VlZCA9PT0gbnVsbCkge1xuXHRcdFx0XHRzZWVkID0gTWF0aC5yYW5kb20oKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0c2VlZCA9IHN0cmluZ2lmeShzZWVkLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAodmFsdWUpLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyYW5kb20uaW5pdFN0YXRlKCk7XG5cdFx0XHRyYW5kb20uaGFzaFN0cmluZyhzZWVkKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBoYW5keSBleHBvcnRlZCBmdW5jdGlvbiBpcyB1c2VkIHRvIGFkZCBlbnRyb3B5IHRvIG91ciB1aGVwcm5nIGF0IGFueSB0aW1lXG5cdFx0cmFuZG9tLmFkZEVudHJvcHkgPSBmdW5jdGlvbiAoIC8qIGFjY2VwdCB6ZXJvIG9yIG1vcmUgYXJndW1lbnRzICovICkge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0YXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHR9XG5cdFx0XHRoYXNoKChrKyspICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArIGFyZ3Muam9pbignJykgKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2Ugd2FudCB0byBwcm92aWRlIGEgZGV0ZXJtaW5pc3RpYyBzdGFydHVwIGNvbnRleHQgZm9yIG91ciBQUk5HLFxuXHRcdC8vIGJ1dCB3aXRob3V0IGRpcmVjdGx5IHNldHRpbmcgdGhlIGludGVybmFsIHN0YXRlIHZhcmlhYmxlcywgdGhpcyBhbGxvd3Ncblx0XHQvLyB1cyB0byBpbml0aWFsaXplIHRoZSBtYXNoIGhhc2ggYW5kIFBSTkcncyBpbnRlcm5hbCBzdGF0ZSBiZWZvcmUgcHJvdmlkaW5nXG5cdFx0Ly8gc29tZSBoYXNoaW5nIGlucHV0XG5cdFx0cmFuZG9tLmluaXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1hc2goKTsgLy8gcGFzcyBhIG51bGwgYXJnIHRvIGZvcmNlIG1hc2ggaGFzaCB0byBpbml0XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRcdHNbaV0gPSBtYXNoKCcgJyk7IC8vIGZpbGwgdGhlIGFycmF5IHdpdGggaW5pdGlhbCBtYXNoIGhhc2ggdmFsdWVzXG5cdFx0XHR9XG5cdFx0XHRjID0gMTsgLy8gaW5pdCBvdXIgbXVsdGlwbHktd2l0aC1jYXJyeSBjYXJyeVxuXHRcdFx0cCA9IG87IC8vIGluaXQgb3VyIHBoYXNlXG5cdFx0fTtcblxuXHRcdC8vIHdlIHVzZSB0aGlzIChvcHRpb25hbCkgZXhwb3J0ZWQgZnVuY3Rpb24gdG8gc2lnbmFsIHRoZSBKYXZhU2NyaXB0IGludGVycHJldGVyXG5cdFx0Ly8gdGhhdCB3ZSdyZSBmaW5pc2hlZCB1c2luZyB0aGUgXCJNYXNoXCIgaGFzaCBmdW5jdGlvbiBzbyB0aGF0IGl0IGNhbiBmcmVlIHVwIHRoZVxuXHRcdC8vIGxvY2FsIFwiaW5zdGFuY2UgdmFyaWFibGVzXCIgaXMgd2lsbCBoYXZlIGJlZW4gbWFpbnRhaW5pbmcuICBJdCdzIG5vdCBzdHJpY3RseVxuXHRcdC8vIG5lY2Vzc2FyeSwgb2YgY291cnNlLCBidXQgaXQncyBnb29kIEphdmFTY3JpcHQgY2l0aXplbnNoaXAuXG5cdFx0cmFuZG9tLmRvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtYXNoID0gbnVsbDtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2UgY2FsbGVkIFwidWhlcHJuZ1wiIHdpdGggYSBzZWVkIHZhbHVlLCB0aGVuIGV4ZWN1dGUgcmFuZG9tLnNlZWQoKSBiZWZvcmUgcmV0dXJuaW5nXG5cdFx0aWYgKHR5cGVvZiBzZWVkICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmFuZG9tLnNlZWQoc2VlZCk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgcmFuZ2UgKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20ucmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiByYW5kb20ocmFuZ2UpO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgMSAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5yYW5kb20gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tKE51bWJlci5NQVhfVkFMVUUgLSAxKSAvIE51bWJlci5NQVhfVkFMVUU7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gZmxvYXQgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5mbG9hdEJldHdlZW4gPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0XHRcdHJldHVybiByYW5kb20ucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcblx0XHRyYW5kb20uaW50QmV0d2VlbiA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IocmFuZG9tLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gd2hlbiBvdXIgbWFpbiBvdXRlciBcInVoZXBybmdcIiBmdW5jdGlvbiBpcyBjYWxsZWQsIGFmdGVyIHNldHRpbmcgdXAgb3VyXG5cdFx0Ly8gaW5pdGlhbCB2YXJpYWJsZXMgYW5kIGVudHJvcGljIHN0YXRlLCB3ZSByZXR1cm4gYW4gXCJpbnN0YW5jZSBwb2ludGVyXCJcblx0XHQvLyB0byB0aGUgaW50ZXJuYWwgYW5vbnltb3VzIGZ1bmN0aW9uIHdoaWNoIGNhbiB0aGVuIGJlIHVzZWQgdG8gYWNjZXNzXG5cdFx0Ly8gdGhlIHVoZXBybmcncyB2YXJpb3VzIGV4cG9ydGVkIGZ1bmN0aW9ucy4gIEFzIHdpdGggdGhlIFwiLmRvbmVcIiBmdW5jdGlvblxuXHRcdC8vIGFib3ZlLCB3ZSBzaG91bGQgc2V0IHRoZSByZXR1cm5lZCB2YWx1ZSB0byAnbnVsbCcgb25jZSB3ZSdyZSBmaW5pc2hlZFxuXHRcdC8vIHVzaW5nIGFueSBvZiB0aGVzZSBmdW5jdGlvbnMuXG5cdFx0cmV0dXJuIHJhbmRvbTtcblx0fSgpKTtcbn07XG5cbi8vIE1vZGlmaWNhdGlvbiBmb3IgdXNlIGluIG5vZGU6XG51aGVwcm5nLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdHJldHVybiBuZXcgdWhlcHJuZyhzZWVkKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHVoZXBybmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbmV4cG9ydHMuZ2V0U2VyaWFsaXplID0gc2VyaWFsaXplclxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCByZXBsYWNlciwgc3BhY2VzLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpLCBzcGFjZXMpXG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgdmFyIHN0YWNrID0gW10sIGtleXMgPSBbXVxuXG4gIGlmIChjeWNsZVJlcGxhY2VyID09IG51bGwpIGN5Y2xlUmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrWzBdID09PSB2YWx1ZSkgcmV0dXJuIFwiW0NpcmN1bGFyIH5dXCJcbiAgICByZXR1cm4gXCJbQ2lyY3VsYXIgfi5cIiArIGtleXMuc2xpY2UoMCwgc3RhY2suaW5kZXhPZih2YWx1ZSkpLmpvaW4oXCIuXCIpICsgXCJdXCJcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciB0aGlzUG9zID0gc3RhY2suaW5kZXhPZih0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBzdGFjay5zcGxpY2UodGhpc1BvcyArIDEpIDogc3RhY2sucHVzaCh0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBrZXlzLnNwbGljZSh0aGlzUG9zLCBJbmZpbml0eSwga2V5KSA6IGtleXMucHVzaChrZXkpXG4gICAgICBpZiAofnN0YWNrLmluZGV4T2YodmFsdWUpKSB2YWx1ZSA9IGN5Y2xlUmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgICBlbHNlIHN0YWNrLnB1c2godmFsdWUpXG5cbiAgICByZXR1cm4gcmVwbGFjZXIgPT0gbnVsbCA/IHZhbHVlIDogcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJmdW5jdGlvbiBWZWMzICh4LCB5LCB6KSB7XG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxuICB0aGlzLnogPSB6XG59XG5WZWMzLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSwgeikge1xuICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHkgKyB0aGlzLnogKiB6XG59XG52YXIgZzMgPSBbXG4gIG5ldyBWZWMzKDEsIDEsIDEpLCBuZXcgVmVjMygtMSwgMSwgMSksIG5ldyBWZWMzKDEsIC0xLCAxKSwgbmV3IFZlYzMoLTEsIC0xLCAxKSxcbiAgbmV3IFZlYzMoMSwgMSwgMCksIG5ldyBWZWMzKC0xLCAxLCAwKSwgbmV3IFZlYzMoMSwgLTEsIDApLCBuZXcgVmVjMygtMSwgLTEsIDApLFxuICBuZXcgVmVjMygxLCAxLCAtMSksIG5ldyBWZWMzKC0xLCAxLCAtMSksIG5ldyBWZWMzKDEsIC0xLCAtMSksIG5ldyBWZWMzKC0xLCAtMSwgLTEpXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBncmFkMyAocCwgeCwgeSwgeikge1xuICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbel1dXSAlIGczLmxlbmd0aFxuICByZXR1cm4gZzNbaGFzaF1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvM2QuanMiLCJmdW5jdGlvbiBWZWM0ICh4LCB5LCB6LCB0KSB7XG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxuICB0aGlzLnogPSB6XG4gIHRoaXMudCA9IHRcbn1cblZlYzQucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4LCB5LCB6LCB0KSB7XG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeSArIHRoaXMueiAqIHogKyB0aGlzLnQgKiB0XG59XG52YXIgZzQgPSBbXG4gIG5ldyBWZWM0KDAsIDEsIDEsIDEpLCBuZXcgVmVjNCgwLCAxLCAxLCAtMSksIG5ldyBWZWM0KDAsIDEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgMSwgLTEsIC0xKSxcbiAgbmV3IFZlYzQoMCwgLTEsIDEsIDEpLCBuZXcgVmVjNCgwLCAtMSwgMSwgLTEpLCBuZXcgVmVjNCgwLCAtMSwgLTEsIDEpLCBuZXcgVmVjNCgwLCAtMSwgLTEsIC0xKSxcbiAgbmV3IFZlYzQoMSwgMCwgMSwgMSksIG5ldyBWZWM0KDEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoMSwgMCwgLTEsIDEpLCBuZXcgVmVjNCgxLCAwLCAtMSwgLTEpLFxuICBuZXcgVmVjNCgtMSwgMCwgMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAxLCAtMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgLTEpLFxuICBuZXcgVmVjNCgxLCAxLCAwLCAxKSwgbmV3IFZlYzQoMSwgMSwgMCwgLTEpLCBuZXcgVmVjNCgxLCAtMSwgMCwgMSksIG5ldyBWZWM0KDEsIC0xLCAwLCAtMSksXG4gIG5ldyBWZWM0KC0xLCAxLCAwLCAxKSwgbmV3IFZlYzQoLTEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAxKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAtMSksXG4gIG5ldyBWZWM0KDEsIDEsIDEsIDApLCBuZXcgVmVjNCgxLCAxLCAtMSwgMCksIG5ldyBWZWM0KDEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoMSwgLTEsIC0xLCAwKSxcbiAgbmV3IFZlYzQoLTEsIDEsIDEsIDApLCBuZXcgVmVjNCgtMSwgMSwgLTEsIDApLCBuZXcgVmVjNCgtMSwgLTEsIDEsIDApLCBuZXcgVmVjNCgtMSwgLTEsIC0xLCAwKVxuXVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JhZDQgKHAsIHgsIHksIHosIHQpIHtcbiAgdmFyIGhhc2ggPSBwW3ggKyBwW3kgKyBwW3ogKyBwW3RdXV1dICUgZzQubGVuZ3RoXG4gIHJldHVybiBnNFtoYXNoXVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvNGQuanMiLCJpbXBvcnQgeyBsZXJwLCBmYWRlIH0gZnJvbSAnLi9tYXRoJ1xuXG5mdW5jdGlvbiBoYXNoTiAocCwgZ3MpIHtcbiAgaWYgKGdzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBbZ3NbMF1dXG4gIHJldHVybiBwW2dzWzBdICsgaGFzaE4ocCwgZ3Muc2xpY2UoMSkpXVxufVxuZnVuY3Rpb24gVmVjTihSKSB7XG4gIHRoaXMuUiA9IFJcbn1cblZlY04ucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChSKSB7XG4gIHZhciB2YWwgPSAwXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgUi5sZW5ndGg7IGkrKykge1xuICAgIHZhbCArPSB0aGlzLlJbaV0gKiBSW2ldXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5leHBvcnQgdmFyIGdOID0gW11cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUdOIChkaW0pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW0gKiAyOyBpKyspIHtcbiAgICB2YXIgdmVjID0gbmV3IEFycmF5KGRpbSkuZmlsbCgwKVxuICAgIHZlY1tpICUgZGltXSA9IGkgLyBkaW0gPj0gMSA/IDEgOiAtMVxuICAgIGdOW2ldID0gbmV3IFZlY04odmVjKVxuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gbGVycE4gKG5zLCBkcykge1xuICBpZiAoZHMubGVuZ3RoID09PSAxKSByZXR1cm4gbGVycChuc1swXSwgbnNbMV0sIGZhZGUoZHNbMF0pKVxuICB2YXIgbnMxID0gbnMuc2xpY2UoMCwgTWF0aC5mbG9vcihucy5sZW5ndGggLyAyKSlcbiAgdmFyIG5zMiA9IG5zLnNsaWNlKE1hdGguY2VpbChucy5sZW5ndGggLyAyKSlcbiAgcmV0dXJuIGxlcnAoXG4gICAgbGVycE4obnMxLCBkcy5zbGljZSgwLCBkcy5sZW5ndGggLSAxKSksXG4gICAgbGVycE4obnMyLCBkcy5zbGljZSgwLCBkcy5sZW5ndGggLSAxKSksXG4gICAgZmFkZShkc1tkcy5sZW5ndGggLSAxXSlcbiAgKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE5zIChwLCBkaW0sIGdzLCBkcykge1xuICB2YXIgbnMgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8ICgyIDw8IChkaW0gLSAxKSk7IGkrKykge1xuICAgIHZhciBnc1Blcm0gPSBncy5zbGljZSgpXG4gICAgdmFyIGRzUGVybSA9IGRzLnNsaWNlKClcbiAgICB2YXIgdGVtcCA9IGlcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGltOyBqKyspIHtcbiAgICAgIGlmICh0ZW1wICYgMSkge1xuICAgICAgICBnc1Blcm1bal0gKz0gMVxuICAgICAgICBkc1Blcm1bal0gLT0gMVxuICAgICAgfVxuICAgICAgdGVtcCA9IHRlbXAgPj4gMVxuICAgIH1cbiAgICBuc1tpXSA9IGdOW2hhc2hOKHAsIGdzUGVybSkgJSBnTi5sZW5ndGhdLmRvdChkc1Blcm0pXG4gIH1cbiAgcmV0dXJuIG5zXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC9OZC5qcyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgU2ltcGxleDEgfSBmcm9tICcuL1NpbXBsZXgxJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaW1wbGV4MiB9IGZyb20gJy4vU2ltcGxleDInXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxleC9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=