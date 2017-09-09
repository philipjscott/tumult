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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin1", function() { return Perlin1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Simplex1", function() { return Simplex1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin2", function() { return Perlin2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Simplex2", function() { return Simplex2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin3", function() { return Perlin3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Perlin4", function() { return Perlin4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerlinN", function() { return PerlinN; });
// Tumult, JavaScript noise generator
// Created by Philip Scott | ScottyFillups, 2017
// https://github.com/ScottyFillups

// Noise algorithms by Ken Perlin
// Uses "random-seed" package on NPM for seeding function


var rand = __webpack_require__(1)
var rng
function lerp (a, b, t) {
  return a * (1 - t) + b * t
}
function fade (t) {
  return t * t * t * (10 + t * (-15 + t * 6))
}
function falloff () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var dims = args.slice(1)
  var t = args[0] - dims.reduce(function (sum, val) {
    return sum + val * val
  }, 0)
  return t * t * t * t 
}
var cut1 = falloff.bind(null, 1)
var cut = falloff.bind(null, 0.5)
var p = new Uint8Array(512)

var Noise = function Noise (s) {
  this.seed(s)
};
Noise.prototype.gen = function gen () {};
Noise.prototype.seed = function seed (s) {
  s = s || Math.random()
  rng = rand.create(s)
  var i
  for (i = 0; i < 256; i++) { p[i] = i }
  for (i = 0; i < 256; i++) {
    var r = rng(256)
    var temp = p[i]
    p[i] = p[r]
    p[r] = temp
  }
  for (i = 0; i < 256; i++) { p[i + 256] = p[i] }
};
Noise.prototype.transform = function transform (fn) {
    var this$1 = this;

  return function () {
      var dims = [], len = arguments.length;
      while ( len-- ) dims[ len ] = arguments[ len ];

    return fn.apply(this$1, dims)
  }
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


var g1 = [ new Vec1(1), new Vec1(-1) ]
function grad1 (x) {
  var hash = p[x] % g1.length
  return g1[hash]
}
function Vec1 (x) {
  this.x = x
}
Vec1.prototype.dot = function (x) {
  return this.x * x
}
var Perlin1 = (function (Noise) {
  function Perlin1 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin1.__proto__ = Noise;
  Perlin1.prototype = Object.create( Noise && Noise.prototype );
  Perlin1.prototype.constructor = Perlin1;
  Perlin1.prototype.gen = function gen (x) {
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = grad1(gx).dot(dx)
    var n1 = grad1(gx + 1).dot(dx - 1)

    return lerp(n0, n1, fade(dx))
  };

  return Perlin1;
}(Noise));
var Simplex1 = (function (Noise) {
  function Simplex1 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Simplex1.__proto__ = Noise;
  Simplex1.prototype = Object.create( Noise && Noise.prototype );
  Simplex1.prototype.constructor = Simplex1;
  Simplex1.prototype.gen = function gen (x) {
    var gx = Math.floor(x) % 256
    var dx = x - gx

    var n0 = cut1(dx) * grad1(gx).dot(dx)
    var n1 = cut1(dx - 1) * grad1(gx + 1).dot(dx - 1)

    return 0.5 * (n0 + n1)
  };

  return Simplex1;
}(Noise));
// noise, noise1 noise2 noise3, 
// then perlins, simplexes, etc
// this will be done when you want to split files
// typed array look up table?

var g2 = [
  new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
  new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
]
function grad2 (x, y) {
  var hash = p[x + p[y]] % g2.length
  return g2[hash]
}
function Vec2 (x, y) {
  this.x = x
  this.y = y
}
Vec2.prototype.dot = function (x, y) {
  return this.x * x + this.y * y
}
var S2_TO_C = 0.5 * (Math.sqrt(3) - 1)
var C_TO_S2 = (3 - Math.sqrt(3)) / 6
var Perlin2 = (function (Noise) {
  function Perlin2 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin2.__proto__ = Noise;
  Perlin2.prototype = Object.create( Noise && Noise.prototype );
  Perlin2.prototype.constructor = Perlin2;
  Perlin2.prototype.gen = function gen (x, y) {
    var gx = Math.trunc(x) % 256
    var gy = Math.trunc(y) % 256

    var dx = x - gx
    var dy = y - gy

    var n00 = grad2(gx, gy).dot(dx, dy)
    var n10 = grad2(gx + 1, gy).dot(dx - 1, dy)
    var n01 = grad2(gx, gy + 1).dot(dx, dy - 1)
    var n11 = grad2(gx + 1, gy + 1).dot(dx - 1, dy - 1)

    return lerp(
      lerp(n00, n10, fade(dx)),
      lerp(n01, n11, fade(dx)),
      fade(dy)
    )
  };

  return Perlin2;
}(Noise));
var Simplex2 = (function (Noise) {
  function Simplex2 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Simplex2.__proto__ = Noise;
  Simplex2.prototype = Object.create( Noise && Noise.prototype );
  Simplex2.prototype.constructor = Simplex2;
  Simplex2.prototype.gen = function gen (x, y) {
    var skew = (x + y) * S2_TO_C
    var i = Math.trunc(x + skew)
    var j = Math.trunc(y + skew)

    var unskew = (i + j) * C_TO_S2
    var gx = i - unskew
    var gy = j - unskew

    var dx0 = x - gx
    var dy0 = y - gy

    var di = dx0 > dy0 ? 1 : 0
    var dj = dx0 > dy0 ? 0 : 1

    // why isn't it + di - C_TO_S2?
    var dx1 = dx0 - di + C_TO_S2
    var dy1 = dy0 - dj + C_TO_S2
    var dx2 = dx0 - 1 + 2 * C_TO_S2
    var dy2 = dy0 - 1 + 2 * C_TO_S2

    var n0 = cut(dx0, dy0) * grad2(i, j).dot(dx0, dy0)
    var n1 = cut(dx1, dy1) * grad2(i + di, j + dj).dot(dx1, dy1)
    var n2 = cut(dx2, dy2) * grad2(i + 1, j + 1).dot(dx2, dy2)

    return 70 * (n0 + n1 + n2)
  };

  return Simplex2;
}(Noise));


var g3 = [
  new Vec3(1, 1, 1), new Vec3(-1, 1, 1), new Vec3(1, -1, 1), new Vec3(-1, -1, 1),
  new Vec3(1, 1, 0), new Vec3(-1, 1, 0), new Vec3(1, -1, 0), new Vec3(-1, -1, 0),
  new Vec3(1, 1, -1), new Vec3(-1, 1, -1), new Vec3(1, -1, -1), new Vec3(-1, -1, -1)
]
function grad3 (x, y, z) {
  var hash = p[x + p[y + p[z]]] % g3.length
  return g3[hash]
}
function Vec3 (x, y, z) {
  this.x = x
  this.y = y
  this.z = z
}
Vec3.prototype.dot = function (x, y, z) {
  return this.x * x + this.y * y + this.z * z
}
var Perlin3 = (function (Noise) {
  function Perlin3 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin3.__proto__ = Noise;
  Perlin3.prototype = Object.create( Noise && Noise.prototype );
  Perlin3.prototype.constructor = Perlin3;
  Perlin3.prototype.gen = function gen (x, y, z) {
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

    return lerp(
      lerp(
        lerp(n000, n100, dx),
        lerp(n010, n110, dx),
        fade(dy)
      ),
      lerp(
        lerp(n001, n101, dx),
        lerp(n011, n111, dx),
        fade(dy)
      ),
      fade(dz)
    )
  };

  return Perlin3;
}(Noise));


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
function grad4 (x, y, z, t) {
  var hash = p[x + p[y + p[z + p[t]]]] % g4.length
  return g4[hash]
}
function Vec4 (x, y, z, t) {
  this.x = x
  this.y = y
  this.z = z
  this.t = t
}
Vec4.prototype.dot = function (x, y, z, t) {
  return this.x * x + this.y * y + this.z * z + this.t * t
}
var Perlin4 = (function (Noise) {
  function Perlin4 (s) {
    Noise.call(this, s)
  }

  if ( Noise ) Perlin4.__proto__ = Noise;
  Perlin4.prototype = Object.create( Noise && Noise.prototype );
  Perlin4.prototype.constructor = Perlin4;
  Perlin4.prototype.gen = function gen (x, y, z, t) {
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

  return lerp(
    lerp(
      lerp(
        lerp(n0000, n1000, dx),
        lerp(n0100, n1100, dx),
        fade(dy)
      ),
      lerp(
        lerp(n0010, n1010, dx),
        lerp(n0110, n1110, dx),
        fade(dy)
      ),
      fade(dz)
    ),
    lerp(
      lerp(
        lerp(n0001, n1001, dx),
        lerp(n0101, n1101, dx),
        fade(dy)
      ),
      lerp(
        lerp(n0011, n1011, dx),
        lerp(n0111, n1111, dx),
        fade(dy)
      ),
      fade(dz)
    ),
    fade(dt)
  )
  };

  return Perlin4;
}(Noise));


var gN = []
// generates a gradient look up table, where each gradient has one positive
// or negative unit vector in one dimension. For example, calling perlin with 2 dims:
// [1, 0], [-1, 0], [0, 1], [0, -1]
function generateGN (dim) {
  for (var i = 0; i < dim * 2; i++) {
    var vec = new Array(dim).fill(0)
    vec[i % dim] = i / dim >= 1 ? 1 : -1
    gN[i] = new VecN(vec)
  }
}
function lerpN (ns, ds) {
  if (ds.length === 1) { return lerp(ns[0], ns[1], fade(ds[0])) }
  var ns1 = ns.slice(0, Math.floor(ns.length / 2))
  var ns2 = ns.slice(Math.ceil(ns.length / 2))
  return lerp(
    lerpN(ns1, ds.slice(0, ds.length - 1)),
    lerpN(ns2, ds.slice(0, ds.length - 1)),
    fade(ds[ds.length - 1])
  )
}
function hashN (gs) {
  if (gs.length === 1) { return p[gs[0]] }
  return p[gs[0] + hashN(gs.slice(1))]
}
function getNs (dim, gs, ds) {
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
    ns[i] = gN[hashN(gsPerm) % gN.length].dot(dsPerm)
  }
  return ns
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

    var gs = []
    var ds = []

    if (gN.length === 0) {
      generateGN(args.length)
    }

    var i
    for (i = 0; i < args.length; i++) {
      gs[i] = Math.trunc(args[i]) % 256
      ds[i] = args[i] - gs[i]
    }
    var ns = getNs(args.length, gs, ds)
    var res = lerpN(ns, ds)
    return res
  };

  return PerlinN;
}(Noise));


