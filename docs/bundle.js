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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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




/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_terrapaint__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_terrapaint___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_terrapaint__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_index__ = __webpack_require__(11);



var seed = Math.random()
var simplex = new __WEBPACK_IMPORTED_MODULE_1__src_index__["Simplex2"](seed)

;(function init() {
  var map = __WEBPACK_IMPORTED_MODULE_0_terrapaint___default.a.map(simplex.gen, {
    offset: true,
    period: 64,
    thisArg: simplex
  })
  map.draw('#noise-canvas')
})()

$('#gen-noise').addEventListener('click', function () {
  var evalStr = $('#eval-str').value
  var fnBody = `
    var n = this.gen.bind(this)
    var f = this.octavate.bind(this)
    var sin = Math.sin
    var cos = Math.cos
    var pow = Math.pow
    var pi = Math.PI
    var abs = Math.abs
    var e = Math.E
    return ${evalStr}
  `
  try {
    var transformFn = (new Function('x', 'y', fnBody)).bind(simplex)
  } catch (e) {
    alert(`
      Something is wrong with the syntax of your function.
      Please ensure all the parentheses are closed and that you're
      using the correct functions and variable names.
    `)
    return
  }

  var transformedNoise = simplex.transform(function(x, y) {
    try {
      var val = transformFn(x, y)
    } catch (e) {
      alert(`
        Your function created a run-time error. Please ensure
        the period of the noise function is greater than one
        (ie. divide x and y by a value, like 4 or 16, before
        passing it to n()).
      `)
      throw 'Runtime error'
    }
    return val
  })
  var map = __WEBPACK_IMPORTED_MODULE_0_terrapaint___default.a.map(transformedNoise, {
    offset: true,
    period: 1,
    thisArg: simplex
  })
  map.draw('#noise-canvas')
})

function $ (selector) {
  return document.querySelector(selector)
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

try {
  var imageTest = new ImageData(20, 20)
  var numberTest = Math.trunc(20.1)
} catch (e) {
  var err = 'Error, browser not supported by Terrapaint. '
  err += 'Please switch to Vivaldi, Firefox, Chrome, Opera, or Safari.'
  console.log(err)
}

function terrapaintFactory () {
  function octavate () {
    var val = 0
    var max = 0
    var p = this.period
    var amp = Math.pow(this.persistance, this.octaves)
    var args = []
    for (var i = 0; i < this.octaves; i++) {
      for (var j = 0; j < arguments.length; j++) {
        args[j] = arguments[j] / p
      }
      val += (this.noise.apply(this.thisArg, args) + this.offset) * amp
      max += amp * (this.offset + 1)
      amp /= this.persistance
      p /= 2
    }
    return val / max
  }
  function setOptions (options) {
    options = options || {}
    this.octaves = options.octaves || 1
    this.period = options.period || 32
    this.offset = options.offset ? 1 : 0
    this.persistance = options.persistance || 2
    this.update = options.update || function () { throw 'No update fn' }
    this.loopvalues = options.init || []
    this.colormap = options.colormap || function (v) { return [v, v, v, 255] }
    this.thisArg = options.thisArg || null
  }
  
  function Map (noise, options) {
    setOptions.call(this, options)
    this.noise = noise
  }
  Map.prototype.compute = function (width, height) {
    var map = new Uint8ClampedArray(width * height * 4)
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        if (this.loopvalues.length !== 0) {
          this.loopvalues = this.update(this.loopvalues)
        }
        var noiseArgs = [x, y].concat(this.loopvalues)
        var val = Math.trunc(octavate.apply(this, noiseArgs) * 255)
        var pixelData
        if (typeof this.colormap === 'function') {
          pixelData = this.colormap(val)
        } else {
          pixelData = this.colormap[val]
        }
        map.set(pixelData, x * 4 + y * 4 * width)
      }
    }
    return new ImageData(map, width, height)
  }
  Map.prototype.draw = function (canvas) {
    canvas = typeof canvas === 'string'
      ? document.querySelector(canvas)
      : canvas
    canvas.getContext('2d').putImageData(this.compute(
      canvas.width,
      canvas.height
    ), 0, 0)
    this.canvas = canvas
  }
  Map.prototype.create = function (target, width, height) {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    target = typeof target === 'string'
      ? document.querySelector(target)
      : target
    canvas.width = width
    canvas.height = height
    ctx.putImageData(this.compute(width, height), 0, 0)
    target.appendChild(canvas)
    this.canvas = canvas
  }
  Map.prototype.loop = function () {
    var that = this
    var fn = function () {
      that.draw(that.canvas)
      this.animReq = requestAnimationFrame(fn)
    }
    this.animReq = requestAnimationFrame(fn)
  }
  Map.prototype.stop = function () {
    cancelAnimationFrame(this.animReq)
  }

  function Curve (noise, options) {
    setOptions.call(this, options)
    this.noise = noise
  }
  Curve.prototype.compute = function (width, height) {
    var curve = new Uint8ClampedArray(width * height * 4).fill(255)
    for (var x = 0; x < width; x++) {
      if (this.loopvalues.length !== 0) {
        this.loopvalues = this.update(this.loopvalues)
      }
      var noiseArgs = [x].concat(this.loopvalues)
      var val = Math.trunc(octavate.apply(this, noiseArgs) * 255)
      //console.log(val)
      for (var i = 0; i < 3; i++) {
        curve[val * width * 4 + x * 4 + i] = 0
      }
    }
    //console.log(curve)
    //throw 'a'
    return new ImageData(curve, width, height)
  }
  Curve.prototype.draw = function (canvas) {
    Map.prototype.draw.call(this, canvas)
  }
  Curve.prototype.create = function (target, width, height) {
    Map.prototype.create.call(this, target, width, height)
  }
  Curve.prototype.loop = function () {
    Map.prototype.loop.call(this)
  }
  Curve.prototype.stop = function () {
    Map.prototype.stop.call(this)
  }

  var module = {
    map: function (noise, options) {
      return new Map(noise, options)
    },
    curve: function (noise, options) {
      return new Curve(noise, options)
    },
    THREE2: function () {
      return new THREE2()
    },
    THREE3: function () {
      return new THREE3()
    }
  }

  return module
}

