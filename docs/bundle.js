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
function cut () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var t = 1 - args.reduce(function (sum, val) { return sum + val * val; }, 0)
  return t * t * t * t
}

var Noise = function Noise (s) {
  p = new Uint8Array(512)
  this.seed(s)
};
Noise.prototype.gen = function gen () {};
Noise.prototype.seed = function seed (s) {
    var this$1 = this;

  s = s || Math.random()
  rng = rand.create(s)
  var i
  for (i = 0; i < 256; i++) { this$1.p[i] = i }
  for (i = 0; i < 256; i++) {
    var r = rng(256)
    var temp = this$1.p[i]
    this$1.p[i] = this$1.p[r]
    this$1.p[r] = temp
  }
  for (i = 0; i < 256; i++) { this$1.p[i + 256] = p[i] }
};
Noise.prototype.transform = function transform (fn) {
  return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    return fn(this.gen.apply(args))
  }
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

    var n0 = cut(dx) * grad1(gx).dot(dx)
    var n1 = cut(dx - 1) * grad1(gx + 1).dot(dx - 1)

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
var perlinGen = new __WEBPACK_IMPORTED_MODULE_1__src_index__["Perlin2"](seed)
var simplexGen = new __WEBPACK_IMPORTED_MODULE_1__src_index__["Simplex2"](seed)
__WEBPACK_IMPORTED_MODULE_0_terrapaint___default()(simplexGen, 256, 256, {
  offset: true
})
__WEBPACK_IMPORTED_MODULE_0_terrapaint___default()(perlinGen, 256, 256, {
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

function terrapaint (noise, w, h, options) {
  options = options || {}
  var octaves = options.octaves || 1
  var period = options.period || 32
  var offset = options.offset ? 1 : 0
  var persistance = options.persistance || 2
  var colormap = options.colormap || function (v) { return [v, v, v, 255] }
  var target = options.target || document.body
  target = typeof target === 'string' 
    ? document.querySelector(target)
    : target

  var octavate = function(x, y) {
    var val = 0
    var max = 0
    var p = period
    var amp = Math.pow(persistance, octaves)
    for (var i = 0; i < octaves; i++) {
      val += (noise(x / p, y / p) + offset) * amp
      max += amp * (offset + 1)
      amp /= persistance
      p /= 2
    }
    return val / max
  }
 
  var map = new Uint8ClampedArray(w * h * 4)
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var val = Math.trunc(octavate(x, y) * 255)
      var pixelData
      if (typeof colormap === 'function') {
        pixelData = colormap(val)
      } else {
        pixelData = colormap[val]
      }
      map.set(pixelData, x * 4 + y * 4 * w)
    }
  }

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var imageData = new ImageData(map, w, h)
  canvas.width = w
  canvas.height = h
  ctx.putImageData(imageData, 0, 0)
  target.appendChild(canvas)
}