/* harmony default export */ __webpack_exports__["default"] = ({
  Simplex1: Simplex1,
  Simplex2: Simplex2,
  Perlin1: Perlin1,
  Perlin2: Perlin2,
  Perlin3: Perlin3,
  Perlin4: Perlin4,
  PerlinN: PerlinN
});


function fixedLogger (target, method, count, debug) {
  var logger = {
    count: 0,
    log: function () {
      if (this.count < count && debug) {
        this.count++
        target[method].apply(this, ([].slice.call(arguments)))
      }
    }
  }
  return logger
}


/***/ }),
/* 1 */
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

var stringify = __webpack_require__(2);

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
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_terrapaint__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_terrapaint___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_terrapaint__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_index__ = __webpack_require__(0);



var seed = Math.random()
var simplex = new __WEBPACK_IMPORTED_MODULE_1__src_index__["Simplex2"](seed)

var n = simplex.gen
var f = simplex.octavate.bind(simplex)
var sin = Math.sin
var cos = Math.cos
var pow = Math.pow
var pi = Math.PI
var abs = Math.abs
var e = Math.E

$('#gen-noise').addEventListener('click', function () {
  var evalStr = $('#eval-str').value
  var transformedNoise = simplex.transform(function(x, y) {
    return eval(evalStr)
  })
  var map = __WEBPACK_IMPORTED_MODULE_0_terrapaint___default.a.map(transformedNoise, {
    offset: true,
    period: 1
  })
  map.draw('#noise-canvas')
})

function $ (selector) {
  return document.querySelector(selector)
}