module.exports = terrapaintFactory()


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDkxN2FkNDEzNWFhN2FmNDZjNDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvTm9pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL1BlcmxpbjEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvMWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Blcmxpbi9QZXJsaW4yLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLzJkLmpzIiwid2VicGFjazovLy8uL3NyYy9wZXJsaW4vUGVybGluMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL1BlcmxpbjQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Blcmxpbi9QZXJsaW5OLmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGV4L1NpbXBsZXgxLmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGV4L1NpbXBsZXgyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVybGluL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvM2QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvNGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvTmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ0aGlzIiwiY29uc3QiLCJzdXBlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7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LENBQUM7SUFDNUMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM1RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQUVwRSxPQUFPLGdFQUFJO01BQ1QsZ0VBQUk7UUFDRixnRUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLGdFQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsZ0VBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELGdFQUFJO1FBQ0YsZ0VBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNwQixnRUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLGdFQUFJLENBQUMsRUFBRSxDQUFDO09BQ1Q7TUFDRCxnRUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNUO0dBQ0YsQ0FDRjs7O0VBckNvQywwREFxQ3BDOztrRUFBQTs7Ozs7Ozs7Ozs7O0FDekNvQztBQUNIO0FBQ087O0FBRTFCLElBQU0sT0FBTyxHQUFjO0VBQ3hDLGdCQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDZEEsS0FBSyxNQUFDLE9BQUMsQ0FBQztHQUNUOzs7OzBDQUFBO0VBQ0QscUJBQUksaUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2YsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7O0lBRTVCLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFOztJQUVmLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3JELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN6RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDakUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxF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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNRQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzFCQTtBQUFBLFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUNYO0FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN0QyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUM1QztBQUNELElBQUksRUFBRSxHQUFHO0VBQ1AsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM5RSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNuRjs7QUFFTSxTQUFTLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDakMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU07RUFDekMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO0NBQ2hCOzs7Ozs7Ozs7QUNqQkQ7QUFBQSxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDekIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ1g7QUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN6QyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUN6RDtBQUNELElBQUksRUFBRSxHQUFHO0VBQ1AsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM5RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMxRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDOUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFD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aUQ7QUFDakQ7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQixxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixPQUFPO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDkxN2FkNDEzNWFhN2FmNDZjNDkiLCJpbXBvcnQgcmFuZCBmcm9tICdyYW5kb20tc2VlZCdcblxuZXhwb3J0IGNsYXNzIE5vaXNlIHtcbiAgY29uc3RydWN0b3IgKHMpIHtcbiAgICB0aGlzLnAgPSBuZXcgVWludDhBcnJheSg1MTIpXG4gICAgdGhpcy5zZWVkKHMpXG4gIH1cbiAgZ2VuICgpIHt9XG4gIHNlZWQgKHMpIHtcbiAgICBzID0gcyB8fCBNYXRoLnJhbmRvbSgpXG4gICAgdmFyIHJuZyA9IHJhbmQuY3JlYXRlKHMpXG4gICAgdmFyIGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyBpKyspIHRoaXMucFtpXSA9IGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgIHZhciByID0gcm5nKDI1NilcbiAgICAgIHZhciB0ZW1wID0gdGhpcy5wW2ldXG4gICAgICB0aGlzLnBbaV0gPSB0aGlzLnBbcl1cbiAgICAgIHRoaXMucFtyXSA9IHRlbXBcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB0aGlzLnBbaSArIDI1Nl0gPSB0aGlzLnBbaV1cbiAgfVxuICB0cmFuc2Zvcm0gKGZuKSB7XG4gICAgdmFyIHRyYW5zZm9ybWVkRm4gPSAoLi4uZGltcykgPT4ge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGRpbXMpXG4gICAgfVxuICAgIHJldHVybiB0cmFuc2Zvcm1lZEZuLmJpbmQodGhpcylcbiAgfVxuICBvY3RhdmF0ZSAoLi4uYXJncykge1xuICAgIHZhciBvY3RhdmVzID0gYXJnc1swXVxuICAgIHZhciBkaW1zID0gYXJncy5zbGljZSgxKVxuICAgIHZhciB2YWwgPSAwXG4gICAgdmFyIG1heCA9IDBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9jdGF2ZXM7IGkrKykge1xuICAgICAgdmFyIHcgPSAxIDw8IGlcbiAgICAgIHZhbCArPSB0aGlzLmdlbi5hcHBseSh0aGlzLCBkaW1zLm1hcCh4ID0+IHggKiB3KSkgLyB3XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2N0YXZlczsgaSsrKSB7XG4gICAgICBtYXggKz0gMSAvICgxIDw8IGkpXG4gICAgfVxuICAgIHJldHVybiB2YWwgLyBtYXhcbiAgfVxufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsL05vaXNlLmpzIiwiZnVuY3Rpb24gZmFsbG9mZiAoLi4uYXJncykge1xuICB2YXIgZGltcyA9IGFyZ3Muc2xpY2UoMSlcbiAgY29uc3QgdCA9IGFyZ3NbMF0gLSBkaW1zLnJlZHVjZSgoc3VtLCB2YWwpID0+IHtcbiAgICByZXR1cm4gc3VtICsgdmFsICogdmFsXG4gIH0sIDApXG4gIHJldHVybiB0ICogdCAqIHQgKiB0IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVycCAoYSwgYiwgdCkge1xuICByZXR1cm4gYSAqICgxIC0gdCkgKyBiICogdFxufVxuZXhwb3J0IGZ1bmN0aW9uIGZhZGUgKHQpIHtcbiAgcmV0dXJuIHQgKiB0ICogdCAqICgxMCArIHQgKiAoLTE1ICsgdCAqIDYpKVxufVxuZXhwb3J0IHZhciBjdXQxID0gZmFsbG9mZi5iaW5kKG51bGwsIDEpXG5leHBvcnQgdmFyIGN1dCA9IGZhbGxvZmYuYmluZChudWxsLCAwLjUpXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsL21hdGguanMiLCJpbXBvcnQgeyBOb2lzZSB9IGZyb20gJy4uL3V0aWwvTm9pc2UnXG5pbXBvcnQgeyBncmFkMSB9IGZyb20gJy4uL3V0aWwvMWQnXG5pbXBvcnQgeyBsZXJwLCBmYWRlIH0gZnJvbSAnLi4vdXRpbC9tYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJsaW4xIGV4dGVuZHMgTm9pc2Uge1xuICBjb25zdHJ1Y3RvciAocykge1xuICAgIHN1cGVyKHMpXG4gIH1cbiAgZ2VuICh4KSB7XG4gICAgdmFyIGdyYWQxID0gZ3JhZDEuYmluZChudWxsLCB0aGlzLnApXG4gICAgdmFyIGd4ID0gTWF0aC5mbG9vcih4KSAlIDI1NlxuICAgIHZhciBkeCA9IHggLSBneFxuXG4gICAgdmFyIG4wID0gZ3JhZDEoZ3gpLmRvdChkeClcbiAgICB2YXIgbjEgPSBncmFkMShneCArIDEpLmRvdChkeCAtIDEpXG5cbiAgICByZXR1cm4gbGVycChuMCwgbjEsIGZhZGUoZHgpKVxuICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wZXJsaW4vUGVybGluMS5qcyIsImZ1bmN0aW9uIFZlYzEgKHgpIHtcbiAgdGhpcy54ID0geFxufVxuVmVjMS5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHRoaXMueCAqIHhcbn1cbnZhciBnMSA9IFsgbmV3IFZlYzEoMSksIG5ldyBWZWMxKC0xKSBdXG5cbmV4cG9ydCBmdW5jdGlvbiBncmFkMSAocCwgeCkge1xuICB2YXIgaGFzaCA9IHBbeF0gJSBnMS5sZW5ndGhcbiAgcmV0dXJuIGcxW2hhc2hdXG59XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwvMWQuanMiLCJpbXBvcnQgeyBOb2lzZSB9IGZyb20gJy4uL3V0aWwvTm9pc2UnXG5pbXBvcnQgeyBncmFkMiB9IGZyb20gJy4uL3V0aWwvMmQnXG5pbXBvcnQgeyBmYWRlLCBsZXJwIH0gZnJvbSAnLi4vdXRpbC9tYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJsaW4yIGV4dGVuZHMgTm9pc2Uge1xuICBjb25zdHJ1Y3RvciAocykge1xuICAgIHN1cGVyKHMpXG4gIH1cbiAgZ2VuICh4LCB5KSB7XG4gICAgdmFyIGdyYWQyID0gZ3JhZDIuYmluZChudWxsLCB0aGlzLnApXG4gICAgdmFyIGd4ID0gTWF0aC50cnVuYyh4KSAlIDI1NlxuICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcblxuICAgIHZhciBkeCA9IHggLSBneFxuICAgIHZhciBkeSA9IHkgLSBneVxuXG4gICAgdmFyIG4wMCA9IGdyYWQyKGd4LCBneSkuZG90KGR4LCBkeSlcbiAgICB2YXIgbjEwID0gZ3JhZDIoZ3ggKyAxLCBneSkuZG90KGR4IC0gMSwgZHkpXG4gICAgdmFyIG4wMSA9IGdyYWQyKGd4LCBneSArIDEpLmRvdChkeCwgZHkgLSAxKVxuICAgIHZhciBuMTEgPSBncmFkMihneCArIDEsIGd5ICsgMSkuZG90KGR4IC0gMSwgZHkgLSAxKVxuXG4gICAgcmV0dXJuIGxlcnAoXG4gICAgICBsZXJwKG4wMCwgbjEwLCBmYWRlKGR4KSksXG4gICAgICBsZXJwKG4wMSwgbjExLCBmYWRlKGR4KSksXG4gICAgICBmYWRlKGR5KVxuICAgIClcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGVybGluL1BlcmxpbjIuanMiLCJmdW5jdGlvbiBWZWMyICh4LCB5KSB7XG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxufVxuVmVjMi5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5XG59XG52YXIgZzIgPSBbXG4gIG5ldyBWZWMyKDEsIDApLCBuZXcgVmVjMigxLCAxKSwgbmV3IFZlYzIoMCwgMSksIG5ldyBWZWMyKC0xLCAxKSxcbiAgbmV3IFZlYzIoLTEsIDApLCBuZXcgVmVjMigtMSwgLTEpLCBuZXcgVmVjMigwLCAtMSksIG5ldyBWZWMyKDEsIC0xKVxuXVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JhZDIgKHAsIHgsIHkpIHtcbiAgdmFyIGhhc2ggPSBwW3ggKyBwW3ldXSAlIGcyLmxlbmd0aFxuICByZXR1cm4gZzJbaGFzaF1cbn1cbmV4cG9ydCB2YXIgUzJfVE9fQyA9IDAuNSAqIChNYXRoLnNxcnQoMykgLSAxKVxuZXhwb3J0IHZhciBDX1RPX1MyID0gKDMgLSBNYXRoLnNxcnQoMykpIC8gNlxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC8yZC5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcbmltcG9ydCB7IGdyYWQzIH0gZnJvbSAnLi4vdXRpbC8zZCdcbmltcG9ydCB7IGZhZGUsIGxlcnAgfSBmcm9tICcuLi91dGlsL21hdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcmxpbjMgZXh0ZW5kcyBOb2lzZSB7XG4gIGNvbnN0cnVjdG9yIChzKSB7XG4gICAgc3VwZXIocylcbiAgfVxuICBnZW4gKHgsIHksIHopIHtcbiAgICB2YXIgZ3JhZDMgPSBncmFkMy5iaW5kKG51bGwsIHRoaXMucClcbiAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XG4gICAgdmFyIGd5ID0gTWF0aC50cnVuYyh5KSAlIDI1NlxuICAgIHZhciBneiA9IE1hdGgudHJ1bmMoeikgJSAyNTZcblxuICAgIHZhciBkeCA9IHggLSBneFxuICAgIHZhciBkeSA9IHkgLSBneVxuICAgIHZhciBkeiA9IHogLSBnelxuXG4gICAgdmFyIG4wMDAgPSBncmFkMyhneCwgZ3ksIGd6KS5kb3QoZHgsIGR5LCBkeilcbiAgICB2YXIgbjEwMCA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6KS5kb3QoZHggLSAxLCBkeSwgZHopXG4gICAgdmFyIG4wMTAgPSBncmFkMyhneCwgZ3kgKyAxLCBneikuZG90KGR4LCBkeSAtIDEsIGR6KVxuICAgIHZhciBuMTEwID0gZ3JhZDMoZ3ggKyAxLCBneSArIDEsIGd6KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6KVxuICAgIHZhciBuMDAxID0gZ3JhZDMoZ3gsIGd5LCBneiArIDEpLmRvdChkeCwgZHksIGR6IC0gMSlcbiAgICB2YXIgbjEwMSA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSlcbiAgICB2YXIgbjAxMSA9IGdyYWQzKGd4LCBneSArIDEsIGd6ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSlcbiAgICB2YXIgbjExMSA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxKVxuXG4gICAgcmV0dXJuIGxlcnAoXG4gICAgICBsZXJwKFxuICAgICAgICBsZXJwKG4wMDAsIG4xMDAsIGR4KSxcbiAgICAgICAgbGVycChuMDEwLCBuMTEwLCBkeCksXG4gICAgICAgIGZhZGUoZHkpXG4gICAgICApLFxuICAgICAgbGVycChcbiAgICAgICAgbGVycChuMDAxLCBuMTAxLCBkeCksXG4gICAgICAgIGxlcnAobjAxMSwgbjExMSwgZHgpLFxuICAgICAgICBmYWRlKGR5KVxuICAgICAgKSxcbiAgICAgIGZhZGUoZHopXG4gICAgKVxuICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wZXJsaW4vUGVybGluMy5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcbmltcG9ydCB7IGdyYWQ0IH0gZnJvbSAnLi4vdXRpbC80ZCdcbmltcG9ydCB7IGZhZGUsIGxlcnAgfSBmcm9tICcuLi91dGlsL21hdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcmxpbjQgZXh0ZW5kcyBOb2lzZSB7XG4gIGNvbnN0cnVjdG9yIChzKSB7XG4gICAgc3VwZXIocylcbiAgfVxuICBnZW4gKHgsIHksIHosIHQpIHtcbiAgICB2YXIgZ3JhZDQgPSBncmFkNC5iaW5kKG51bGwsIHRoaXMucClcbiAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XG4gICAgdmFyIGd5ID0gTWF0aC50cnVuYyh5KSAlIDI1NlxuICAgIHZhciBneiA9IE1hdGgudHJ1bmMoeikgJSAyNTZcbiAgICB2YXIgZ3QgPSBNYXRoLnRydW5jKHQpICUgMjU2XG5cbiAgICB2YXIgZHggPSB4IC0gZ3hcbiAgICB2YXIgZHkgPSB5IC0gZ3lcbiAgICB2YXIgZHogPSB6IC0gZ3pcbiAgICB2YXIgZHQgPSB0IC0gZ3RcblxuICAgIHZhciBuMDAwMCA9IGdyYWQ0KGd4LCBneSwgZ3osIGd0KS5kb3QoZHgsIGR5LCBkeiwgZHQpXG4gICAgdmFyIG4xMDAwID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3osIGd0KS5kb3QoZHggLSAxLCBkeSwgZHopXG4gICAgdmFyIG4wMTAwID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3osIGd0KS5kb3QoZHgsIGR5IC0gMSwgZHopXG4gICAgdmFyIG4xMTAwID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6LCBndCkuZG90KGR4IC0gMSwgZHkgLSAxLCBkeilcbiAgICB2YXIgbjAwMTAgPSBncmFkNChneCwgZ3ksIGd6ICsgMSwgZ3QpLmRvdChkeCwgZHksIGR6IC0gMSlcbiAgICB2YXIgbjEwMTAgPSBncmFkNChneCArIDEsIGd5LCBneiArIDEsIGd0KS5kb3QoZHggLSAxLCBkeSwgZHogLSAxKVxuICAgIHZhciBuMDExMCA9IGdyYWQ0KGd4LCBneSArIDEsIGd6ICsgMSwgZ3QpLmRvdChkeCwgZHkgLSAxLCBkeiAtIDEpXG4gICAgdmFyIG4xMTEwID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6ICsgMSwgZ3QpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxKVxuICAgIHZhciBuMDAwMSA9IGdyYWQ0KGd4LCBneSwgZ3osIGd0ICsgMSkuZG90KGR4LCBkeSwgZHosIGR0IC0gMSlcbiAgICB2YXIgbjEwMDEgPSBncmFkNChneCArIDEsIGd5LCBneiwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSwgZHosIGR0IC0gMSlcbiAgICB2YXIgbjAxMDEgPSBncmFkNChneCwgZ3kgKyAxLCBneiwgZ3QgKyAxKS5kb3QoZHgsIGR5IC0gMSwgZHosIGR0IC0gMSlcbiAgICB2YXIgbjExMDEgPSBncmFkNChneCArIDEsIGd5ICsgMSwgZ3osIGd0ICsgMSkuZG90KGR4IC0gMSwgZHkgLSAxLCBkeiwgZHQgLSAxKVxuICAgIHZhciBuMDAxMSA9IGdyYWQ0KGd4LCBneSwgZ3ogKyAxLCBndCArIDEpLmRvdChkeCwgZHksIGR6IC0gMSwgZHQgLSAxKVxuICAgIHZhciBuMTAxMSA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSwgZHogLSAxLCBkdCAtIDEpXG4gICAgdmFyIG4wMTExID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3ogKyAxLCBndCArIDEpLmRvdChkeCwgZHkgLSAxLCBkeiAtIDEsIGR0IC0gMSlcbiAgICB2YXIgbjExMTEgPSBncmFkNChneCArIDEsIGd5ICsgMSwgZ3ogKyAxLCBndCArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxLCBkdCAtIDEpXG5cbiAgICByZXR1cm4gbGVycChcbiAgICAgIGxlcnAoXG4gICAgICAgIGxlcnAoXG4gICAgICAgICAgbGVycChuMDAwMCwgbjEwMDAsIGR4KSxcbiAgICAgICAgICBsZXJwKG4wMTAwLCBuMTEwMCwgZHgpLFxuICAgICAgICAgIGZhZGUoZHkpXG4gICAgICAgICksXG4gICAgICAgIGxlcnAoXG4gICAgICAgICAgbGVycChuMDAxMCwgbjEwMTAsIGR4KSxcbiAgICAgICAgICBsZXJwKG4wMTEwLCBuMTExMCwgZHgpLFxuICAgICAgICAgIGZhZGUoZHkpXG4gICAgICAgICksXG4gICAgICAgIGZhZGUoZHopXG4gICAgICApLFxuICAgICAgbGVycChcbiAgICAgICAgbGVycChcbiAgICAgICAgICBsZXJwKG4wMDAxLCBuMTAwMSwgZHgpLFxuICAgICAgICAgIGxlcnAobjAxMDEsIG4xMTAxLCBkeCksXG4gICAgICAgICAgZmFkZShkeSlcbiAgICAgICAgKSxcbiAgICAgICAgbGVycChcbiAgICAgICAgICBsZXJwKG4wMDExLCBuMTAxMSwgZHgpLFxuICAgICAgICAgIGxlcnAobjAxMTEsIG4xMTExLCBkeCksXG4gICAgICAgICAgZmFkZShkeSlcbiAgICAgICAgKSxcbiAgICAgICAgZmFkZShkeilcbiAgICAgICksXG4gICAgICBmYWRlKGR0KVxuICAgIClcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGVybGluL1BlcmxpbjQuanMiLCJpbXBvcnQgeyBOb2lzZSB9IGZyb20gJy4uL3V0aWwvTm9pc2UnXG5pbXBvcnQgeyBnTiwgbGVycE4sIGdldE5zLCBnZW5lcmF0ZUdOIH0gZnJvbSAnLi4vdXRpbC9OZCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVybGluTiBleHRlbmRzIE5vaXNlIHtcbiAgY29uc3RydWN0b3IgKHMpIHtcbiAgICBzdXBlcihzKVxuICB9XG4gIGdlbiAoLi4uYXJncykge1xuICAgIHZhciBnZXROcyA9IGdldE5zLmJpbmQobnVsbCwgdGhpcy5wKVxuICAgIHZhciBncyA9IFtdXG4gICAgdmFyIGRzID0gW11cblxuICAgIGlmIChnTi5sZW5ndGggPT09IDApIHtcbiAgICAgIGdlbmVyYXRlR04oYXJncy5sZW5ndGgpXG4gICAgfVxuXG4gICAgdmFyIGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgZ3NbaV0gPSBNYXRoLnRydW5jKGFyZ3NbaV0pICUgMjU2XG4gICAgICBkc1tpXSA9IGFyZ3NbaV0gLSBnc1tpXVxuICAgIH1cbiAgICB2YXIgbnMgPSBnZXROcyhhcmdzLmxlbmd0aCwgZ3MsIGRzKVxuICAgIHZhciByZXMgPSBsZXJwTihucywgZHMpXG4gICAgcmV0dXJuIHJlc1xuICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wZXJsaW4vUGVybGluTi5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcbmltcG9ydCB7IGdyYWQxIH0gZnJvbSAnLi4vdXRpbC8xZCdcbmltcG9ydCB7IGZhZGUsIGxlcnAgfSBmcm9tICcuLi91dGlsL21hdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZXgxIGV4dGVuZHMgTm9pc2Uge1xuICBjb25zdHJ1Y3RvciAocykge1xuICAgIHN1cGVyKHMpXG4gIH1cbiAgZ2VuICh4KSB7XG4gICAgdmFyIGdyYWQxID0gZ3JhZDEuYmluZChudWxsLCB0aGlzLnApXG4gICAgdmFyIGd4ID0gTWF0aC5mbG9vcih4KSAlIDI1NlxuICAgIHZhciBkeCA9IHggLSBneFxuXG4gICAgdmFyIG4wID0gY3V0MShkeCkgKiBncmFkMShneCkuZG90KGR4KVxuICAgIHZhciBuMSA9IGN1dDEoZHggLSAxKSAqIGdyYWQxKGd4ICsgMSkuZG90KGR4IC0gMSlcblxuICAgIHJldHVybiAwLjUgKiAobjAgKyBuMSlcbiAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxleC9TaW1wbGV4MS5qcyIsImltcG9ydCB7IE5vaXNlIH0gZnJvbSAnLi4vdXRpbC9Ob2lzZSdcbmltcG9ydCB7IGdyYWQyIGFzIGdyYWQsIFMyX1RPX0MsIENfVE9fUzIgfSBmcm9tICcuLi91dGlsLzJkJ1xuaW1wb3J0IHsgY3V0IH0gZnJvbSAnLi4vdXRpbC9tYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGV4MiBleHRlbmRzIE5vaXNlIHtcbiAgY29uc3RydWN0b3IgKHMpIHtcbiAgICBzdXBlcihzKVxuICB9XG4gIGdlbiAoeCwgeSkge1xuICAgIGlmICh0aGlzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgfVxuICAgIHZhciBncmFkMiA9IGdyYWQuYmluZChudWxsLCB0aGlzLnApXG4gICAgdmFyIHNrZXcgPSAoeCArIHkpICogUzJfVE9fQ1xuICAgIHZhciBpID0gTWF0aC50cnVuYyh4ICsgc2tldylcbiAgICB2YXIgaiA9IE1hdGgudHJ1bmMoeSArIHNrZXcpXG5cbiAgICB2YXIgdW5za2V3ID0gKGkgKyBqKSAqIENfVE9fUzJcbiAgICB2YXIgZ3ggPSBpIC0gdW5za2V3XG4gICAgdmFyIGd5ID0gaiAtIHVuc2tld1xuXG4gICAgdmFyIGR4MCA9IHggLSBneFxuICAgIHZhciBkeTAgPSB5IC0gZ3lcblxuICAgIHZhciBkaSA9IGR4MCA+IGR5MCA/IDEgOiAwXG4gICAgdmFyIGRqID0gZHgwID4gZHkwID8gMCA6IDFcblxuICAgIC8vIHdoeSBpc24ndCBpdCArIGRpIC0gQ19UT19TMj9cbiAgICB2YXIgZHgxID0gZHgwIC0gZGkgKyBDX1RPX1MyXG4gICAgdmFyIGR5MSA9IGR5MCAtIGRqICsgQ19UT19TMlxuICAgIHZhciBkeDIgPSBkeDAgLSAxICsgMiAqIENfVE9fUzJcbiAgICB2YXIgZHkyID0gZHkwIC0gMSArIDIgKiBDX1RPX1MyXG4gICAgXG4gICAgdmFyIG4wID0gY3V0KGR4MCwgZHkwKSAqIGdyYWQyKGksIGopLmRvdChkeDAsIGR5MClcbiAgICB2YXIgbjEgPSBjdXQoZHgxLCBkeTEpICogZ3JhZDIoaSArIGRpLCBqICsgZGopLmRvdChkeDEsIGR5MSlcbiAgICB2YXIgbjIgPSBjdXQoZHgyLCBkeTIpICogZ3JhZDIoaSArIDEsIGogKyAxKS5kb3QoZHgyLCBkeTIpXG5cbiAgICByZXR1cm4gNzAgKiAobjAgKyBuMSArIG4yKVxuICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaW1wbGV4L1NpbXBsZXgyLmpzIiwiaW1wb3J0IHsgUGVybGluMSwgUGVybGluMiwgUGVybGluMywgUGVybGluNCwgUGVybGluTiB9IGZyb20gJy4vcGVybGluL2luZGV4J1xyXG5pbXBvcnQgeyBTaW1wbGV4MSwgU2ltcGxleDIgfSBmcm9tICcuL3NpbXBsZXgvaW5kZXgnXHJcblxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjEgfSBmcm9tICcuL3Blcmxpbi9QZXJsaW4xJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjIgfSBmcm9tICcuL3Blcmxpbi9QZXJsaW4yJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjMgfSBmcm9tICcuL3Blcmxpbi9QZXJsaW4zJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbjQgfSBmcm9tICcuL3Blcmxpbi9QZXJsaW40J1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlcmxpbk4gfSBmcm9tICcuL3Blcmxpbi9QZXJsaW5OJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNpbXBsZXgxIH0gZnJvbSAnLi9zaW1wbGV4L1NpbXBsZXgxJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNpbXBsZXgyIH0gZnJvbSAnLi9zaW1wbGV4L1NpbXBsZXgyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIFNpbXBsZXgxOiBTaW1wbGV4MSxcclxuICBTaW1wbGV4MjogU2ltcGxleDIsXHJcbiAgUGVybGluMTogUGVybGluMSxcclxuICBQZXJsaW4yOiBQZXJsaW4yLFxyXG4gIFBlcmxpbjM6IFBlcmxpbjMsXHJcbiAgUGVybGluNDogUGVybGluNCxcclxuICBQZXJsaW5OOiBQZXJsaW5OXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW4xIH0gZnJvbSAnLi9QZXJsaW4xJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW4yIH0gZnJvbSAnLi9QZXJsaW4yJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW4zIH0gZnJvbSAnLi9QZXJsaW4zJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW40IH0gZnJvbSAnLi9QZXJsaW40J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQZXJsaW5OIH0gZnJvbSAnLi9QZXJsaW5OJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Blcmxpbi9pbmRleC5qcyIsIi8qXG4gKiByYW5kb20tc2VlZFxuICogaHR0cHM6Ly9naXRodWIuY29tL3NrcmF0Y2hkb3QvcmFuZG9tLXNlZWRcbiAqXG4gKiBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBTdGV2ZSBHaWJzb24gYW5kIGNhbiBiZSBmb3VuZCBoZXJlOlxuICpcbiAqIGh0dHBzOi8vd3d3LmdyYy5jb20vb3RnL3VoZXBybmcuaHRtXG4gKlxuICogSXQgd2FzIHNsaWdodGx5IG1vZGlmaWVkIGZvciB1c2UgaW4gbm9kZSwgdG8gcGFzcyBqc2hpbnQsIGFuZCBhIGZldyBhZGRpdGlvbmFsXG4gKiBoZWxwZXIgZnVuY3Rpb25zIHdlcmUgYWRkZWQuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIHNrcmF0Y2hkb3RcbiAqIER1YWwgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGFuZCB0aGUgb3JpZ2luYWwgR1JDIGNvcHlyaWdodC9saWNlbnNlXG4gKiBpbmNsdWRlZCBiZWxvdy5cbiAqL1xuLypcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XHRcdFx0XHRcdFx0XHRcdEdpYnNvbiBSZXNlYXJjaCBDb3Jwb3JhdGlvblxuXHRcdFx0XHRVSEVQUk5HIC0gVWx0cmEgSGlnaCBFbnRyb3B5IFBzZXVkby1SYW5kb20gTnVtYmVyIEdlbmVyYXRvclxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdExJQ0VOU0UgQU5EIENPUFlSSUdIVDogIFRISVMgQ09ERSBJUyBIRVJFQlkgUkVMRUFTRUQgSU5UTyBUSEUgUFVCTElDIERPTUFJTlxuXHRHaWJzb24gUmVzZWFyY2ggQ29ycG9yYXRpb24gcmVsZWFzZXMgYW5kIGRpc2NsYWltcyBBTEwgUklHSFRTIEFORCBUSVRMRSBJTlxuXHRUSElTIENPREUgT1IgQU5ZIERFUklWQVRJVkVTLiBBbnlvbmUgbWF5IGJlIGZyZWVseSB1c2UgaXQgZm9yIGFueSBwdXJwb3NlLlxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFRoaXMgaXMgR1JDJ3MgY3J5cHRvZ3JhcGhpY2FsbHkgc3Ryb25nIFBSTkcgKHBzZXVkby1yYW5kb20gbnVtYmVyIGdlbmVyYXRvcilcblx0Zm9yIEphdmFTY3JpcHQuIEl0IGlzIGRyaXZlbiBieSAxNTM2IGJpdHMgb2YgZW50cm9weSwgc3RvcmVkIGluIGFuIGFycmF5IG9mXG5cdDQ4LCAzMi1iaXQgSmF2YVNjcmlwdCB2YXJpYWJsZXMuICBTaW5jZSBtYW55IGFwcGxpY2F0aW9ucyBvZiB0aGlzIGdlbmVyYXRvcixcblx0aW5jbHVkaW5nIG91cnMgd2l0aCB0aGUgXCJPZmYgVGhlIEdyaWRcIiBMYXRpbiBTcXVhcmUgZ2VuZXJhdG9yLCBtYXkgcmVxdWlyZVxuXHR0aGUgZGV0ZXJpbWluaXN0aWMgcmUtZ2VuZXJhdGlvbiBvZiBhIHNlcXVlbmNlIG9mIFBSTnMsIHRoaXMgUFJORydzIGluaXRpYWxcblx0ZW50cm9waWMgc3RhdGUgY2FuIGJlIHJlYWQgYW5kIHdyaXR0ZW4gYXMgYSBzdGF0aWMgd2hvbGUsIGFuZCBpbmNyZW1lbnRhbGx5XG5cdGV2b2x2ZWQgYnkgcG91cmluZyBuZXcgc291cmNlIGVudHJvcHkgaW50byB0aGUgZ2VuZXJhdG9yJ3MgaW50ZXJuYWwgc3RhdGUuXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0RU5ETEVTUyBUSEFOS1MgYXJlIGR1ZSBKb2hhbm5lcyBCYWFnb2UgZm9yIGhpcyBjYXJlZnVsIGRldmVsb3BtZW50IG9mIGhpZ2hseVxuXHRyb2J1c3QgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbnMgb2YgSlMgUFJOR3MuICBUaGlzIHdvcmsgd2FzIGJhc2VkIHVwb24gaGlzXG5cdEphdmFTY3JpcHQgXCJBbGVhXCIgUFJORyB3aGljaCBpcyBiYXNlZCB1cG9uIHRoZSBleHRyZW1lbHkgcm9idXN0IE11bHRpcGx5LVxuXHRXaXRoLUNhcnJ5IChNV0MpIFBSTkcgaW52ZW50ZWQgYnkgR2VvcmdlIE1hcnNhZ2xpYS4gTVdDIEFsZ29yaXRobSBSZWZlcmVuY2VzOlxuXHRodHRwOi8vd3d3LkdSQy5jb20vb3RnL01hcnNhZ2xpYV9QUk5Hcy5wZGZcblx0aHR0cDovL3d3dy5HUkMuY29tL290Zy9NYXJzYWdsaWFfTVdDX0dlbmVyYXRvcnMucGRmXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0VGhlIHF1YWxpdHkgb2YgdGhpcyBhbGdvcml0aG0ncyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMgaGF2ZSBiZWVuIHZlcmlmaWVkIGJ5XG5cdG11bHRpcGxlIGluZGVwZW5kZW50IHJlc2VhcmNoZXJzLiBJdCBoYW5kaWx5IHBhc3NlcyB0aGUgZmVybWlsYWIuY2ggdGVzdHMgYXNcblx0d2VsbCBhcyB0aGUgXCJkaWVoYXJkXCIgYW5kIFwiZGllaGFyZGVyXCIgdGVzdCBzdWl0ZXMuICBGb3IgaW5kaXZpZHVhbHMgd2lzaGluZ1xuXHR0byBmdXJ0aGVyIHZlcmlmeSB0aGUgcXVhbGl0eSBvZiB0aGlzIGFsZ29yaXRobSdzIHBzZXVkby1yYW5kb20gbnVtYmVycywgYVxuXHQyNTYtbWVnYWJ5dGUgZmlsZSBvZiB0aGlzIGFsZ29yaXRobSdzIG91dHB1dCBtYXkgYmUgZG93bmxvYWRlZCBmcm9tIEdSQy5jb20sXG5cdGFuZCBhIE1pY3Jvc29mdCBXaW5kb3dzIHNjcmlwdGluZyBob3N0IChXU0gpIHZlcnNpb24gb2YgdGhpcyBhbGdvcml0aG0gbWF5IGJlXG5cdGRvd25sb2FkZWQgYW5kIHJ1biBmcm9tIHRoZSBXaW5kb3dzIGNvbW1hbmQgcHJvbXB0IHRvIGdlbmVyYXRlIHVuaXF1ZSBmaWxlc1xuXHRvZiBhbnkgc2l6ZTpcblx0VGhlIEZlcm1pbGFiIFwiRU5UXCIgdGVzdHM6IGh0dHA6Ly9mb3VybWlsYWIuY2gvcmFuZG9tL1xuXHRUaGUgMjU2LW1lZ2FieXRlIHNhbXBsZSBQUk4gZmlsZSBhdCBHUkM6IGh0dHBzOi8vd3d3LkdSQy5jb20vb3RnL3VoZXBybmcuYmluXG5cdFRoZSBXaW5kb3dzIHNjcmlwdGluZyBob3N0IHZlcnNpb246IGh0dHBzOi8vd3d3LkdSQy5jb20vb3RnL3dzaC11aGVwcm5nLmpzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0UXVhbGlmeWluZyBNV0MgbXVsdGlwbGllcnMgYXJlOiAxODc4ODQsIDY4NjExOCwgODk4MTM0LCAxMTA0Mzc1LCAxMjUwMjA1LFxuXHQxNDYwOTEwIGFuZCAxNzY4ODYzLiAoV2UgdXNlIHRoZSBsYXJnZXN0IG9uZSB0aGF0J3MgPCAyXjIxKVxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4ndXNlIHN0cmljdCc7XG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuXG4vKlx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuVGhpcyBpcyBiYXNlZCB1cG9uIEpvaGFubmVzIEJhYWdvZSdzIGNhcmVmdWxseSBkZXNpZ25lZCBhbmQgZWZmaWNpZW50IGhhc2hcbmZ1bmN0aW9uIGZvciB1c2Ugd2l0aCBKYXZhU2NyaXB0LiAgSXQgaGFzIGEgcHJvdmVuIFwiYXZhbGFuY2hlXCIgZWZmZWN0IHN1Y2hcbnRoYXQgZXZlcnkgYml0IG9mIHRoZSBpbnB1dCBhZmZlY3RzIGV2ZXJ5IGJpdCBvZiB0aGUgb3V0cHV0IDUwJSBvZiB0aGUgdGltZSxcbndoaWNoIGlzIGdvb2QuXHRTZWU6IGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvaGFzaC9hdmFsYW5jaGUueGh0bWxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiovXG52YXIgTWFzaCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG4gPSAweGVmYzgyNDlkO1xuXHR2YXIgbWFzaCA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0biArPSBkYXRhLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRcdHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG5cdFx0XHRcdG4gPSBoID4+PiAwO1xuXHRcdFx0XHRoIC09IG47XG5cdFx0XHRcdGggKj0gbjtcblx0XHRcdFx0biA9IGggPj4+IDA7XG5cdFx0XHRcdGggLT0gbjtcblx0XHRcdFx0biArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcblx0XHRcdH1cblx0XHRcdHJldHVybiAobiA+Pj4gMCkgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRuID0gMHhlZmM4MjQ5ZDtcblx0XHR9XG5cdH07XG5cdHJldHVybiBtYXNoO1xufTtcblxudmFyIHVoZXBybmcgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRyZXR1cm4gKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbyA9IDQ4OyAvLyBzZXQgdGhlICdvcmRlcicgbnVtYmVyIG9mIEVOVFJPUFktaG9sZGluZyAzMi1iaXQgdmFsdWVzXG5cdFx0dmFyIGMgPSAxOyAvLyBpbml0IHRoZSAnY2FycnknIHVzZWQgYnkgdGhlIG11bHRpcGx5LXdpdGgtY2FycnkgKE1XQykgYWxnb3JpdGhtXG5cdFx0dmFyIHAgPSBvOyAvLyBpbml0IHRoZSAncGhhc2UnIChtYXgtMSkgb2YgdGhlIGludGVybWVkaWF0ZSB2YXJpYWJsZSBwb2ludGVyXG5cdFx0dmFyIHMgPSBuZXcgQXJyYXkobyk7IC8vIGRlY2xhcmUgb3VyIGludGVybWVkaWF0ZSB2YXJpYWJsZXMgYXJyYXlcblx0XHR2YXIgaTsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cdFx0dmFyIGo7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXHRcdHZhciBrID0gMDsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cblx0XHQvLyB3aGVuIG91ciBcInVoZXBybmdcIiBpcyBpbml0aWFsbHkgaW52b2tlZCBvdXIgUFJORyBzdGF0ZSBpcyBpbml0aWFsaXplZCBmcm9tIHRoZVxuXHRcdC8vIGJyb3dzZXIncyBvd24gbG9jYWwgUFJORy4gVGhpcyBpcyBva2F5IHNpbmNlIGFsdGhvdWdoIGl0cyBnZW5lcmF0b3IgbWlnaHQgbm90XG5cdFx0Ly8gYmUgd29uZGVyZnVsLCBpdCdzIHVzZWZ1bCBmb3IgZXN0YWJsaXNoaW5nIGxhcmdlIHN0YXJ0dXAgZW50cm9weSBmb3Igb3VyIHVzYWdlLlxuXHRcdHZhciBtYXNoID0gbmV3IE1hc2goKTsgLy8gZ2V0IGEgcG9pbnRlciB0byBvdXIgaGlnaC1wZXJmb3JtYW5jZSBcIk1hc2hcIiBoYXNoXG5cblx0XHQvLyBmaWxsIHRoZSBhcnJheSB3aXRoIGluaXRpYWwgbWFzaCBoYXNoIHZhbHVlc1xuXHRcdGZvciAoaSA9IDA7IGkgPCBvOyBpKyspIHtcblx0XHRcdHNbaV0gPSBtYXNoKE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblxuXHRcdC8vIHRoaXMgUFJJVkFURSAoaW50ZXJuYWwgYWNjZXNzIG9ubHkpIGZ1bmN0aW9uIGlzIHRoZSBoZWFydCBvZiB0aGUgbXVsdGlwbHktd2l0aC1jYXJyeVxuXHRcdC8vIChNV0MpIFBSTkcgYWxnb3JpdGhtLiBXaGVuIGNhbGxlZCBpdCByZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBudW1iZXIgaW4gdGhlIGZvcm0gb2YgYVxuXHRcdC8vIDMyLWJpdCBKYXZhU2NyaXB0IGZyYWN0aW9uICgwLjAgdG8gPDEuMCkgaXQgaXMgYSBQUklWQVRFIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIGRlZmF1bHRcblx0XHQvLyBbMC0xXSByZXR1cm4gZnVuY3Rpb24sIGFuZCBieSB0aGUgcmFuZG9tICdzdHJpbmcobiknIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgJ24nXG5cdFx0Ly8gY2hhcmFjdGVycyBmcm9tIDMzIHRvIDEyNi5cblx0XHR2YXIgcmF3cHJuZyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgrK3AgPj0gbykge1xuXHRcdFx0XHRwID0gMDtcblx0XHRcdH1cblx0XHRcdHZhciB0ID0gMTc2ODg2MyAqIHNbcF0gKyBjICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcblx0XHRcdHJldHVybiBzW3BdID0gdCAtIChjID0gdCB8IDApO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uIGlzIHRoZSBkZWZhdWx0IGZ1bmN0aW9uIHJldHVybmVkIGJ5IHRoaXMgbGlicmFyeS5cblx0XHQvLyBUaGUgdmFsdWVzIHJldHVybmVkIGFyZSBpbnRlZ2VycyBpbiB0aGUgcmFuZ2UgZnJvbSAwIHRvIHJhbmdlLTEuIFdlIGZpcnN0XG5cdFx0Ly8gb2J0YWluIHR3byAzMi1iaXQgZnJhY3Rpb25zIChmcm9tIHJhd3BybmcpIHRvIHN5bnRoZXNpemUgYSBzaW5nbGUgaGlnaFxuXHRcdC8vIHJlc29sdXRpb24gNTMtYml0IHBybmcgKDAgdG8gPDEpLCB0aGVuIHdlIG11bHRpcGx5IHRoaXMgYnkgdGhlIGNhbGxlcidzXG5cdFx0Ly8gXCJyYW5nZVwiIHBhcmFtIGFuZCB0YWtlIHRoZSBcImZsb29yXCIgdG8gcmV0dXJuIGEgZXF1YWxseSBwcm9iYWJsZSBpbnRlZ2VyLlxuXHRcdHZhciByYW5kb20gPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHJhbmdlICogKHJhd3BybmcoKSArIChyYXdwcm5nKCkgKiAweDIwMDAwMCB8IDApICogMS4xMTAyMjMwMjQ2MjUxNTY1ZS0xNikpOyAvLyAyXi01M1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uICdzdHJpbmcobiknIHJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIHN0cmluZyBvZlxuXHRcdC8vICduJyBwcmludGFibGUgY2hhcmFjdGVycyByYW5naW5nIGZyb20gY2hyKDMzKSB0byBjaHIoMTI2KSBpbmNsdXNpdmUuXG5cdFx0cmFuZG9tLnN0cmluZyA9IGZ1bmN0aW9uIChjb3VudCkge1xuXHRcdFx0dmFyIGk7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0XHRcdFx0cyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDMzICsgcmFuZG9tKDk0KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcztcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBQUklWQVRFIFwiaGFzaFwiIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZXZvbHZlIHRoZSBnZW5lcmF0b3IncyBpbnRlcm5hbFxuXHRcdC8vIGVudHJvcHkgc3RhdGUuIEl0IGlzIGFsc28gY2FsbGVkIGJ5IHRoZSBFWFBPUlRFRCBhZGRFbnRyb3B5KCkgZnVuY3Rpb25cblx0XHQvLyB3aGljaCBpcyB1c2VkIHRvIHBvdXIgZW50cm9weSBpbnRvIHRoZSBQUk5HLlxuXHRcdHZhciBoYXNoID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG87IGorKykge1xuXHRcdFx0XHRcdHNbal0gLT0gbWFzaChhcmdzW2ldKTtcblx0XHRcdFx0XHRpZiAoc1tqXSA8IDApIHtcblx0XHRcdFx0XHRcdHNbal0gKz0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBcImNsZWFuIHN0cmluZ1wiIGZ1bmN0aW9uIHJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2VzIGFuZCBub24tcHJpbnRpbmdcblx0XHQvLyBjb250cm9sIGNoYXJhY3RlcnMsIGluY2x1ZGluZyBhbnkgZW1iZWRkZWQgY2FycmlhZ2UtcmV0dXJuIChDUikgYW5kIGxpbmUtZmVlZCAoTEYpIGNoYXJhY3RlcnMsXG5cdFx0Ly8gZnJvbSBhbnkgc3RyaW5nIGl0IGlzIGhhbmRlZC4gdGhpcyBpcyBhbHNvIHVzZWQgYnkgdGhlICdoYXNoc3RyaW5nJyBmdW5jdGlvbiAoYmVsb3cpIHRvIGhlbHBcblx0XHQvLyB1c2VycyBhbHdheXMgb2J0YWluIHRoZSBzYW1lIEVGRkVDVElWRSB1aGVwcm5nIHNlZWRpbmcga2V5LlxuXHRcdHJhbmRvbS5jbGVhblN0cmluZyA9IGZ1bmN0aW9uIChpblN0cikge1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC8oXlxccyopfChcXHMqJCkvZ2ksICcnKTsgLy8gcmVtb3ZlIGFueS9hbGwgbGVhZGluZyBzcGFjZXNcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvW1xceDAwLVxceDFGXS9naSwgJycpOyAvLyByZW1vdmUgYW55L2FsbCBjb250cm9sIGNoYXJhY3RlcnNcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvXFxuIC8sICdcXG4nKTsgLy8gcmVtb3ZlIGFueS9hbGwgdHJhaWxpbmcgc3BhY2VzXG5cdFx0XHRyZXR1cm4gaW5TdHI7IC8vIHJldHVybiB0aGUgY2xlYW5lZCB1cCByZXN1bHRcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBcImhhc2ggc3RyaW5nXCIgZnVuY3Rpb24gaGFzaGVzIHRoZSBwcm92aWRlZCBjaGFyYWN0ZXIgc3RyaW5nIGFmdGVyIGZpcnN0IHJlbW92aW5nXG5cdFx0Ly8gYW55IGxlYWRpbmcgb3IgdHJhaWxpbmcgc3BhY2VzIGFuZCBpZ25vcmluZyBhbnkgZW1iZWRkZWQgY2FycmlhZ2UgcmV0dXJucyAoQ1IpIG9yIExpbmUgRmVlZHMgKExGKVxuXHRcdHJhbmRvbS5oYXNoU3RyaW5nID0gZnVuY3Rpb24gKGluU3RyKSB7XG5cdFx0XHRpblN0ciA9IHJhbmRvbS5jbGVhblN0cmluZyhpblN0cik7XG5cdFx0XHRtYXNoKGluU3RyKTsgLy8gdXNlIHRoZSBzdHJpbmcgdG8gZXZvbHZlIHRoZSAnbWFzaCcgc3RhdGVcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBpblN0ci5sZW5ndGg7IGkrKykgeyAvLyBzY2FuIHRocm91Z2ggdGhlIGNoYXJhY3RlcnMgaW4gb3VyIHN0cmluZ1xuXHRcdFx0XHRrID0gaW5TdHIuY2hhckNvZGVBdChpKTsgLy8gZ2V0IHRoZSBjaGFyYWN0ZXIgY29kZSBhdCB0aGUgbG9jYXRpb25cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG87IGorKykgeyAvL1x0XCJtYXNoXCIgaXQgaW50byB0aGUgVUhFUFJORyBzdGF0ZVxuXHRcdFx0XHRcdHNbal0gLT0gbWFzaChrKTtcblx0XHRcdFx0XHRpZiAoc1tqXSA8IDApIHtcblx0XHRcdFx0XHRcdHNbal0gKz0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNlZWQgdGhlIHJhbmRvbSBnZW5lcmF0b3IuXG5cdFx0cmFuZG9tLnNlZWQgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRcdFx0aWYgKHR5cGVvZiBzZWVkID09PSAndW5kZWZpbmVkJyB8fCBzZWVkID09PSBudWxsKSB7XG5cdFx0XHRcdHNlZWQgPSBNYXRoLnJhbmRvbSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBzZWVkICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRzZWVkID0gc3RyaW5naWZ5KHNlZWQsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICh2YWx1ZSkudG9TdHJpbmcoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJhbmRvbS5pbml0U3RhdGUoKTtcblx0XHRcdHJhbmRvbS5oYXNoU3RyaW5nKHNlZWQpO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIGhhbmR5IGV4cG9ydGVkIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYWRkIGVudHJvcHkgdG8gb3VyIHVoZXBybmcgYXQgYW55IHRpbWVcblx0XHRyYW5kb20uYWRkRW50cm9weSA9IGZ1bmN0aW9uICggLyogYWNjZXB0IHplcm8gb3IgbW9yZSBhcmd1bWVudHMgKi8gKSB7XG5cdFx0XHR2YXIgYXJncyA9IFtdO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdH1cblx0XHRcdGhhc2goKGsrKykgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkpICsgYXJncy5qb2luKCcnKSArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH07XG5cblx0XHQvLyBpZiB3ZSB3YW50IHRvIHByb3ZpZGUgYSBkZXRlcm1pbmlzdGljIHN0YXJ0dXAgY29udGV4dCBmb3Igb3VyIFBSTkcsXG5cdFx0Ly8gYnV0IHdpdGhvdXQgZGlyZWN0bHkgc2V0dGluZyB0aGUgaW50ZXJuYWwgc3RhdGUgdmFyaWFibGVzLCB0aGlzIGFsbG93c1xuXHRcdC8vIHVzIHRvIGluaXRpYWxpemUgdGhlIG1hc2ggaGFzaCBhbmQgUFJORydzIGludGVybmFsIHN0YXRlIGJlZm9yZSBwcm92aWRpbmdcblx0XHQvLyBzb21lIGhhc2hpbmcgaW5wdXRcblx0XHRyYW5kb20uaW5pdFN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bWFzaCgpOyAvLyBwYXNzIGEgbnVsbCBhcmcgdG8gZm9yY2UgbWFzaCBoYXNoIHRvIGluaXRcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBvOyBpKyspIHtcblx0XHRcdFx0c1tpXSA9IG1hc2goJyAnKTsgLy8gZmlsbCB0aGUgYXJyYXkgd2l0aCBpbml0aWFsIG1hc2ggaGFzaCB2YWx1ZXNcblx0XHRcdH1cblx0XHRcdGMgPSAxOyAvLyBpbml0IG91ciBtdWx0aXBseS13aXRoLWNhcnJ5IGNhcnJ5XG5cdFx0XHRwID0gbzsgLy8gaW5pdCBvdXIgcGhhc2Vcblx0XHR9O1xuXG5cdFx0Ly8gd2UgdXNlIHRoaXMgKG9wdGlvbmFsKSBleHBvcnRlZCBmdW5jdGlvbiB0byBzaWduYWwgdGhlIEphdmFTY3JpcHQgaW50ZXJwcmV0ZXJcblx0XHQvLyB0aGF0IHdlJ3JlIGZpbmlzaGVkIHVzaW5nIHRoZSBcIk1hc2hcIiBoYXNoIGZ1bmN0aW9uIHNvIHRoYXQgaXQgY2FuIGZyZWUgdXAgdGhlXG5cdFx0Ly8gbG9jYWwgXCJpbnN0YW5jZSB2YXJpYWJsZXNcIiBpcyB3aWxsIGhhdmUgYmVlbiBtYWludGFpbmluZy4gIEl0J3Mgbm90IHN0cmljdGx5XG5cdFx0Ly8gbmVjZXNzYXJ5LCBvZiBjb3Vyc2UsIGJ1dCBpdCdzIGdvb2QgSmF2YVNjcmlwdCBjaXRpemVuc2hpcC5cblx0XHRyYW5kb20uZG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1hc2ggPSBudWxsO1xuXHRcdH07XG5cblx0XHQvLyBpZiB3ZSBjYWxsZWQgXCJ1aGVwcm5nXCIgd2l0aCBhIHNlZWQgdmFsdWUsIHRoZW4gZXhlY3V0ZSByYW5kb20uc2VlZCgpIGJlZm9yZSByZXR1cm5pbmdcblx0XHRpZiAodHlwZW9mIHNlZWQgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyYW5kb20uc2VlZChzZWVkKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAwIChpbmNsdXNpdmUpIGFuZCByYW5nZSAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5yYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbShyYW5nZSk7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gZmxvYXQgYmV0d2VlbiAwIChpbmNsdXNpdmUpIGFuZCAxIChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLnJhbmRvbSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiByYW5kb20oTnVtYmVyLk1BWF9WQUxVRSAtIDEpIC8gTnVtYmVyLk1BWF9WQUxVRTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLmZsb2F0QmV0d2VlbiA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbS5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKVxuXHRcdHJhbmRvbS5pbnRCZXR3ZWVuID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihyYW5kb20ucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuXHRcdH07XG5cblx0XHQvLyB3aGVuIG91ciBtYWluIG91dGVyIFwidWhlcHJuZ1wiIGZ1bmN0aW9uIGlzIGNhbGxlZCwgYWZ0ZXIgc2V0dGluZyB1cCBvdXJcblx0XHQvLyBpbml0aWFsIHZhcmlhYmxlcyBhbmQgZW50cm9waWMgc3RhdGUsIHdlIHJldHVybiBhbiBcImluc3RhbmNlIHBvaW50ZXJcIlxuXHRcdC8vIHRvIHRoZSBpbnRlcm5hbCBhbm9ueW1vdXMgZnVuY3Rpb24gd2hpY2ggY2FuIHRoZW4gYmUgdXNlZCB0byBhY2Nlc3Ncblx0XHQvLyB0aGUgdWhlcHJuZydzIHZhcmlvdXMgZXhwb3J0ZWQgZnVuY3Rpb25zLiAgQXMgd2l0aCB0aGUgXCIuZG9uZVwiIGZ1bmN0aW9uXG5cdFx0Ly8gYWJvdmUsIHdlIHNob3VsZCBzZXQgdGhlIHJldHVybmVkIHZhbHVlIHRvICdudWxsJyBvbmNlIHdlJ3JlIGZpbmlzaGVkXG5cdFx0Ly8gdXNpbmcgYW55IG9mIHRoZXNlIGZ1bmN0aW9ucy5cblx0XHRyZXR1cm4gcmFuZG9tO1xuXHR9KCkpO1xufTtcblxuLy8gTW9kaWZpY2F0aW9uIGZvciB1c2UgaW4gbm9kZTpcbnVoZXBybmcuY3JlYXRlID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0cmV0dXJuIG5ldyB1aGVwcm5nKHNlZWQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gdWhlcHJuZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JhbmRvbS1zZWVkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuZXhwb3J0cy5nZXRTZXJpYWxpemUgPSBzZXJpYWxpemVyXG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXMsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlciksIHNwYWNlcylcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlcikge1xuICB2YXIgc3RhY2sgPSBbXSwga2V5cyA9IFtdXG5cbiAgaWYgKGN5Y2xlUmVwbGFjZXIgPT0gbnVsbCkgY3ljbGVSZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2tbMF0gPT09IHZhbHVlKSByZXR1cm4gXCJbQ2lyY3VsYXIgfl1cIlxuICAgIHJldHVybiBcIltDaXJjdWxhciB+LlwiICsga2V5cy5zbGljZSgwLCBzdGFjay5pbmRleE9mKHZhbHVlKSkuam9pbihcIi5cIikgKyBcIl1cIlxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHRoaXNQb3MgPSBzdGFjay5pbmRleE9mKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IHN0YWNrLnNwbGljZSh0aGlzUG9zICsgMSkgOiBzdGFjay5wdXNoKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IGtleXMuc3BsaWNlKHRoaXNQb3MsIEluZmluaXR5LCBrZXkpIDoga2V5cy5wdXNoKGtleSlcbiAgICAgIGlmICh+c3RhY2suaW5kZXhPZih2YWx1ZSkpIHZhbHVlID0gY3ljbGVSZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGVsc2Ugc3RhY2sucHVzaCh2YWx1ZSlcblxuICAgIHJldHVybiByZXBsYWNlciA9PSBudWxsID8gdmFsdWUgOiByZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzb24tc3RyaW5naWZ5LXNhZmUvc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImZ1bmN0aW9uIFZlYzMgKHgsIHksIHopIHtcbiAgdGhpcy54ID0geFxuICB0aGlzLnkgPSB5XG4gIHRoaXMueiA9IHpcbn1cblZlYzMucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4LCB5LCB6KSB7XG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeSArIHRoaXMueiAqIHpcbn1cbnZhciBnMyA9IFtcbiAgbmV3IFZlYzMoMSwgMSwgMSksIG5ldyBWZWMzKC0xLCAxLCAxKSwgbmV3IFZlYzMoMSwgLTEsIDEpLCBuZXcgVmVjMygtMSwgLTEsIDEpLFxuICBuZXcgVmVjMygxLCAxLCAwKSwgbmV3IFZlYzMoLTEsIDEsIDApLCBuZXcgVmVjMygxLCAtMSwgMCksIG5ldyBWZWMzKC0xLCAtMSwgMCksXG4gIG5ldyBWZWMzKDEsIDEsIC0xKSwgbmV3IFZlYzMoLTEsIDEsIC0xKSwgbmV3IFZlYzMoMSwgLTEsIC0xKSwgbmV3IFZlYzMoLTEsIC0xLCAtMSlcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyYWQzIChwLCB4LCB5LCB6KSB7XG4gIHZhciBoYXNoID0gcFt4ICsgcFt5ICsgcFt6XV1dICUgZzMubGVuZ3RoXG4gIHJldHVybiBnM1toYXNoXVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC8zZC5qcyIsImZ1bmN0aW9uIFZlYzQgKHgsIHksIHosIHQpIHtcbiAgdGhpcy54ID0geFxuICB0aGlzLnkgPSB5XG4gIHRoaXMueiA9IHpcbiAgdGhpcy50ID0gdFxufVxuVmVjNC5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHksIHosIHQpIHtcbiAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5ICsgdGhpcy56ICogeiArIHRoaXMudCAqIHRcbn1cbnZhciBnNCA9IFtcbiAgbmV3IFZlYzQoMCwgMSwgMSwgMSksIG5ldyBWZWM0KDAsIDEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgMSwgLTEsIDEpLCBuZXcgVmVjNCgwLCAxLCAtMSwgLTEpLFxuICBuZXcgVmVjNCgwLCAtMSwgMSwgMSksIG5ldyBWZWM0KDAsIC0xLCAxLCAtMSksIG5ldyBWZWM0KDAsIC0xLCAtMSwgMSksIG5ldyBWZWM0KDAsIC0xLCAtMSwgLTEpLFxuICBuZXcgVmVjNCgxLCAwLCAxLCAxKSwgbmV3IFZlYzQoMSwgMCwgMSwgLTEpLCBuZXcgVmVjNCgxLCAwLCAtMSwgMSksIG5ldyBWZWM0KDEsIDAsIC0xLCAtMSksXG4gIG5ldyBWZWM0KC0xLCAwLCAxLCAxKSwgbmV3IFZlYzQoLTEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAxKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAtMSksXG4gIG5ldyBWZWM0KDEsIDEsIDAsIDEpLCBuZXcgVmVjNCgxLCAxLCAwLCAtMSksIG5ldyBWZWM0KDEsIC0xLCAwLCAxKSwgbmV3IFZlYzQoMSwgLTEsIDAsIC0xKSxcbiAgbmV3IFZlYzQoLTEsIDEsIDAsIDEpLCBuZXcgVmVjNCgtMSwgMSwgMCwgLTEpLCBuZXcgVmVjNCgtMSwgLTEsIDAsIDEpLCBuZXcgVmVjNCgtMSwgLTEsIDAsIC0xKSxcbiAgbmV3IFZlYzQoMSwgMSwgMSwgMCksIG5ldyBWZWM0KDEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoMSwgLTEsIDEsIDApLCBuZXcgVmVjNCgxLCAtMSwgLTEsIDApLFxuICBuZXcgVmVjNCgtMSwgMSwgMSwgMCksIG5ldyBWZWM0KC0xLCAxLCAtMSwgMCksIG5ldyBWZWM0KC0xLCAtMSwgMSwgMCksIG5ldyBWZWM0KC0xLCAtMSwgLTEsIDApXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBncmFkNCAocCwgeCwgeSwgeiwgdCkge1xuICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbeiArIHBbdF1dXV0gJSBnNC5sZW5ndGhcbiAgcmV0dXJuIGc0W2hhc2hdXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC80ZC5qcyIsImltcG9ydCB7IGxlcnAsIGZhZGUgfSBmcm9tICcuL21hdGgnXG5cbmZ1bmN0aW9uIGhhc2hOIChwLCBncykge1xuICBpZiAoZ3MubGVuZ3RoID09PSAxKSByZXR1cm4gcFtnc1swXV1cbiAgcmV0dXJuIHBbZ3NbMF0gKyBoYXNoTihwLCBncy5zbGljZSgxKSldXG59XG5mdW5jdGlvbiBWZWNOKFIpIHtcbiAgdGhpcy5SID0gUlxufVxuVmVjTi5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKFIpIHtcbiAgdmFyIHZhbCA9IDBcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBSLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsICs9IHRoaXMuUltpXSAqIFJbaV1cbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbmV4cG9ydCB2YXIgZ04gPSBbXVxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlR04gKGRpbSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbSAqIDI7IGkrKykge1xuICAgIHZhciB2ZWMgPSBuZXcgQXJyYXkoZGltKS5maWxsKDApXG4gICAgdmVjW2kgJSBkaW1dID0gaSAvIGRpbSA+PSAxID8gMSA6IC0xXG4gICAgZ05baV0gPSBuZXcgVmVjTih2ZWMpXG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBsZXJwTiAobnMsIGRzKSB7XG4gIGlmIChkcy5sZW5ndGggPT09IDEpIHJldHVybiBsZXJwKG5zWzBdLCBuc1sxXSwgZmFkZShkc1swXSkpXG4gIHZhciBuczEgPSBucy5zbGljZSgwLCBNYXRoLmZsb29yKG5zLmxlbmd0aCAvIDIpKVxuICB2YXIgbnMyID0gbnMuc2xpY2UoTWF0aC5jZWlsKG5zLmxlbmd0aCAvIDIpKVxuICByZXR1cm4gbGVycChcbiAgICBsZXJwTihuczEsIGRzLnNsaWNlKDAsIGRzLmxlbmd0aCAtIDEpKSxcbiAgICBsZXJwTihuczIsIGRzLnNsaWNlKDAsIGRzLmxlbmd0aCAtIDEpKSxcbiAgICBmYWRlKGRzW2RzLmxlbmd0aCAtIDFdKVxuICApXG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TnMgKHAsIGRpbSwgZ3MsIGRzKSB7XG4gIHZhciBucyA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgKDIgPDwgKGRpbSAtIDEpKTsgaSsrKSB7XG4gICAgdmFyIGdzUGVybSA9IGdzLnNsaWNlKClcbiAgICB2YXIgZHNQZXJtID0gZHMuc2xpY2UoKVxuICAgIHZhciB0ZW1wID0gaVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBkaW07IGorKykge1xuICAgICAgaWYgKHRlbXAgJiAxKSB7XG4gICAgICAgIGdzUGVybVtqXSArPSAxXG4gICAgICAgIGRzUGVybVtqXSAtPSAxXG4gICAgICB9XG4gICAgICB0ZW1wID0gdGVtcCA+PiAxXG4gICAgfVxuICAgIG5zW2ldID0gZ05baGFzaE4ocCwgZ3NQZXJtKSAlIGdOLmxlbmd0aF0uZG90KGRzUGVybSlcbiAgfVxuICByZXR1cm4gbnNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsL05kLmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBTaW1wbGV4MSB9IGZyb20gJy4vU2ltcGxleDEnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNpbXBsZXgyIH0gZnJvbSAnLi9TaW1wbGV4MidcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaW1wbGV4L2luZGV4LmpzIiwiaW1wb3J0IHRlcnJhcGFpbnQgZnJvbSAndGVycmFwYWludCdcclxuaW1wb3J0IHsgU2ltcGxleDIgfSBmcm9tICcuLi9zcmMvaW5kZXgnXHJcblxyXG52YXIgc2VlZCA9IE1hdGgucmFuZG9tKClcclxudmFyIHNpbXBsZXggPSBuZXcgU2ltcGxleDIoc2VlZClcclxuXHJcbjsoZnVuY3Rpb24gaW5pdCgpIHtcclxuICB2YXIgbWFwID0gdGVycmFwYWludC5tYXAoc2ltcGxleC5nZW4sIHtcclxuICAgIG9mZnNldDogdHJ1ZSxcclxuICAgIHBlcmlvZDogNjQsXHJcbiAgICB0aGlzQXJnOiBzaW1wbGV4XHJcbiAgfSlcclxuICBtYXAuZHJhdygnI25vaXNlLWNhbnZhcycpXHJcbn0pKClcclxuXHJcbiQoJyNnZW4tbm9pc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICB2YXIgZXZhbFN0ciA9ICQoJyNldmFsLXN0cicpLnZhbHVlXHJcbiAgdmFyIGZuQm9keSA9IGBcclxuICAgIHZhciBuID0gdGhpcy5nZW4uYmluZCh0aGlzKVxyXG4gICAgdmFyIGYgPSB0aGlzLm9jdGF2YXRlLmJpbmQodGhpcylcclxuICAgIHZhciBzaW4gPSBNYXRoLnNpblxyXG4gICAgdmFyIGNvcyA9IE1hdGguY29zXHJcbiAgICB2YXIgcG93ID0gTWF0aC5wb3dcclxuICAgIHZhciBwaSA9IE1hdGguUElcclxuICAgIHZhciBhYnMgPSBNYXRoLmFic1xyXG4gICAgdmFyIGUgPSBNYXRoLkVcclxuICAgIHJldHVybiAke2V2YWxTdHJ9XHJcbiAgYFxyXG4gIHRyeSB7XHJcbiAgICB2YXIgdHJhbnNmb3JtRm4gPSAobmV3IEZ1bmN0aW9uKCd4JywgJ3knLCBmbkJvZHkpKS5iaW5kKHNpbXBsZXgpXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgYWxlcnQoYFxyXG4gICAgICBTb21ldGhpbmcgaXMgd3Jvbmcgd2l0aCB0aGUgc3ludGF4IG9mIHlvdXIgZnVuY3Rpb24uXHJcbiAgICAgIFBsZWFzZSBlbnN1cmUgYWxsIHRoZSBwYXJlbnRoZXNlcyBhcmUgY2xvc2VkIGFuZCB0aGF0IHlvdSdyZVxyXG4gICAgICB1c2luZyB0aGUgY29ycmVjdCBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlIG5hbWVzLlxyXG4gICAgYClcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgdmFyIHRyYW5zZm9ybWVkTm9pc2UgPSBzaW1wbGV4LnRyYW5zZm9ybShmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgdmFsID0gdHJhbnNmb3JtRm4oeCwgeSlcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgYWxlcnQoYFxyXG4gICAgICAgIFlvdXIgZnVuY3Rpb24gY3JlYXRlZCBhIHJ1bi10aW1lIGVycm9yLiBQbGVhc2UgZW5zdXJlXHJcbiAgICAgICAgdGhlIHBlcmlvZCBvZiB0aGUgbm9pc2UgZnVuY3Rpb24gaXMgZ3JlYXRlciB0aGFuIG9uZVxyXG4gICAgICAgIChpZS4gZGl2aWRlIHggYW5kIHkgYnkgYSB2YWx1ZSwgbGlrZSA0IG9yIDE2LCBiZWZvcmVcclxuICAgICAgICBwYXNzaW5nIGl0IHRvIG4oKSkuXHJcbiAgICAgIGApXHJcbiAgICAgIHRocm93ICdSdW50aW1lIGVycm9yJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbFxyXG4gIH0pXHJcbiAgdmFyIG1hcCA9IHRlcnJhcGFpbnQubWFwKHRyYW5zZm9ybWVkTm9pc2UsIHtcclxuICAgIG9mZnNldDogdHJ1ZSxcclxuICAgIHBlcmlvZDogMSxcclxuICAgIHRoaXNBcmc6IHNpbXBsZXhcclxuICB9KVxyXG4gIG1hcC5kcmF3KCcjbm9pc2UtY2FudmFzJylcclxufSlcclxuXHJcbmZ1bmN0aW9uICQgKHNlbGVjdG9yKSB7XHJcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kb2NzL2RlbW8uanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInRyeSB7XHJcbiAgdmFyIGltYWdlVGVzdCA9IG5ldyBJbWFnZURhdGEoMjAsIDIwKVxyXG4gIHZhciBudW1iZXJUZXN0ID0gTWF0aC50cnVuYygyMC4xKVxyXG59IGNhdGNoIChlKSB7XHJcbiAgdmFyIGVyciA9ICdFcnJvciwgYnJvd3NlciBub3Qgc3VwcG9ydGVkIGJ5IFRlcnJhcGFpbnQuICdcclxuICBlcnIgKz0gJ1BsZWFzZSBzd2l0Y2ggdG8gVml2YWxkaSwgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgb3IgU2FmYXJpLidcclxuICBjb25zb2xlLmxvZyhlcnIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlcnJhcGFpbnRGYWN0b3J5ICgpIHtcclxuICBmdW5jdGlvbiBvY3RhdmF0ZSAoKSB7XHJcbiAgICB2YXIgdmFsID0gMFxyXG4gICAgdmFyIG1heCA9IDBcclxuICAgIHZhciBwID0gdGhpcy5wZXJpb2RcclxuICAgIHZhciBhbXAgPSBNYXRoLnBvdyh0aGlzLnBlcnNpc3RhbmNlLCB0aGlzLm9jdGF2ZXMpXHJcbiAgICB2YXIgYXJncyA9IFtdXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2N0YXZlczsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgYXJnc1tqXSA9IGFyZ3VtZW50c1tqXSAvIHBcclxuICAgICAgfVxyXG4gICAgICB2YWwgKz0gKHRoaXMubm9pc2UuYXBwbHkodGhpcy50aGlzQXJnLCBhcmdzKSArIHRoaXMub2Zmc2V0KSAqIGFtcFxyXG4gICAgICBtYXggKz0gYW1wICogKHRoaXMub2Zmc2V0ICsgMSlcclxuICAgICAgYW1wIC89IHRoaXMucGVyc2lzdGFuY2VcclxuICAgICAgcCAvPSAyXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsIC8gbWF4XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNldE9wdGlvbnMgKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICB0aGlzLm9jdGF2ZXMgPSBvcHRpb25zLm9jdGF2ZXMgfHwgMVxyXG4gICAgdGhpcy5wZXJpb2QgPSBvcHRpb25zLnBlcmlvZCB8fCAzMlxyXG4gICAgdGhpcy5vZmZzZXQgPSBvcHRpb25zLm9mZnNldCA/IDEgOiAwXHJcbiAgICB0aGlzLnBlcnNpc3RhbmNlID0gb3B0aW9ucy5wZXJzaXN0YW5jZSB8fCAyXHJcbiAgICB0aGlzLnVwZGF0ZSA9IG9wdGlvbnMudXBkYXRlIHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgJ05vIHVwZGF0ZSBmbicgfVxyXG4gICAgdGhpcy5sb29wdmFsdWVzID0gb3B0aW9ucy5pbml0IHx8IFtdXHJcbiAgICB0aGlzLmNvbG9ybWFwID0gb3B0aW9ucy5jb2xvcm1hcCB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gW3YsIHYsIHYsIDI1NV0gfVxyXG4gICAgdGhpcy50aGlzQXJnID0gb3B0aW9ucy50aGlzQXJnIHx8IG51bGxcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gTWFwIChub2lzZSwgb3B0aW9ucykge1xyXG4gICAgc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpXHJcbiAgICB0aGlzLm5vaXNlID0gbm9pc2VcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBtYXAgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkod2lkdGggKiBoZWlnaHQgKiA0KVxyXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5sb29wdmFsdWVzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5sb29wdmFsdWVzID0gdGhpcy51cGRhdGUodGhpcy5sb29wdmFsdWVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9pc2VBcmdzID0gW3gsIHldLmNvbmNhdCh0aGlzLmxvb3B2YWx1ZXMpXHJcbiAgICAgICAgdmFyIHZhbCA9IE1hdGgudHJ1bmMob2N0YXZhdGUuYXBwbHkodGhpcywgbm9pc2VBcmdzKSAqIDI1NSlcclxuICAgICAgICB2YXIgcGl4ZWxEYXRhXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbG9ybWFwID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBwaXhlbERhdGEgPSB0aGlzLmNvbG9ybWFwKHZhbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGl4ZWxEYXRhID0gdGhpcy5jb2xvcm1hcFt2YWxdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcC5zZXQocGl4ZWxEYXRhLCB4ICogNCArIHkgKiA0ICogd2lkdGgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKG1hcCwgd2lkdGgsIGhlaWdodClcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGNhbnZhcykge1xyXG4gICAgY2FudmFzID0gdHlwZW9mIGNhbnZhcyA9PT0gJ3N0cmluZydcclxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNhbnZhcylcclxuICAgICAgOiBjYW52YXNcclxuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLnB1dEltYWdlRGF0YSh0aGlzLmNvbXB1dGUoXHJcbiAgICAgIGNhbnZhcy53aWR0aCxcclxuICAgICAgY2FudmFzLmhlaWdodFxyXG4gICAgKSwgMCwgMClcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXHJcbiAgfVxyXG4gIE1hcC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHRhcmdldCwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICAgIHRhcmdldCA9IHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnXHJcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXHJcbiAgICAgIDogdGFyZ2V0XHJcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aFxyXG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxyXG4gICAgY3R4LnB1dEltYWdlRGF0YSh0aGlzLmNvbXB1dGUod2lkdGgsIGhlaWdodCksIDAsIDApXHJcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY2FudmFzKVxyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICB2YXIgZm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoYXQuZHJhdyh0aGF0LmNhbnZhcylcclxuICAgICAgdGhpcy5hbmltUmVxID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuKVxyXG4gICAgfVxyXG4gICAgdGhpcy5hbmltUmVxID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuKVxyXG4gIH1cclxuICBNYXAucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1SZXEpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBDdXJ2ZSAobm9pc2UsIG9wdGlvbnMpIHtcclxuICAgIHNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKVxyXG4gICAgdGhpcy5ub2lzZSA9IG5vaXNlXHJcbiAgfVxyXG4gIEN1cnZlLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBjdXJ2ZSA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpLmZpbGwoMjU1KVxyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxvb3B2YWx1ZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5sb29wdmFsdWVzID0gdGhpcy51cGRhdGUodGhpcy5sb29wdmFsdWVzKVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBub2lzZUFyZ3MgPSBbeF0uY29uY2F0KHRoaXMubG9vcHZhbHVlcylcclxuICAgICAgdmFyIHZhbCA9IE1hdGgudHJ1bmMob2N0YXZhdGUuYXBwbHkodGhpcywgbm9pc2VBcmdzKSAqIDI1NSlcclxuICAgICAgLy9jb25zb2xlLmxvZyh2YWwpXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgY3VydmVbdmFsICogd2lkdGggKiA0ICsgeCAqIDQgKyBpXSA9IDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9jb25zb2xlLmxvZyhjdXJ2ZSlcclxuICAgIC8vdGhyb3cgJ2EnXHJcbiAgICByZXR1cm4gbmV3IEltYWdlRGF0YShjdXJ2ZSwgd2lkdGgsIGhlaWdodClcclxuICB9XHJcbiAgQ3VydmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY2FudmFzKSB7XHJcbiAgICBNYXAucHJvdG90eXBlLmRyYXcuY2FsbCh0aGlzLCBjYW52YXMpXHJcbiAgfVxyXG4gIEN1cnZlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAodGFyZ2V0LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICBNYXAucHJvdG90eXBlLmNyZWF0ZS5jYWxsKHRoaXMsIHRhcmdldCwgd2lkdGgsIGhlaWdodClcclxuICB9XHJcbiAgQ3VydmUucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBNYXAucHJvdG90eXBlLmxvb3AuY2FsbCh0aGlzKVxyXG4gIH1cclxuICBDdXJ2ZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIE1hcC5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpXHJcbiAgfVxyXG5cclxuICB2YXIgbW9kdWxlID0ge1xyXG4gICAgbWFwOiBmdW5jdGlvbiAobm9pc2UsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIG5ldyBNYXAobm9pc2UsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgY3VydmU6IGZ1bmN0aW9uIChub2lzZSwgb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gbmV3IEN1cnZlKG5vaXNlLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIFRIUkVFMjogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFRIUkVFMigpXHJcbiAgICB9LFxyXG4gICAgVEhSRUUzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBuZXcgVEhSRUUzKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXJyYXBhaW50RmFjdG9yeSgpXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJhcGFpbnQvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9