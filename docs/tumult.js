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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWNlOWIzYmI5N2I3YmFkNzgzYzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOlsiY29uc3QiLCJ0aGlzIiwic3VwZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7Ozs7Ozs7O0FBUUEsSUFBSSxJQUFJLEdBQUcsbUJBQU8sQ0FBQyxDQUFhLENBQUM7QUFDakMsSUFBSSxHQUFHO0FBQ1AsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDM0I7QUFDRCxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUU7RUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDNUM7QUFDRCxTQUFTLEdBQUcsRUFBUyxFQUFFLENBQUM7OztBQUFBO0VBQ3RCQSxHQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSyxZQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBRSxDQUFDLENBQUM7RUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0NBQ3JCOztBQUVELElBQU0sS0FBSyxHQUNULGNBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtFQUNkLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUM7RUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDO0FBQ0QsbUJBQUksbUJBQUcsRUFBRTtBQUNULG9CQUFLLGtCQUFDLENBQUMsRUFBRSxDQUFDOztBQUFBO0VBQ1IsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0VBQ3RCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUNwQixJQUFJLENBQUM7RUFDTCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFBQyxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDdkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUNoQixJQUFJLElBQUksR0FBR0EsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEJBLE1BQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdBLE1BQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCQSxNQUFJLENBQUMs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RSxHQUFHLENBQUM7SUFDbEQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDNUQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7O0lBRTFELE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7R0FDM0IsQ0FDRjs7O0VBL0I2QixLQStCN0I7OztBQUdELElBQUksRUFBRSxHQUFHO0VBQ1AsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM5RSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzlFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNuRjtBQUNELFNBQVMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNO0VBQ3pDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztDQUNoQjtBQUNELFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUNYO0FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN0QyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUM1QztBQUNNLElBQU0sT0FBTyxHQUFjO0VBQ2hDLGdCQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDZEEsS0FBSyxNQUFDLE9BQUMsQ0FBQztHQUNUOzs7OzBDQUFBO0VBQ0QscUJBQUksaUJBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRzs7SUFFNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFOztJQUVmLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM1QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7O0lBRXBFLE9BQU8sSUFBSTtNQUNULElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUksQ0FBQyxFQUFFLENBQUM7S0FDVDtHQUNGLENBQ0Y7OztFQXBDNEIsS0FvQzVCOzs7QUFHRCxJQUFJLEVBQUUsR0FBRztFQUNQLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDOUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUYsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM5RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUMxRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlGLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFGLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDL0Y7QUFDRCxTQUFTLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDMUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNO0VBQ2hELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztDQUNoQjtBQUNELFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUN6QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDWDtBQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3pDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ3pEO0FBQ00sSUFBTSxPQUFPLEdBQWM7RUFDaEMsZ0JBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNkQSxLQUFLLE1BQUMsT0FBQyxDQUFDO0dBQ1Q7Ozs7MENBQUE7RUFDRCxxQkFBSSxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDakIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO0VBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztFQUM1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7RUFDNUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHOztFQUU1QixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtFQUNmLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0VBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7RUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTs7RUFFZixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNyRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDekQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ3pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUN6RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNqRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNqRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3JFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNyRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUM3RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDckUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0UsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDN0UsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7RUFFckYsT0FBTyxJQUFJO0lBQ1QsSUFBSTtNQUNGLElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUM7T0FDVDtNQUNELElBQUksQ0FBQyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUk7TUFDRixJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDO09BQ1Q7TUFDRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssRUFB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Z0RBQWdEO0FBQ2hELDhDQUE4QztBQUM5QyxzQ0FBc0M7QUFDdEMsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGNBQWMsa0JBQWtCLE9BQU87QUFDdkMsNEJBQTRCO0FBQzVCLGVBQWUsT0FBTyxPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxzQkFBc0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixjQUFjLE9BQU87QUFDckIscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM1FBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoidHVtdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWNlOWIzYmI5N2I3YmFkNzgzYzIiLCIvLyBUdW11bHQsIEphdmFTY3JpcHQgbm9pc2UgZ2VuZXJhdG9yXHJcbi8vIENyZWF0ZWQgYnkgUGhpbGlwIFNjb3R0IHwgU2NvdHR5RmlsbHVwcywgMjAxN1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vU2NvdHR5RmlsbHVwc1xyXG5cclxuLy8gTm9pc2UgYWxnb3JpdGhtcyBieSBLZW4gUGVybGluXHJcbi8vIFVzZXMgXCJyYW5kb20tc2VlZFwiIHBhY2thZ2Ugb24gTlBNIGZvciBzZWVkaW5nIGZ1bmN0aW9uXHJcblxyXG5cclxudmFyIHJhbmQgPSByZXF1aXJlKCdyYW5kb20tc2VlZCcpXHJcbnZhciBybmdcclxuZnVuY3Rpb24gbGVycCAoYSwgYiwgdCkge1xyXG4gIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0XHJcbn1cclxuZnVuY3Rpb24gZmFkZSAodCkge1xyXG4gIHJldHVybiB0ICogdCAqIHQgKiAoMTAgKyB0ICogKC0xNSArIHQgKiA2KSlcclxufVxyXG5mdW5jdGlvbiBjdXQgKC4uLmFyZ3MpIHtcclxuICBjb25zdCB0ID0gMSAtIGFyZ3MucmVkdWNlKChzdW0sIHZhbCkgPT4gc3VtICsgdmFsICogdmFsLCAwKVxyXG4gIHJldHVybiB0ICogdCAqIHQgKiB0XHJcbn1cclxuXHJcbmNsYXNzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgcCA9IG5ldyBVaW50OEFycmF5KDUxMilcclxuICAgIHRoaXMuc2VlZChzKVxyXG4gIH1cclxuICBnZW4gKCkge31cclxuICBzZWVkIChzKSB7XHJcbiAgICBzID0gcyB8fCBNYXRoLnJhbmRvbSgpXHJcbiAgICBybmcgPSByYW5kLmNyZWF0ZShzKVxyXG4gICAgdmFyIGlcclxuICAgIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykgdGhpcy5wW2ldID0gaVxyXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XHJcbiAgICAgIHZhciByID0gcm5nKDI1NilcclxuICAgICAgdmFyIHRlbXAgPSB0aGlzLnBbaV1cclxuICAgICAgdGhpcy5wW2ldID0gdGhpcy5wW3JdXHJcbiAgICAgIHRoaXMucFtyXSA9IHRlbXBcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykgdGhpcy5wW2kgKyAyNTZdID0gcFtpXVxyXG4gIH1cclxuICB0cmFuc2Zvcm0gKGZuKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgcmV0dXJuIGZuKHRoaXMuZ2VuLmFwcGx5KGFyZ3MpKVxyXG4gICAgfVxyXG4gIH1cclxuICAvKm9jdGF2YXRlIChvY3RhdmVzLCBvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgdmFyIHBlcnNpc3RhbmNlID0gb3B0aW9ucy5wZXJzaXN0YW5jZSB8fCAyXHJcbiAgICB2YXIgcGVyaW9kID0gb3B0aW9ucy5wZXJpb2QgfHwgNlxyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAvLyBmbih0aGlzLmdlbi5hcHBseShhcmdzKVxyXG4gICAgfVxyXG4gIH0qL1xyXG59XHJcblxyXG5cclxudmFyIGcxID0gWyBuZXcgVmVjMSgxKSwgbmV3IFZlYzEoLTEpIF1cclxuZnVuY3Rpb24gZ3JhZDEgKHgpIHtcclxuICB2YXIgaGFzaCA9IHBbeF0gJSBnMS5sZW5ndGhcclxuICByZXR1cm4gZzFbaGFzaF1cclxufVxyXG5mdW5jdGlvbiBWZWMxICh4KSB7XHJcbiAgdGhpcy54ID0geFxyXG59XHJcblZlYzEucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgcmV0dXJuIHRoaXMueCAqIHhcclxufVxyXG5leHBvcnQgY2xhc3MgUGVybGluMSBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4KSB7XHJcbiAgICB2YXIgZ3ggPSBNYXRoLmZsb29yKHgpICUgMjU2XHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuXHJcbiAgICB2YXIgbjAgPSBncmFkMShneCkuZG90KGR4KVxyXG4gICAgdmFyIG4xID0gZ3JhZDEoZ3ggKyAxKS5kb3QoZHggLSAxKVxyXG5cclxuICAgIHJldHVybiBsZXJwKG4wLCBuMSwgZmFkZShkeCkpXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTaW1wbGV4MSBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4KSB7XHJcbiAgICB2YXIgZ3ggPSBNYXRoLmZsb29yKHgpICUgMjU2XHJcbiAgICB2YXIgZHggPSB4IC0gZ3hcclxuXHJcbiAgICB2YXIgbjAgPSBjdXQoZHgpICogZ3JhZDEoZ3gpLmRvdChkeClcclxuICAgIHZhciBuMSA9IGN1dChkeCAtIDEpICogZ3JhZDEoZ3ggKyAxKS5kb3QoZHggLSAxKVxyXG5cclxuICAgIHJldHVybiAwLjUgKiAobjAgKyBuMSlcclxuICB9XHJcbn1cclxuLy8gbm9pc2UsIG5vaXNlMSBub2lzZTIgbm9pc2UzLCBcclxuLy8gdGhlbiBwZXJsaW5zLCBzaW1wbGV4ZXMsIGV0Y1xyXG4vLyB0aGlzIHdpbGwgYmUgZG9uZSB3aGVuIHlvdSB3YW50IHRvIHNwbGl0IGZpbGVzXHJcbi8vIHR5cGVkIGFycmF5IGxvb2sgdXAgdGFibGU/XHJcblxyXG52YXIgZzIgPSBbXHJcbiAgbmV3IFZlYzIoMSwgMCksIG5ldyBWZWMyKDEsIDEpLCBuZXcgVmVjMigwLCAxKSwgbmV3IFZlYzIoLTEsIDEpLFxyXG4gIG5ldyBWZWMyKC0xLCAwKSwgbmV3IFZlYzIoLTEsIC0xKSwgbmV3IFZlYzIoMCwgLTEpLCBuZXcgVmVjMigxLCAtMSlcclxuXVxyXG5mdW5jdGlvbiBncmFkMiAoeCwgeSkge1xyXG4gIHZhciBoYXNoID0gcFt4ICsgcFt5XV0gJSBnMi5sZW5ndGhcclxuICByZXR1cm4gZzJbaGFzaF1cclxufVxyXG5mdW5jdGlvbiBWZWMyICh4LCB5KSB7XHJcbiAgdGhpcy54ID0geFxyXG4gIHRoaXMueSA9IHlcclxufVxyXG5WZWMyLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeVxyXG59XHJcbnZhciBTMl9UT19DID0gMC41ICogKE1hdGguc3FydCgzKSAtIDEpXHJcbnZhciBDX1RPX1MyID0gKDMgLSBNYXRoLnNxcnQoMykpIC8gNlxyXG5leHBvcnQgY2xhc3MgUGVybGluMiBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4LCB5KSB7XHJcbiAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XHJcblxyXG4gICAgdmFyIGR4ID0geCAtIGd4XHJcbiAgICB2YXIgZHkgPSB5IC0gZ3lcclxuXHJcbiAgICB2YXIgbjAwID0gZ3JhZDIoZ3gsIGd5KS5kb3QoZHgsIGR5KVxyXG4gICAgdmFyIG4xMCA9IGdyYWQyKGd4ICsgMSwgZ3kpLmRvdChkeCAtIDEsIGR5KVxyXG4gICAgdmFyIG4wMSA9IGdyYWQyKGd4LCBneSArIDEpLmRvdChkeCwgZHkgLSAxKVxyXG4gICAgdmFyIG4xMSA9IGdyYWQyKGd4ICsgMSwgZ3kgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEpXHJcblxyXG4gICAgcmV0dXJuIGxlcnAoXHJcbiAgICAgIGxlcnAobjAwLCBuMTAsIGZhZGUoZHgpKSxcclxuICAgICAgbGVycChuMDEsIG4xMSwgZmFkZShkeCkpLFxyXG4gICAgICBmYWRlKGR5KVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5leHBvcnQgY2xhc3MgU2ltcGxleDIgZXh0ZW5kcyBOb2lzZSB7XHJcbiAgY29uc3RydWN0b3IgKHMpIHtcclxuICAgIHN1cGVyKHMpXHJcbiAgfVxyXG4gIGdlbiAoeCwgeSkge1xyXG4gICAgdmFyIHNrZXcgPSAoeCArIHkpICogUzJfVE9fQ1xyXG4gICAgdmFyIGkgPSBNYXRoLnRydW5jKHggKyBza2V3KVxyXG4gICAgdmFyIGogPSBNYXRoLnRydW5jKHkgKyBza2V3KVxyXG5cclxuICAgIHZhciB1bnNrZXcgPSAoaSArIGopICogQ19UT19TMlxyXG4gICAgdmFyIGd4ID0gaSAtIHVuc2tld1xyXG4gICAgdmFyIGd5ID0gaiAtIHVuc2tld1xyXG5cclxuICAgIHZhciBkeDAgPSB4IC0gZ3hcclxuICAgIHZhciBkeTAgPSB5IC0gZ3lcclxuXHJcbiAgICB2YXIgZGkgPSBkeDAgPiBkeTAgPyAxIDogMFxyXG4gICAgdmFyIGRqID0gZHgwID4gZHkwID8gMCA6IDFcclxuXHJcbiAgICAvLyB3aHkgaXNuJ3QgaXQgKyBkaSAtIENfVE9fUzI/XHJcbiAgICB2YXIgZHgxID0gZHgwIC0gZGkgKyBDX1RPX1MyXHJcbiAgICB2YXIgZHkxID0gZHkwIC0gZGogKyBDX1RPX1MyXHJcbiAgICB2YXIgZHgyID0gZHgwIC0gMSArIDIgKiBDX1RPX1MyXHJcbiAgICB2YXIgZHkyID0gZHkwIC0gMSArIDIgKiBDX1RPX1MyXHJcblxyXG4gICAgdmFyIG4wID0gY3V0KGR4MCwgZHkwKSAqIGdyYWQyKGksIGopLmRvdChkeDAsIGR5MClcclxuICAgIHZhciBuMSA9IGN1dChkeDEsIGR5MSkgKiBncmFkMihpICsgZGksIGogKyBkaikuZG90KGR4MSwgZHkxKVxyXG4gICAgdmFyIG4yID0gY3V0KGR4MiwgZHkyKSAqIGdyYWQyKGkgKyAxLCBqICsgMSkuZG90KGR4MiwgZHkyKVxyXG5cclxuICAgIHJldHVybiA3MCAqIChuMCArIG4xICsgbjIpXHJcbiAgfVxyXG59XHJcblxyXG5cclxudmFyIGczID0gW1xyXG4gIG5ldyBWZWMzKDEsIDEsIDEpLCBuZXcgVmVjMygtMSwgMSwgMSksIG5ldyBWZWMzKDEsIC0xLCAxKSwgbmV3IFZlYzMoLTEsIC0xLCAxKSxcclxuICBuZXcgVmVjMygxLCAxLCAwKSwgbmV3IFZlYzMoLTEsIDEsIDApLCBuZXcgVmVjMygxLCAtMSwgMCksIG5ldyBWZWMzKC0xLCAtMSwgMCksXHJcbiAgbmV3IFZlYzMoMSwgMSwgLTEpLCBuZXcgVmVjMygtMSwgMSwgLTEpLCBuZXcgVmVjMygxLCAtMSwgLTEpLCBuZXcgVmVjMygtMSwgLTEsIC0xKVxyXG5dXHJcbmZ1bmN0aW9uIGdyYWQzICh4LCB5LCB6KSB7XHJcbiAgdmFyIGhhc2ggPSBwW3ggKyBwW3kgKyBwW3pdXV0gJSBnMy5sZW5ndGhcclxuICByZXR1cm4gZzNbaGFzaF1cclxufVxyXG5mdW5jdGlvbiBWZWMzICh4LCB5LCB6KSB7XHJcbiAgdGhpcy54ID0geFxyXG4gIHRoaXMueSA9IHlcclxuICB0aGlzLnogPSB6XHJcbn1cclxuVmVjMy5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHksIHopIHtcclxuICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHkgKyB0aGlzLnogKiB6XHJcbn1cclxuZXhwb3J0IGNsYXNzIFBlcmxpbjMgZXh0ZW5kcyBOb2lzZSB7XHJcbiAgY29uc3RydWN0b3IgKHMpIHtcclxuICAgIHN1cGVyKHMpXHJcbiAgfVxyXG4gIGdlbiAoeCwgeSwgeikge1xyXG4gICAgdmFyIGd4ID0gTWF0aC50cnVuYyh4KSAlIDI1NlxyXG4gICAgdmFyIGd5ID0gTWF0aC50cnVuYyh5KSAlIDI1NlxyXG4gICAgdmFyIGd6ID0gTWF0aC50cnVuYyh6KSAlIDI1NlxyXG5cclxuICAgIHZhciBkeCA9IHggLSBneFxyXG4gICAgdmFyIGR5ID0geSAtIGd5XHJcbiAgICB2YXIgZHogPSB6IC0gZ3pcclxuXHJcbiAgICB2YXIgbjAwMCA9IGdyYWQzKGd4LCBneSwgZ3opLmRvdChkeCwgZHksIGR6KVxyXG4gICAgdmFyIG4xMDAgPSBncmFkMyhneCArIDEsIGd5LCBneikuZG90KGR4IC0gMSwgZHksIGR6KVxyXG4gICAgdmFyIG4wMTAgPSBncmFkMyhneCwgZ3kgKyAxLCBneikuZG90KGR4LCBkeSAtIDEsIGR6KVxyXG4gICAgdmFyIG4xMTAgPSBncmFkMyhneCArIDEsIGd5ICsgMSwgZ3opLmRvdChkeCAtIDEsIGR5IC0gMSwgZHopXHJcbiAgICB2YXIgbjAwMSA9IGdyYWQzKGd4LCBneSwgZ3ogKyAxKS5kb3QoZHgsIGR5LCBkeiAtIDEpXHJcbiAgICB2YXIgbjEwMSA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSlcclxuICAgIHZhciBuMDExID0gZ3JhZDMoZ3gsIGd5ICsgMSwgZ3ogKyAxKS5kb3QoZHgsIGR5IC0gMSwgZHogLSAxKVxyXG4gICAgdmFyIG4xMTEgPSBncmFkMyhneCArIDEsIGd5ICsgMSwgZ3ogKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSlcclxuXHJcbiAgICByZXR1cm4gbGVycChcclxuICAgICAgbGVycChcclxuICAgICAgICBsZXJwKG4wMDAsIG4xMDAsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTAsIG4xMTAsIGR4KSxcclxuICAgICAgICBmYWRlKGR5KVxyXG4gICAgICApLFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMSwgbjEwMSwgZHgpLFxyXG4gICAgICAgIGxlcnAobjAxMSwgbjExMSwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGZhZGUoZHopXHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5cclxudmFyIGc0ID0gW1xyXG4gIG5ldyBWZWM0KDAsIDEsIDEsIDEpLCBuZXcgVmVjNCgwLCAxLCAxLCAtMSksIG5ldyBWZWM0KDAsIDEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgMSwgLTEsIC0xKSxcclxuICBuZXcgVmVjNCgwLCAtMSwgMSwgMSksIG5ldyBWZWM0KDAsIC0xLCAxLCAtMSksIG5ldyBWZWM0KDAsIC0xLCAtMSwgMSksIG5ldyBWZWM0KDAsIC0xLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KDEsIDAsIDEsIDEpLCBuZXcgVmVjNCgxLCAwLCAxLCAtMSksIG5ldyBWZWM0KDEsIDAsIC0xLCAxKSwgbmV3IFZlYzQoMSwgMCwgLTEsIC0xKSxcclxuICBuZXcgVmVjNCgtMSwgMCwgMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAxLCAtMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KDEsIDEsIDAsIDEpLCBuZXcgVmVjNCgxLCAxLCAwLCAtMSksIG5ldyBWZWM0KDEsIC0xLCAwLCAxKSwgbmV3IFZlYzQoMSwgLTEsIDAsIC0xKSxcclxuICBuZXcgVmVjNCgtMSwgMSwgMCwgMSksIG5ldyBWZWM0KC0xLCAxLCAwLCAtMSksIG5ldyBWZWM0KC0xLCAtMSwgMCwgMSksIG5ldyBWZWM0KC0xLCAtMSwgMCwgLTEpLFxyXG4gIG5ldyBWZWM0KDEsIDEsIDEsIDApLCBuZXcgVmVjNCgxLCAxLCAtMSwgMCksIG5ldyBWZWM0KDEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoMSwgLTEsIC0xLCAwKSxcclxuICBuZXcgVmVjNCgtMSwgMSwgMSwgMCksIG5ldyBWZWM0KC0xLCAxLCAtMSwgMCksIG5ldyBWZWM0KC0xLCAtMSwgMSwgMCksIG5ldyBWZWM0KC0xLCAtMSwgLTEsIDApXHJcbl1cclxuZnVuY3Rpb24gZ3JhZDQgKHgsIHksIHosIHQpIHtcclxuICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbeiArIHBbdF1dXV0gJSBnNC5sZW5ndGhcclxuICByZXR1cm4gZzRbaGFzaF1cclxufVxyXG5mdW5jdGlvbiBWZWM0ICh4LCB5LCB6LCB0KSB7XHJcbiAgdGhpcy54ID0geFxyXG4gIHRoaXMueSA9IHlcclxuICB0aGlzLnogPSB6XHJcbiAgdGhpcy50ID0gdFxyXG59XHJcblZlYzQucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uICh4LCB5LCB6LCB0KSB7XHJcbiAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5ICsgdGhpcy56ICogeiArIHRoaXMudCAqIHRcclxufVxyXG5leHBvcnQgY2xhc3MgUGVybGluNCBleHRlbmRzIE5vaXNlIHtcclxuICBjb25zdHJ1Y3RvciAocykge1xyXG4gICAgc3VwZXIocylcclxuICB9XHJcbiAgZ2VuICh4LCB5LCB6LCB0KSB7XHJcbiAgdmFyIGd4ID0gTWF0aC50cnVuYyh4KSAlIDI1NlxyXG4gIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcclxuICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XHJcbiAgdmFyIGd0ID0gTWF0aC50cnVuYyh0KSAlIDI1NlxyXG5cclxuICB2YXIgZHggPSB4IC0gZ3hcclxuICB2YXIgZHkgPSB5IC0gZ3lcclxuICB2YXIgZHogPSB6IC0gZ3pcclxuICB2YXIgZHQgPSB0IC0gZ3RcclxuXHJcbiAgdmFyIG4wMDAwID0gZ3JhZDQoZ3gsIGd5LCBneiwgZ3QpLmRvdChkeCwgZHksIGR6LCBkdClcclxuICB2YXIgbjEwMDAgPSBncmFkNChneCArIDEsIGd5LCBneiwgZ3QpLmRvdChkeCAtIDEsIGR5LCBkeilcclxuICB2YXIgbjAxMDAgPSBncmFkNChneCwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCwgZHkgLSAxLCBkeilcclxuICB2YXIgbjExMDAgPSBncmFkNChneCArIDEsIGd5ICsgMSwgZ3osIGd0KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6KVxyXG4gIHZhciBuMDAxMCA9IGdyYWQ0KGd4LCBneSwgZ3ogKyAxLCBndCkuZG90KGR4LCBkeSwgZHogLSAxKVxyXG4gIHZhciBuMTAxMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6ICsgMSwgZ3QpLmRvdChkeCAtIDEsIGR5LCBkeiAtIDEpXHJcbiAgdmFyIG4wMTEwID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3ogKyAxLCBndCkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSlcclxuICB2YXIgbjExMTAgPSBncmFkNChneCArIDEsIGd5ICsgMSwgZ3ogKyAxLCBndCkuZG90KGR4IC0gMSwgZHkgLSAxLCBkeiAtIDEpXHJcbiAgdmFyIG4wMDAxID0gZ3JhZDQoZ3gsIGd5LCBneiwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiwgZHQgLSAxKVxyXG4gIHZhciBuMTAwMSA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6LCBndCArIDEpLmRvdChkeCAtIDEsIGR5LCBkeiwgZHQgLSAxKVxyXG4gIHZhciBuMDEwMSA9IGdyYWQ0KGd4LCBneSArIDEsIGd6LCBndCArIDEpLmRvdChkeCwgZHkgLSAxLCBkeiwgZHQgLSAxKVxyXG4gIHZhciBuMTEwMSA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4wMDExID0gZ3JhZDQoZ3gsIGd5LCBneiArIDEsIGd0ICsgMSkuZG90KGR4LCBkeSwgZHogLSAxLCBkdCAtIDEpXHJcbiAgdmFyIG4xMDExID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3ogKyAxLCBndCArIDEpLmRvdChkeCAtIDEsIGR5LCBkeiAtIDEsIGR0IC0gMSlcclxuICB2YXIgbjAxMTEgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxyXG4gIHZhciBuMTExMSA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiArIDEsIGd0ICsgMSkuZG90KGR4IC0gMSwgZHkgLSAxLCBkeiAtIDEsIGR0IC0gMSlcclxuXHJcbiAgcmV0dXJuIGxlcnAoXHJcbiAgICBsZXJwKFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMDAsIG4xMDAwLCBkeCksXHJcbiAgICAgICAgbGVycChuMDEwMCwgbjExMDAsIGR4KSxcclxuICAgICAgICBmYWRlKGR5KVxyXG4gICAgICApLFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMTAsIG4xMDEwLCBkeCksXHJcbiAgICAgICAgbGVycChuMDExMCwgbjExMTAsIGR4KSxcclxuICAgICAgICBmYWRlKGR5KVxyXG4gICAgICApLFxyXG4gICAgICBmYWRlKGR6KVxyXG4gICAgKSxcclxuICAgIGxlcnAoXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAwMSwgbjEwMDEsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTAxLCBuMTEwMSwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAxMSwgbjEwMTEsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTExLCBuMTExMSwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGZhZGUoZHopXHJcbiAgICApLFxyXG4gICAgZmFkZShkdClcclxuICApXHJcbiAgfVxyXG59XHJcblxyXG5cclxudmFyIGdOID0gW11cclxuLy8gZ2VuZXJhdGVzIGEgZ3JhZGllbnQgbG9vayB1cCB0YWJsZSwgd2hlcmUgZWFjaCBncmFkaWVudCBoYXMgb25lIHBvc2l0aXZlXHJcbi8vIG9yIG5lZ2F0aXZlIHVuaXQgdmVjdG9yIGluIG9uZSBkaW1lbnNpb24uIEZvciBleGFtcGxlLCBjYWxsaW5nIHBlcmxpbiB3aXRoIDIgZGltczpcclxuLy8gWzEsIDBdLCBbLTEsIDBdLCBbMCwgMV0sIFswLCAtMV1cclxuZnVuY3Rpb24gZ2VuZXJhdGVHTiAoZGltKSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW0gKiAyOyBpKyspIHtcclxuICAgIHZhciB2ZWMgPSBuZXcgQXJyYXkoZGltKS5maWxsKDApXHJcbiAgICB2ZWNbaSAlIGRpbV0gPSBpIC8gZGltID49IDEgPyAxIDogLTFcclxuICAgIGdOW2ldID0gbmV3IFZlY04odmVjKVxyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBsZXJwTiAobnMsIGRzKSB7XHJcbiAgaWYgKGRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGxlcnAobnNbMF0sIG5zWzFdLCBmYWRlKGRzWzBdKSlcclxuICB2YXIgbnMxID0gbnMuc2xpY2UoMCwgTWF0aC5mbG9vcihucy5sZW5ndGggLyAyKSlcclxuICB2YXIgbnMyID0gbnMuc2xpY2UoTWF0aC5jZWlsKG5zLmxlbmd0aCAvIDIpKVxyXG4gIHJldHVybiBsZXJwKFxyXG4gICAgbGVycE4obnMxLCBkcy5zbGljZSgwLCBkcy5sZW5ndGggLSAxKSksXHJcbiAgICBsZXJwTihuczIsIGRzLnNsaWNlKDAsIGRzLmxlbmd0aCAtIDEpKSxcclxuICAgIGZhZGUoZHNbZHMubGVuZ3RoIC0gMV0pXHJcbiAgKVxyXG59XHJcbmZ1bmN0aW9uIGhhc2hOIChncykge1xyXG4gIGlmIChncy5sZW5ndGggPT09IDEpIHJldHVybiBwW2dzWzBdXVxyXG4gIHJldHVybiBwW2dzWzBdICsgaGFzaE4oZ3Muc2xpY2UoMSkpXVxyXG59XHJcbmZ1bmN0aW9uIGdldE5zIChkaW0sIGdzLCBkcykge1xyXG4gIHZhciBucyA9IFtdXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAoMiA8PCAoZGltIC0gMSkpOyBpKyspIHtcclxuICAgIHZhciBnc1Blcm0gPSBncy5zbGljZSgpXHJcbiAgICB2YXIgZHNQZXJtID0gZHMuc2xpY2UoKVxyXG4gICAgdmFyIHRlbXAgPSBpXHJcblxyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBkaW07IGorKykge1xyXG4gICAgICBpZiAodGVtcCAmIDEpIHtcclxuICAgICAgICBnc1Blcm1bal0gKz0gMVxyXG4gICAgICAgIGRzUGVybVtqXSAtPSAxXHJcbiAgICAgIH1cclxuICAgICAgdGVtcCA9IHRlbXAgPj4gMVxyXG4gICAgfVxyXG4gICAgbnNbaV0gPSBnTltoYXNoTihnc1Blcm0pICUgZ04ubGVuZ3RoXS5kb3QoZHNQZXJtKVxyXG4gIH1cclxuICByZXR1cm4gbnNcclxufVxyXG5mdW5jdGlvbiBWZWNOKFIpIHtcclxuICB0aGlzLlIgPSBSXHJcbn1cclxuVmVjTi5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKFIpIHtcclxuICB2YXIgdmFsID0gMFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgUi5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFsICs9IHRoaXMuUltpXSAqIFJbaV1cclxuICB9XHJcbiAgcmV0dXJuIHZhbFxyXG59XHJcbmV4cG9ydCBjbGFzcyBQZXJsaW5OIGV4dGVuZHMgTm9pc2Uge1xyXG4gIGNvbnN0cnVjdG9yIChzKSB7XHJcbiAgICBzdXBlcihzKVxyXG4gIH1cclxuICBnZW4gKC4uLmFyZ3MpIHtcclxuICAgIHZhciBncyA9IFtdXHJcbiAgICB2YXIgZHMgPSBbXVxyXG5cclxuICAgIGlmIChnTi5sZW5ndGggPT09IDApIHtcclxuICAgICAgZ2VuZXJhdGVHTihhcmdzLmxlbmd0aClcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZ3NbaV0gPSBNYXRoLnRydW5jKGFyZ3NbaV0pICUgMjU2XHJcbiAgICAgIGRzW2ldID0gYXJnc1tpXSAtIGdzW2ldXHJcbiAgICB9XHJcbiAgICB2YXIgbnMgPSBnZXROcyhhcmdzLmxlbmd0aCwgZ3MsIGRzKVxyXG4gICAgdmFyIHJlcyA9IGxlcnBOKG5zLCBkcylcclxuICAgIHJldHVybiByZXNcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgU2ltcGxleDE6IFNpbXBsZXgxLFxyXG4gIFNpbXBsZXgyOiBTaW1wbGV4MixcclxuICBQZXJsaW4xOiBQZXJsaW4xLFxyXG4gIFBlcmxpbjI6IFBlcmxpbjIsXHJcbiAgUGVybGluMzogUGVybGluMyxcclxuICBQZXJsaW40OiBQZXJsaW40LFxyXG4gIFBlcmxpbk46IFBlcmxpbk5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGZpeGVkTG9nZ2VyICh0YXJnZXQsIG1ldGhvZCwgY291bnQsIGRlYnVnKSB7XHJcbiAgdmFyIGxvZ2dlciA9IHtcclxuICAgIGNvdW50OiAwLFxyXG4gICAgbG9nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvdW50IDwgY291bnQgJiYgZGVidWcpIHtcclxuICAgICAgICB0aGlzLmNvdW50KytcclxuICAgICAgICB0YXJnZXRbbWV0aG9kXS5hcHBseSh0aGlzLCAoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbG9nZ2VyXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLypcbiAqIHJhbmRvbS1zZWVkXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc2tyYXRjaGRvdC9yYW5kb20tc2VlZFxuICpcbiAqIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IFN0ZXZlIEdpYnNvbiBhbmQgY2FuIGJlIGZvdW5kIGhlcmU6XG4gKlxuICogaHR0cHM6Ly93d3cuZ3JjLmNvbS9vdGcvdWhlcHJuZy5odG1cbiAqXG4gKiBJdCB3YXMgc2xpZ2h0bHkgbW9kaWZpZWQgZm9yIHVzZSBpbiBub2RlLCB0byBwYXNzIGpzaGludCwgYW5kIGEgZmV3IGFkZGl0aW9uYWxcbiAqIGhlbHBlciBmdW5jdGlvbnMgd2VyZSBhZGRlZC5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMgc2tyYXRjaGRvdFxuICogRHVhbCBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgYW5kIHRoZSBvcmlnaW5hbCBHUkMgY29weXJpZ2h0L2xpY2Vuc2VcbiAqIGluY2x1ZGVkIGJlbG93LlxuICovXG4vKlx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcdFx0XHRcdFx0XHRcdFx0R2lic29uIFJlc2VhcmNoIENvcnBvcmF0aW9uXG5cdFx0XHRcdFVIRVBSTkcgLSBVbHRyYSBIaWdoIEVudHJvcHkgUHNldWRvLVJhbmRvbSBOdW1iZXIgR2VuZXJhdG9yXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0TElDRU5TRSBBTkQgQ09QWVJJR0hUOiAgVEhJUyBDT0RFIElTIEhFUkVCWSBSRUxFQVNFRCBJTlRPIFRIRSBQVUJMSUMgRE9NQUlOXG5cdEdpYnNvbiBSZXNlYXJjaCBDb3Jwb3JhdGlvbiByZWxlYXNlcyBhbmQgZGlzY2xhaW1zIEFMTCBSSUdIVFMgQU5EIFRJVExFIElOXG5cdFRISVMgQ09ERSBPUiBBTlkgREVSSVZBVElWRVMuIEFueW9uZSBtYXkgYmUgZnJlZWx5IHVzZSBpdCBmb3IgYW55IHB1cnBvc2UuXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0VGhpcyBpcyBHUkMncyBjcnlwdG9ncmFwaGljYWxseSBzdHJvbmcgUFJORyAocHNldWRvLXJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yKVxuXHRmb3IgSmF2YVNjcmlwdC4gSXQgaXMgZHJpdmVuIGJ5IDE1MzYgYml0cyBvZiBlbnRyb3B5LCBzdG9yZWQgaW4gYW4gYXJyYXkgb2Zcblx0NDgsIDMyLWJpdCBKYXZhU2NyaXB0IHZhcmlhYmxlcy4gIFNpbmNlIG1hbnkgYXBwbGljYXRpb25zIG9mIHRoaXMgZ2VuZXJhdG9yLFxuXHRpbmNsdWRpbmcgb3VycyB3aXRoIHRoZSBcIk9mZiBUaGUgR3JpZFwiIExhdGluIFNxdWFyZSBnZW5lcmF0b3IsIG1heSByZXF1aXJlXG5cdHRoZSBkZXRlcmltaW5pc3RpYyByZS1nZW5lcmF0aW9uIG9mIGEgc2VxdWVuY2Ugb2YgUFJOcywgdGhpcyBQUk5HJ3MgaW5pdGlhbFxuXHRlbnRyb3BpYyBzdGF0ZSBjYW4gYmUgcmVhZCBhbmQgd3JpdHRlbiBhcyBhIHN0YXRpYyB3aG9sZSwgYW5kIGluY3JlbWVudGFsbHlcblx0ZXZvbHZlZCBieSBwb3VyaW5nIG5ldyBzb3VyY2UgZW50cm9weSBpbnRvIHRoZSBnZW5lcmF0b3IncyBpbnRlcm5hbCBzdGF0ZS5cblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRFTkRMRVNTIFRIQU5LUyBhcmUgZHVlIEpvaGFubmVzIEJhYWdvZSBmb3IgaGlzIGNhcmVmdWwgZGV2ZWxvcG1lbnQgb2YgaGlnaGx5XG5cdHJvYnVzdCBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9ucyBvZiBKUyBQUk5Hcy4gIFRoaXMgd29yayB3YXMgYmFzZWQgdXBvbiBoaXNcblx0SmF2YVNjcmlwdCBcIkFsZWFcIiBQUk5HIHdoaWNoIGlzIGJhc2VkIHVwb24gdGhlIGV4dHJlbWVseSByb2J1c3QgTXVsdGlwbHktXG5cdFdpdGgtQ2FycnkgKE1XQykgUFJORyBpbnZlbnRlZCBieSBHZW9yZ2UgTWFyc2FnbGlhLiBNV0MgQWxnb3JpdGhtIFJlZmVyZW5jZXM6XG5cdGh0dHA6Ly93d3cuR1JDLmNvbS9vdGcvTWFyc2FnbGlhX1BSTkdzLnBkZlxuXHRodHRwOi8vd3d3LkdSQy5jb20vb3RnL01hcnNhZ2xpYV9NV0NfR2VuZXJhdG9ycy5wZGZcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRUaGUgcXVhbGl0eSBvZiB0aGlzIGFsZ29yaXRobSdzIHBzZXVkby1yYW5kb20gbnVtYmVycyBoYXZlIGJlZW4gdmVyaWZpZWQgYnlcblx0bXVsdGlwbGUgaW5kZXBlbmRlbnQgcmVzZWFyY2hlcnMuIEl0IGhhbmRpbHkgcGFzc2VzIHRoZSBmZXJtaWxhYi5jaCB0ZXN0cyBhc1xuXHR3ZWxsIGFzIHRoZSBcImRpZWhhcmRcIiBhbmQgXCJkaWVoYXJkZXJcIiB0ZXN0IHN1aXRlcy4gIEZvciBpbmRpdmlkdWFscyB3aXNoaW5nXG5cdHRvIGZ1cnRoZXIgdmVyaWZ5IHRoZSBxdWFsaXR5IG9mIHRoaXMgYWxnb3JpdGhtJ3MgcHNldWRvLXJhbmRvbSBudW1iZXJzLCBhXG5cdDI1Ni1tZWdhYnl0ZSBmaWxlIG9mIHRoaXMgYWxnb3JpdGhtJ3Mgb3V0cHV0IG1heSBiZSBkb3dubG9hZGVkIGZyb20gR1JDLmNvbSxcblx0YW5kIGEgTWljcm9zb2Z0IFdpbmRvd3Mgc2NyaXB0aW5nIGhvc3QgKFdTSCkgdmVyc2lvbiBvZiB0aGlzIGFsZ29yaXRobSBtYXkgYmVcblx0ZG93bmxvYWRlZCBhbmQgcnVuIGZyb20gdGhlIFdpbmRvd3MgY29tbWFuZCBwcm9tcHQgdG8gZ2VuZXJhdGUgdW5pcXVlIGZpbGVzXG5cdG9mIGFueSBzaXplOlxuXHRUaGUgRmVybWlsYWIgXCJFTlRcIiB0ZXN0czogaHR0cDovL2ZvdXJtaWxhYi5jaC9yYW5kb20vXG5cdFRoZSAyNTYtbWVnYWJ5dGUgc2FtcGxlIFBSTiBmaWxlIGF0IEdSQzogaHR0cHM6Ly93d3cuR1JDLmNvbS9vdGcvdWhlcHJuZy5iaW5cblx0VGhlIFdpbmRvd3Mgc2NyaXB0aW5nIGhvc3QgdmVyc2lvbjogaHR0cHM6Ly93d3cuR1JDLmNvbS9vdGcvd3NoLXVoZXBybmcuanNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRRdWFsaWZ5aW5nIE1XQyBtdWx0aXBsaWVycyBhcmU6IDE4Nzg4NCwgNjg2MTE4LCA4OTgxMzQsIDExMDQzNzUsIDEyNTAyMDUsXG5cdDE0NjA5MTAgYW5kIDE3Njg4NjMuIChXZSB1c2UgdGhlIGxhcmdlc3Qgb25lIHRoYXQncyA8IDJeMjEpXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbid1c2Ugc3RyaWN0JztcbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5cbi8qXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5UaGlzIGlzIGJhc2VkIHVwb24gSm9oYW5uZXMgQmFhZ29lJ3MgY2FyZWZ1bGx5IGRlc2lnbmVkIGFuZCBlZmZpY2llbnQgaGFzaFxuZnVuY3Rpb24gZm9yIHVzZSB3aXRoIEphdmFTY3JpcHQuICBJdCBoYXMgYSBwcm92ZW4gXCJhdmFsYW5jaGVcIiBlZmZlY3Qgc3VjaFxudGhhdCBldmVyeSBiaXQgb2YgdGhlIGlucHV0IGFmZmVjdHMgZXZlcnkgYml0IG9mIHRoZSBvdXRwdXQgNTAlIG9mIHRoZSB0aW1lLFxud2hpY2ggaXMgZ29vZC5cdFNlZTogaHR0cDovL2JhYWdvZS5jb20vZW4vUmFuZG9tTXVzaW5ncy9oYXNoL2F2YWxhbmNoZS54aHRtbFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKi9cbnZhciBNYXNoID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgbiA9IDB4ZWZjODI0OWQ7XG5cdHZhciBtYXNoID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0ZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcblx0XHRcdFx0dmFyIGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcblx0XHRcdFx0biA9IGggPj4+IDA7XG5cdFx0XHRcdGggLT0gbjtcblx0XHRcdFx0aCAqPSBuO1xuXHRcdFx0XHRuID0gaCA+Pj4gMDtcblx0XHRcdFx0aCAtPSBuO1xuXHRcdFx0XHRuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIChuID4+PiAwKSAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG5cdFx0fSBlbHNlIHtcblx0XHRcdG4gPSAweGVmYzgyNDlkO1xuXHRcdH1cblx0fTtcblx0cmV0dXJuIG1hc2g7XG59O1xuXG52YXIgdWhlcHJuZyA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdHJldHVybiAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBvID0gNDg7IC8vIHNldCB0aGUgJ29yZGVyJyBudW1iZXIgb2YgRU5UUk9QWS1ob2xkaW5nIDMyLWJpdCB2YWx1ZXNcblx0XHR2YXIgYyA9IDE7IC8vIGluaXQgdGhlICdjYXJyeScgdXNlZCBieSB0aGUgbXVsdGlwbHktd2l0aC1jYXJyeSAoTVdDKSBhbGdvcml0aG1cblx0XHR2YXIgcCA9IG87IC8vIGluaXQgdGhlICdwaGFzZScgKG1heC0xKSBvZiB0aGUgaW50ZXJtZWRpYXRlIHZhcmlhYmxlIHBvaW50ZXJcblx0XHR2YXIgcyA9IG5ldyBBcnJheShvKTsgLy8gZGVjbGFyZSBvdXIgaW50ZXJtZWRpYXRlIHZhcmlhYmxlcyBhcnJheVxuXHRcdHZhciBpOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblx0XHR2YXIgajsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cdFx0dmFyIGsgPSAwOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblxuXHRcdC8vIHdoZW4gb3VyIFwidWhlcHJuZ1wiIGlzIGluaXRpYWxseSBpbnZva2VkIG91ciBQUk5HIHN0YXRlIGlzIGluaXRpYWxpemVkIGZyb20gdGhlXG5cdFx0Ly8gYnJvd3NlcidzIG93biBsb2NhbCBQUk5HLiBUaGlzIGlzIG9rYXkgc2luY2UgYWx0aG91Z2ggaXRzIGdlbmVyYXRvciBtaWdodCBub3Rcblx0XHQvLyBiZSB3b25kZXJmdWwsIGl0J3MgdXNlZnVsIGZvciBlc3RhYmxpc2hpbmcgbGFyZ2Ugc3RhcnR1cCBlbnRyb3B5IGZvciBvdXIgdXNhZ2UuXG5cdFx0dmFyIG1hc2ggPSBuZXcgTWFzaCgpOyAvLyBnZXQgYSBwb2ludGVyIHRvIG91ciBoaWdoLXBlcmZvcm1hbmNlIFwiTWFzaFwiIGhhc2hcblxuXHRcdC8vIGZpbGwgdGhlIGFycmF5IHdpdGggaW5pdGlhbCBtYXNoIGhhc2ggdmFsdWVzXG5cdFx0Zm9yIChpID0gMDsgaSA8IG87IGkrKykge1xuXHRcdFx0c1tpXSA9IG1hc2goTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhpcyBQUklWQVRFIChpbnRlcm5hbCBhY2Nlc3Mgb25seSkgZnVuY3Rpb24gaXMgdGhlIGhlYXJ0IG9mIHRoZSBtdWx0aXBseS13aXRoLWNhcnJ5XG5cdFx0Ly8gKE1XQykgUFJORyBhbGdvcml0aG0uIFdoZW4gY2FsbGVkIGl0IHJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIG51bWJlciBpbiB0aGUgZm9ybSBvZiBhXG5cdFx0Ly8gMzItYml0IEphdmFTY3JpcHQgZnJhY3Rpb24gKDAuMCB0byA8MS4wKSBpdCBpcyBhIFBSSVZBVEUgZnVuY3Rpb24gdXNlZCBieSB0aGUgZGVmYXVsdFxuXHRcdC8vIFswLTFdIHJldHVybiBmdW5jdGlvbiwgYW5kIGJ5IHRoZSByYW5kb20gJ3N0cmluZyhuKScgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyAnbidcblx0XHQvLyBjaGFyYWN0ZXJzIGZyb20gMzMgdG8gMTI2LlxuXHRcdHZhciByYXdwcm5nID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCsrcCA+PSBvKSB7XG5cdFx0XHRcdHAgPSAwO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHQgPSAxNzY4ODYzICogc1twXSArIGMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXHRcdFx0cmV0dXJuIHNbcF0gPSB0IC0gKGMgPSB0IHwgMCk7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gaXMgdGhlIGRlZmF1bHQgZnVuY3Rpb24gcmV0dXJuZWQgYnkgdGhpcyBsaWJyYXJ5LlxuXHRcdC8vIFRoZSB2YWx1ZXMgcmV0dXJuZWQgYXJlIGludGVnZXJzIGluIHRoZSByYW5nZSBmcm9tIDAgdG8gcmFuZ2UtMS4gV2UgZmlyc3Rcblx0XHQvLyBvYnRhaW4gdHdvIDMyLWJpdCBmcmFjdGlvbnMgKGZyb20gcmF3cHJuZykgdG8gc3ludGhlc2l6ZSBhIHNpbmdsZSBoaWdoXG5cdFx0Ly8gcmVzb2x1dGlvbiA1My1iaXQgcHJuZyAoMCB0byA8MSksIHRoZW4gd2UgbXVsdGlwbHkgdGhpcyBieSB0aGUgY2FsbGVyJ3Ncblx0XHQvLyBcInJhbmdlXCIgcGFyYW0gYW5kIHRha2UgdGhlIFwiZmxvb3JcIiB0byByZXR1cm4gYSBlcXVhbGx5IHByb2JhYmxlIGludGVnZXIuXG5cdFx0dmFyIHJhbmRvbSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IocmFuZ2UgKiAocmF3cHJuZygpICsgKHJhd3BybmcoKSAqIDB4MjAwMDAwIHwgMCkgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2KSk7IC8vIDJeLTUzXG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gJ3N0cmluZyhuKScgcmV0dXJucyBhIHBzZXVkby1yYW5kb20gc3RyaW5nIG9mXG5cdFx0Ly8gJ24nIHByaW50YWJsZSBjaGFyYWN0ZXJzIHJhbmdpbmcgZnJvbSBjaHIoMzMpIHRvIGNocigxMjYpIGluY2x1c2l2ZS5cblx0XHRyYW5kb20uc3RyaW5nID0gZnVuY3Rpb24gKGNvdW50KSB7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHZhciBzID0gJyc7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdFx0XHRzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMzMgKyByYW5kb20oOTQpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIFBSSVZBVEUgXCJoYXNoXCIgZnVuY3Rpb24gaXMgdXNlZCB0byBldm9sdmUgdGhlIGdlbmVyYXRvcidzIGludGVybmFsXG5cdFx0Ly8gZW50cm9weSBzdGF0ZS4gSXQgaXMgYWxzbyBjYWxsZWQgYnkgdGhlIEVYUE9SVEVEIGFkZEVudHJvcHkoKSBmdW5jdGlvblxuXHRcdC8vIHdoaWNoIGlzIHVzZWQgdG8gcG91ciBlbnRyb3B5IGludG8gdGhlIFBSTkcuXG5cdFx0dmFyIGhhc2ggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbzsgaisrKSB7XG5cdFx0XHRcdFx0c1tqXSAtPSBtYXNoKGFyZ3NbaV0pO1xuXHRcdFx0XHRcdGlmIChzW2pdIDwgMCkge1xuXHRcdFx0XHRcdFx0c1tqXSArPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIFwiY2xlYW4gc3RyaW5nXCIgZnVuY3Rpb24gcmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXMgYW5kIG5vbi1wcmludGluZ1xuXHRcdC8vIGNvbnRyb2wgY2hhcmFjdGVycywgaW5jbHVkaW5nIGFueSBlbWJlZGRlZCBjYXJyaWFnZS1yZXR1cm4gKENSKSBhbmQgbGluZS1mZWVkIChMRikgY2hhcmFjdGVycyxcblx0XHQvLyBmcm9tIGFueSBzdHJpbmcgaXQgaXMgaGFuZGVkLiB0aGlzIGlzIGFsc28gdXNlZCBieSB0aGUgJ2hhc2hzdHJpbmcnIGZ1bmN0aW9uIChiZWxvdykgdG8gaGVscFxuXHRcdC8vIHVzZXJzIGFsd2F5cyBvYnRhaW4gdGhlIHNhbWUgRUZGRUNUSVZFIHVoZXBybmcgc2VlZGluZyBrZXkuXG5cdFx0cmFuZG9tLmNsZWFuU3RyaW5nID0gZnVuY3Rpb24gKGluU3RyKSB7XG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9naSwgJycpOyAvLyByZW1vdmUgYW55L2FsbCBsZWFkaW5nIHNwYWNlc1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC9bXFx4MDAtXFx4MUZdL2dpLCAnJyk7IC8vIHJlbW92ZSBhbnkvYWxsIGNvbnRyb2wgY2hhcmFjdGVyc1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC9cXG4gLywgJ1xcbicpOyAvLyByZW1vdmUgYW55L2FsbCB0cmFpbGluZyBzcGFjZXNcblx0XHRcdHJldHVybiBpblN0cjsgLy8gcmV0dXJuIHRoZSBjbGVhbmVkIHVwIHJlc3VsdFxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIFwiaGFzaCBzdHJpbmdcIiBmdW5jdGlvbiBoYXNoZXMgdGhlIHByb3ZpZGVkIGNoYXJhY3RlciBzdHJpbmcgYWZ0ZXIgZmlyc3QgcmVtb3Zpbmdcblx0XHQvLyBhbnkgbGVhZGluZyBvciB0cmFpbGluZyBzcGFjZXMgYW5kIGlnbm9yaW5nIGFueSBlbWJlZGRlZCBjYXJyaWFnZSByZXR1cm5zIChDUikgb3IgTGluZSBGZWVkcyAoTEYpXG5cdFx0cmFuZG9tLmhhc2hTdHJpbmcgPSBmdW5jdGlvbiAoaW5TdHIpIHtcblx0XHRcdGluU3RyID0gcmFuZG9tLmNsZWFuU3RyaW5nKGluU3RyKTtcblx0XHRcdG1hc2goaW5TdHIpOyAvLyB1c2UgdGhlIHN0cmluZyB0byBldm9sdmUgdGhlICdtYXNoJyBzdGF0ZVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGluU3RyLmxlbmd0aDsgaSsrKSB7IC8vIHNjYW4gdGhyb3VnaCB0aGUgY2hhcmFjdGVycyBpbiBvdXIgc3RyaW5nXG5cdFx0XHRcdGsgPSBpblN0ci5jaGFyQ29kZUF0KGkpOyAvLyBnZXQgdGhlIGNoYXJhY3RlciBjb2RlIGF0IHRoZSBsb2NhdGlvblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbzsgaisrKSB7IC8vXHRcIm1hc2hcIiBpdCBpbnRvIHRoZSBVSEVQUk5HIHN0YXRlXG5cdFx0XHRcdFx0c1tqXSAtPSBtYXNoKGspO1xuXHRcdFx0XHRcdGlmIChzW2pdIDwgMCkge1xuXHRcdFx0XHRcdFx0c1tqXSArPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2VlZCB0aGUgcmFuZG9tIGdlbmVyYXRvci5cblx0XHRyYW5kb20uc2VlZCA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdFx0XHRpZiAodHlwZW9mIHNlZWQgPT09ICd1bmRlZmluZWQnIHx8IHNlZWQgPT09IG51bGwpIHtcblx0XHRcdFx0c2VlZCA9IE1hdGgucmFuZG9tKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHNlZWQgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHNlZWQgPSBzdHJpbmdpZnkoc2VlZCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlKS50b1N0cmluZygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmFuZG9tLmluaXRTdGF0ZSgpO1xuXHRcdFx0cmFuZG9tLmhhc2hTdHJpbmcoc2VlZCk7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgaGFuZHkgZXhwb3J0ZWQgZnVuY3Rpb24gaXMgdXNlZCB0byBhZGQgZW50cm9weSB0byBvdXIgdWhlcHJuZyBhdCBhbnkgdGltZVxuXHRcdHJhbmRvbS5hZGRFbnRyb3B5ID0gZnVuY3Rpb24gKCAvKiBhY2NlcHQgemVybyBvciBtb3JlIGFyZ3VtZW50cyAqLyApIHtcblx0XHRcdHZhciBhcmdzID0gW107XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0fVxuXHRcdFx0aGFzaCgoaysrKSArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgKyBhcmdzLmpvaW4oJycpICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fTtcblxuXHRcdC8vIGlmIHdlIHdhbnQgdG8gcHJvdmlkZSBhIGRldGVybWluaXN0aWMgc3RhcnR1cCBjb250ZXh0IGZvciBvdXIgUFJORyxcblx0XHQvLyBidXQgd2l0aG91dCBkaXJlY3RseSBzZXR0aW5nIHRoZSBpbnRlcm5hbCBzdGF0ZSB2YXJpYWJsZXMsIHRoaXMgYWxsb3dzXG5cdFx0Ly8gdXMgdG8gaW5pdGlhbGl6ZSB0aGUgbWFzaCBoYXNoIGFuZCBQUk5HJ3MgaW50ZXJuYWwgc3RhdGUgYmVmb3JlIHByb3ZpZGluZ1xuXHRcdC8vIHNvbWUgaGFzaGluZyBpbnB1dFxuXHRcdHJhbmRvbS5pbml0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtYXNoKCk7IC8vIHBhc3MgYSBudWxsIGFyZyB0byBmb3JjZSBtYXNoIGhhc2ggdG8gaW5pdFxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG87IGkrKykge1xuXHRcdFx0XHRzW2ldID0gbWFzaCgnICcpOyAvLyBmaWxsIHRoZSBhcnJheSB3aXRoIGluaXRpYWwgbWFzaCBoYXNoIHZhbHVlc1xuXHRcdFx0fVxuXHRcdFx0YyA9IDE7IC8vIGluaXQgb3VyIG11bHRpcGx5LXdpdGgtY2FycnkgY2Fycnlcblx0XHRcdHAgPSBvOyAvLyBpbml0IG91ciBwaGFzZVxuXHRcdH07XG5cblx0XHQvLyB3ZSB1c2UgdGhpcyAob3B0aW9uYWwpIGV4cG9ydGVkIGZ1bmN0aW9uIHRvIHNpZ25hbCB0aGUgSmF2YVNjcmlwdCBpbnRlcnByZXRlclxuXHRcdC8vIHRoYXQgd2UncmUgZmluaXNoZWQgdXNpbmcgdGhlIFwiTWFzaFwiIGhhc2ggZnVuY3Rpb24gc28gdGhhdCBpdCBjYW4gZnJlZSB1cCB0aGVcblx0XHQvLyBsb2NhbCBcImluc3RhbmNlIHZhcmlhYmxlc1wiIGlzIHdpbGwgaGF2ZSBiZWVuIG1haW50YWluaW5nLiAgSXQncyBub3Qgc3RyaWN0bHlcblx0XHQvLyBuZWNlc3NhcnksIG9mIGNvdXJzZSwgYnV0IGl0J3MgZ29vZCBKYXZhU2NyaXB0IGNpdGl6ZW5zaGlwLlxuXHRcdHJhbmRvbS5kb25lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bWFzaCA9IG51bGw7XG5cdFx0fTtcblxuXHRcdC8vIGlmIHdlIGNhbGxlZCBcInVoZXBybmdcIiB3aXRoIGEgc2VlZCB2YWx1ZSwgdGhlbiBleGVjdXRlIHJhbmRvbS5zZWVkKCkgYmVmb3JlIHJldHVybmluZ1xuXHRcdGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJhbmRvbS5zZWVkKHNlZWQpO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIHJhbmdlIChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLnJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tKHJhbmdlKTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIDEgKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20ucmFuZG9tID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbShOdW1iZXIuTUFYX1ZBTFVFIC0gMSkgLyBOdW1iZXIuTUFYX1ZBTFVFO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20uZmxvYXRCZXR3ZWVuID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChpbmNsdXNpdmUpXG5cdFx0cmFuZG9tLmludEJldHdlZW4gPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHJhbmRvbS5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG5cdFx0fTtcblxuXHRcdC8vIHdoZW4gb3VyIG1haW4gb3V0ZXIgXCJ1aGVwcm5nXCIgZnVuY3Rpb24gaXMgY2FsbGVkLCBhZnRlciBzZXR0aW5nIHVwIG91clxuXHRcdC8vIGluaXRpYWwgdmFyaWFibGVzIGFuZCBlbnRyb3BpYyBzdGF0ZSwgd2UgcmV0dXJuIGFuIFwiaW5zdGFuY2UgcG9pbnRlclwiXG5cdFx0Ly8gdG8gdGhlIGludGVybmFsIGFub255bW91cyBmdW5jdGlvbiB3aGljaCBjYW4gdGhlbiBiZSB1c2VkIHRvIGFjY2Vzc1xuXHRcdC8vIHRoZSB1aGVwcm5nJ3MgdmFyaW91cyBleHBvcnRlZCBmdW5jdGlvbnMuICBBcyB3aXRoIHRoZSBcIi5kb25lXCIgZnVuY3Rpb25cblx0XHQvLyBhYm92ZSwgd2Ugc2hvdWxkIHNldCB0aGUgcmV0dXJuZWQgdmFsdWUgdG8gJ251bGwnIG9uY2Ugd2UncmUgZmluaXNoZWRcblx0XHQvLyB1c2luZyBhbnkgb2YgdGhlc2UgZnVuY3Rpb25zLlxuXHRcdHJldHVybiByYW5kb207XG5cdH0oKSk7XG59O1xuXG4vLyBNb2RpZmljYXRpb24gZm9yIHVzZSBpbiBub2RlOlxudWhlcHJuZy5jcmVhdGUgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRyZXR1cm4gbmV3IHVoZXBybmcoc2VlZCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB1aGVwcm5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmFuZG9tLXNlZWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbmV4cG9ydHMuZ2V0U2VyaWFsaXplID0gc2VyaWFsaXplclxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCByZXBsYWNlciwgc3BhY2VzLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpLCBzcGFjZXMpXG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgdmFyIHN0YWNrID0gW10sIGtleXMgPSBbXVxuXG4gIGlmIChjeWNsZVJlcGxhY2VyID09IG51bGwpIGN5Y2xlUmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrWzBdID09PSB2YWx1ZSkgcmV0dXJuIFwiW0NpcmN1bGFyIH5dXCJcbiAgICByZXR1cm4gXCJbQ2lyY3VsYXIgfi5cIiArIGtleXMuc2xpY2UoMCwgc3RhY2suaW5kZXhPZih2YWx1ZSkpLmpvaW4oXCIuXCIpICsgXCJdXCJcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciB0aGlzUG9zID0gc3RhY2suaW5kZXhPZih0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBzdGFjay5zcGxpY2UodGhpc1BvcyArIDEpIDogc3RhY2sucHVzaCh0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBrZXlzLnNwbGljZSh0aGlzUG9zLCBJbmZpbml0eSwga2V5KSA6IGtleXMucHVzaChrZXkpXG4gICAgICBpZiAofnN0YWNrLmluZGV4T2YodmFsdWUpKSB2YWx1ZSA9IGN5Y2xlUmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgICBlbHNlIHN0YWNrLnB1c2godmFsdWUpXG5cbiAgICByZXR1cm4gcmVwbGFjZXIgPT0gbnVsbCA/IHZhbHVlIDogcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSJdLCJzb3VyY2VSb290IjoiIn0=