/***/ }),
/* 4 */
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
      val += (this.noise.apply(null, args) + this.offset) * amp
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

  var module = {
    map: function (noise, options) {
      return new Map(noise, options)
    },
    curve: function () {
      return new Curve()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmQyODBhMWNkMDU4ODM4NmQxMmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb25zdCIsInRoaXMiLCJzdXBlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLENBQWEsQ0FBQztBQUNqQyxJQUFJLEdBQUc7QUFDUCxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztDQUMzQjtBQUNELFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRTtFQUNoQixP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QUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7O0lBRTFELE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7R0FDM0IsQ0FDRjs7O0VBL0I2QixLQStCN0I7OztBQUdELElBQUksRUFBRSxHQUFHO0VBQ1AsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM5RSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNuRjtBQUNELFNBQVMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNO0VBQ3pDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztDQUNoQjtBQUNELFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUNYO0FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN0QyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUM1QztBQUNNLElBQU0sT0FBTyxHQUFjO0VBQ2hDLGdCQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDZEEsS0FBSyxNQUFDLE9BQUMsQ0FBQztHQUNUOzs7OzBDQUFBO0VBQ0QscUJBQUksaUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRzs7SUFFNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFOztJQUVmLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM1QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7O0lBRXBFLE9BQU8sSUFBSTtNQUNULElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUksQ0FBQyxFQUFFLENBQUM7S0FDVDtHQUNGLENBQ0Y7OztFQXBDNEIsS0FvQzVCOzs7QUFHRCxJQUFJLEVBQUUsR0FBRztFQUNQLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDOUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM5RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMxRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDL0Y7QUFDRCxTQUFTLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDMUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNO0VBQ2hELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztDQUNoQjtBQUNELFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN6QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDWDtBQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3pDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ3pEO0FBQ00sSUFBTSxPQUFPLEdBQWM7RUFDaEMsZ0JBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNkQSxLQUFLLE1BQUMsT0FBQyxDQUFDO0dBQ1Q7Ozs7MENBQUE7RUFDRCxxQkFBSSxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDakIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO0VBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztFQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7RUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHOztFQUU1QixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtFQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0VBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7RUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTs7RUFFZixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNyRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUN6RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNqRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNqRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3JFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNyRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDckUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0UsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0UsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7RUFFckYsT0FBTyxJQUFJO0lBQ1QsSUFBSTtNQUNGLElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUksQ0FBQyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUk7TUFDRixJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDO09BQ1Q7TUFDRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDO09BQ1Q7TUFDRCxJQUFJLENBQUMsRUFBRSxD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QUFDckMscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQSxzREFBc0Q7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0IscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmQyODBhMWNkMDU4ODM4NmQxMmMiLCIvLyBUdW11bHQsIEphdmFTY3JpcHQgbm9pc2UgZ2VuZXJhdG9yXHJcbi8vIENyZWF0ZWQgYnkgUGhpbGlwIFNjb3R0IHwgU2NvdHR5RmlsbHVwcywgMjAxN1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vU2NvdHR5RmlsbHVwc1xyXG5cclxuLy8gTm9pc2UgYWxnb3JpdGhtcyBieSBLZW4gUGVybGluXHJcbi8vIFVzZXMgXCJyYW5kb20tc2VlZFwiIHBhY2thZ2Ugb24gTlBNIGZvciBzZWVkaW5nIGZ1bmN0aW9uXHJcblxyXG5cclxudmFyIHJhbmQgPSByZXF1aXJlKCdyYW5kb20tc2VlZCcpXHJcbnZhciBybmdcclxuZnVuY3Rpb24gbGVycCAoYSwgYiwgdCkge1xyXG4gIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0XHJcbn1cclxuZnVuY3Rpb24gZmFkZSAodCkge1xyXG4gIHJldHVybiB0ICogdCAqIHQgKiAoMTAgKyB0ICogKC0xNSArIHQgKiA2KSlcclxufVxyXG5mdW5jdGlvbiBmYWxsb2ZmICguLi5hcmdzKSB7XHJcbiAgdmFyIGRpbXMgPSBhcmdzLnNsaWNlKDEpXHJcbiAgY29uc3QgdCA9IGFyZ3NbMF0gLSBkaW1zLnJlZHVjZSgoc3VtLCB2YWwpID0+IHtcclxuICAgIHJldHVybiBzdW0gKyB2YWwgKiB2YWxcclxuICB9LCAwKVxyXG4gIHJldHVybiB0ICogdCAqIHQgKiB0IFxyXG59XHJcbnZhciBjdXQxID0gZmFsbG9mZi5iaW5kKG51bGwsIDEpXHJcbnZhciBjdXQgPSBmYWxsb2ZmLmJpbmQobnVsbCwgMC41KVxyXG52YXIgcCA9IG5ldyBVaW50OEFycmF5KDUxMilcclxuXHJcbmNsYXNzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgdGhpcy5zZWVkKHMpXHJcbiAgfVxyXG4gIGdlbiAoKSB7fVxyXG4gIHNlZWQgKHMpIHtcclxuICAgIHMgPSBzIHx8IE1hdGgucmFuZG9tKClcclxuICAgIHJuZyA9IHJhbmQuY3JlYXRlKHMpXHJcbiAgICB2YXIgaVxyXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSBwW2ldID0gaVxyXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XHJcbiAgICAgIHZhciByID0gcm5nKDI1NilcclxuICAgICAgdmFyIHRlbXAgPSBwW2ldXHJcbiAgICAgIHBbaV0gPSBwW3JdXHJcbiAgICAgIHBbcl0gPSB0ZW1wXHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyBpKyspIHBbaSArIDI1Nl0gPSBwW2ldXHJcbiAgfVxyXG4gIHRyYW5zZm9ybSAoZm4pIHtcclxuICAgIHJldHVybiAoLi4uZGltcykgPT4ge1xyXG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgZGltcylcclxuICAgIH1cclxuICB9XHJcbiAgb2N0YXZhdGUgKC4uLmFyZ3MpIHtcclxuICAgIHZhciBvY3RhdmVzID0gYXJnc1swXVxyXG4gICAgdmFyIGRpbXMgPSBhcmdzLnNsaWNlKDEpXHJcbiAgICB2YXIgdmFsID0gMFxyXG4gICAgdmFyIG1heCA9IDBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2N0YXZlczsgaSsrKSB7XHJcbiAgICAgIHZhciB3ID0gMSA8PCBpXHJcbiAgICAgIHZhbCArPSB0aGlzLmdlbi5hcHBseSh0aGlzLCBkaW1zLm1hcCh4ID0+IHggKiB3KSkgLyB3XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9jdGF2ZXM7IGkrKykge1xyXG4gICAgICBtYXggKz0gMSAvICgxIDw8IGkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsIC8gbWF4XHJcbiAgfVxyXG59XHJcblxyXG5cclxudmFyIGcxID0gWyBuZXcgVmVjMSgxKSwgbmV3IFZlYzEoLTEpIF1cclxuZnVuY3Rpb24gZ3JhZDEgKHgpIHtcclxuICB2YXIgaGFzaCA9IHBbeF0gJSBnMS5sZW5ndGhcclxuICByZXR1cm4gZzFbaGFzaF1cclxufVxyXG5mdW5jdGlvbiBWZWMxICh4KSB7XHJcbiAgdGhpcy54ID0geFxyXG59XHJcblZlYzEucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgcmV0dXJuIHRoaXMueCAqIHhcclxufVxyXG5leHBvcnQgY2xhc3MgUGVybGluMSBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4KSB7XHJcbiAgICB2YXIgZ3ggPSBNYXRoLmZsb29yKHgpICUgMjU2XHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuXHJcbiAgICB2YXIgbjAgPSBncmFkMShneCkuZG90KGR4KVxyXG4gICAgdmFyIG4xID0gZ3JhZDEoZ3ggKyAxKS5kb3QoZHggLSAxKVxyXG5cclxuICAgIHJldHVybiBsZXJwKG4wLCBuMSwgZmFkZShkeCkpXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTaW1wbGV4MSBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4KSB7XHJcbiAgICB2YXIgZ3ggPSBNYXRoLmZsb29yKHgpICUgMjU2XHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuXHJcbiAgICB2YXIgbjAgPSBjdXQxKGR4KSAqIGdyYWQxKGd4KS5kb3QoZHgpXHJcbiAgICB2YXIgbjEgPSBjdXQxKGR4IC0gMSkgKiBncmFkMShneCArIDEpLmRvdChkeCAtIDEpXHJcblxyXG4gICAgcmV0dXJuIDAuNSAqIChuMCArIG4xKVxyXG4gIH1cclxufVxyXG4vLyBub2lzZSwgbm9pc2UxIG5vaXNlMiBub2lzZTMsIFxyXG4vLyB0aGVuIHBlcmxpbnMsIHNpbXBsZXhlcywgZXRjXHJcbi8vIHRoaXMgd2lsbCBiZSBkb25lIHdoZW4geW91IHdhbnQgdG8gc3BsaXQgZmlsZXNcclxuLy8gdHlwZWQgYXJyYXkgbG9vayB1cCB0YWJsZT9cclxuXHJcbnZhciBnMiA9IFtcclxuICBuZXcgVmVjMigxLCAwKSwgbmV3IFZlYzIoMSwgMSksIG5ldyBWZWMyKDAsIDEpLCBuZXcgVmVjMigtMSwgMSksXHJcbiAgbmV3IFZlYzIoLTEsIDApLCBuZXcgVmVjMigtMSwgLTEpLCBuZXcgVmVjMigwLCAtMSksIG5ldyBWZWMyKDEsIC0xKVxyXG5dXHJcbmZ1bmN0aW9uIGdyYWQyICh4LCB5KSB7XHJcbiAgdmFyIGhhc2ggPSBwW3ggKyBwW3ldXSAlIGcyLmxlbmd0aFxyXG4gIHJldHVybiBnMltoYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzIgKHgsIHkpIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG59XHJcblZlYzIucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5XHJcbn1cclxudmFyIFMyX1RPX0MgPSAwLjUgKiAoTWF0aC5zcXJ0KDMpIC0gMSlcclxudmFyIENfVE9fUzIgPSAoMyAtIE1hdGguc3FydCgzKSkgLyA2XHJcbmV4cG9ydCBjbGFzcyBQZXJsaW4yIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgsIHkpIHtcclxuICAgIHZhciBneCA9IE1hdGgudHJ1bmMoeCkgJSAyNTZcclxuICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcclxuXHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuICAgIHZhciBkeSA9IHkgLSBneVxyXG5cclxuICAgIHZhciBuMDAgPSBncmFkMihneCwgZ3kpLmRvdChkeCwgZHkpXHJcbiAgICB2YXIgbjEwID0gZ3JhZDIoZ3ggKyAxLCBneSkuZG90KGR4IC0gMSwgZHkpXHJcbiAgICB2YXIgbjAxID0gZ3JhZDIoZ3gsIGd5ICsgMSkuZG90KGR4LCBkeSAtIDEpXHJcbiAgICB2YXIgbjExID0gZ3JhZDIoZ3ggKyAxLCBneSArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSlcclxuXHJcbiAgICByZXR1cm4gbGVycChcclxuICAgICAgbGVycChuMDAsIG4xMCwgZmFkZShkeCkpLFxyXG4gICAgICBsZXJwKG4wMSwgbjExLCBmYWRlKGR4KSksXHJcbiAgICAgIGZhZGUoZHkpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTaW1wbGV4MiBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4LCB5KSB7XHJcbiAgICB2YXIgc2tldyA9ICh4ICsgeSkgKiBTMl9UT19DXHJcbiAgICB2YXIgaSA9IE1hdGgudHJ1bmMoeCArIHNrZXcpXHJcbiAgICB2YXIgaiA9IE1hdGgudHJ1bmMoeSArIHNrZXcpXHJcblxyXG4gICAgdmFyIHVuc2tldyA9IChpICsgaikgKiBDX1RPX1MyXHJcbiAgICB2YXIgZ3ggPSBpIC0gdW5za2V3XHJcbiAgICB2YXIgZ3kgPSBqIC0gdW5za2V3XHJcblxyXG4gICAgdmFyIGR4MCA9IHggLSBneFxyXG4gICAgdmFyIGR5MCA9IHkgLSBneVxyXG5cclxuICAgIHZhciBkaSA9IGR4MCA+IGR5MCA/IDEgOiAwXHJcbiAgICB2YXIgZGogPSBkeDAgPiBkeTAgPyAwIDogMVxyXG5cclxuICAgIC8vIHdoeSBpc24ndCBpdCArIGRpIC0gQ19UT19TMj9cclxuICAgIHZhciBkeDEgPSBkeDAgLSBkaSArIENfVE9fUzJcclxuICAgIHZhciBkeTEgPSBkeTAgLSBkaiArIENfVE9fUzJcclxuICAgIHZhciBkeDIgPSBkeDAgLSAxICsgMiAqIENfVE9fUzJcclxuICAgIHZhciBkeTIgPSBkeTAgLSAxICsgMiAqIENfVE9fUzJcclxuXHJcbiAgICB2YXIgbjAgPSBjdXQoZHgwLCBkeTApICogZ3JhZDIoaSwgaikuZG90KGR4MCwgZHkwKVxyXG4gICAgdmFyIG4xID0gY3V0KGR4MSwgZHkxKSAqIGdyYWQyKGkgKyBkaSwgaiArIGRqKS5kb3QoZHgxLCBkeTEpXHJcbiAgICB2YXIgbjIgPSBjdXQoZHgyLCBkeTIpICogZ3JhZDIoaSArIDEsIGogKyAxKS5kb3QoZHgyLCBkeTIpXHJcblxyXG4gICAgcmV0dXJuIDcwICogKG4wICsgbjEgKyBuMilcclxuICB9XHJcbn1cclxuXHJcblxyXG52YXIgZzMgPSBbXHJcbiAgbmV3IFZlYzMoMSwgMSwgMSksIG5ldyBWZWMzKC0xLCAxLCAxKSwgbmV3IFZlYzMoMSwgLTEsIDEpLCBuZXcgVmVjMygtMSwgLTEsIDEpLFxyXG4gIG5ldyBWZWMzKDEsIDEsIDApLCBuZXcgVmVjMygtMSwgMSwgMCksIG5ldyBWZWMzKDEsIC0xLCAwKSwgbmV3IFZlYzMoLTEsIC0xLCAwKSxcclxuICBuZXcgVmVjMygxLCAxLCAtMSksIG5ldyBWZWMzKC0xLCAxLCAtMSksIG5ldyBWZWMzKDEsIC0xLCAtMSksIG5ldyBWZWMzKC0xLCAtMSwgLTEpXHJcbl1cclxuZnVuY3Rpb24gZ3JhZDMgKHgsIHksIHopIHtcclxuICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbel1dXSAlIGczLmxlbmd0aFxyXG4gIHJldHVybiBnM1toYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzMgKHgsIHksIHopIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG4gIHRoaXMueiA9IHpcclxufVxyXG5WZWMzLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSwgeikge1xyXG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeSArIHRoaXMueiAqIHpcclxufVxyXG5leHBvcnQgY2xhc3MgUGVybGluMyBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4LCB5LCB6KSB7XHJcbiAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XHJcbiAgICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XHJcblxyXG4gICAgdmFyIGR4ID0geCAtIGd4XHJcbiAgICB2YXIgZHkgPSB5IC0gZ3lcclxuICAgIHZhciBkeiA9IHogLSBnelxyXG5cclxuICAgIHZhciBuMDAwID0gZ3JhZDMoZ3gsIGd5LCBneikuZG90KGR4LCBkeSwgZHopXHJcbiAgICB2YXIgbjEwMCA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6KS5kb3QoZHggLSAxLCBkeSwgZHopXHJcbiAgICB2YXIgbjAxMCA9IGdyYWQzKGd4LCBneSArIDEsIGd6KS5kb3QoZHgsIGR5IC0gMSwgZHopXHJcbiAgICB2YXIgbjExMCA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneikuZG90KGR4IC0gMSwgZHkgLSAxLCBkeilcclxuICAgIHZhciBuMDAxID0gZ3JhZDMoZ3gsIGd5LCBneiArIDEpLmRvdChkeCwgZHksIGR6IC0gMSlcclxuICAgIHZhciBuMTAxID0gZ3JhZDMoZ3ggKyAxLCBneSwgZ3ogKyAxKS5kb3QoZHggLSAxLCBkeSwgZHogLSAxKVxyXG4gICAgdmFyIG4wMTEgPSBncmFkMyhneCwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCwgZHkgLSAxLCBkeiAtIDEpXHJcbiAgICB2YXIgbjExMSA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxKVxyXG5cclxuICAgIHJldHVybiBsZXJwKFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMCwgbjEwMCwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMCwgbjExMCwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAxLCBuMTAxLCBkeCksXHJcbiAgICAgICAgbGVycChuMDExLCBuMTExLCBkeCksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKSxcclxuICAgICAgZmFkZShkeilcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcblxyXG52YXIgZzQgPSBbXHJcbiAgbmV3IFZlYzQoMCwgMSwgMSwgMSksIG5ldyBWZWM0KDAsIDEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgMSwgLTEsIDEpLCBuZXcgVmVjNCgwLCAxLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KDAsIC0xLCAxLCAxKSwgbmV3IFZlYzQoMCwgLTEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMCwgMSwgMSksIG5ldyBWZWM0KDEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoMSwgMCwgLTEsIDEpLCBuZXcgVmVjNCgxLCAwLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KC0xLCAwLCAxLCAxKSwgbmV3IFZlYzQoLTEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAxKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMSwgMCwgMSksIG5ldyBWZWM0KDEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoMSwgLTEsIDAsIDEpLCBuZXcgVmVjNCgxLCAtMSwgMCwgLTEpLFxyXG4gIG5ldyBWZWM0KC0xLCAxLCAwLCAxKSwgbmV3IFZlYzQoLTEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAxKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMSwgMSwgMCksIG5ldyBWZWM0KDEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoMSwgLTEsIDEsIDApLCBuZXcgVmVjNCgxLCAtMSwgLTEsIDApLFxyXG4gIG5ldyBWZWM0KC0xLCAxLCAxLCAwKSwgbmV3IFZlYzQoLTEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAtMSwgMClcclxuXVxyXG5mdW5jdGlvbiBncmFkNCAoeCwgeSwgeiwgdCkge1xyXG4gIHZhciBoYXNoID0gcFt4ICsgcFt5ICsgcFt6ICsgcFt0XV1dXSAlIGc0Lmxlbmd0aFxyXG4gIHJldHVybiBnNFtoYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzQgKHgsIHksIHosIHQpIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG4gIHRoaXMueiA9IHpcclxuICB0aGlzLnQgPSB0XHJcbn1cclxuVmVjNC5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHksIHosIHQpIHtcclxuICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHkgKyB0aGlzLnogKiB6ICsgdGhpcy50ICogdFxyXG59XHJcbmV4cG9ydCBjbGFzcyBQZXJsaW40IGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgsIHksIHosIHQpIHtcclxuICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgdmFyIGd5ID0gTWF0aC50cnVuYyh5KSAlIDI1NlxyXG4gIHZhciBneiA9IE1hdGgudHJ1bmMoeikgJSAyNTZcclxuICB2YXIgZ3QgPSBNYXRoLnRydW5jKHQpICUgMjU2XHJcblxyXG4gIHZhciBkeCA9IHggLSBneFxyXG4gIHZhciBkeSA9IHkgLSBneVxyXG4gIHZhciBkeiA9IHogLSBnelxyXG4gIHZhciBkdCA9IHQgLSBndFxyXG5cclxuICB2YXIgbjAwMDAgPSBncmFkNChneCwgZ3ksIGd6LCBndCkuZG90KGR4LCBkeSwgZHosIGR0KVxyXG4gIHZhciBuMTAwMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6LCBndCkuZG90KGR4IC0gMSwgZHksIGR6KVxyXG4gIHZhciBuMDEwMCA9IGdyYWQ0KGd4LCBneSArIDEsIGd6LCBndCkuZG90KGR4LCBkeSAtIDEsIGR6KVxyXG4gIHZhciBuMTEwMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHopXHJcbiAgdmFyIG4wMDEwID0gZ3JhZDQoZ3gsIGd5LCBneiArIDEsIGd0KS5kb3QoZHgsIGR5LCBkeiAtIDEpXHJcbiAgdmFyIG4xMDEwID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3ogKyAxLCBndCkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSlcclxuICB2YXIgbjAxMTAgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxKVxyXG4gIHZhciBuMTExMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSlcclxuICB2YXIgbjAwMDEgPSBncmFkNChneCwgZ3ksIGd6LCBndCArIDEpLmRvdChkeCwgZHksIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4xMDAxID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3osIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4wMTAxID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3osIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4xMTAxID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6LCBndCArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHosIGR0IC0gMSlcclxuICB2YXIgbjAwMTEgPSBncmFkNChneCwgZ3ksIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiAtIDEsIGR0IC0gMSlcclxuICB2YXIgbjEwMTEgPSBncmFkNChneCArIDEsIGd5LCBneiArIDEsIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSwgZHQgLSAxKVxyXG4gIHZhciBuMDExMSA9IGdyYWQ0KGd4LCBneSArIDEsIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxLCBkdCAtIDEpXHJcbiAgdmFyIG4xMTExID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxyXG5cclxuICByZXR1cm4gbGVycChcclxuICAgIGxlcnAoXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAwMCwgbjEwMDAsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTAwLCBuMTEwMCwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAxMCwgbjEwMTAsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTEwLCBuMTExMCwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGZhZGUoZHopXHJcbiAgICApLFxyXG4gICAgbGVycChcclxuICAgICAgbGVycChcclxuICAgICAgICBsZXJwKG4wMDAxLCBuMTAwMSwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMDEsIG4xMTAxLCBkeCksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKSxcclxuICAgICAgbGVycChcclxuICAgICAgICBsZXJwKG4wMDExLCBuMTAxMSwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMTEsIG4xMTExLCBkeCksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKSxcclxuICAgICAgZmFkZShkeilcclxuICAgICksXHJcbiAgICBmYWRlKGR0KVxyXG4gIClcclxuICB9XHJcbn1cclxuXHJcblxyXG52YXIgZ04gPSBbXVxyXG4vLyBnZW5lcmF0ZXMgYSBncmFkaWVudCBsb29rIHVwIHRhYmxlLCB3aGVyZSBlYWNoIGdyYWRpZW50IGhhcyBvbmUgcG9zaXRpdmVcclxuLy8gb3IgbmVnYXRpdmUgdW5pdCB2ZWN0b3IgaW4gb25lIGRpbWVuc2lvbi4gRm9yIGV4YW1wbGUsIGNhbGxpbmcgcGVybGluIHdpdGggMiBkaW1zOlxyXG4vLyBbMSwgMF0sIFstMSwgMF0sIFswLCAxXSwgWzAsIC0xXVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUdOIChkaW0pIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbSAqIDI7IGkrKykge1xyXG4gICAgdmFyIHZlYyA9IG5ldyBBcnJheShkaW0pLmZpbGwoMClcclxuICAgIHZlY1tpICUgZGltXSA9IGkgLyBkaW0gPj0gMSA/IDEgOiAtMVxyXG4gICAgZ05baV0gPSBuZXcgVmVjTih2ZWMpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGxlcnBOIChucywgZHMpIHtcclxuICBpZiAoZHMubGVuZ3RoID09PSAxKSByZXR1cm4gbGVycChuc1swXSwgbnNbMV0sIGZhZGUoZHNbMF0pKVxyXG4gIHZhciBuczEgPSBucy5zbGljZSgwLCBNYXRoLmZsb29yKG5zLmxlbmd0aCAvIDIpKVxyXG4gIHZhciBuczIgPSBucy5zbGljZShNYXRoLmNlaWwobnMubGVuZ3RoIC8gMikpXHJcbiAgcmV0dXJuIGxlcnAoXHJcbiAgICBsZXJwTihuczEsIGRzLnNsaWNlKDAsIGRzLmxlbmd0aCAtIDEpKSxcclxuICAgIGxlcnBOKG5zMiwgZHMuc2xpY2UoMCwgZHMubGVuZ3RoIC0gMSkpLFxyXG4gICAgZmFkZShkc1tkcy5sZW5ndGggLSAxXSlcclxuICApXHJcbn1cclxuZnVuY3Rpb24gaGFzaE4gKGdzKSB7XHJcbiAgaWYgKGdzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBbZ3NbMF1dXHJcbiAgcmV0dXJuIHBbZ3NbMF0gKyBoYXNoTihncy5zbGljZSgxKSldXHJcbn1cclxuZnVuY3Rpb24gZ2V0TnMgKGRpbSwgZ3MsIGRzKSB7XHJcbiAgdmFyIG5zID0gW11cclxuICBmb3IgKHZhciBpID0gMDsgaSA8ICgyIDw8IChkaW0gLSAxKSk7IGkrKykge1xyXG4gICAgdmFyIGdzUGVybSA9IGdzLnNsaWNlKClcclxuICAgIHZhciBkc1Blcm0gPSBkcy5zbGljZSgpXHJcbiAgICB2YXIgdGVtcCA9IGlcclxuXHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRpbTsgaisrKSB7XHJcbiAgICAgIGlmICh0ZW1wICYgMSkge1xyXG4gICAgICAgIGdzUGVybVtqXSArPSAxXHJcbiAgICAgICAgZHNQZXJtW2pdIC09IDFcclxuICAgICAgfVxyXG4gICAgICB0ZW1wID0gdGVtcCA+PiAxXHJcbiAgICB9XHJcbiAgICBuc1tpXSA9IGdOW2hhc2hOKGdzUGVybSkgJSBnTi5sZW5ndGhdLmRvdChkc1Blcm0pXHJcbiAgfVxyXG4gIHJldHVybiBuc1xyXG59XHJcbmZ1bmN0aW9uIFZlY04oUikge1xyXG4gIHRoaXMuUiA9IFJcclxufVxyXG5WZWNOLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoUikge1xyXG4gIHZhciB2YWwgPSAwXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBSLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YWwgKz0gdGhpcy5SW2ldICogUltpXVxyXG4gIH1cclxuICByZXR1cm4gdmFsXHJcbn1cclxuZXhwb3J0IGNsYXNzIFBlcmxpbk4gZXh0ZW5kcyBOb2lzZSB7XHJcbiAgY29uc3RydWN0b3IgKHMpIHtcclxuICAgIHN1cGVyKHMpXHJcbiAgfVxyXG4gIGdlbiAoLi4uYXJncykge1xyXG4gICAgdmFyIGdzID0gW11cclxuICAgIHZhciBkcyA9IFtdXHJcblxyXG4gICAgaWYgKGdOLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBnZW5lcmF0ZUdOKGFyZ3MubGVuZ3RoKVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBnc1tpXSA9IE1hdGgudHJ1bmMoYXJnc1tpXSkgJSAyNTZcclxuICAgICAgZHNbaV0gPSBhcmdzW2ldIC0gZ3NbaV1cclxuICAgIH1cclxuICAgIHZhciBucyA9IGdldE5zKGFyZ3MubGVuZ3RoLCBncywgZHMpXHJcbiAgICB2YXIgcmVzID0gbGVycE4obnMsIGRzKVxyXG4gICAgcmV0dXJuIHJlc1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBTaW1wbGV4MTogU2ltcGxleDEsXHJcbiAgU2ltcGxleDI6IFNpbXBsZXgyLFxyXG4gIFBlcmxpbjE6IFBlcmxpbjEsXHJcbiAgUGVybGluMjogUGVybGluMixcclxuICBQZXJsaW4zOiBQZXJsaW4zLFxyXG4gIFBlcmxpbjQ6IFBlcmxpbjQsXHJcbiAgUGVybGluTjogUGVybGluTlxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZml4ZWRMb2dnZXIgKHRhcmdldCwgbWV0aG9kLCBjb3VudCwgZGVidWcpIHtcclxuICB2YXIgbG9nZ2VyID0ge1xyXG4gICAgY291bnQ6IDAsXHJcbiAgICBsb2c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXMuY291bnQgPCBjb3VudCAmJiBkZWJ1Zykge1xyXG4gICAgICAgIHRoaXMuY291bnQrK1xyXG4gICAgICAgIHRhcmdldFttZXRob2RdLmFwcGx5KHRoaXMsIChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBsb2dnZXJcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvKlxuICogcmFuZG9tLXNlZWRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9za3JhdGNoZG90L3JhbmRvbS1zZWVkXG4gKlxuICogVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgU3RldmUgR2lic29uIGFuZCBjYW4gYmUgZm91bmQgaGVyZTpcbiAqXG4gKiBodHRwczovL3d3dy5ncmMuY29tL290Zy91aGVwcm5nLmh0bVxuICpcbiAqIEl0IHdhcyBzbGlnaHRseSBtb2RpZmllZCBmb3IgdXNlIGluIG5vZGUsIHRvIHBhc3MganNoaW50LCBhbmQgYSBmZXcgYWRkaXRpb25hbFxuICogaGVscGVyIGZ1bmN0aW9ucyB3ZXJlIGFkZGVkLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMyBza3JhdGNoZG90XG4gKiBEdWFsIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBhbmQgdGhlIG9yaWdpbmFsIEdSQyBjb3B5cmlnaHQvbGljZW5zZVxuICogaW5jbHVkZWQgYmVsb3cuXG4gKi9cbi8qXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFx0XHRcdFx0XHRcdFx0XHRHaWJzb24gUmVzZWFyY2ggQ29ycG9yYXRpb25cblx0XHRcdFx0VUhFUFJORyAtIFVsdHJhIEhpZ2ggRW50cm9weSBQc2V1ZG8tUmFuZG9tIE51bWJlciBHZW5lcmF0b3Jcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRMSUNFTlNFIEFORCBDT1BZUklHSFQ6ICBUSElTIENPREUgSVMgSEVSRUJZIFJFTEVBU0VEIElOVE8gVEhFIFBVQkxJQyBET01BSU5cblx0R2lic29uIFJlc2VhcmNoIENvcnBvcmF0aW9uIHJlbGVhc2VzIGFuZCBkaXNjbGFpbXMgQUxMIFJJR0hUUyBBTkQgVElUTEUgSU5cblx0VEhJUyBDT0RFIE9SIEFOWSBERVJJVkFUSVZFUy4gQW55b25lIG1heSBiZSBmcmVlbHkgdXNlIGl0IGZvciBhbnkgcHVycG9zZS5cblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRUaGlzIGlzIEdSQydzIGNyeXB0b2dyYXBoaWNhbGx5IHN0cm9uZyBQUk5HIChwc2V1ZG8tcmFuZG9tIG51bWJlciBnZW5lcmF0b3IpXG5cdGZvciBKYXZhU2NyaXB0LiBJdCBpcyBkcml2ZW4gYnkgMTUzNiBiaXRzIG9mIGVudHJvcHksIHN0b3JlZCBpbiBhbiBhcnJheSBvZlxuXHQ0OCwgMzItYml0IEphdmFTY3JpcHQgdmFyaWFibGVzLiAgU2luY2UgbWFueSBhcHBsaWNhdGlvbnMgb2YgdGhpcyBnZW5lcmF0b3IsXG5cdGluY2x1ZGluZyBvdXJzIHdpdGggdGhlIFwiT2ZmIFRoZSBHcmlkXCIgTGF0aW4gU3F1YXJlIGdlbmVyYXRvciwgbWF5IHJlcXVpcmVcblx0dGhlIGRldGVyaW1pbmlzdGljIHJlLWdlbmVyYXRpb24gb2YgYSBzZXF1ZW5jZSBvZiBQUk5zLCB0aGlzIFBSTkcncyBpbml0aWFsXG5cdGVudHJvcGljIHN0YXRlIGNhbiBiZSByZWFkIGFuZCB3cml0dGVuIGFzIGEgc3RhdGljIHdob2xlLCBhbmQgaW5jcmVtZW50YWxseVxuXHRldm9sdmVkIGJ5IHBvdXJpbmcgbmV3IHNvdXJjZSBlbnRyb3B5IGludG8gdGhlIGdlbmVyYXRvcidzIGludGVybmFsIHN0YXRlLlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdEVORExFU1MgVEhBTktTIGFyZSBkdWUgSm9oYW5uZXMgQmFhZ29lIGZvciBoaXMgY2FyZWZ1bCBkZXZlbG9wbWVudCBvZiBoaWdobHlcblx0cm9idXN0IEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb25zIG9mIEpTIFBSTkdzLiAgVGhpcyB3b3JrIHdhcyBiYXNlZCB1cG9uIGhpc1xuXHRKYXZhU2NyaXB0IFwiQWxlYVwiIFBSTkcgd2hpY2ggaXMgYmFzZWQgdXBvbiB0aGUgZXh0cmVtZWx5IHJvYnVzdCBNdWx0aXBseS1cblx0V2l0aC1DYXJyeSAoTVdDKSBQUk5HIGludmVudGVkIGJ5IEdlb3JnZSBNYXJzYWdsaWEuIE1XQyBBbGdvcml0aG0gUmVmZXJlbmNlczpcblx0aHR0cDovL3d3dy5HUkMuY29tL290Zy9NYXJzYWdsaWFfUFJOR3MucGRmXG5cdGh0dHA6Ly93d3cuR1JDLmNvbS9vdGcvTWFyc2FnbGlhX01XQ19HZW5lcmF0b3JzLnBkZlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFRoZSBxdWFsaXR5IG9mIHRoaXMgYWxnb3JpdGhtJ3MgcHNldWRvLXJhbmRvbSBudW1iZXJzIGhhdmUgYmVlbiB2ZXJpZmllZCBieVxuXHRtdWx0aXBsZSBpbmRlcGVuZGVudCByZXNlYXJjaGVycy4gSXQgaGFuZGlseSBwYXNzZXMgdGhlIGZlcm1pbGFiLmNoIHRlc3RzIGFzXG5cdHdlbGwgYXMgdGhlIFwiZGllaGFyZFwiIGFuZCBcImRpZWhhcmRlclwiIHRlc3Qgc3VpdGVzLiAgRm9yIGluZGl2aWR1YWxzIHdpc2hpbmdcblx0dG8gZnVydGhlciB2ZXJpZnkgdGhlIHF1YWxpdHkgb2YgdGhpcyBhbGdvcml0aG0ncyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMsIGFcblx0MjU2LW1lZ2FieXRlIGZpbGUgb2YgdGhpcyBhbGdvcml0aG0ncyBvdXRwdXQgbWF5IGJlIGRvd25sb2FkZWQgZnJvbSBHUkMuY29tLFxuXHRhbmQgYSBNaWNyb3NvZnQgV2luZG93cyBzY3JpcHRpbmcgaG9zdCAoV1NIKSB2ZXJzaW9uIG9mIHRoaXMgYWxnb3JpdGhtIG1heSBiZVxuXHRkb3dubG9hZGVkIGFuZCBydW4gZnJvbSB0aGUgV2luZG93cyBjb21tYW5kIHByb21wdCB0byBnZW5lcmF0ZSB1bmlxdWUgZmlsZXNcblx0b2YgYW55IHNpemU6XG5cdFRoZSBGZXJtaWxhYiBcIkVOVFwiIHRlc3RzOiBodHRwOi8vZm91cm1pbGFiLmNoL3JhbmRvbS9cblx0VGhlIDI1Ni1tZWdhYnl0ZSBzYW1wbGUgUFJOIGZpbGUgYXQgR1JDOiBodHRwczovL3d3dy5HUkMuY29tL290Zy91aGVwcm5nLmJpblxuXHRUaGUgV2luZG93cyBzY3JpcHRpbmcgaG9zdCB2ZXJzaW9uOiBodHRwczovL3d3dy5HUkMuY29tL290Zy93c2gtdWhlcHJuZy5qc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFF1YWxpZnlpbmcgTVdDIG11bHRpcGxpZXJzIGFyZTogMTg3ODg0LCA2ODYxMTgsIDg5ODEzNCwgMTEwNDM3NSwgMTI1MDIwNSxcblx0MTQ2MDkxMCBhbmQgMTc2ODg2My4gKFdlIHVzZSB0aGUgbGFyZ2VzdCBvbmUgdGhhdCdzIDwgMl4yMSlcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcblxuLypcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblRoaXMgaXMgYmFzZWQgdXBvbiBKb2hhbm5lcyBCYWFnb2UncyBjYXJlZnVsbHkgZGVzaWduZWQgYW5kIGVmZmljaWVudCBoYXNoXG5mdW5jdGlvbiBmb3IgdXNlIHdpdGggSmF2YVNjcmlwdC4gIEl0IGhhcyBhIHByb3ZlbiBcImF2YWxhbmNoZVwiIGVmZmVjdCBzdWNoXG50aGF0IGV2ZXJ5IGJpdCBvZiB0aGUgaW5wdXQgYWZmZWN0cyBldmVyeSBiaXQgb2YgdGhlIG91dHB1dCA1MCUgb2YgdGhlIHRpbWUsXG53aGljaCBpcyBnb29kLlx0U2VlOiBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2hhc2gvYXZhbGFuY2hlLnhodG1sXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qL1xudmFyIE1hc2ggPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBuID0gMHhlZmM4MjQ5ZDtcblx0dmFyIG1hc2ggPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuXHRcdFx0XHR2YXIgaCA9IDAuMDI1MTk2MDMyODI0MTY5MzggKiBuO1xuXHRcdFx0XHRuID0gaCA+Pj4gMDtcblx0XHRcdFx0aCAtPSBuO1xuXHRcdFx0XHRoICo9IG47XG5cdFx0XHRcdG4gPSBoID4+PiAwO1xuXHRcdFx0XHRoIC09IG47XG5cdFx0XHRcdG4gKz0gaCAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcblx0XHR9IGVsc2Uge1xuXHRcdFx0biA9IDB4ZWZjODI0OWQ7XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbWFzaDtcbn07XG5cbnZhciB1aGVwcm5nID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0cmV0dXJuIChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG8gPSA0ODsgLy8gc2V0IHRoZSAnb3JkZXInIG51bWJlciBvZiBFTlRST1BZLWhvbGRpbmcgMzItYml0IHZhbHVlc1xuXHRcdHZhciBjID0gMTsgLy8gaW5pdCB0aGUgJ2NhcnJ5JyB1c2VkIGJ5IHRoZSBtdWx0aXBseS13aXRoLWNhcnJ5IChNV0MpIGFsZ29yaXRobVxuXHRcdHZhciBwID0gbzsgLy8gaW5pdCB0aGUgJ3BoYXNlJyAobWF4LTEpIG9mIHRoZSBpbnRlcm1lZGlhdGUgdmFyaWFibGUgcG9pbnRlclxuXHRcdHZhciBzID0gbmV3IEFycmF5KG8pOyAvLyBkZWNsYXJlIG91ciBpbnRlcm1lZGlhdGUgdmFyaWFibGVzIGFycmF5XG5cdFx0dmFyIGk7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXHRcdHZhciBqOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblx0XHR2YXIgayA9IDA7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXG5cdFx0Ly8gd2hlbiBvdXIgXCJ1aGVwcm5nXCIgaXMgaW5pdGlhbGx5IGludm9rZWQgb3VyIFBSTkcgc3RhdGUgaXMgaW5pdGlhbGl6ZWQgZnJvbSB0aGVcblx0XHQvLyBicm93c2VyJ3Mgb3duIGxvY2FsIFBSTkcuIFRoaXMgaXMgb2theSBzaW5jZSBhbHRob3VnaCBpdHMgZ2VuZXJhdG9yIG1pZ2h0IG5vdFxuXHRcdC8vIGJlIHdvbmRlcmZ1bCwgaXQncyB1c2VmdWwgZm9yIGVzdGFibGlzaGluZyBsYXJnZSBzdGFydHVwIGVudHJvcHkgZm9yIG91ciB1c2FnZS5cblx0XHR2YXIgbWFzaCA9IG5ldyBNYXNoKCk7IC8vIGdldCBhIHBvaW50ZXIgdG8gb3VyIGhpZ2gtcGVyZm9ybWFuY2UgXCJNYXNoXCIgaGFzaFxuXG5cdFx0Ly8gZmlsbCB0aGUgYXJyYXkgd2l0aCBpbml0aWFsIG1hc2ggaGFzaCB2YWx1ZXNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRzW2ldID0gbWFzaChNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cblx0XHQvLyB0aGlzIFBSSVZBVEUgKGludGVybmFsIGFjY2VzcyBvbmx5KSBmdW5jdGlvbiBpcyB0aGUgaGVhcnQgb2YgdGhlIG11bHRpcGx5LXdpdGgtY2Fycnlcblx0XHQvLyAoTVdDKSBQUk5HIGFsZ29yaXRobS4gV2hlbiBjYWxsZWQgaXQgcmV0dXJucyBhIHBzZXVkby1yYW5kb20gbnVtYmVyIGluIHRoZSBmb3JtIG9mIGFcblx0XHQvLyAzMi1iaXQgSmF2YVNjcmlwdCBmcmFjdGlvbiAoMC4wIHRvIDwxLjApIGl0IGlzIGEgUFJJVkFURSBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBkZWZhdWx0XG5cdFx0Ly8gWzAtMV0gcmV0dXJuIGZ1bmN0aW9uLCBhbmQgYnkgdGhlIHJhbmRvbSAnc3RyaW5nKG4pJyBmdW5jdGlvbiB3aGljaCByZXR1cm5zICduJ1xuXHRcdC8vIGNoYXJhY3RlcnMgZnJvbSAzMyB0byAxMjYuXG5cdFx0dmFyIHJhd3BybmcgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoKytwID49IG8pIHtcblx0XHRcdFx0cCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdCA9IDE3Njg4NjMgKiBzW3BdICsgYyAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG5cdFx0XHRyZXR1cm4gc1twXSA9IHQgLSAoYyA9IHQgfCAwKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiBpcyB0aGUgZGVmYXVsdCBmdW5jdGlvbiByZXR1cm5lZCBieSB0aGlzIGxpYnJhcnkuXG5cdFx0Ly8gVGhlIHZhbHVlcyByZXR1cm5lZCBhcmUgaW50ZWdlcnMgaW4gdGhlIHJhbmdlIGZyb20gMCB0byByYW5nZS0xLiBXZSBmaXJzdFxuXHRcdC8vIG9idGFpbiB0d28gMzItYml0IGZyYWN0aW9ucyAoZnJvbSByYXdwcm5nKSB0byBzeW50aGVzaXplIGEgc2luZ2xlIGhpZ2hcblx0XHQvLyByZXNvbHV0aW9uIDUzLWJpdCBwcm5nICgwIHRvIDwxKSwgdGhlbiB3ZSBtdWx0aXBseSB0aGlzIGJ5IHRoZSBjYWxsZXInc1xuXHRcdC8vIFwicmFuZ2VcIiBwYXJhbSBhbmQgdGFrZSB0aGUgXCJmbG9vclwiIHRvIHJldHVybiBhIGVxdWFsbHkgcHJvYmFibGUgaW50ZWdlci5cblx0XHR2YXIgcmFuZG9tID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihyYW5nZSAqIChyYXdwcm5nKCkgKyAocmF3cHJuZygpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTYpKTsgLy8gMl4tNTNcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiAnc3RyaW5nKG4pJyByZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBzdHJpbmcgb2Zcblx0XHQvLyAnbicgcHJpbnRhYmxlIGNoYXJhY3RlcnMgcmFuZ2luZyBmcm9tIGNocigzMykgdG8gY2hyKDEyNikgaW5jbHVzaXZlLlxuXHRcdHJhbmRvbS5zdHJpbmcgPSBmdW5jdGlvbiAoY291bnQpIHtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIHMgPSAnJztcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cdFx0XHRcdHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMyArIHJhbmRvbSg5NCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgUFJJVkFURSBcImhhc2hcIiBmdW5jdGlvbiBpcyB1c2VkIHRvIGV2b2x2ZSB0aGUgZ2VuZXJhdG9yJ3MgaW50ZXJuYWxcblx0XHQvLyBlbnRyb3B5IHN0YXRlLiBJdCBpcyBhbHNvIGNhbGxlZCBieSB0aGUgRVhQT1JURUQgYWRkRW50cm9weSgpIGZ1bmN0aW9uXG5cdFx0Ly8gd2hpY2ggaXMgdXNlZCB0byBwb3VyIGVudHJvcHkgaW50byB0aGUgUFJORy5cblx0XHR2YXIgaGFzaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHtcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goYXJnc1tpXSk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJjbGVhbiBzdHJpbmdcIiBmdW5jdGlvbiByZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlcyBhbmQgbm9uLXByaW50aW5nXG5cdFx0Ly8gY29udHJvbCBjaGFyYWN0ZXJzLCBpbmNsdWRpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlLXJldHVybiAoQ1IpIGFuZCBsaW5lLWZlZWQgKExGKSBjaGFyYWN0ZXJzLFxuXHRcdC8vIGZyb20gYW55IHN0cmluZyBpdCBpcyBoYW5kZWQuIHRoaXMgaXMgYWxzbyB1c2VkIGJ5IHRoZSAnaGFzaHN0cmluZycgZnVuY3Rpb24gKGJlbG93KSB0byBoZWxwXG5cdFx0Ly8gdXNlcnMgYWx3YXlzIG9idGFpbiB0aGUgc2FtZSBFRkZFQ1RJVkUgdWhlcHJuZyBzZWVkaW5nIGtleS5cblx0XHRyYW5kb20uY2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoaW5TdHIpIHtcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2dpLCAnJyk7IC8vIHJlbW92ZSBhbnkvYWxsIGxlYWRpbmcgc3BhY2VzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1tcXHgwMC1cXHgxRl0vZ2ksICcnKTsgLy8gcmVtb3ZlIGFueS9hbGwgY29udHJvbCBjaGFyYWN0ZXJzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1xcbiAvLCAnXFxuJyk7IC8vIHJlbW92ZSBhbnkvYWxsIHRyYWlsaW5nIHNwYWNlc1xuXHRcdFx0cmV0dXJuIGluU3RyOyAvLyByZXR1cm4gdGhlIGNsZWFuZWQgdXAgcmVzdWx0XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJoYXNoIHN0cmluZ1wiIGZ1bmN0aW9uIGhhc2hlcyB0aGUgcHJvdmlkZWQgY2hhcmFjdGVyIHN0cmluZyBhZnRlciBmaXJzdCByZW1vdmluZ1xuXHRcdC8vIGFueSBsZWFkaW5nIG9yIHRyYWlsaW5nIHNwYWNlcyBhbmQgaWdub3JpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlIHJldHVybnMgKENSKSBvciBMaW5lIEZlZWRzIChMRilcblx0XHRyYW5kb20uaGFzaFN0cmluZyA9IGZ1bmN0aW9uIChpblN0cikge1xuXHRcdFx0aW5TdHIgPSByYW5kb20uY2xlYW5TdHJpbmcoaW5TdHIpO1xuXHRcdFx0bWFzaChpblN0cik7IC8vIHVzZSB0aGUgc3RyaW5nIHRvIGV2b2x2ZSB0aGUgJ21hc2gnIHN0YXRlXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgaW5TdHIubGVuZ3RoOyBpKyspIHsgLy8gc2NhbiB0aHJvdWdoIHRoZSBjaGFyYWN0ZXJzIGluIG91ciBzdHJpbmdcblx0XHRcdFx0ayA9IGluU3RyLmNoYXJDb2RlQXQoaSk7IC8vIGdldCB0aGUgY2hhcmFjdGVyIGNvZGUgYXQgdGhlIGxvY2F0aW9uXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHsgLy9cdFwibWFzaFwiIGl0IGludG8gdGhlIFVIRVBSTkcgc3RhdGVcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goayk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZWVkIHRoZSByYW5kb20gZ2VuZXJhdG9yLlxuXHRcdHJhbmRvbS5zZWVkID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0XHRcdGlmICh0eXBlb2Ygc2VlZCA9PT0gJ3VuZGVmaW5lZCcgfHwgc2VlZCA9PT0gbnVsbCkge1xuXHRcdFx0XHRzZWVkID0gTWF0aC5yYW5kb20oKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0c2VlZCA9IHN0cmluZ2lmeShzZWVkLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAodmFsdWUpLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyYW5kb20uaW5pdFN0YXRlKCk7XG5cdFx0XHRyYW5kb20uaGFzaFN0cmluZyhzZWVkKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBoYW5keSBleHBvcnRlZCBmdW5jdGlvbiBpcyB1c2VkIHRvIGFkZCBlbnRyb3B5IHRvIG91ciB1aGVwcm5nIGF0IGFueSB0aW1lXG5cdFx0cmFuZG9tLmFkZEVudHJvcHkgPSBmdW5jdGlvbiAoIC8qIGFjY2VwdCB6ZXJvIG9yIG1vcmUgYXJndW1lbnRzICovICkge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0YXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHR9XG5cdFx0XHRoYXNoKChrKyspICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArIGFyZ3Muam9pbignJykgKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2Ugd2FudCB0byBwcm92aWRlIGEgZGV0ZXJtaW5pc3RpYyBzdGFydHVwIGNvbnRleHQgZm9yIG91ciBQUk5HLFxuXHRcdC8vIGJ1dCB3aXRob3V0IGRpcmVjdGx5IHNldHRpbmcgdGhlIGludGVybmFsIHN0YXRlIHZhcmlhYmxlcywgdGhpcyBhbGxvd3Ncblx0XHQvLyB1cyB0byBpbml0aWFsaXplIHRoZSBtYXNoIGhhc2ggYW5kIFBSTkcncyBpbnRlcm5hbCBzdGF0ZSBiZWZvcmUgcHJvdmlkaW5nXG5cdFx0Ly8gc29tZSBoYXNoaW5nIGlucHV0XG5cdFx0cmFuZG9tLmluaXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1hc2goKTsgLy8gcGFzcyBhIG51bGwgYXJnIHRvIGZvcmNlIG1hc2ggaGFzaCB0byBpbml0XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRcdHNbaV0gPSBtYXNoKCcgJyk7IC8vIGZpbGwgdGhlIGFycmF5IHdpdGggaW5pdGlhbCBtYXNoIGhhc2ggdmFsdWVzXG5cdFx0XHR9XG5cdFx0XHRjID0gMTsgLy8gaW5pdCBvdXIgbXVsdGlwbHktd2l0aC1jYXJyeSBjYXJyeVxuXHRcdFx0cCA9IG87IC8vIGluaXQgb3VyIHBoYXNlXG5cdFx0fTtcblxuXHRcdC8vIHdlIHVzZSB0aGlzIChvcHRpb25hbCkgZXhwb3J0ZWQgZnVuY3Rpb24gdG8gc2lnbmFsIHRoZSBKYXZhU2NyaXB0IGludGVycHJldGVyXG5cdFx0Ly8gdGhhdCB3ZSdyZSBmaW5pc2hlZCB1c2luZyB0aGUgXCJNYXNoXCIgaGFzaCBmdW5jdGlvbiBzbyB0aGF0IGl0IGNhbiBmcmVlIHVwIHRoZVxuXHRcdC8vIGxvY2FsIFwiaW5zdGFuY2UgdmFyaWFibGVzXCIgaXMgd2lsbCBoYXZlIGJlZW4gbWFpbnRhaW5pbmcuICBJdCdzIG5vdCBzdHJpY3RseVxuXHRcdC8vIG5lY2Vzc2FyeSwgb2YgY291cnNlLCBidXQgaXQncyBnb29kIEphdmFTY3JpcHQgY2l0aXplbnNoaXAuXG5cdFx0cmFuZG9tLmRvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtYXNoID0gbnVsbDtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2UgY2FsbGVkIFwidWhlcHJuZ1wiIHdpdGggYSBzZWVkIHZhbHVlLCB0aGVuIGV4ZWN1dGUgcmFuZG9tLnNlZWQoKSBiZWZvcmUgcmV0dXJuaW5nXG5cdFx0aWYgKHR5cGVvZiBzZWVkICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmFuZG9tLnNlZWQoc2VlZCk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgcmFuZ2UgKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20ucmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiByYW5kb20ocmFuZ2UpO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgMSAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5yYW5kb20gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tKE51bWJlci5NQVhfVkFMVUUgLSAxKSAvIE51bWJlci5NQVhfVkFMVUU7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gZmxvYXQgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5mbG9hdEJldHdlZW4gPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0XHRcdHJldHVybiByYW5kb20ucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcblx0XHRyYW5kb20uaW50QmV0d2VlbiA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IocmFuZG9tLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gd2hlbiBvdXIgbWFpbiBvdXRlciBcInVoZXBybmdcIiBmdW5jdGlvbiBpcyBjYWxsZWQsIGFmdGVyIHNldHRpbmcgdXAgb3VyXG5cdFx0Ly8gaW5pdGlhbCB2YXJpYWJsZXMgYW5kIGVudHJvcGljIHN0YXRlLCB3ZSByZXR1cm4gYW4gXCJpbnN0YW5jZSBwb2ludGVyXCJcblx0XHQvLyB0byB0aGUgaW50ZXJuYWwgYW5vbnltb3VzIGZ1bmN0aW9uIHdoaWNoIGNhbiB0aGVuIGJlIHVzZWQgdG8gYWNjZXNzXG5cdFx0Ly8gdGhlIHVoZXBybmcncyB2YXJpb3VzIGV4cG9ydGVkIGZ1bmN0aW9ucy4gIEFzIHdpdGggdGhlIFwiLmRvbmVcIiBmdW5jdGlvblxuXHRcdC8vIGFib3ZlLCB3ZSBzaG91bGQgc2V0IHRoZSByZXR1cm5lZCB2YWx1ZSB0byAnbnVsbCcgb25jZSB3ZSdyZSBmaW5pc2hlZFxuXHRcdC8vIHVzaW5nIGFueSBvZiB0aGVzZSBmdW5jdGlvbnMuXG5cdFx0cmV0dXJuIHJhbmRvbTtcblx0fSgpKTtcbn07XG5cbi8vIE1vZGlmaWNhdGlvbiBmb3IgdXNlIGluIG5vZGU6XG51aGVwcm5nLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdHJldHVybiBuZXcgdWhlcHJuZyhzZWVkKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHVoZXBybmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuZXhwb3J0cy5nZXRTZXJpYWxpemUgPSBzZXJpYWxpemVyXG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXMsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlciksIHNwYWNlcylcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlcikge1xuICB2YXIgc3RhY2sgPSBbXSwga2V5cyA9IFtdXG5cbiAgaWYgKGN5Y2xlUmVwbGFjZXIgPT0gbnVsbCkgY3ljbGVSZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2tbMF0gPT09IHZhbHVlKSByZXR1cm4gXCJbQ2lyY3VsYXIgfl1cIlxuICAgIHJldHVybiBcIltDaXJjdWxhciB+LlwiICsga2V5cy5zbGljZSgwLCBzdGFjay5pbmRleE9mKHZhbHVlKSkuam9pbihcIi5cIikgKyBcIl1cIlxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHRoaXNQb3MgPSBzdGFjay5pbmRleE9mKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IHN0YWNrLnNwbGljZSh0aGlzUG9zICsgMSkgOiBzdGFjay5wdXNoKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IGtleXMuc3BsaWNlKHRoaXNQb3MsIEluZmluaXR5LCBrZXkpIDoga2V5cy5wdXNoKGtleSlcbiAgICAgIGlmICh+c3RhY2suaW5kZXhPZih2YWx1ZSkpIHZhbHVlID0gY3ljbGVSZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGVsc2Ugc3RhY2sucHVzaCh2YWx1ZSlcblxuICAgIHJldHVybiByZXBsYWNlciA9PSBudWxsID8gdmFsdWUgOiByZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzb24tc3RyaW5naWZ5LXNhZmUvc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHRlcnJhcGFpbnQgZnJvbSAndGVycmFwYWludCdcclxuaW1wb3J0IHsgU2ltcGxleDIgfSBmcm9tICcuLi9zcmMvaW5kZXgnXHJcblxyXG52YXIgc2VlZCA9IE1hdGgucmFuZG9tKClcclxudmFyIHNpbXBsZXggPSBuZXcgU2ltcGxleDIoc2VlZClcclxuXHJcbnZhciBuID0gc2ltcGxleC5nZW5cclxudmFyIGYgPSBzaW1wbGV4Lm9jdGF2YXRlLmJpbmQoc2ltcGxleClcclxudmFyIHNpbiA9IE1hdGguc2luXHJcbnZhciBjb3MgPSBNYXRoLmNvc1xyXG52YXIgcG93ID0gTWF0aC5wb3dcclxudmFyIHBpID0gTWF0aC5QSVxyXG52YXIgYWJzID0gTWF0aC5hYnNcclxudmFyIGUgPSBNYXRoLkVcclxuXHJcbiQoJyNnZW4tbm9pc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICB2YXIgZXZhbFN0ciA9ICQoJyNldmFsLXN0cicpLnZhbHVlXHJcbiAgdmFyIHRyYW5zZm9ybWVkTm9pc2UgPSBzaW1wbGV4LnRyYW5zZm9ybShmdW5jdGlvbih4LCB5KSB7XHJcbiAgICByZXR1cm4gZXZhbChldmFsU3RyKVxyXG4gIH0pXHJcbiAgdmFyIG1hcCA9IHRlcnJhcGFpbnQubWFwKHRyYW5zZm9ybWVkTm9pc2UsIHtcclxuICAgIG9mZnNldDogdHJ1ZSxcclxuICAgIHBlcmlvZDogMVxyXG4gIH0pXHJcbiAgbWFwLmRyYXcoJyNub2lzZS1jYW52YXMnKVxyXG59KVxyXG5cclxuZnVuY3Rpb24gJCAoc2VsZWN0b3IpIHtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RvY3MvZGVtby5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ0cnkge1xyXG4gIHZhciBpbWFnZVRlc3QgPSBuZXcgSW1hZ2VEYXRhKDIwLCAyMClcclxuICB2YXIgbnVtYmVyVGVzdCA9IE1hdGgudHJ1bmMoMjAuMSlcclxufSBjYXRjaCAoZSkge1xyXG4gIHZhciBlcnIgPSAnRXJyb3IsIGJyb3dzZXIgbm90IHN1cHBvcnRlZCBieSBUZXJyYXBhaW50LiAnXHJcbiAgZXJyICs9ICdQbGVhc2Ugc3dpdGNoIHRvIFZpdmFsZGksIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIG9yIFNhZmFyaS4nXHJcbiAgY29uc29sZS5sb2coZXJyKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXJyYXBhaW50RmFjdG9yeSAoKSB7XHJcbiAgZnVuY3Rpb24gb2N0YXZhdGUgKCkge1xyXG4gICAgdmFyIHZhbCA9IDBcclxuICAgIHZhciBtYXggPSAwXHJcbiAgICB2YXIgcCA9IHRoaXMucGVyaW9kXHJcbiAgICB2YXIgYW1wID0gTWF0aC5wb3codGhpcy5wZXJzaXN0YW5jZSwgdGhpcy5vY3RhdmVzKVxyXG4gICAgdmFyIGFyZ3MgPSBbXVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9jdGF2ZXM7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyZ3VtZW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGFyZ3Nbal0gPSBhcmd1bWVudHNbal0gLyBwXHJcbiAgICAgIH1cclxuICAgICAgdmFsICs9ICh0aGlzLm5vaXNlLmFwcGx5KG51bGwsIGFyZ3MpICsgdGhpcy5vZmZzZXQpICogYW1wXHJcbiAgICAgIG1heCArPSBhbXAgKiAodGhpcy5vZmZzZXQgKyAxKVxyXG4gICAgICBhbXAgLz0gdGhpcy5wZXJzaXN0YW5jZVxyXG4gICAgICBwIC89IDJcclxuICAgIH1cclxuICAgIHJldHVybiB2YWwgLyBtYXhcclxuICB9XHJcbiAgZnVuY3Rpb24gc2V0T3B0aW9ucyAob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgIHRoaXMub2N0YXZlcyA9IG9wdGlvbnMub2N0YXZlcyB8fCAxXHJcbiAgICB0aGlzLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kIHx8IDMyXHJcbiAgICB0aGlzLm9mZnNldCA9IG9wdGlvbnMub2Zmc2V0ID8gMSA6IDBcclxuICAgIHRoaXMucGVyc2lzdGFuY2UgPSBvcHRpb25zLnBlcnNpc3RhbmNlIHx8IDJcclxuICAgIHRoaXMudXBkYXRlID0gb3B0aW9ucy51cGRhdGUgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAnTm8gdXBkYXRlIGZuJyB9XHJcbiAgICB0aGlzLmxvb3B2YWx1ZXMgPSBvcHRpb25zLmluaXQgfHwgW11cclxuICAgIHRoaXMuY29sb3JtYXAgPSBvcHRpb25zLmNvbG9ybWFwIHx8IGZ1bmN0aW9uICh2KSB7IHJldHVybiBbdiwgdiwgdiwgMjU1XSB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIE1hcCAobm9pc2UsIG9wdGlvbnMpIHtcclxuICAgIHNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKVxyXG4gICAgdGhpcy5ub2lzZSA9IG5vaXNlXHJcbiAgfVxyXG4gIE1hcC5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB2YXIgbWFwID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHdpZHRoICogaGVpZ2h0ICogNClcclxuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9vcHZhbHVlcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIHRoaXMubG9vcHZhbHVlcyA9IHRoaXMudXBkYXRlKHRoaXMubG9vcHZhbHVlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5vaXNlQXJncyA9IFt4LCB5XS5jb25jYXQodGhpcy5sb29wdmFsdWVzKVxyXG4gICAgICAgIHZhciB2YWwgPSBNYXRoLnRydW5jKG9jdGF2YXRlLmFwcGx5KHRoaXMsIG5vaXNlQXJncykgKiAyNTUpXHJcbiAgICAgICAgdmFyIHBpeGVsRGF0YVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb2xvcm1hcCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgcGl4ZWxEYXRhID0gdGhpcy5jb2xvcm1hcCh2YWwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBpeGVsRGF0YSA9IHRoaXMuY29sb3JtYXBbdmFsXVxyXG4gICAgICAgIH1cclxuICAgICAgICBtYXAuc2V0KHBpeGVsRGF0YSwgeCAqIDQgKyB5ICogNCAqIHdpZHRoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IEltYWdlRGF0YShtYXAsIHdpZHRoLCBoZWlnaHQpXHJcbiAgfVxyXG4gIE1hcC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjYW52YXMpIHtcclxuICAgIGNhbnZhcyA9IHR5cGVvZiBjYW52YXMgPT09ICdzdHJpbmcnXHJcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYW52YXMpXHJcbiAgICAgIDogY2FudmFzXHJcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5wdXRJbWFnZURhdGEodGhpcy5jb21wdXRlKFxyXG4gICAgICBjYW52YXMud2lkdGgsXHJcbiAgICAgIGNhbnZhcy5oZWlnaHRcclxuICAgICksIDAsIDApXHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xyXG4gIH1cclxuICBNYXAucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcbiAgICB0YXJnZXQgPSB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJ1xyXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxyXG4gICAgICA6IHRhcmdldFxyXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGhcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcclxuICAgIGN0eC5wdXRJbWFnZURhdGEodGhpcy5jb21wdXRlKHdpZHRoLCBoZWlnaHQpLCAwLCAwKVxyXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKGNhbnZhcylcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXHJcbiAgfVxyXG4gIE1hcC5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgdmFyIGZuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGF0LmRyYXcodGhhdC5jYW52YXMpXHJcbiAgICAgIHRoaXMuYW5pbVJlcSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmbilcclxuICAgIH1cclxuICAgIHRoaXMuYW5pbVJlcSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmbilcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltUmVxKVxyXG4gIH1cclxuXHJcbiAgdmFyIG1vZHVsZSA9IHtcclxuICAgIG1hcDogZnVuY3Rpb24gKG5vaXNlLCBvcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTWFwKG5vaXNlLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIGN1cnZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBuZXcgQ3VydmUoKVxyXG4gICAgfSxcclxuICAgIFRIUkVFMjogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFRIUkVFMigpXHJcbiAgICB9LFxyXG4gICAgVEhSRUUzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBuZXcgVEhSRUUzKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXJyYXBhaW50RmFjdG9yeSgpXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJhcGFpbnQvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=