module.exports = terrapaint


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWNlOWIzYmI5N2I3YmFkNzgzYzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb25zdCIsInRoaXMiLCJzdXBlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLENBQWEsQ0FBQztBQUNqQyxJQUFJLEdBQUc7QUFDUCxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztDQUMzQjtBQUNELFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRTtFQUNoQixP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QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDL0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDcEU7QUFDRCxTQUFTLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3BCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU07RUFDbEMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO0NBQ2hCO0FBQ0QsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNuQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDWDtBQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNuQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUMvQjtBQUNELElBQUksT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQzdCLElBQU0sT0FBTyxHQUFjO0VBQ2hDLGdCQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDZEEsS0FBSyxNQUFDLE9BQUMsQ0FBQztHQUNUOzs7OzBDQUFBO0VBQ0QscUJBQUksaUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNULElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7O0lBRTVCLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7O0lBRWYsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNuQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQUVuRCxPQUFPLElBQUk7TUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDeEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQ3hCLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDVDtHQUNGLENBQ0Y7OztFQXRCNEIsS0FzQjVCO0FBQ00sSUFBTSxRQUFRLEdBQWM7RUFDakMsaUJBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNkQSxLQUFLLE1BQUMsT0FBQyxDQUFDO0dBQ1Q7Ozs7NENBQUE7RUFDRCxzQkFBSSxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ1QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTztJQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOztJQUU1QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPO0lBQzlCLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNO0lBQ25CLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNOztJQUVuQixJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNoQixJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRTs7SUFFaEIsSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUMxQixJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDOzs7SUFHMUIsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFPO0lBQzVCLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsT0FBTztJQUM1QixJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPO0lBQy9CLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU87O0lBRS9CLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNsRCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1RCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7SUFFMUQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztHQUMzQixDQUNGOzs7RUEvQjZCLEtBK0I3Qjs7O0FBR0QsSUFBSSxFQUFFLEdBQUc7RUFDUCxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDOUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ25GO0FBQ0QsU0FBUyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU07RUFDekMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO0NBQ2hCO0FBQ0QsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ1g7QUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3RDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQzVDO0FBQ00sSUFBTSxPQUFPLEdBQWM7RUFDaEMsZ0JBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNkQSxLQUFLLE1BQUMsT0FBQyxDQUFDO0dBQ1Q7Ozs7MENBQUE7RUFDRCxxQkFBSSxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNaLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHOztJQUU1QixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7O0lBRWYsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQzVDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDNUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7SUFFcEUsT0FBTyxJQUFJO01BQ1QsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQztPQUNUO01BQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQztPQUNUO01BQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNUO0dBQ0YsQ0FDRjs7O0VBcEM0QixLQW9DNUI7OztBQUdELElBQUksRUFBRSxHQUFHO0VBQ1AsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM5RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMxRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDOUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMs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LEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDakUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDekUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDckUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3JFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQzdFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNyRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztFQUVyRixPQUFPLElBQUk7SUFDVCxJQUFJO01BQ0YsSUFBSTtRQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQztPQUNUO01BQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQztPQUNUO01BQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNUO0lBQ0QsSUFBSTtNQUNGLElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFL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QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ3JCRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsYUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5Y2U5YjNiYjk3YjdiYWQ3ODNjMiIsIi8vIFR1bXVsdCwgSmF2YVNjcmlwdCBub2lzZSBnZW5lcmF0b3JcclxuLy8gQ3JlYXRlZCBieSBQaGlsaXAgU2NvdHQgfCBTY290dHlGaWxsdXBzLCAyMDE3XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9TY290dHlGaWxsdXBzXHJcblxyXG4vLyBOb2lzZSBhbGdvcml0aG1zIGJ5IEtlbiBQZXJsaW5cclxuLy8gVXNlcyBcInJhbmRvbS1zZWVkXCIgcGFja2FnZSBvbiBOUE0gZm9yIHNlZWRpbmcgZnVuY3Rpb25cclxuXHJcblxyXG52YXIgcmFuZCA9IHJlcXVpcmUoJ3JhbmRvbS1zZWVkJylcclxudmFyIHJuZ1xyXG5mdW5jdGlvbiBsZXJwIChhLCBiLCB0KSB7XHJcbiAgcmV0dXJuIGEgKiAoMSAtIHQpICsgYiAqIHRcclxufVxyXG5mdW5jdGlvbiBmYWRlICh0KSB7XHJcbiAgcmV0dXJuIHQgKiB0ICogdCAqICgxMCArIHQgKiAoLTE1ICsgdCAqIDYpKVxyXG59XHJcbmZ1bmN0aW9uIGN1dCAoLi4uYXJncykge1xyXG4gIGNvbnN0IHQgPSAxIC0gYXJncy5yZWR1Y2UoKHN1bSwgdmFsKSA9PiBzdW0gKyB2YWwgKiB2YWwsIDApXHJcbiAgcmV0dXJuIHQgKiB0ICogdCAqIHRcclxufVxyXG5cclxuY2xhc3MgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBwID0gbmV3IFVpbnQ4QXJyYXkoNTEyKVxyXG4gICAgdGhpcy5zZWVkKHMpXHJcbiAgfVxyXG4gIGdlbiAoKSB7fVxyXG4gIHNlZWQgKHMpIHtcclxuICAgIHMgPSBzIHx8IE1hdGgucmFuZG9tKClcclxuICAgIHJuZyA9IHJhbmQuY3JlYXRlKHMpXHJcbiAgICB2YXIgaVxyXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB0aGlzLnBbaV0gPSBpXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcclxuICAgICAgdmFyIHIgPSBybmcoMjU2KVxyXG4gICAgICB2YXIgdGVtcCA9IHRoaXMucFtpXVxyXG4gICAgICB0aGlzLnBbaV0gPSB0aGlzLnBbcl1cclxuICAgICAgdGhpcy5wW3JdID0gdGVtcFxyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB0aGlzLnBbaSArIDI1Nl0gPSBwW2ldXHJcbiAgfVxyXG4gIHRyYW5zZm9ybSAoZm4pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICByZXR1cm4gZm4odGhpcy5nZW4uYXBwbHkoYXJncykpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qb2N0YXZhdGUgKG9jdGF2ZXMsIG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICB2YXIgcGVyc2lzdGFuY2UgPSBvcHRpb25zLnBlcnNpc3RhbmNlIHx8IDJcclxuICAgIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZCB8fCA2XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgIC8vIGZuKHRoaXMuZ2VuLmFwcGx5KGFyZ3MpXHJcbiAgICB9XHJcbiAgfSovXHJcbn1cclxuXHJcblxyXG52YXIgZzEgPSBbIG5ldyBWZWMxKDEpLCBuZXcgVmVjMSgtMSkgXVxyXG5mdW5jdGlvbiBncmFkMSAoeCkge1xyXG4gIHZhciBoYXNoID0gcFt4XSAlIGcxLmxlbmd0aFxyXG4gIHJldHVybiBnMVtoYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzEgKHgpIHtcclxuICB0aGlzLnggPSB4XHJcbn1cclxuVmVjMS5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgpIHtcclxuICByZXR1cm4gdGhpcy54ICogeFxyXG59XHJcbmV4cG9ydCBjbGFzcyBQZXJsaW4xIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgpIHtcclxuICAgIHZhciBneCA9IE1hdGguZmxvb3IoeCkgJSAyNTZcclxuICAgIHZhciBkeCA9IHggLSBneFxyXG5cclxuICAgIHZhciBuMCA9IGdyYWQxKGd4KS5kb3QoZHgpXHJcbiAgICB2YXIgbjEgPSBncmFkMShneCArIDEpLmRvdChkeCAtIDEpXHJcblxyXG4gICAgcmV0dXJuIGxlcnAobjAsIG4xLCBmYWRlKGR4KSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFNpbXBsZXgxIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgpIHtcclxuICAgIHZhciBneCA9IE1hdGguZmxvb3IoeCkgJSAyNTZcclxuICAgIHZhciBkeCA9IHggLSBneFxyXG5cclxuICAgIHZhciBuMCA9IGN1dChkeCkgKiBncmFkMShneCkuZG90KGR4KVxyXG4gICAgdmFyIG4xID0gY3V0KGR4IC0gMSkgKiBncmFkMShneCArIDEpLmRvdChkeCAtIDEpXHJcblxyXG4gICAgcmV0dXJuIDAuNSAqIChuMCArIG4xKVxyXG4gIH1cclxufVxyXG4vLyBub2lzZSwgbm9pc2UxIG5vaXNlMiBub2lzZTMsIFxyXG4vLyB0aGVuIHBlcmxpbnMsIHNpbXBsZXhlcywgZXRjXHJcbi8vIHRoaXMgd2lsbCBiZSBkb25lIHdoZW4geW91IHdhbnQgdG8gc3BsaXQgZmlsZXNcclxuLy8gdHlwZWQgYXJyYXkgbG9vayB1cCB0YWJsZT9cclxuXHJcbnZhciBnMiA9IFtcclxuICBuZXcgVmVjMigxLCAwKSwgbmV3IFZlYzIoMSwgMSksIG5ldyBWZWMyKDAsIDEpLCBuZXcgVmVjMigtMSwgMSksXHJcbiAgbmV3IFZlYzIoLTEsIDApLCBuZXcgVmVjMigtMSwgLTEpLCBuZXcgVmVjMigwLCAtMSksIG5ldyBWZWMyKDEsIC0xKVxyXG5dXHJcbmZ1bmN0aW9uIGdyYWQyICh4LCB5KSB7XHJcbiAgdmFyIGhhc2ggPSBwW3ggKyBwW3ldXSAlIGcyLmxlbmd0aFxyXG4gIHJldHVybiBnMltoYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzIgKHgsIHkpIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG59XHJcblZlYzIucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5XHJcbn1cclxudmFyIFMyX1RPX0MgPSAwLjUgKiAoTWF0aC5zcXJ0KDMpIC0gMSlcclxudmFyIENfVE9fUzIgPSAoMyAtIE1hdGguc3FydCgzKSkgLyA2XHJcbmV4cG9ydCBjbGFzcyBQZXJsaW4yIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgsIHkpIHtcclxuICAgIHZhciBneCA9IE1hdGgudHJ1bmMoeCkgJSAyNTZcclxuICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcclxuXHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuICAgIHZhciBkeSA9IHkgLSBneVxyXG5cclxuICAgIHZhciBuMDAgPSBncmFkMihneCwgZ3kpLmRvdChkeCwgZHkpXHJcbiAgICB2YXIgbjEwID0gZ3JhZDIoZ3ggKyAxLCBneSkuZG90KGR4IC0gMSwgZHkpXHJcbiAgICB2YXIgbjAxID0gZ3JhZDIoZ3gsIGd5ICsgMSkuZG90KGR4LCBkeSAtIDEpXHJcbiAgICB2YXIgbjExID0gZ3JhZDIoZ3ggKyAxLCBneSArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSlcclxuXHJcbiAgICByZXR1cm4gbGVycChcclxuICAgICAgbGVycChuMDAsIG4xMCwgZmFkZShkeCkpLFxyXG4gICAgICBsZXJwKG4wMSwgbjExLCBmYWRlKGR4KSksXHJcbiAgICAgIGZhZGUoZHkpXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTaW1wbGV4MiBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4LCB5KSB7XHJcbiAgICB2YXIgc2tldyA9ICh4ICsgeSkgKiBTMl9UT19DXHJcbiAgICB2YXIgaSA9IE1hdGgudHJ1bmMoeCArIHNrZXcpXHJcbiAgICB2YXIgaiA9IE1hdGgudHJ1bmMoeSArIHNrZXcpXHJcblxyXG4gICAgdmFyIHVuc2tldyA9IChpICsgaikgKiBDX1RPX1MyXHJcbiAgICB2YXIgZ3ggPSBpIC0gdW5za2V3XHJcbiAgICB2YXIgZ3kgPSBqIC0gdW5za2V3XHJcblxyXG4gICAgdmFyIGR4MCA9IHggLSBneFxyXG4gICAgdmFyIGR5MCA9IHkgLSBneVxyXG5cclxuICAgIHZhciBkaSA9IGR4MCA+IGR5MCA/IDEgOiAwXHJcbiAgICB2YXIgZGogPSBkeDAgPiBkeTAgPyAwIDogMVxyXG5cclxuICAgIC8vIHdoeSBpc24ndCBpdCArIGRpIC0gQ19UT19TMj9cclxuICAgIHZhciBkeDEgPSBkeDAgLSBkaSArIENfVE9fUzJcclxuICAgIHZhciBkeTEgPSBkeTAgLSBkaiArIENfVE9fUzJcclxuICAgIHZhciBkeDIgPSBkeDAgLSAxICsgMiAqIENfVE9fUzJcclxuICAgIHZhciBkeTIgPSBkeTAgLSAxICsgMiAqIENfVE9fUzJcclxuXHJcbiAgICB2YXIgbjAgPSBjdXQoZHgwLCBkeTApICogZ3JhZDIoaSwgaikuZG90KGR4MCwgZHkwKVxyXG4gICAgdmFyIG4xID0gY3V0KGR4MSwgZHkxKSAqIGdyYWQyKGkgKyBkaSwgaiArIGRqKS5kb3QoZHgxLCBkeTEpXHJcbiAgICB2YXIgbjIgPSBjdXQoZHgyLCBkeTIpICogZ3JhZDIoaSArIDEsIGogKyAxKS5kb3QoZHgyLCBkeTIpXHJcblxyXG4gICAgcmV0dXJuIDcwICogKG4wICsgbjEgKyBuMilcclxuICB9XHJcbn1cclxuXHJcblxyXG52YXIgZzMgPSBbXHJcbiAgbmV3IFZlYzMoMSwgMSwgMSksIG5ldyBWZWMzKC0xLCAxLCAxKSwgbmV3IFZlYzMoMSwgLTEsIDEpLCBuZXcgVmVjMygtMSwgLTEsIDEpLFxyXG4gIG5ldyBWZWMzKDEsIDEsIDApLCBuZXcgVmVjMygtMSwgMSwgMCksIG5ldyBWZWMzKDEsIC0xLCAwKSwgbmV3IFZlYzMoLTEsIC0xLCAwKSxcclxuICBuZXcgVmVjMygxLCAxLCAtMSksIG5ldyBWZWMzKC0xLCAxLCAtMSksIG5ldyBWZWMzKDEsIC0xLCAtMSksIG5ldyBWZWMzKC0xLCAtMSwgLTEpXHJcbl1cclxuZnVuY3Rpb24gZ3JhZDMgKHgsIHksIHopIHtcclxuICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbel1dXSAlIGczLmxlbmd0aFxyXG4gIHJldHVybiBnM1toYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzMgKHgsIHksIHopIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG4gIHRoaXMueiA9IHpcclxufVxyXG5WZWMzLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSwgeikge1xyXG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeSArIHRoaXMueiAqIHpcclxufVxyXG5leHBvcnQgY2xhc3MgUGVybGluMyBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4LCB5LCB6KSB7XHJcbiAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XHJcbiAgICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XHJcblxyXG4gICAgdmFyIGR4ID0geCAtIGd4XHJcbiAgICB2YXIgZHkgPSB5IC0gZ3lcclxuICAgIHZhciBkeiA9IHogLSBnelxyXG5cclxuICAgIHZhciBuMDAwID0gZ3JhZDMoZ3gsIGd5LCBneikuZG90KGR4LCBkeSwgZHopXHJcbiAgICB2YXIgbjEwMCA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6KS5kb3QoZHggLSAxLCBkeSwgZHopXHJcbiAgICB2YXIgbjAxMCA9IGdyYWQzKGd4LCBneSArIDEsIGd6KS5kb3QoZHgsIGR5IC0gMSwgZHopXHJcbiAgICB2YXIgbjExMCA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneikuZG90KGR4IC0gMSwgZHkgLSAxLCBkeilcclxuICAgIHZhciBuMDAxID0gZ3JhZDMoZ3gsIGd5LCBneiArIDEpLmRvdChkeCwgZHksIGR6IC0gMSlcclxuICAgIHZhciBuMTAxID0gZ3JhZDMoZ3ggKyAxLCBneSwgZ3ogKyAxKS5kb3QoZHggLSAxLCBkeSwgZHogLSAxKVxyXG4gICAgdmFyIG4wMTEgPSBncmFkMyhneCwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCwgZHkgLSAxLCBkeiAtIDEpXHJcbiAgICB2YXIgbjExMSA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxKVxyXG5cclxuICAgIHJldHVybiBsZXJwKFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMCwgbjEwMCwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMCwgbjExMCwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAxLCBuMTAxLCBkeCksXHJcbiAgICAgICAgbGVycChuMDExLCBuMTExLCBkeCksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKSxcclxuICAgICAgZmFkZShkeilcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcblxyXG52YXIgZzQgPSBbXHJcbiAgbmV3IFZlYzQoMCwgMSwgMSwgMSksIG5ldyBWZWM0KDAsIDEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgMSwgLTEsIDEpLCBuZXcgVmVjNCgwLCAxLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KDAsIC0xLCAxLCAxKSwgbmV3IFZlYzQoMCwgLTEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMCwgMSwgMSksIG5ldyBWZWM0KDEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoMSwgMCwgLTEsIDEpLCBuZXcgVmVjNCgxLCAwLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KC0xLCAwLCAxLCAxKSwgbmV3IFZlYzQoLTEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAxKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMSwgMCwgMSksIG5ldyBWZWM0KDEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoMSwgLTEsIDAsIDEpLCBuZXcgVmVjNCgxLCAtMSwgMCwgLTEpLFxyXG4gIG5ldyBWZWM0KC0xLCAxLCAwLCAxKSwgbmV3IFZlYzQoLTEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAxKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMSwgMSwgMCksIG5ldyBWZWM0KDEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoMSwgLTEsIDEsIDApLCBuZXcgVmVjNCgxLCAtMSwgLTEsIDApLFxyXG4gIG5ldyBWZWM0KC0xLCAxLCAxLCAwKSwgbmV3IFZlYzQoLTEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAtMSwgMClcclxuXVxyXG5mdW5jdGlvbiBncmFkNCAoeCwgeSwgeiwgdCkge1xyXG4gIHZhciBoYXNoID0gcFt4ICsgcFt5ICsgcFt6ICsgcFt0XV1dXSAlIGc0Lmxlbmd0aFxyXG4gIHJldHVybiBnNFtoYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzQgKHgsIHksIHosIHQpIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG4gIHRoaXMueiA9IHpcclxuICB0aGlzLnQgPSB0XHJcbn1cclxuVmVjNC5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHksIHosIHQpIHtcclxuICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHkgKyB0aGlzLnogKiB6ICsgdGhpcy50ICogdFxyXG59XHJcbmV4cG9ydCBjbGFzcyBQZXJsaW40IGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKHgsIHksIHosIHQpIHtcclxuICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgdmFyIGd5ID0gTWF0aC50cnVuYyh5KSAlIDI1NlxyXG4gIHZhciBneiA9IE1hdGgudHJ1bmMoeikgJSAyNTZcclxuICB2YXIgZ3QgPSBNYXRoLnRydW5jKHQpICUgMjU2XHJcblxyXG4gIHZhciBkeCA9IHggLSBneFxyXG4gIHZhciBkeSA9IHkgLSBneVxyXG4gIHZhciBkeiA9IHogLSBnelxyXG4gIHZhciBkdCA9IHQgLSBndFxyXG5cclxuICB2YXIgbjAwMDAgPSBncmFkNChneCwgZ3ksIGd6LCBndCkuZG90KGR4LCBkeSwgZHosIGR0KVxyXG4gIHZhciBuMTAwMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6LCBndCkuZG90KGR4IC0gMSwgZHksIGR6KVxyXG4gIHZhciBuMDEwMCA9IGdyYWQ0KGd4LCBneSArIDEsIGd6LCBndCkuZG90KGR4LCBkeSAtIDEsIGR6KVxyXG4gIHZhciBuMTEwMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHopXHJcbiAgdmFyIG4wMDEwID0gZ3JhZDQoZ3gsIGd5LCBneiArIDEsIGd0KS5kb3QoZHgsIGR5LCBkeiAtIDEpXHJcbiAgdmFyIG4xMDEwID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3ogKyAxLCBndCkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSlcclxuICB2YXIgbjAxMTAgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxKVxyXG4gIHZhciBuMTExMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSlcclxuICB2YXIgbjAwMDEgPSBncmFkNChneCwgZ3ksIGd6LCBndCArIDEpLmRvdChkeCwgZHksIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4xMDAxID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3osIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4wMTAxID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3osIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4xMTAxID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6LCBndCArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHosIGR0IC0gMSlcclxuICB2YXIgbjAwMTEgPSBncmFkNChneCwgZ3ksIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiAtIDEsIGR0IC0gMSlcclxuICB2YXIgbjEwMTEgPSBncmFkNChneCArIDEsIGd5LCBneiArIDEsIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSwgZHQgLSAxKVxyXG4gIHZhciBuMDExMSA9IGdyYWQ0KGd4LCBneSArIDEsIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxLCBkdCAtIDEpXHJcbiAgdmFyIG4xMTExID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6ICsgMSwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxyXG5cclxuICByZXR1cm4gbGVycChcclxuICAgIGxlcnAoXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAwMCwgbjEwMDAsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTAwLCBuMTEwMCwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAxMCwgbjEwMTAsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTEwLCBuMTExMCwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGZhZGUoZHopXHJcbiAgICApLFxyXG4gICAgbGVycChcclxuICAgICAgbGVycChcclxuICAgICAgICBsZXJwKG4wMDAxLCBuMTAwMSwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMDEsIG4xMTAxLCBkeCksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKSxcclxuICAgICAgbGVycChcclxuICAgICAgICBsZXJwKG4wMDExLCBuMTAxMSwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMTEsIG4xMTExLCBkeCksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKSxcclxuICAgICAgZmFkZShkeilcclxuICAgICksXHJcbiAgICBmYWRlKGR0KVxyXG4gIClcclxuICB9XHJcbn1cclxuXHJcblxyXG52YXIgZ04gPSBbXVxyXG4vLyBnZW5lcmF0ZXMgYSBncmFkaWVudCBsb29rIHVwIHRhYmxlLCB3aGVyZSBlYWNoIGdyYWRpZW50IGhhcyBvbmUgcG9zaXRpdmVcclxuLy8gb3IgbmVnYXRpdmUgdW5pdCB2ZWN0b3IgaW4gb25lIGRpbWVuc2lvbi4gRm9yIGV4YW1wbGUsIGNhbGxpbmcgcGVybGluIHdpdGggMiBkaW1zOlxyXG4vLyBbMSwgMF0sIFstMSwgMF0sIFswLCAxXSwgWzAsIC0xXVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUdOIChkaW0pIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbSAqIDI7IGkrKykge1xyXG4gICAgdmFyIHZlYyA9IG5ldyBBcnJheShkaW0pLmZpbGwoMClcclxuICAgIHZlY1tpICUgZGltXSA9IGkgLyBkaW0gPj0gMSA/IDEgOiAtMVxyXG4gICAgZ05baV0gPSBuZXcgVmVjTih2ZWMpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGxlcnBOIChucywgZHMpIHtcclxuICBpZiAoZHMubGVuZ3RoID09PSAxKSByZXR1cm4gbGVycChuc1swXSwgbnNbMV0sIGZhZGUoZHNbMF0pKVxyXG4gIHZhciBuczEgPSBucy5zbGljZSgwLCBNYXRoLmZsb29yKG5zLmxlbmd0aCAvIDIpKVxyXG4gIHZhciBuczIgPSBucy5zbGljZShNYXRoLmNlaWwobnMubGVuZ3RoIC8gMikpXHJcbiAgcmV0dXJuIGxlcnAoXHJcbiAgICBsZXJwTihuczEsIGRzLnNsaWNlKDAsIGRzLmxlbmd0aCAtIDEpKSxcclxuICAgIGxlcnBOKG5zMiwgZHMuc2xpY2UoMCwgZHMubGVuZ3RoIC0gMSkpLFxyXG4gICAgZmFkZShkc1tkcy5sZW5ndGggLSAxXSlcclxuICApXHJcbn1cclxuZnVuY3Rpb24gaGFzaE4gKGdzKSB7XHJcbiAgaWYgKGdzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBbZ3NbMF1dXHJcbiAgcmV0dXJuIHBbZ3NbMF0gKyBoYXNoTihncy5zbGljZSgxKSldXHJcbn1cclxuZnVuY3Rpb24gZ2V0TnMgKGRpbSwgZ3MsIGRzKSB7XHJcbiAgdmFyIG5zID0gW11cclxuICBmb3IgKHZhciBpID0gMDsgaSA8ICgyIDw8IChkaW0gLSAxKSk7IGkrKykge1xyXG4gICAgdmFyIGdzUGVybSA9IGdzLnNsaWNlKClcclxuICAgIHZhciBkc1Blcm0gPSBkcy5zbGljZSgpXHJcbiAgICB2YXIgdGVtcCA9IGlcclxuXHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRpbTsgaisrKSB7XHJcbiAgICAgIGlmICh0ZW1wICYgMSkge1xyXG4gICAgICAgIGdzUGVybVtqXSArPSAxXHJcbiAgICAgICAgZHNQZXJtW2pdIC09IDFcclxuICAgICAgfVxyXG4gICAgICB0ZW1wID0gdGVtcCA+PiAxXHJcbiAgICB9XHJcbiAgICBuc1tpXSA9IGdOW2hhc2hOKGdzUGVybSkgJSBnTi5sZW5ndGhdLmRvdChkc1Blcm0pXHJcbiAgfVxyXG4gIHJldHVybiBuc1xyXG59XHJcbmZ1bmN0aW9uIFZlY04oUikge1xyXG4gIHRoaXMuUiA9IFJcclxufVxyXG5WZWNOLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoUikge1xyXG4gIHZhciB2YWwgPSAwXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBSLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YWwgKz0gdGhpcy5SW2ldICogUltpXVxyXG4gIH1cclxuICByZXR1cm4gdmFsXHJcbn1cclxuZXhwb3J0IGNsYXNzIFBlcmxpbk4gZXh0ZW5kcyBOb2lzZSB7XHJcbiAgY29uc3RydWN0b3IgKHMpIHtcclxuICAgIHN1cGVyKHMpXHJcbiAgfVxyXG4gIGdlbiAoLi4uYXJncykge1xyXG4gICAgdmFyIGdzID0gW11cclxuICAgIHZhciBkcyA9IFtdXHJcblxyXG4gICAgaWYgKGdOLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBnZW5lcmF0ZUdOKGFyZ3MubGVuZ3RoKVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBnc1tpXSA9IE1hdGgudHJ1bmMoYXJnc1tpXSkgJSAyNTZcclxuICAgICAgZHNbaV0gPSBhcmdzW2ldIC0gZ3NbaV1cclxuICAgIH1cclxuICAgIHZhciBucyA9IGdldE5zKGFyZ3MubGVuZ3RoLCBncywgZHMpXHJcbiAgICB2YXIgcmVzID0gbGVycE4obnMsIGRzKVxyXG4gICAgcmV0dXJuIHJlc1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBTaW1wbGV4MTogU2ltcGxleDEsXHJcbiAgU2ltcGxleDI6IFNpbXBsZXgyLFxyXG4gIFBlcmxpbjE6IFBlcmxpbjEsXHJcbiAgUGVybGluMjogUGVybGluMixcclxuICBQZXJsaW4zOiBQZXJsaW4zLFxyXG4gIFBlcmxpbjQ6IFBlcmxpbjQsXHJcbiAgUGVybGluTjogUGVybGluTlxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZml4ZWRMb2dnZXIgKHRhcmdldCwgbWV0aG9kLCBjb3VudCwgZGVidWcpIHtcclxuICB2YXIgbG9nZ2VyID0ge1xyXG4gICAgY291bnQ6IDAsXHJcbiAgICBsb2c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKHRoaXMuY291bnQgPCBjb3VudCAmJiBkZWJ1Zykge1xyXG4gICAgICAgIHRoaXMuY291bnQrK1xyXG4gICAgICAgIHRhcmdldFttZXRob2RdLmFwcGx5KHRoaXMsIChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBsb2dnZXJcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvKlxuICogcmFuZG9tLXNlZWRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9za3JhdGNoZG90L3JhbmRvbS1zZWVkXG4gKlxuICogVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgU3RldmUgR2lic29uIGFuZCBjYW4gYmUgZm91bmQgaGVyZTpcbiAqXG4gKiBodHRwczovL3d3dy5ncmMuY29tL290Zy91aGVwcm5nLmh0bVxuICpcbiAqIEl0IHdhcyBzbGlnaHRseSBtb2RpZmllZCBmb3IgdXNlIGluIG5vZGUsIHRvIHBhc3MganNoaW50LCBhbmQgYSBmZXcgYWRkaXRpb25hbFxuICogaGVscGVyIGZ1bmN0aW9ucyB3ZXJlIGFkZGVkLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMyBza3JhdGNoZG90XG4gKiBEdWFsIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBhbmQgdGhlIG9yaWdpbmFsIEdSQyBjb3B5cmlnaHQvbGljZW5zZVxuICogaW5jbHVkZWQgYmVsb3cuXG4gKi9cbi8qXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFx0XHRcdFx0XHRcdFx0XHRHaWJzb24gUmVzZWFyY2ggQ29ycG9yYXRpb25cblx0XHRcdFx0VUhFUFJORyAtIFVsdHJhIEhpZ2ggRW50cm9weSBQc2V1ZG8tUmFuZG9tIE51bWJlciBHZW5lcmF0b3Jcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRMSUNFTlNFIEFORCBDT1BZUklHSFQ6ICBUSElTIENPREUgSVMgSEVSRUJZIFJFTEVBU0VEIElOVE8gVEhFIFBVQkxJQyBET01BSU5cblx0R2lic29uIFJlc2VhcmNoIENvcnBvcmF0aW9uIHJlbGVhc2VzIGFuZCBkaXNjbGFpbXMgQUxMIFJJR0hUUyBBTkQgVElUTEUgSU5cblx0VEhJUyBDT0RFIE9SIEFOWSBERVJJVkFUSVZFUy4gQW55b25lIG1heSBiZSBmcmVlbHkgdXNlIGl0IGZvciBhbnkgcHVycG9zZS5cblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRUaGlzIGlzIEdSQydzIGNyeXB0b2dyYXBoaWNhbGx5IHN0cm9uZyBQUk5HIChwc2V1ZG8tcmFuZG9tIG51bWJlciBnZW5lcmF0b3IpXG5cdGZvciBKYXZhU2NyaXB0LiBJdCBpcyBkcml2ZW4gYnkgMTUzNiBiaXRzIG9mIGVudHJvcHksIHN0b3JlZCBpbiBhbiBhcnJheSBvZlxuXHQ0OCwgMzItYml0IEphdmFTY3JpcHQgdmFyaWFibGVzLiAgU2luY2UgbWFueSBhcHBsaWNhdGlvbnMgb2YgdGhpcyBnZW5lcmF0b3IsXG5cdGluY2x1ZGluZyBvdXJzIHdpdGggdGhlIFwiT2ZmIFRoZSBHcmlkXCIgTGF0aW4gU3F1YXJlIGdlbmVyYXRvciwgbWF5IHJlcXVpcmVcblx0dGhlIGRldGVyaW1pbmlzdGljIHJlLWdlbmVyYXRpb24gb2YgYSBzZXF1ZW5jZSBvZiBQUk5zLCB0aGlzIFBSTkcncyBpbml0aWFsXG5cdGVudHJvcGljIHN0YXRlIGNhbiBiZSByZWFkIGFuZCB3cml0dGVuIGFzIGEgc3RhdGljIHdob2xlLCBhbmQgaW5jcmVtZW50YWxseVxuXHRldm9sdmVkIGJ5IHBvdXJpbmcgbmV3IHNvdXJjZSBlbnRyb3B5IGludG8gdGhlIGdlbmVyYXRvcidzIGludGVybmFsIHN0YXRlLlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdEVORExFU1MgVEhBTktTIGFyZSBkdWUgSm9oYW5uZXMgQmFhZ29lIGZvciBoaXMgY2FyZWZ1bCBkZXZlbG9wbWVudCBvZiBoaWdobHlcblx0cm9idXN0IEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb25zIG9mIEpTIFBSTkdzLiAgVGhpcyB3b3JrIHdhcyBiYXNlZCB1cG9uIGhpc1xuXHRKYXZhU2NyaXB0IFwiQWxlYVwiIFBSTkcgd2hpY2ggaXMgYmFzZWQgdXBvbiB0aGUgZXh0cmVtZWx5IHJvYnVzdCBNdWx0aXBseS1cblx0V2l0aC1DYXJyeSAoTVdDKSBQUk5HIGludmVudGVkIGJ5IEdlb3JnZSBNYXJzYWdsaWEuIE1XQyBBbGdvcml0aG0gUmVmZXJlbmNlczpcblx0aHR0cDovL3d3dy5HUkMuY29tL290Zy9NYXJzYWdsaWFfUFJOR3MucGRmXG5cdGh0dHA6Ly93d3cuR1JDLmNvbS9vdGcvTWFyc2FnbGlhX01XQ19HZW5lcmF0b3JzLnBkZlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFRoZSBxdWFsaXR5IG9mIHRoaXMgYWxnb3JpdGhtJ3MgcHNldWRvLXJhbmRvbSBudW1iZXJzIGhhdmUgYmVlbiB2ZXJpZmllZCBieVxuXHRtdWx0aXBsZSBpbmRlcGVuZGVudCByZXNlYXJjaGVycy4gSXQgaGFuZGlseSBwYXNzZXMgdGhlIGZlcm1pbGFiLmNoIHRlc3RzIGFzXG5cdHdlbGwgYXMgdGhlIFwiZGllaGFyZFwiIGFuZCBcImRpZWhhcmRlclwiIHRlc3Qgc3VpdGVzLiAgRm9yIGluZGl2aWR1YWxzIHdpc2hpbmdcblx0dG8gZnVydGhlciB2ZXJpZnkgdGhlIHF1YWxpdHkgb2YgdGhpcyBhbGdvcml0aG0ncyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMsIGFcblx0MjU2LW1lZ2FieXRlIGZpbGUgb2YgdGhpcyBhbGdvcml0aG0ncyBvdXRwdXQgbWF5IGJlIGRvd25sb2FkZWQgZnJvbSBHUkMuY29tLFxuXHRhbmQgYSBNaWNyb3NvZnQgV2luZG93cyBzY3JpcHRpbmcgaG9zdCAoV1NIKSB2ZXJzaW9uIG9mIHRoaXMgYWxnb3JpdGhtIG1heSBiZVxuXHRkb3dubG9hZGVkIGFuZCBydW4gZnJvbSB0aGUgV2luZG93cyBjb21tYW5kIHByb21wdCB0byBnZW5lcmF0ZSB1bmlxdWUgZmlsZXNcblx0b2YgYW55IHNpemU6XG5cdFRoZSBGZXJtaWxhYiBcIkVOVFwiIHRlc3RzOiBodHRwOi8vZm91cm1pbGFiLmNoL3JhbmRvbS9cblx0VGhlIDI1Ni1tZWdhYnl0ZSBzYW1wbGUgUFJOIGZpbGUgYXQgR1JDOiBodHRwczovL3d3dy5HUkMuY29tL290Zy91aGVwcm5nLmJpblxuXHRUaGUgV2luZG93cyBzY3JpcHRpbmcgaG9zdCB2ZXJzaW9uOiBodHRwczovL3d3dy5HUkMuY29tL290Zy93c2gtdWhlcHJuZy5qc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFF1YWxpZnlpbmcgTVdDIG11bHRpcGxpZXJzIGFyZTogMTg3ODg0LCA2ODYxMTgsIDg5ODEzNCwgMTEwNDM3NSwgMTI1MDIwNSxcblx0MTQ2MDkxMCBhbmQgMTc2ODg2My4gKFdlIHVzZSB0aGUgbGFyZ2VzdCBvbmUgdGhhdCdzIDwgMl4yMSlcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcblxuLypcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblRoaXMgaXMgYmFzZWQgdXBvbiBKb2hhbm5lcyBCYWFnb2UncyBjYXJlZnVsbHkgZGVzaWduZWQgYW5kIGVmZmljaWVudCBoYXNoXG5mdW5jdGlvbiBmb3IgdXNlIHdpdGggSmF2YVNjcmlwdC4gIEl0IGhhcyBhIHByb3ZlbiBcImF2YWxhbmNoZVwiIGVmZmVjdCBzdWNoXG50aGF0IGV2ZXJ5IGJpdCBvZiB0aGUgaW5wdXQgYWZmZWN0cyBldmVyeSBiaXQgb2YgdGhlIG91dHB1dCA1MCUgb2YgdGhlIHRpbWUsXG53aGljaCBpcyBnb29kLlx0U2VlOiBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2hhc2gvYXZhbGFuY2hlLnhodG1sXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qL1xudmFyIE1hc2ggPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBuID0gMHhlZmM4MjQ5ZDtcblx0dmFyIG1hc2ggPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuXHRcdFx0XHR2YXIgaCA9IDAuMDI1MTk2MDMyODI0MTY5MzggKiBuO1xuXHRcdFx0XHRuID0gaCA+Pj4gMDtcblx0XHRcdFx0aCAtPSBuO1xuXHRcdFx0XHRoICo9IG47XG5cdFx0XHRcdG4gPSBoID4+PiAwO1xuXHRcdFx0XHRoIC09IG47XG5cdFx0XHRcdG4gKz0gaCAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcblx0XHR9IGVsc2Uge1xuXHRcdFx0biA9IDB4ZWZjODI0OWQ7XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbWFzaDtcbn07XG5cbnZhciB1aGVwcm5nID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0cmV0dXJuIChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG8gPSA0ODsgLy8gc2V0IHRoZSAnb3JkZXInIG51bWJlciBvZiBFTlRST1BZLWhvbGRpbmcgMzItYml0IHZhbHVlc1xuXHRcdHZhciBjID0gMTsgLy8gaW5pdCB0aGUgJ2NhcnJ5JyB1c2VkIGJ5IHRoZSBtdWx0aXBseS13aXRoLWNhcnJ5IChNV0MpIGFsZ29yaXRobVxuXHRcdHZhciBwID0gbzsgLy8gaW5pdCB0aGUgJ3BoYXNlJyAobWF4LTEpIG9mIHRoZSBpbnRlcm1lZGlhdGUgdmFyaWFibGUgcG9pbnRlclxuXHRcdHZhciBzID0gbmV3IEFycmF5KG8pOyAvLyBkZWNsYXJlIG91ciBpbnRlcm1lZGlhdGUgdmFyaWFibGVzIGFycmF5XG5cdFx0dmFyIGk7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXHRcdHZhciBqOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblx0XHR2YXIgayA9IDA7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXG5cdFx0Ly8gd2hlbiBvdXIgXCJ1aGVwcm5nXCIgaXMgaW5pdGlhbGx5IGludm9rZWQgb3VyIFBSTkcgc3RhdGUgaXMgaW5pdGlhbGl6ZWQgZnJvbSB0aGVcblx0XHQvLyBicm93c2VyJ3Mgb3duIGxvY2FsIFBSTkcuIFRoaXMgaXMgb2theSBzaW5jZSBhbHRob3VnaCBpdHMgZ2VuZXJhdG9yIG1pZ2h0IG5vdFxuXHRcdC8vIGJlIHdvbmRlcmZ1bCwgaXQncyB1c2VmdWwgZm9yIGVzdGFibGlzaGluZyBsYXJnZSBzdGFydHVwIGVudHJvcHkgZm9yIG91ciB1c2FnZS5cblx0XHR2YXIgbWFzaCA9IG5ldyBNYXNoKCk7IC8vIGdldCBhIHBvaW50ZXIgdG8gb3VyIGhpZ2gtcGVyZm9ybWFuY2UgXCJNYXNoXCIgaGFzaFxuXG5cdFx0Ly8gZmlsbCB0aGUgYXJyYXkgd2l0aCBpbml0aWFsIG1hc2ggaGFzaCB2YWx1ZXNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRzW2ldID0gbWFzaChNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cblx0XHQvLyB0aGlzIFBSSVZBVEUgKGludGVybmFsIGFjY2VzcyBvbmx5KSBmdW5jdGlvbiBpcyB0aGUgaGVhcnQgb2YgdGhlIG11bHRpcGx5LXdpdGgtY2Fycnlcblx0XHQvLyAoTVdDKSBQUk5HIGFsZ29yaXRobS4gV2hlbiBjYWxsZWQgaXQgcmV0dXJucyBhIHBzZXVkby1yYW5kb20gbnVtYmVyIGluIHRoZSBmb3JtIG9mIGFcblx0XHQvLyAzMi1iaXQgSmF2YVNjcmlwdCBmcmFjdGlvbiAoMC4wIHRvIDwxLjApIGl0IGlzIGEgUFJJVkFURSBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBkZWZhdWx0XG5cdFx0Ly8gWzAtMV0gcmV0dXJuIGZ1bmN0aW9uLCBhbmQgYnkgdGhlIHJhbmRvbSAnc3RyaW5nKG4pJyBmdW5jdGlvbiB3aGljaCByZXR1cm5zICduJ1xuXHRcdC8vIGNoYXJhY3RlcnMgZnJvbSAzMyB0byAxMjYuXG5cdFx0dmFyIHJhd3BybmcgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoKytwID49IG8pIHtcblx0XHRcdFx0cCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdCA9IDE3Njg4NjMgKiBzW3BdICsgYyAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG5cdFx0XHRyZXR1cm4gc1twXSA9IHQgLSAoYyA9IHQgfCAwKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiBpcyB0aGUgZGVmYXVsdCBmdW5jdGlvbiByZXR1cm5lZCBieSB0aGlzIGxpYnJhcnkuXG5cdFx0Ly8gVGhlIHZhbHVlcyByZXR1cm5lZCBhcmUgaW50ZWdlcnMgaW4gdGhlIHJhbmdlIGZyb20gMCB0byByYW5nZS0xLiBXZSBmaXJzdFxuXHRcdC8vIG9idGFpbiB0d28gMzItYml0IGZyYWN0aW9ucyAoZnJvbSByYXdwcm5nKSB0byBzeW50aGVzaXplIGEgc2luZ2xlIGhpZ2hcblx0XHQvLyByZXNvbHV0aW9uIDUzLWJpdCBwcm5nICgwIHRvIDwxKSwgdGhlbiB3ZSBtdWx0aXBseSB0aGlzIGJ5IHRoZSBjYWxsZXInc1xuXHRcdC8vIFwicmFuZ2VcIiBwYXJhbSBhbmQgdGFrZSB0aGUgXCJmbG9vclwiIHRvIHJldHVybiBhIGVxdWFsbHkgcHJvYmFibGUgaW50ZWdlci5cblx0XHR2YXIgcmFuZG9tID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihyYW5nZSAqIChyYXdwcm5nKCkgKyAocmF3cHJuZygpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTYpKTsgLy8gMl4tNTNcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiAnc3RyaW5nKG4pJyByZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBzdHJpbmcgb2Zcblx0XHQvLyAnbicgcHJpbnRhYmxlIGNoYXJhY3RlcnMgcmFuZ2luZyBmcm9tIGNocigzMykgdG8gY2hyKDEyNikgaW5jbHVzaXZlLlxuXHRcdHJhbmRvbS5zdHJpbmcgPSBmdW5jdGlvbiAoY291bnQpIHtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIHMgPSAnJztcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cdFx0XHRcdHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMyArIHJhbmRvbSg5NCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgUFJJVkFURSBcImhhc2hcIiBmdW5jdGlvbiBpcyB1c2VkIHRvIGV2b2x2ZSB0aGUgZ2VuZXJhdG9yJ3MgaW50ZXJuYWxcblx0XHQvLyBlbnRyb3B5IHN0YXRlLiBJdCBpcyBhbHNvIGNhbGxlZCBieSB0aGUgRVhQT1JURUQgYWRkRW50cm9weSgpIGZ1bmN0aW9uXG5cdFx0Ly8gd2hpY2ggaXMgdXNlZCB0byBwb3VyIGVudHJvcHkgaW50byB0aGUgUFJORy5cblx0XHR2YXIgaGFzaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHtcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goYXJnc1tpXSk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJjbGVhbiBzdHJpbmdcIiBmdW5jdGlvbiByZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlcyBhbmQgbm9uLXByaW50aW5nXG5cdFx0Ly8gY29udHJvbCBjaGFyYWN0ZXJzLCBpbmNsdWRpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlLXJldHVybiAoQ1IpIGFuZCBsaW5lLWZlZWQgKExGKSBjaGFyYWN0ZXJzLFxuXHRcdC8vIGZyb20gYW55IHN0cmluZyBpdCBpcyBoYW5kZWQuIHRoaXMgaXMgYWxzbyB1c2VkIGJ5IHRoZSAnaGFzaHN0cmluZycgZnVuY3Rpb24gKGJlbG93KSB0byBoZWxwXG5cdFx0Ly8gdXNlcnMgYWx3YXlzIG9idGFpbiB0aGUgc2FtZSBFRkZFQ1RJVkUgdWhlcHJuZyBzZWVkaW5nIGtleS5cblx0XHRyYW5kb20uY2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoaW5TdHIpIHtcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2dpLCAnJyk7IC8vIHJlbW92ZSBhbnkvYWxsIGxlYWRpbmcgc3BhY2VzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1tcXHgwMC1cXHgxRl0vZ2ksICcnKTsgLy8gcmVtb3ZlIGFueS9hbGwgY29udHJvbCBjaGFyYWN0ZXJzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1xcbiAvLCAnXFxuJyk7IC8vIHJlbW92ZSBhbnkvYWxsIHRyYWlsaW5nIHNwYWNlc1xuXHRcdFx0cmV0dXJuIGluU3RyOyAvLyByZXR1cm4gdGhlIGNsZWFuZWQgdXAgcmVzdWx0XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJoYXNoIHN0cmluZ1wiIGZ1bmN0aW9uIGhhc2hlcyB0aGUgcHJvdmlkZWQgY2hhcmFjdGVyIHN0cmluZyBhZnRlciBmaXJzdCByZW1vdmluZ1xuXHRcdC8vIGFueSBsZWFkaW5nIG9yIHRyYWlsaW5nIHNwYWNlcyBhbmQgaWdub3JpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlIHJldHVybnMgKENSKSBvciBMaW5lIEZlZWRzIChMRilcblx0XHRyYW5kb20uaGFzaFN0cmluZyA9IGZ1bmN0aW9uIChpblN0cikge1xuXHRcdFx0aW5TdHIgPSByYW5kb20uY2xlYW5TdHJpbmcoaW5TdHIpO1xuXHRcdFx0bWFzaChpblN0cik7IC8vIHVzZSB0aGUgc3RyaW5nIHRvIGV2b2x2ZSB0aGUgJ21hc2gnIHN0YXRlXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgaW5TdHIubGVuZ3RoOyBpKyspIHsgLy8gc2NhbiB0aHJvdWdoIHRoZSBjaGFyYWN0ZXJzIGluIG91ciBzdHJpbmdcblx0XHRcdFx0ayA9IGluU3RyLmNoYXJDb2RlQXQoaSk7IC8vIGdldCB0aGUgY2hhcmFjdGVyIGNvZGUgYXQgdGhlIGxvY2F0aW9uXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHsgLy9cdFwibWFzaFwiIGl0IGludG8gdGhlIFVIRVBSTkcgc3RhdGVcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goayk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZWVkIHRoZSByYW5kb20gZ2VuZXJhdG9yLlxuXHRcdHJhbmRvbS5zZWVkID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0XHRcdGlmICh0eXBlb2Ygc2VlZCA9PT0gJ3VuZGVmaW5lZCcgfHwgc2VlZCA9PT0gbnVsbCkge1xuXHRcdFx0XHRzZWVkID0gTWF0aC5yYW5kb20oKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0c2VlZCA9IHN0cmluZ2lmeShzZWVkLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAodmFsdWUpLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyYW5kb20uaW5pdFN0YXRlKCk7XG5cdFx0XHRyYW5kb20uaGFzaFN0cmluZyhzZWVkKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBoYW5keSBleHBvcnRlZCBmdW5jdGlvbiBpcyB1c2VkIHRvIGFkZCBlbnRyb3B5IHRvIG91ciB1aGVwcm5nIGF0IGFueSB0aW1lXG5cdFx0cmFuZG9tLmFkZEVudHJvcHkgPSBmdW5jdGlvbiAoIC8qIGFjY2VwdCB6ZXJvIG9yIG1vcmUgYXJndW1lbnRzICovICkge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0YXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHR9XG5cdFx0XHRoYXNoKChrKyspICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArIGFyZ3Muam9pbignJykgKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2Ugd2FudCB0byBwcm92aWRlIGEgZGV0ZXJtaW5pc3RpYyBzdGFydHVwIGNvbnRleHQgZm9yIG91ciBQUk5HLFxuXHRcdC8vIGJ1dCB3aXRob3V0IGRpcmVjdGx5IHNldHRpbmcgdGhlIGludGVybmFsIHN0YXRlIHZhcmlhYmxlcywgdGhpcyBhbGxvd3Ncblx0XHQvLyB1cyB0byBpbml0aWFsaXplIHRoZSBtYXNoIGhhc2ggYW5kIFBSTkcncyBpbnRlcm5hbCBzdGF0ZSBiZWZvcmUgcHJvdmlkaW5nXG5cdFx0Ly8gc29tZSBoYXNoaW5nIGlucHV0XG5cdFx0cmFuZG9tLmluaXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1hc2goKTsgLy8gcGFzcyBhIG51bGwgYXJnIHRvIGZvcmNlIG1hc2ggaGFzaCB0byBpbml0XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRcdHNbaV0gPSBtYXNoKCcgJyk7IC8vIGZpbGwgdGhlIGFycmF5IHdpdGggaW5pdGlhbCBtYXNoIGhhc2ggdmFsdWVzXG5cdFx0XHR9XG5cdFx0XHRjID0gMTsgLy8gaW5pdCBvdXIgbXVsdGlwbHktd2l0aC1jYXJyeSBjYXJyeVxuXHRcdFx0cCA9IG87IC8vIGluaXQgb3VyIHBoYXNlXG5cdFx0fTtcblxuXHRcdC8vIHdlIHVzZSB0aGlzIChvcHRpb25hbCkgZXhwb3J0ZWQgZnVuY3Rpb24gdG8gc2lnbmFsIHRoZSBKYXZhU2NyaXB0IGludGVycHJldGVyXG5cdFx0Ly8gdGhhdCB3ZSdyZSBmaW5pc2hlZCB1c2luZyB0aGUgXCJNYXNoXCIgaGFzaCBmdW5jdGlvbiBzbyB0aGF0IGl0IGNhbiBmcmVlIHVwIHRoZVxuXHRcdC8vIGxvY2FsIFwiaW5zdGFuY2UgdmFyaWFibGVzXCIgaXMgd2lsbCBoYXZlIGJlZW4gbWFpbnRhaW5pbmcuICBJdCdzIG5vdCBzdHJpY3RseVxuXHRcdC8vIG5lY2Vzc2FyeSwgb2YgY291cnNlLCBidXQgaXQncyBnb29kIEphdmFTY3JpcHQgY2l0aXplbnNoaXAuXG5cdFx0cmFuZG9tLmRvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtYXNoID0gbnVsbDtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2UgY2FsbGVkIFwidWhlcHJuZ1wiIHdpdGggYSBzZWVkIHZhbHVlLCB0aGVuIGV4ZWN1dGUgcmFuZG9tLnNlZWQoKSBiZWZvcmUgcmV0dXJuaW5nXG5cdFx0aWYgKHR5cGVvZiBzZWVkICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmFuZG9tLnNlZWQoc2VlZCk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgcmFuZ2UgKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20ucmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiByYW5kb20ocmFuZ2UpO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgMSAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5yYW5kb20gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tKE51bWJlci5NQVhfVkFMVUUgLSAxKSAvIE51bWJlci5NQVhfVkFMVUU7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gZmxvYXQgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5mbG9hdEJldHdlZW4gPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0XHRcdHJldHVybiByYW5kb20ucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcblx0XHRyYW5kb20uaW50QmV0d2VlbiA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IocmFuZG9tLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gd2hlbiBvdXIgbWFpbiBvdXRlciBcInVoZXBybmdcIiBmdW5jdGlvbiBpcyBjYWxsZWQsIGFmdGVyIHNldHRpbmcgdXAgb3VyXG5cdFx0Ly8gaW5pdGlhbCB2YXJpYWJsZXMgYW5kIGVudHJvcGljIHN0YXRlLCB3ZSByZXR1cm4gYW4gXCJpbnN0YW5jZSBwb2ludGVyXCJcblx0XHQvLyB0byB0aGUgaW50ZXJuYWwgYW5vbnltb3VzIGZ1bmN0aW9uIHdoaWNoIGNhbiB0aGVuIGJlIHVzZWQgdG8gYWNjZXNzXG5cdFx0Ly8gdGhlIHVoZXBybmcncyB2YXJpb3VzIGV4cG9ydGVkIGZ1bmN0aW9ucy4gIEFzIHdpdGggdGhlIFwiLmRvbmVcIiBmdW5jdGlvblxuXHRcdC8vIGFib3ZlLCB3ZSBzaG91bGQgc2V0IHRoZSByZXR1cm5lZCB2YWx1ZSB0byAnbnVsbCcgb25jZSB3ZSdyZSBmaW5pc2hlZFxuXHRcdC8vIHVzaW5nIGFueSBvZiB0aGVzZSBmdW5jdGlvbnMuXG5cdFx0cmV0dXJuIHJhbmRvbTtcblx0fSgpKTtcbn07XG5cbi8vIE1vZGlmaWNhdGlvbiBmb3IgdXNlIGluIG5vZGU6XG51aGVwcm5nLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdHJldHVybiBuZXcgdWhlcHJuZyhzZWVkKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHVoZXBybmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuZXhwb3J0cy5nZXRTZXJpYWxpemUgPSBzZXJpYWxpemVyXG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXMsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlciksIHNwYWNlcylcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplcihyZXBsYWNlciwgY3ljbGVSZXBsYWNlcikge1xuICB2YXIgc3RhY2sgPSBbXSwga2V5cyA9IFtdXG5cbiAgaWYgKGN5Y2xlUmVwbGFjZXIgPT0gbnVsbCkgY3ljbGVSZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2tbMF0gPT09IHZhbHVlKSByZXR1cm4gXCJbQ2lyY3VsYXIgfl1cIlxuICAgIHJldHVybiBcIltDaXJjdWxhciB+LlwiICsga2V5cy5zbGljZSgwLCBzdGFjay5pbmRleE9mKHZhbHVlKSkuam9pbihcIi5cIikgKyBcIl1cIlxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHRoaXNQb3MgPSBzdGFjay5pbmRleE9mKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IHN0YWNrLnNwbGljZSh0aGlzUG9zICsgMSkgOiBzdGFjay5wdXNoKHRoaXMpXG4gICAgICB+dGhpc1BvcyA/IGtleXMuc3BsaWNlKHRoaXNQb3MsIEluZmluaXR5LCBrZXkpIDoga2V5cy5wdXNoKGtleSlcbiAgICAgIGlmICh+c3RhY2suaW5kZXhPZih2YWx1ZSkpIHZhbHVlID0gY3ljbGVSZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGVsc2Ugc3RhY2sucHVzaCh2YWx1ZSlcblxuICAgIHJldHVybiByZXBsYWNlciA9PSBudWxsID8gdmFsdWUgOiByZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzb24tc3RyaW5naWZ5LXNhZmUvc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHRlcnJhcGFpbnQgZnJvbSAndGVycmFwYWludCdcclxuaW1wb3J0IHsgU2ltcGxleDIsIFBlcmxpbjIgfSBmcm9tICcuLi9zcmMvaW5kZXgnXHJcblxyXG52YXIgc2VlZCA9IE1hdGgucmFuZG9tKClcclxudmFyIHBlcmxpbkdlbiA9IG5ldyBQZXJsaW4yKHNlZWQpXHJcbnZhciBzaW1wbGV4R2VuID0gbmV3IFNpbXBsZXgyKHNlZWQpXHJcbnRlcnJhcGFpbnQoc2ltcGxleEdlbiwgMjU2LCAyNTYsIHtcclxuICBvZmZzZXQ6IHRydWVcclxufSlcclxudGVycmFwYWludChwZXJsaW5HZW4sIDI1NiwgMjU2LCB7XHJcbiAgb2Zmc2V0OiB0cnVlXHJcbn0pXHJcblxyXG5cclxuLyppbXBvcnQgdHVtdWx0IGZyb20gJy4uL3NyYy9pbmRleCdcclxudHVtdWx0LnNlZWQoTWF0aC5yYW5kb20oKSlcclxudGVycmFwYWludCh0dW11bHQucGVybGluMiwgMjU2LCAyNTYsIHtcclxuICBvZmZzZXQ6IHRydWVcclxufSlcclxudGVycmFwYWludCh0dW11bHQucGVybGluTiwgMjU2LCAyNTYsIHtcclxuICBvZmZzZXQ6IHRydWVcclxufSkqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RvY3MvZGVtby5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ0cnkge1xyXG4gIHZhciBpbWFnZVRlc3QgPSBuZXcgSW1hZ2VEYXRhKDIwLCAyMClcclxuICB2YXIgbnVtYmVyVGVzdCA9IE1hdGgudHJ1bmMoMjAuMSlcclxufSBjYXRjaCAoZSkge1xyXG4gIHZhciBlcnIgPSAnRXJyb3IsIGJyb3dzZXIgbm90IHN1cHBvcnRlZCBieSBUZXJyYXBhaW50LiAnXHJcbiAgZXJyICs9ICdQbGVhc2Ugc3dpdGNoIHRvIFZpdmFsZGksIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIG9yIFNhZmFyaS4nXHJcbiAgY29uc29sZS5sb2coZXJyKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXJyYXBhaW50IChub2lzZSwgdywgaCwgb3B0aW9ucykge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgdmFyIG9jdGF2ZXMgPSBvcHRpb25zLm9jdGF2ZXMgfHwgMVxyXG4gIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZCB8fCAzMlxyXG4gIHZhciBvZmZzZXQgPSBvcHRpb25zLm9mZnNldCA/IDEgOiAwXHJcbiAgdmFyIHBlcnNpc3RhbmNlID0gb3B0aW9ucy5wZXJzaXN0YW5jZSB8fCAyXHJcbiAgdmFyIGNvbG9ybWFwID0gb3B0aW9ucy5jb2xvcm1hcCB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gW3YsIHYsIHYsIDI1NV0gfVxyXG4gIHZhciB0YXJnZXQgPSBvcHRpb25zLnRhcmdldCB8fCBkb2N1bWVudC5ib2R5XHJcbiAgdGFyZ2V0ID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgXHJcbiAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxyXG4gICAgOiB0YXJnZXRcclxuXHJcbiAgdmFyIG9jdGF2YXRlID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgdmFyIHZhbCA9IDBcclxuICAgIHZhciBtYXggPSAwXHJcbiAgICB2YXIgcCA9IHBlcmlvZFxyXG4gICAgdmFyIGFtcCA9IE1hdGgucG93KHBlcnNpc3RhbmNlLCBvY3RhdmVzKVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvY3RhdmVzOyBpKyspIHtcclxuICAgICAgdmFsICs9IChub2lzZSh4IC8gcCwgeSAvIHApICsgb2Zmc2V0KSAqIGFtcFxyXG4gICAgICBtYXggKz0gYW1wICogKG9mZnNldCArIDEpXHJcbiAgICAgIGFtcCAvPSBwZXJzaXN0YW5jZVxyXG4gICAgICBwIC89IDJcclxuICAgIH1cclxuICAgIHJldHVybiB2YWwgLyBtYXhcclxuICB9XHJcbiBcclxuICB2YXIgbWFwID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHcgKiBoICogNClcclxuICBmb3IgKHZhciB5ID0gMDsgeSA8IGg7IHkrKykge1xyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB3OyB4KyspIHtcclxuICAgICAgdmFyIHZhbCA9IE1hdGgudHJ1bmMob2N0YXZhdGUoeCwgeSkgKiAyNTUpXHJcbiAgICAgIHZhciBwaXhlbERhdGFcclxuICAgICAgaWYgKHR5cGVvZiBjb2xvcm1hcCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHBpeGVsRGF0YSA9IGNvbG9ybWFwKHZhbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwaXhlbERhdGEgPSBjb2xvcm1hcFt2YWxdXHJcbiAgICAgIH1cclxuICAgICAgbWFwLnNldChwaXhlbERhdGEsIHggKiA0ICsgeSAqIDQgKiB3KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcbiAgdmFyIGltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEobWFwLCB3LCBoKVxyXG4gIGNhbnZhcy53aWR0aCA9IHdcclxuICBjYW52YXMuaGVpZ2h0ID0gaFxyXG4gIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxyXG4gIHRhcmdldC5hcHBlbmRDaGlsZChjYW52YXMpXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGVycmFwYWludFxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9