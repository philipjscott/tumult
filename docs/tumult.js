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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_terrapaint__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_terrapaint___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_terrapaint__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_index__ = __webpack_require__(2);


Object(__WEBPACK_IMPORTED_MODULE_1__src_index__["c" /* seed */])(Math.random())
__WEBPACK_IMPORTED_MODULE_0_terrapaint___default()(__WEBPACK_IMPORTED_MODULE_1__src_index__["a" /* perlin2 */], 256, 256, {
  offset: true
})
__WEBPACK_IMPORTED_MODULE_0_terrapaint___default()(__WEBPACK_IMPORTED_MODULE_1__src_index__["b" /* perlinN */], 256, 256, {
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
/* 1 */
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = seed;
/* unused harmony export perlin1 */
/* harmony export (immutable) */ __webpack_exports__["a"] = perlin2;
/* unused harmony export perlin3 */
/* unused harmony export perlin4 */
/* harmony export (immutable) */ __webpack_exports__["b"] = perlinN;
// Tumult, JavaScript noise generator
// Created by Philip Scott | ScottyFillups, 2017
// https://github.com/ScottyFillups

// Noise algorithms by Ken Perlin
// Uses "random-seed" package on NPM for seeding function


var rand = __webpack_require__(3)

var rng
var p = new Uint8Array(512)
function lerp (a, b, t) {
  return a * (1 - t) + b * t
}
function fade (t) {
  return t * t * t * (10 + t * (-15 + t * 6))
}
function seed (s) {
  rng = rand.create(s)
  var i
  for (i = 0; i < 256; i++) p[i] = i
  for (i = 0; i < 256; i++) {
    var r = rng(256)
    var temp = p[i]
    p[i] = p[r]
    p[r] = temp
  }
  for (i = 0; i < 256; i++) p[i + 256] = p[i]
}


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
function perlin1 (x) {
  var gx = Math.trunc(x) % 256
  var dx = x - gx

  var n0 = grad1(gx).dot(dx)
  var n1 = grad1(gx + 1).dot(dx - 1)

  return lerp(n0, n1, fade(dx))
}


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
function perlin2 (x, y) {
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
}


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
function perlin3 (x, y, z) {
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
function perlin4 (x, y, z, t) {
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
}


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
  if (ds.length === 1) return lerp(ns[0], ns[1], fade(ds[0]))
  var ns1 = ns.slice(0, Math.floor(ns.length / 2))
  var ns2 = ns.slice(Math.ceil(ns.length / 2))
  return lerp(
    lerpN(ns1, ds.slice(0, ds.length - 1)),
    lerpN(ns2, ds.slice(0, ds.length - 1)),
    fade(ds[ds.length - 1])
  )
}
function hashN (gs) {
  if (gs.length === 1) return p[gs[0]]
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
  var val = 0
  for (var i = 0; i < R.length; i++) {
    val += this.R[i] * R[i]
  }
  return val
}
function perlinN () {
  var gs = []
  var ds = []

  if (gN.length === 0) {
    generateGN(arguments.length)
  }

  var i
  for (i = 0; i < arguments.length; i++) {
    gs[i] = Math.trunc(arguments[i]) % 256
    ds[i] = arguments[i] - gs[i]
  }
  var ns = getNs(arguments.length, gs, ds)
  var res = lerpN(ns, ds)
  return res
}


/* unused harmony default export */ var _unused_webpack_default_export = ({
  seed: seed,
  perlin1: perlin1,
  perlin2: perlin2,
  perlin3: perlin3,
  perlin4: perlin4,
  perlinN: perlinN
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
/* 3 */
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

var stringify = __webpack_require__(4);

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
/* 4 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzBhNzc3Y2EyM2UxNmY5N2E4OTYiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JhbmRvbS1zZWVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDbEJEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1C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O0FBQzlDLHNDQUFzQztBQUN0QyxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsY0FBYyxrQkFBa0IsT0FBTztBQUN2Qyw0QkFBNEI7QUFDNUIsZUFBZSxPQUFPLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHNCQUFzQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGNBQWMsT0FBTztBQUNyQixxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzUUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0dW11bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjMGE3NzdjYTIzZTE2Zjk3YTg5NiIsImltcG9ydCB0ZXJyYXBhaW50IGZyb20gJ3RlcnJhcGFpbnQnXHJcbmltcG9ydCB7IHNlZWQsIHBlcmxpbjIsIHBlcmxpbk4gfSBmcm9tICcuLi9zcmMvaW5kZXgnXHJcbnNlZWQoTWF0aC5yYW5kb20oKSlcclxudGVycmFwYWludChwZXJsaW4yLCAyNTYsIDI1Niwge1xyXG4gIG9mZnNldDogdHJ1ZVxyXG59KVxyXG50ZXJyYXBhaW50KHBlcmxpbk4sIDI1NiwgMjU2LCB7XHJcbiAgb2Zmc2V0OiB0cnVlXHJcbn0pXHJcblxyXG5cclxuLyppbXBvcnQgdHVtdWx0IGZyb20gJy4uL3NyYy9pbmRleCdcclxudHVtdWx0LnNlZWQoTWF0aC5yYW5kb20oKSlcclxudGVycmFwYWludCh0dW11bHQucGVybGluMiwgMjU2LCAyNTYsIHtcclxuICBvZmZzZXQ6IHRydWVcclxufSlcclxudGVycmFwYWludCh0dW11bHQucGVybGluTiwgMjU2LCAyNTYsIHtcclxuICBvZmZzZXQ6IHRydWVcclxufSkqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RvY3MvZGVtby5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ0cnkge1xyXG4gIHZhciBpbWFnZVRlc3QgPSBuZXcgSW1hZ2VEYXRhKDIwLCAyMClcclxuICB2YXIgbnVtYmVyVGVzdCA9IE1hdGgudHJ1bmMoMjAuMSlcclxufSBjYXRjaCAoZSkge1xyXG4gIHZhciBlcnIgPSAnRXJyb3IsIGJyb3dzZXIgbm90IHN1cHBvcnRlZCBieSBUZXJyYXBhaW50LiAnXHJcbiAgZXJyICs9ICdQbGVhc2Ugc3dpdGNoIHRvIFZpdmFsZGksIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIG9yIFNhZmFyaS4nXHJcbiAgY29uc29sZS5sb2coZXJyKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXJyYXBhaW50IChub2lzZSwgdywgaCwgb3B0aW9ucykge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgdmFyIG9jdGF2ZXMgPSBvcHRpb25zLm9jdGF2ZXMgfHwgMVxyXG4gIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZCB8fCAzMlxyXG4gIHZhciBvZmZzZXQgPSBvcHRpb25zLm9mZnNldCA/IDEgOiAwXHJcbiAgdmFyIHBlcnNpc3RhbmNlID0gb3B0aW9ucy5wZXJzaXN0YW5jZSB8fCAyXHJcbiAgdmFyIGNvbG9ybWFwID0gb3B0aW9ucy5jb2xvcm1hcCB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gW3YsIHYsIHYsIDI1NV0gfVxyXG4gIHZhciB0YXJnZXQgPSBvcHRpb25zLnRhcmdldCB8fCBkb2N1bWVudC5ib2R5XHJcbiAgdGFyZ2V0ID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgXHJcbiAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxyXG4gICAgOiB0YXJnZXRcclxuXHJcbiAgdmFyIG9jdGF2YXRlID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgdmFyIHZhbCA9IDBcclxuICAgIHZhciBtYXggPSAwXHJcbiAgICB2YXIgcCA9IHBlcmlvZFxyXG4gICAgdmFyIGFtcCA9IE1hdGgucG93KHBlcnNpc3RhbmNlLCBvY3RhdmVzKVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvY3RhdmVzOyBpKyspIHtcclxuICAgICAgdmFsICs9IChub2lzZSh4IC8gcCwgeSAvIHApICsgb2Zmc2V0KSAqIGFtcFxyXG4gICAgICBtYXggKz0gYW1wICogKG9mZnNldCArIDEpXHJcbiAgICAgIGFtcCAvPSBwZXJzaXN0YW5jZVxyXG4gICAgICBwIC89IDJcclxuICAgIH1cclxuICAgIHJldHVybiB2YWwgLyBtYXhcclxuICB9XHJcbiBcclxuICB2YXIgbWFwID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHcgKiBoICogNClcclxuICBmb3IgKHZhciB5ID0gMDsgeSA8IGg7IHkrKykge1xyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB3OyB4KyspIHtcclxuICAgICAgdmFyIHZhbCA9IE1hdGgudHJ1bmMob2N0YXZhdGUoeCwgeSkgKiAyNTUpXHJcbiAgICAgIHZhciBwaXhlbERhdGFcclxuICAgICAgaWYgKHR5cGVvZiBjb2xvcm1hcCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHBpeGVsRGF0YSA9IGNvbG9ybWFwKHZhbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwaXhlbERhdGEgPSBjb2xvcm1hcFt2YWxdXHJcbiAgICAgIH1cclxuICAgICAgbWFwLnNldChwaXhlbERhdGEsIHggKiA0ICsgeSAqIDQgKiB3KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcbiAgdmFyIGltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEobWFwLCB3LCBoKVxyXG4gIGNhbnZhcy53aWR0aCA9IHdcclxuICBjYW52YXMuaGVpZ2h0ID0gaFxyXG4gIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxyXG4gIHRhcmdldC5hcHBlbmRDaGlsZChjYW52YXMpXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGVycmFwYWludFxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBUdW11bHQsIEphdmFTY3JpcHQgbm9pc2UgZ2VuZXJhdG9yXHJcbi8vIENyZWF0ZWQgYnkgUGhpbGlwIFNjb3R0IHwgU2NvdHR5RmlsbHVwcywgMjAxN1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vU2NvdHR5RmlsbHVwc1xyXG5cclxuLy8gTm9pc2UgYWxnb3JpdGhtcyBieSBLZW4gUGVybGluXHJcbi8vIFVzZXMgXCJyYW5kb20tc2VlZFwiIHBhY2thZ2Ugb24gTlBNIGZvciBzZWVkaW5nIGZ1bmN0aW9uXHJcblxyXG5cclxudmFyIHJhbmQgPSByZXF1aXJlKCdyYW5kb20tc2VlZCcpXHJcblxyXG52YXIgcm5nXHJcbnZhciBwID0gbmV3IFVpbnQ4QXJyYXkoNTEyKVxyXG5mdW5jdGlvbiBsZXJwIChhLCBiLCB0KSB7XHJcbiAgcmV0dXJuIGEgKiAoMSAtIHQpICsgYiAqIHRcclxufVxyXG5mdW5jdGlvbiBmYWRlICh0KSB7XHJcbiAgcmV0dXJuIHQgKiB0ICogdCAqICgxMCArIHQgKiAoLTE1ICsgdCAqIDYpKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZWVkIChzKSB7XHJcbiAgcm5nID0gcmFuZC5jcmVhdGUocylcclxuICB2YXIgaVxyXG4gIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykgcFtpXSA9IGlcclxuICBmb3IgKGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcclxuICAgIHZhciByID0gcm5nKDI1NilcclxuICAgIHZhciB0ZW1wID0gcFtpXVxyXG4gICAgcFtpXSA9IHBbcl1cclxuICAgIHBbcl0gPSB0ZW1wXHJcbiAgfVxyXG4gIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykgcFtpICsgMjU2XSA9IHBbaV1cclxufVxyXG5cclxuXHJcbnZhciBnMSA9IFsgbmV3IFZlYzEoMSksIG5ldyBWZWMxKC0xKSBdXHJcbmZ1bmN0aW9uIGdyYWQxICh4KSB7XHJcbiAgdmFyIGhhc2ggPSBwW3hdICUgZzEubGVuZ3RoXHJcbiAgcmV0dXJuIGcxW2hhc2hdXHJcbn1cclxuZnVuY3Rpb24gVmVjMSAoeCkge1xyXG4gIHRoaXMueCA9IHhcclxufVxyXG5WZWMxLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCkge1xyXG4gIHJldHVybiB0aGlzLnggKiB4XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBlcmxpbjEgKHgpIHtcclxuICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgdmFyIGR4ID0geCAtIGd4XHJcblxyXG4gIHZhciBuMCA9IGdyYWQxKGd4KS5kb3QoZHgpXHJcbiAgdmFyIG4xID0gZ3JhZDEoZ3ggKyAxKS5kb3QoZHggLSAxKVxyXG5cclxuICByZXR1cm4gbGVycChuMCwgbjEsIGZhZGUoZHgpKVxyXG59XHJcblxyXG5cclxudmFyIGcyID0gW1xyXG4gIG5ldyBWZWMyKDEsIDApLCBuZXcgVmVjMigxLCAxKSwgbmV3IFZlYzIoMCwgMSksIG5ldyBWZWMyKC0xLCAxKSxcclxuICBuZXcgVmVjMigtMSwgMCksIG5ldyBWZWMyKC0xLCAtMSksIG5ldyBWZWMyKDAsIC0xKSwgbmV3IFZlYzIoMSwgLTEpXHJcbl1cclxuZnVuY3Rpb24gZ3JhZDIgKHgsIHkpIHtcclxuICB2YXIgaGFzaCA9IHBbeCArIHBbeV1dICUgZzIubGVuZ3RoXHJcbiAgcmV0dXJuIGcyW2hhc2hdXHJcbn1cclxuZnVuY3Rpb24gVmVjMiAoeCwgeSkge1xyXG4gIHRoaXMueCA9IHhcclxuICB0aGlzLnkgPSB5XHJcbn1cclxuVmVjMi5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHlcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGVybGluMiAoeCwgeSkge1xyXG4gIHZhciBneCA9IE1hdGgudHJ1bmMoeCkgJSAyNTZcclxuICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XHJcblxyXG4gIHZhciBkeCA9IHggLSBneFxyXG4gIHZhciBkeSA9IHkgLSBneVxyXG5cclxuICB2YXIgbjAwID0gZ3JhZDIoZ3gsIGd5KS5kb3QoZHgsIGR5KVxyXG4gIHZhciBuMTAgPSBncmFkMihneCArIDEsIGd5KS5kb3QoZHggLSAxLCBkeSlcclxuICB2YXIgbjAxID0gZ3JhZDIoZ3gsIGd5ICsgMSkuZG90KGR4LCBkeSAtIDEpXHJcbiAgdmFyIG4xMSA9IGdyYWQyKGd4ICsgMSwgZ3kgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEpXHJcblxyXG4gIHJldHVybiBsZXJwKFxyXG4gICAgbGVycChuMDAsIG4xMCwgZmFkZShkeCkpLFxyXG4gICAgbGVycChuMDEsIG4xMSwgZmFkZShkeCkpLFxyXG4gICAgZmFkZShkeSlcclxuICApXHJcbn1cclxuXHJcblxyXG52YXIgZzMgPSBbXHJcbiAgbmV3IFZlYzMoMSwgMSwgMSksIG5ldyBWZWMzKC0xLCAxLCAxKSwgbmV3IFZlYzMoMSwgLTEsIDEpLCBuZXcgVmVjMygtMSwgLTEsIDEpLFxyXG4gIG5ldyBWZWMzKDEsIDEsIDApLCBuZXcgVmVjMygtMSwgMSwgMCksIG5ldyBWZWMzKDEsIC0xLCAwKSwgbmV3IFZlYzMoLTEsIC0xLCAwKSxcclxuICBuZXcgVmVjMygxLCAxLCAtMSksIG5ldyBWZWMzKC0xLCAxLCAtMSksIG5ldyBWZWMzKDEsIC0xLCAtMSksIG5ldyBWZWMzKC0xLCAtMSwgLTEpXHJcbl1cclxuZnVuY3Rpb24gZ3JhZDMgKHgsIHksIHopIHtcclxuICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbel1dXSAlIGczLmxlbmd0aFxyXG4gIHJldHVybiBnM1toYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzMgKHgsIHksIHopIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG4gIHRoaXMueiA9IHpcclxufVxyXG5WZWMzLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSwgeikge1xyXG4gIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeSArIHRoaXMueiAqIHpcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGVybGluMyAoeCwgeSwgeikge1xyXG4gIHZhciBneCA9IE1hdGgudHJ1bmMoeCkgJSAyNTZcclxuICB2YXIgZ3kgPSBNYXRoLnRydW5jKHkpICUgMjU2XHJcbiAgdmFyIGd6ID0gTWF0aC50cnVuYyh6KSAlIDI1NlxyXG5cclxuICB2YXIgZHggPSB4IC0gZ3hcclxuICB2YXIgZHkgPSB5IC0gZ3lcclxuICB2YXIgZHogPSB6IC0gZ3pcclxuXHJcbiAgdmFyIG4wMDAgPSBncmFkMyhneCwgZ3ksIGd6KS5kb3QoZHgsIGR5LCBkeilcclxuICB2YXIgbjEwMCA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6KS5kb3QoZHggLSAxLCBkeSwgZHopXHJcbiAgdmFyIG4wMTAgPSBncmFkMyhneCwgZ3kgKyAxLCBneikuZG90KGR4LCBkeSAtIDEsIGR6KVxyXG4gIHZhciBuMTEwID0gZ3JhZDMoZ3ggKyAxLCBneSArIDEsIGd6KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6KVxyXG4gIHZhciBuMDAxID0gZ3JhZDMoZ3gsIGd5LCBneiArIDEpLmRvdChkeCwgZHksIGR6IC0gMSlcclxuICB2YXIgbjEwMSA9IGdyYWQzKGd4ICsgMSwgZ3ksIGd6ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSlcclxuICB2YXIgbjAxMSA9IGdyYWQzKGd4LCBneSArIDEsIGd6ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSlcclxuICB2YXIgbjExMSA9IGdyYWQzKGd4ICsgMSwgZ3kgKyAxLCBneiArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxKVxyXG5cclxuICByZXR1cm4gbGVycChcclxuICAgIGxlcnAoXHJcbiAgICAgIGxlcnAobjAwMCwgbjEwMCwgZHgpLFxyXG4gICAgICBsZXJwKG4wMTAsIG4xMTAsIGR4KSxcclxuICAgICAgZmFkZShkeSlcclxuICAgICksXHJcbiAgICBsZXJwKFxyXG4gICAgICBsZXJwKG4wMDEsIG4xMDEsIGR4KSxcclxuICAgICAgbGVycChuMDExLCBuMTExLCBkeCksXHJcbiAgICAgIGZhZGUoZHkpXHJcbiAgICApLFxyXG4gICAgZmFkZShkeilcclxuICApXHJcbn1cclxuXHJcblxyXG52YXIgZzQgPSBbXHJcbiAgbmV3IFZlYzQoMCwgMSwgMSwgMSksIG5ldyBWZWM0KDAsIDEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgMSwgLTEsIDEpLCBuZXcgVmVjNCgwLCAxLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KDAsIC0xLCAxLCAxKSwgbmV3IFZlYzQoMCwgLTEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMCwgMSwgMSksIG5ldyBWZWM0KDEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoMSwgMCwgLTEsIDEpLCBuZXcgVmVjNCgxLCAwLCAtMSwgLTEpLFxyXG4gIG5ldyBWZWM0KC0xLCAwLCAxLCAxKSwgbmV3IFZlYzQoLTEsIDAsIDEsIC0xKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAxKSwgbmV3IFZlYzQoLTEsIDAsIC0xLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMSwgMCwgMSksIG5ldyBWZWM0KDEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoMSwgLTEsIDAsIDEpLCBuZXcgVmVjNCgxLCAtMSwgMCwgLTEpLFxyXG4gIG5ldyBWZWM0KC0xLCAxLCAwLCAxKSwgbmV3IFZlYzQoLTEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAxKSwgbmV3IFZlYzQoLTEsIC0xLCAwLCAtMSksXHJcbiAgbmV3IFZlYzQoMSwgMSwgMSwgMCksIG5ldyBWZWM0KDEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoMSwgLTEsIDEsIDApLCBuZXcgVmVjNCgxLCAtMSwgLTEsIDApLFxyXG4gIG5ldyBWZWM0KC0xLCAxLCAxLCAwKSwgbmV3IFZlYzQoLTEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAtMSwgMClcclxuXVxyXG5mdW5jdGlvbiBncmFkNCAoeCwgeSwgeiwgdCkge1xyXG4gIHZhciBoYXNoID0gcFt4ICsgcFt5ICsgcFt6ICsgcFt0XV1dXSAlIGc0Lmxlbmd0aFxyXG4gIHJldHVybiBnNFtoYXNoXVxyXG59XHJcbmZ1bmN0aW9uIFZlYzQgKHgsIHksIHosIHQpIHtcclxuICB0aGlzLnggPSB4XHJcbiAgdGhpcy55ID0geVxyXG4gIHRoaXMueiA9IHpcclxuICB0aGlzLnQgPSB0XHJcbn1cclxuVmVjNC5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHksIHosIHQpIHtcclxuICByZXR1cm4gdGhpcy54ICogeCArIHRoaXMueSAqIHkgKyB0aGlzLnogKiB6ICsgdGhpcy50ICogdFxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJsaW40ICh4LCB5LCB6LCB0KSB7XHJcbiAgdmFyIGd4ID0gTWF0aC50cnVuYyh4KSAlIDI1NlxyXG4gIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcclxuICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XHJcbiAgdmFyIGd0ID0gTWF0aC50cnVuYyh0KSAlIDI1NlxyXG5cclxuICB2YXIgZHggPSB4IC0gZ3hcclxuICB2YXIgZHkgPSB5IC0gZ3lcclxuICB2YXIgZHogPSB6IC0gZ3pcclxuICB2YXIgZHQgPSB0IC0gZ3RcclxuXHJcbiAgdmFyIG4wMDAwID0gZ3JhZDQoZ3gsIGd5LCBneiwgZ3QpLmRvdChkeCwgZHksIGR6LCBkdClcclxuICB2YXIgbjEwMDAgPSBncmFkNChneCArIDEsIGd5LCBneiwgZ3QpLmRvdChkeCAtIDEsIGR5LCBkeilcclxuICB2YXIgbjAxMDAgPSBncmFkNChneCwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCwgZHkgLSAxLCBkeilcclxuICB2YXIgbjExMDAgPSBncmFkNChneCArIDEsIGd5ICsgMSwgZ3osIGd0KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6KVxyXG4gIHZhciBuMDAxMCA9IGdyYWQ0KGd4LCBneSwgZ3ogKyAxLCBndCkuZG90KGR4LCBkeSwgZHogLSAxKVxyXG4gIHZhciBuMTAxMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6ICsgMSwgZ3QpLmRvdChkeCAtIDEsIGR5LCBkeiAtIDEpXHJcbiAgdmFyIG4wMTEwID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3ogKyAxLCBndCkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSlcclxuICB2YXIgbjExMTAgPSBncmFkNChneCArIDEsIGd5ICsgMSwgZ3ogKyAxLCBndCkuZG90KGR4IC0gMSwgZHkgLSAxLCBkeiAtIDEpXHJcbiAgdmFyIG4wMDAxID0gZ3JhZDQoZ3gsIGd5LCBneiwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiwgZHQgLSAxKVxyXG4gIHZhciBuMTAwMSA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6LCBndCArIDEpLmRvdChkeCAtIDEsIGR5LCBkeiwgZHQgLSAxKVxyXG4gIHZhciBuMDEwMSA9IGdyYWQ0KGd4LCBneSArIDEsIGd6LCBndCArIDEpLmRvdChkeCwgZHkgLSAxLCBkeiwgZHQgLSAxKVxyXG4gIHZhciBuMTEwMSA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6LCBkdCAtIDEpXHJcbiAgdmFyIG4wMDExID0gZ3JhZDQoZ3gsIGd5LCBneiArIDEsIGd0ICsgMSkuZG90KGR4LCBkeSwgZHogLSAxLCBkdCAtIDEpXHJcbiAgdmFyIG4xMDExID0gZ3JhZDQoZ3ggKyAxLCBneSwgZ3ogKyAxLCBndCArIDEpLmRvdChkeCAtIDEsIGR5LCBkeiAtIDEsIGR0IC0gMSlcclxuICB2YXIgbjAxMTEgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxyXG4gIHZhciBuMTExMSA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiArIDEsIGd0ICsgMSkuZG90KGR4IC0gMSwgZHkgLSAxLCBkeiAtIDEsIGR0IC0gMSlcclxuXHJcbiAgcmV0dXJuIGxlcnAoXHJcbiAgICBsZXJwKFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMDAsIG4xMDAwLCBkeCksXHJcbiAgICAgICAgbGVycChuMDEwMCwgbjExMDAsIGR4KSxcclxuICAgICAgICBmYWRlKGR5KVxyXG4gICAgICApLFxyXG4gICAgICBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwMTAsIG4xMDEwLCBkeCksXHJcbiAgICAgICAgbGVycChuMDExMCwgbjExMTAsIGR4KSxcclxuICAgICAgICBmYWRlKGR5KVxyXG4gICAgICApLFxyXG4gICAgICBmYWRlKGR6KVxyXG4gICAgKSxcclxuICAgIGxlcnAoXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAwMSwgbjEwMDEsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTAxLCBuMTEwMSwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGxlcnAoXHJcbiAgICAgICAgbGVycChuMDAxMSwgbjEwMTEsIGR4KSxcclxuICAgICAgICBsZXJwKG4wMTExLCBuMTExMSwgZHgpLFxyXG4gICAgICAgIGZhZGUoZHkpXHJcbiAgICAgICksXHJcbiAgICAgIGZhZGUoZHopXHJcbiAgICApLFxyXG4gICAgZmFkZShkdClcclxuICApXHJcbn1cclxuXHJcblxyXG52YXIgZ04gPSBbXVxyXG4vLyBnZW5lcmF0ZXMgYSBncmFkaWVudCBsb29rIHVwIHRhYmxlLCB3aGVyZSBlYWNoIGdyYWRpZW50IGhhcyBvbmUgcG9zaXRpdmVcclxuLy8gb3IgbmVnYXRpdmUgdW5pdCB2ZWN0b3IgaW4gb25lIGRpbWVuc2lvbi4gRm9yIGV4YW1wbGUsIGNhbGxpbmcgcGVybGluIHdpdGggMiBkaW1zOlxyXG4vLyBbMSwgMF0sIFstMSwgMF0sIFswLCAxXSwgWzAsIC0xXVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUdOIChkaW0pIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbSAqIDI7IGkrKykge1xyXG4gICAgdmFyIHZlYyA9IG5ldyBBcnJheShkaW0pLmZpbGwoMClcclxuICAgIHZlY1tpICUgZGltXSA9IGkgLyBkaW0gPj0gMSA/IDEgOiAtMVxyXG4gICAgZ05baV0gPSBuZXcgVmVjTih2ZWMpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGxlcnBOIChucywgZHMpIHtcclxuICBpZiAoZHMubGVuZ3RoID09PSAxKSByZXR1cm4gbGVycChuc1swXSwgbnNbMV0sIGZhZGUoZHNbMF0pKVxyXG4gIHZhciBuczEgPSBucy5zbGljZSgwLCBNYXRoLmZsb29yKG5zLmxlbmd0aCAvIDIpKVxyXG4gIHZhciBuczIgPSBucy5zbGljZShNYXRoLmNlaWwobnMubGVuZ3RoIC8gMikpXHJcbiAgcmV0dXJuIGxlcnAoXHJcbiAgICBsZXJwTihuczEsIGRzLnNsaWNlKDAsIGRzLmxlbmd0aCAtIDEpKSxcclxuICAgIGxlcnBOKG5zMiwgZHMuc2xpY2UoMCwgZHMubGVuZ3RoIC0gMSkpLFxyXG4gICAgZmFkZShkc1tkcy5sZW5ndGggLSAxXSlcclxuICApXHJcbn1cclxuZnVuY3Rpb24gaGFzaE4gKGdzKSB7XHJcbiAgaWYgKGdzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBbZ3NbMF1dXHJcbiAgcmV0dXJuIHBbZ3NbMF0gKyBoYXNoTihncy5zbGljZSgxKSldXHJcbn1cclxuZnVuY3Rpb24gZ2V0TnMgKGRpbSwgZ3MsIGRzKSB7XHJcbiAgdmFyIG5zID0gW11cclxuICBmb3IgKHZhciBpID0gMDsgaSA8ICgyIDw8IChkaW0gLSAxKSk7IGkrKykge1xyXG4gICAgdmFyIGdzUGVybSA9IGdzLnNsaWNlKClcclxuICAgIHZhciBkc1Blcm0gPSBkcy5zbGljZSgpXHJcbiAgICB2YXIgdGVtcCA9IGlcclxuXHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRpbTsgaisrKSB7XHJcbiAgICAgIGlmICh0ZW1wICYgMSkge1xyXG4gICAgICAgIGdzUGVybVtqXSArPSAxXHJcbiAgICAgICAgZHNQZXJtW2pdIC09IDFcclxuICAgICAgfVxyXG4gICAgICB0ZW1wID0gdGVtcCA+PiAxXHJcbiAgICB9XHJcbiAgICBuc1tpXSA9IGdOW2hhc2hOKGdzUGVybSkgJSBnTi5sZW5ndGhdLmRvdChkc1Blcm0pXHJcbiAgfVxyXG4gIHJldHVybiBuc1xyXG59XHJcbmZ1bmN0aW9uIFZlY04oUikge1xyXG4gIHRoaXMuUiA9IFJcclxufVxyXG5WZWNOLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoUikge1xyXG4gIHZhciB2YWwgPSAwXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBSLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YWwgKz0gdGhpcy5SW2ldICogUltpXVxyXG4gIH1cclxuICByZXR1cm4gdmFsXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBlcmxpbk4gKCkge1xyXG4gIHZhciBncyA9IFtdXHJcbiAgdmFyIGRzID0gW11cclxuXHJcbiAgaWYgKGdOLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgZ2VuZXJhdGVHTihhcmd1bWVudHMubGVuZ3RoKVxyXG4gIH1cclxuXHJcbiAgdmFyIGlcclxuICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBnc1tpXSA9IE1hdGgudHJ1bmMoYXJndW1lbnRzW2ldKSAlIDI1NlxyXG4gICAgZHNbaV0gPSBhcmd1bWVudHNbaV0gLSBnc1tpXVxyXG4gIH1cclxuICB2YXIgbnMgPSBnZXROcyhhcmd1bWVudHMubGVuZ3RoLCBncywgZHMpXHJcbiAgdmFyIHJlcyA9IGxlcnBOKG5zLCBkcylcclxuICByZXR1cm4gcmVzXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2VlZDogc2VlZCxcclxuICBwZXJsaW4xOiBwZXJsaW4xLFxyXG4gIHBlcmxpbjI6IHBlcmxpbjIsXHJcbiAgcGVybGluMzogcGVybGluMyxcclxuICBwZXJsaW40OiBwZXJsaW40LFxyXG4gIHBlcmxpbk46IHBlcmxpbk5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGZpeGVkTG9nZ2VyICh0YXJnZXQsIG1ldGhvZCwgY291bnQsIGRlYnVnKSB7XHJcbiAgdmFyIGxvZ2dlciA9IHtcclxuICAgIGNvdW50OiAwLFxyXG4gICAgbG9nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvdW50IDwgY291bnQgJiYgZGVidWcpIHtcclxuICAgICAgICB0aGlzLmNvdW50KytcclxuICAgICAgICB0YXJnZXRbbWV0aG9kXS5hcHBseSh0aGlzLCAoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbG9nZ2VyXHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbiAqIHJhbmRvbS1zZWVkXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc2tyYXRjaGRvdC9yYW5kb20tc2VlZFxuICpcbiAqIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IFN0ZXZlIEdpYnNvbiBhbmQgY2FuIGJlIGZvdW5kIGhlcmU6XG4gKlxuICogaHR0cHM6Ly93d3cuZ3JjLmNvbS9vdGcvdWhlcHJuZy5odG1cbiAqXG4gKiBJdCB3YXMgc2xpZ2h0bHkgbW9kaWZpZWQgZm9yIHVzZSBpbiBub2RlLCB0byBwYXNzIGpzaGludCwgYW5kIGEgZmV3IGFkZGl0aW9uYWxcbiAqIGhlbHBlciBmdW5jdGlvbnMgd2VyZSBhZGRlZC5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMgc2tyYXRjaGRvdFxuICogRHVhbCBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgYW5kIHRoZSBvcmlnaW5hbCBHUkMgY29weXJpZ2h0L2xpY2Vuc2VcbiAqIGluY2x1ZGVkIGJlbG93LlxuICovXG4vKlx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcdFx0XHRcdFx0XHRcdFx0R2lic29uIFJlc2VhcmNoIENvcnBvcmF0aW9uXG5cdFx0XHRcdFVIRVBSTkcgLSBVbHRyYSBIaWdoIEVudHJvcHkgUHNldWRvLVJhbmRvbSBOdW1iZXIgR2VuZXJhdG9yXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0TElDRU5TRSBBTkQgQ09QWVJJR0hUOiAgVEhJUyBDT0RFIElTIEhFUkVCWSBSRUxFQVNFRCBJTlRPIFRIRSBQVUJMSUMgRE9NQUlOXG5cdEdpYnNvbiBSZXNlYXJjaCBDb3Jwb3JhdGlvbiByZWxlYXNlcyBhbmQgZGlzY2xhaW1zIEFMTCBSSUdIVFMgQU5EIFRJVExFIElOXG5cdFRISVMgQ09ERSBPUiBBTlkgREVSSVZBVElWRVMuIEFueW9uZSBtYXkgYmUgZnJlZWx5IHVzZSBpdCBmb3IgYW55IHB1cnBvc2UuXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0VGhpcyBpcyBHUkMncyBjcnlwdG9ncmFwaGljYWxseSBzdHJvbmcgUFJORyAocHNldWRvLXJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yKVxuXHRmb3IgSmF2YVNjcmlwdC4gSXQgaXMgZHJpdmVuIGJ5IDE1MzYgYml0cyBvZiBlbnRyb3B5LCBzdG9yZWQgaW4gYW4gYXJyYXkgb2Zcblx0NDgsIDMyLWJpdCBKYXZhU2NyaXB0IHZhcmlhYmxlcy4gIFNpbmNlIG1hbnkgYXBwbGljYXRpb25zIG9mIHRoaXMgZ2VuZXJhdG9yLFxuXHRpbmNsdWRpbmcgb3VycyB3aXRoIHRoZSBcIk9mZiBUaGUgR3JpZFwiIExhdGluIFNxdWFyZSBnZW5lcmF0b3IsIG1heSByZXF1aXJlXG5cdHRoZSBkZXRlcmltaW5pc3RpYyByZS1nZW5lcmF0aW9uIG9mIGEgc2VxdWVuY2Ugb2YgUFJOcywgdGhpcyBQUk5HJ3MgaW5pdGlhbFxuXHRlbnRyb3BpYyBzdGF0ZSBjYW4gYmUgcmVhZCBhbmQgd3JpdHRlbiBhcyBhIHN0YXRpYyB3aG9sZSwgYW5kIGluY3JlbWVudGFsbHlcblx0ZXZvbHZlZCBieSBwb3VyaW5nIG5ldyBzb3VyY2UgZW50cm9weSBpbnRvIHRoZSBnZW5lcmF0b3IncyBpbnRlcm5hbCBzdGF0ZS5cblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRFTkRMRVNTIFRIQU5LUyBhcmUgZHVlIEpvaGFubmVzIEJhYWdvZSBmb3IgaGlzIGNhcmVmdWwgZGV2ZWxvcG1lbnQgb2YgaGlnaGx5XG5cdHJvYnVzdCBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9ucyBvZiBKUyBQUk5Hcy4gIFRoaXMgd29yayB3YXMgYmFzZWQgdXBvbiBoaXNcblx0SmF2YVNjcmlwdCBcIkFsZWFcIiBQUk5HIHdoaWNoIGlzIGJhc2VkIHVwb24gdGhlIGV4dHJlbWVseSByb2J1c3QgTXVsdGlwbHktXG5cdFdpdGgtQ2FycnkgKE1XQykgUFJORyBpbnZlbnRlZCBieSBHZW9yZ2UgTWFyc2FnbGlhLiBNV0MgQWxnb3JpdGhtIFJlZmVyZW5jZXM6XG5cdGh0dHA6Ly93d3cuR1JDLmNvbS9vdGcvTWFyc2FnbGlhX1BSTkdzLnBkZlxuXHRodHRwOi8vd3d3LkdSQy5jb20vb3RnL01hcnNhZ2xpYV9NV0NfR2VuZXJhdG9ycy5wZGZcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRUaGUgcXVhbGl0eSBvZiB0aGlzIGFsZ29yaXRobSdzIHBzZXVkby1yYW5kb20gbnVtYmVycyBoYXZlIGJlZW4gdmVyaWZpZWQgYnlcblx0bXVsdGlwbGUgaW5kZXBlbmRlbnQgcmVzZWFyY2hlcnMuIEl0IGhhbmRpbHkgcGFzc2VzIHRoZSBmZXJtaWxhYi5jaCB0ZXN0cyBhc1xuXHR3ZWxsIGFzIHRoZSBcImRpZWhhcmRcIiBhbmQgXCJkaWVoYXJkZXJcIiB0ZXN0IHN1aXRlcy4gIEZvciBpbmRpdmlkdWFscyB3aXNoaW5nXG5cdHRvIGZ1cnRoZXIgdmVyaWZ5IHRoZSBxdWFsaXR5IG9mIHRoaXMgYWxnb3JpdGhtJ3MgcHNldWRvLXJhbmRvbSBudW1iZXJzLCBhXG5cdDI1Ni1tZWdhYnl0ZSBmaWxlIG9mIHRoaXMgYWxnb3JpdGhtJ3Mgb3V0cHV0IG1heSBiZSBkb3dubG9hZGVkIGZyb20gR1JDLmNvbSxcblx0YW5kIGEgTWljcm9zb2Z0IFdpbmRvd3Mgc2NyaXB0aW5nIGhvc3QgKFdTSCkgdmVyc2lvbiBvZiB0aGlzIGFsZ29yaXRobSBtYXkgYmVcblx0ZG93bmxvYWRlZCBhbmQgcnVuIGZyb20gdGhlIFdpbmRvd3MgY29tbWFuZCBwcm9tcHQgdG8gZ2VuZXJhdGUgdW5pcXVlIGZpbGVzXG5cdG9mIGFueSBzaXplOlxuXHRUaGUgRmVybWlsYWIgXCJFTlRcIiB0ZXN0czogaHR0cDovL2ZvdXJtaWxhYi5jaC9yYW5kb20vXG5cdFRoZSAyNTYtbWVnYWJ5dGUgc2FtcGxlIFBSTiBmaWxlIGF0IEdSQzogaHR0cHM6Ly93d3cuR1JDLmNvbS9vdGcvdWhlcHJuZy5iaW5cblx0VGhlIFdpbmRvd3Mgc2NyaXB0aW5nIGhvc3QgdmVyc2lvbjogaHR0cHM6Ly93d3cuR1JDLmNvbS9vdGcvd3NoLXVoZXBybmcuanNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRRdWFsaWZ5aW5nIE1XQyBtdWx0aXBsaWVycyBhcmU6IDE4Nzg4NCwgNjg2MTE4LCA4OTgxMzQsIDExMDQzNzUsIDEyNTAyMDUsXG5cdDE0NjA5MTAgYW5kIDE3Njg4NjMuIChXZSB1c2UgdGhlIGxhcmdlc3Qgb25lIHRoYXQncyA8IDJeMjEpXG5cdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbid1c2Ugc3RyaWN0JztcbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5cbi8qXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5UaGlzIGlzIGJhc2VkIHVwb24gSm9oYW5uZXMgQmFhZ29lJ3MgY2FyZWZ1bGx5IGRlc2lnbmVkIGFuZCBlZmZpY2llbnQgaGFzaFxuZnVuY3Rpb24gZm9yIHVzZSB3aXRoIEphdmFTY3JpcHQuICBJdCBoYXMgYSBwcm92ZW4gXCJhdmFsYW5jaGVcIiBlZmZlY3Qgc3VjaFxudGhhdCBldmVyeSBiaXQgb2YgdGhlIGlucHV0IGFmZmVjdHMgZXZlcnkgYml0IG9mIHRoZSBvdXRwdXQgNTAlIG9mIHRoZSB0aW1lLFxud2hpY2ggaXMgZ29vZC5cdFNlZTogaHR0cDovL2JhYWdvZS5jb20vZW4vUmFuZG9tTXVzaW5ncy9oYXNoL2F2YWxhbmNoZS54aHRtbFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKi9cbnZhciBNYXNoID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgbiA9IDB4ZWZjODI0OWQ7XG5cdHZhciBtYXNoID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0ZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcblx0XHRcdFx0dmFyIGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcblx0XHRcdFx0biA9IGggPj4+IDA7XG5cdFx0XHRcdGggLT0gbjtcblx0XHRcdFx0aCAqPSBuO1xuXHRcdFx0XHRuID0gaCA+Pj4gMDtcblx0XHRcdFx0aCAtPSBuO1xuXHRcdFx0XHRuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIChuID4+PiAwKSAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG5cdFx0fSBlbHNlIHtcblx0XHRcdG4gPSAweGVmYzgyNDlkO1xuXHRcdH1cblx0fTtcblx0cmV0dXJuIG1hc2g7XG59O1xuXG52YXIgdWhlcHJuZyA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdHJldHVybiAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBvID0gNDg7IC8vIHNldCB0aGUgJ29yZGVyJyBudW1iZXIgb2YgRU5UUk9QWS1ob2xkaW5nIDMyLWJpdCB2YWx1ZXNcblx0XHR2YXIgYyA9IDE7IC8vIGluaXQgdGhlICdjYXJyeScgdXNlZCBieSB0aGUgbXVsdGlwbHktd2l0aC1jYXJyeSAoTVdDKSBhbGdvcml0aG1cblx0XHR2YXIgcCA9IG87IC8vIGluaXQgdGhlICdwaGFzZScgKG1heC0xKSBvZiB0aGUgaW50ZXJtZWRpYXRlIHZhcmlhYmxlIHBvaW50ZXJcblx0XHR2YXIgcyA9IG5ldyBBcnJheShvKTsgLy8gZGVjbGFyZSBvdXIgaW50ZXJtZWRpYXRlIHZhcmlhYmxlcyBhcnJheVxuXHRcdHZhciBpOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblx0XHR2YXIgajsgLy8gZ2VuZXJhbCBwdXJwb3NlIGxvY2FsXG5cdFx0dmFyIGsgPSAwOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblxuXHRcdC8vIHdoZW4gb3VyIFwidWhlcHJuZ1wiIGlzIGluaXRpYWxseSBpbnZva2VkIG91ciBQUk5HIHN0YXRlIGlzIGluaXRpYWxpemVkIGZyb20gdGhlXG5cdFx0Ly8gYnJvd3NlcidzIG93biBsb2NhbCBQUk5HLiBUaGlzIGlzIG9rYXkgc2luY2UgYWx0aG91Z2ggaXRzIGdlbmVyYXRvciBtaWdodCBub3Rcblx0XHQvLyBiZSB3b25kZXJmdWwsIGl0J3MgdXNlZnVsIGZvciBlc3RhYmxpc2hpbmcgbGFyZ2Ugc3RhcnR1cCBlbnRyb3B5IGZvciBvdXIgdXNhZ2UuXG5cdFx0dmFyIG1hc2ggPSBuZXcgTWFzaCgpOyAvLyBnZXQgYSBwb2ludGVyIHRvIG91ciBoaWdoLXBlcmZvcm1hbmNlIFwiTWFzaFwiIGhhc2hcblxuXHRcdC8vIGZpbGwgdGhlIGFycmF5IHdpdGggaW5pdGlhbCBtYXNoIGhhc2ggdmFsdWVzXG5cdFx0Zm9yIChpID0gMDsgaSA8IG87IGkrKykge1xuXHRcdFx0c1tpXSA9IG1hc2goTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhpcyBQUklWQVRFIChpbnRlcm5hbCBhY2Nlc3Mgb25seSkgZnVuY3Rpb24gaXMgdGhlIGhlYXJ0IG9mIHRoZSBtdWx0aXBseS13aXRoLWNhcnJ5XG5cdFx0Ly8gKE1XQykgUFJORyBhbGdvcml0aG0uIFdoZW4gY2FsbGVkIGl0IHJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIG51bWJlciBpbiB0aGUgZm9ybSBvZiBhXG5cdFx0Ly8gMzItYml0IEphdmFTY3JpcHQgZnJhY3Rpb24gKDAuMCB0byA8MS4wKSBpdCBpcyBhIFBSSVZBVEUgZnVuY3Rpb24gdXNlZCBieSB0aGUgZGVmYXVsdFxuXHRcdC8vIFswLTFdIHJldHVybiBmdW5jdGlvbiwgYW5kIGJ5IHRoZSByYW5kb20gJ3N0cmluZyhuKScgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyAnbidcblx0XHQvLyBjaGFyYWN0ZXJzIGZyb20gMzMgdG8gMTI2LlxuXHRcdHZhciByYXdwcm5nID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCsrcCA+PSBvKSB7XG5cdFx0XHRcdHAgPSAwO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHQgPSAxNzY4ODYzICogc1twXSArIGMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXHRcdFx0cmV0dXJuIHNbcF0gPSB0IC0gKGMgPSB0IHwgMCk7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gaXMgdGhlIGRlZmF1bHQgZnVuY3Rpb24gcmV0dXJuZWQgYnkgdGhpcyBsaWJyYXJ5LlxuXHRcdC8vIFRoZSB2YWx1ZXMgcmV0dXJuZWQgYXJlIGludGVnZXJzIGluIHRoZSByYW5nZSBmcm9tIDAgdG8gcmFuZ2UtMS4gV2UgZmlyc3Rcblx0XHQvLyBvYnRhaW4gdHdvIDMyLWJpdCBmcmFjdGlvbnMgKGZyb20gcmF3cHJuZykgdG8gc3ludGhlc2l6ZSBhIHNpbmdsZSBoaWdoXG5cdFx0Ly8gcmVzb2x1dGlvbiA1My1iaXQgcHJuZyAoMCB0byA8MSksIHRoZW4gd2UgbXVsdGlwbHkgdGhpcyBieSB0aGUgY2FsbGVyJ3Ncblx0XHQvLyBcInJhbmdlXCIgcGFyYW0gYW5kIHRha2UgdGhlIFwiZmxvb3JcIiB0byByZXR1cm4gYSBlcXVhbGx5IHByb2JhYmxlIGludGVnZXIuXG5cdFx0dmFyIHJhbmRvbSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IocmFuZ2UgKiAocmF3cHJuZygpICsgKHJhd3BybmcoKSAqIDB4MjAwMDAwIHwgMCkgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2KSk7IC8vIDJeLTUzXG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gJ3N0cmluZyhuKScgcmV0dXJucyBhIHBzZXVkby1yYW5kb20gc3RyaW5nIG9mXG5cdFx0Ly8gJ24nIHByaW50YWJsZSBjaGFyYWN0ZXJzIHJhbmdpbmcgZnJvbSBjaHIoMzMpIHRvIGNocigxMjYpIGluY2x1c2l2ZS5cblx0XHRyYW5kb20uc3RyaW5nID0gZnVuY3Rpb24gKGNvdW50KSB7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHZhciBzID0gJyc7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdFx0XHRzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMzMgKyByYW5kb20oOTQpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzO1xuXHRcdH07XG5cblx0XHQvLyB0aGlzIFBSSVZBVEUgXCJoYXNoXCIgZnVuY3Rpb24gaXMgdXNlZCB0byBldm9sdmUgdGhlIGdlbmVyYXRvcidzIGludGVybmFsXG5cdFx0Ly8gZW50cm9weSBzdGF0ZS4gSXQgaXMgYWxzbyBjYWxsZWQgYnkgdGhlIEVYUE9SVEVEIGFkZEVudHJvcHkoKSBmdW5jdGlvblxuXHRcdC8vIHdoaWNoIGlzIHVzZWQgdG8gcG91ciBlbnRyb3B5IGludG8gdGhlIFBSTkcuXG5cdFx0dmFyIGhhc2ggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbzsgaisrKSB7XG5cdFx0XHRcdFx0c1tqXSAtPSBtYXNoKGFyZ3NbaV0pO1xuXHRcdFx0XHRcdGlmIChzW2pdIDwgMCkge1xuXHRcdFx0XHRcdFx0c1tqXSArPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIFwiY2xlYW4gc3RyaW5nXCIgZnVuY3Rpb24gcmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXMgYW5kIG5vbi1wcmludGluZ1xuXHRcdC8vIGNvbnRyb2wgY2hhcmFjdGVycywgaW5jbHVkaW5nIGFueSBlbWJlZGRlZCBjYXJyaWFnZS1yZXR1cm4gKENSKSBhbmQgbGluZS1mZWVkIChMRikgY2hhcmFjdGVycyxcblx0XHQvLyBmcm9tIGFueSBzdHJpbmcgaXQgaXMgaGFuZGVkLiB0aGlzIGlzIGFsc28gdXNlZCBieSB0aGUgJ2hhc2hzdHJpbmcnIGZ1bmN0aW9uIChiZWxvdykgdG8gaGVscFxuXHRcdC8vIHVzZXJzIGFsd2F5cyBvYnRhaW4gdGhlIHNhbWUgRUZGRUNUSVZFIHVoZXBybmcgc2VlZGluZyBrZXkuXG5cdFx0cmFuZG9tLmNsZWFuU3RyaW5nID0gZnVuY3Rpb24gKGluU3RyKSB7XG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9naSwgJycpOyAvLyByZW1vdmUgYW55L2FsbCBsZWFkaW5nIHNwYWNlc1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC9bXFx4MDAtXFx4MUZdL2dpLCAnJyk7IC8vIHJlbW92ZSBhbnkvYWxsIGNvbnRyb2wgY2hhcmFjdGVyc1xuXHRcdFx0aW5TdHIgPSBpblN0ci5yZXBsYWNlKC9cXG4gLywgJ1xcbicpOyAvLyByZW1vdmUgYW55L2FsbCB0cmFpbGluZyBzcGFjZXNcblx0XHRcdHJldHVybiBpblN0cjsgLy8gcmV0dXJuIHRoZSBjbGVhbmVkIHVwIHJlc3VsdFxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIFwiaGFzaCBzdHJpbmdcIiBmdW5jdGlvbiBoYXNoZXMgdGhlIHByb3ZpZGVkIGNoYXJhY3RlciBzdHJpbmcgYWZ0ZXIgZmlyc3QgcmVtb3Zpbmdcblx0XHQvLyBhbnkgbGVhZGluZyBvciB0cmFpbGluZyBzcGFjZXMgYW5kIGlnbm9yaW5nIGFueSBlbWJlZGRlZCBjYXJyaWFnZSByZXR1cm5zIChDUikgb3IgTGluZSBGZWVkcyAoTEYpXG5cdFx0cmFuZG9tLmhhc2hTdHJpbmcgPSBmdW5jdGlvbiAoaW5TdHIpIHtcblx0XHRcdGluU3RyID0gcmFuZG9tLmNsZWFuU3RyaW5nKGluU3RyKTtcblx0XHRcdG1hc2goaW5TdHIpOyAvLyB1c2UgdGhlIHN0cmluZyB0byBldm9sdmUgdGhlICdtYXNoJyBzdGF0ZVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGluU3RyLmxlbmd0aDsgaSsrKSB7IC8vIHNjYW4gdGhyb3VnaCB0aGUgY2hhcmFjdGVycyBpbiBvdXIgc3RyaW5nXG5cdFx0XHRcdGsgPSBpblN0ci5jaGFyQ29kZUF0KGkpOyAvLyBnZXQgdGhlIGNoYXJhY3RlciBjb2RlIGF0IHRoZSBsb2NhdGlvblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbzsgaisrKSB7IC8vXHRcIm1hc2hcIiBpdCBpbnRvIHRoZSBVSEVQUk5HIHN0YXRlXG5cdFx0XHRcdFx0c1tqXSAtPSBtYXNoKGspO1xuXHRcdFx0XHRcdGlmIChzW2pdIDwgMCkge1xuXHRcdFx0XHRcdFx0c1tqXSArPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyB0aGlzIEVYUE9SVEVEIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2VlZCB0aGUgcmFuZG9tIGdlbmVyYXRvci5cblx0XHRyYW5kb20uc2VlZCA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdFx0XHRpZiAodHlwZW9mIHNlZWQgPT09ICd1bmRlZmluZWQnIHx8IHNlZWQgPT09IG51bGwpIHtcblx0XHRcdFx0c2VlZCA9IE1hdGgucmFuZG9tKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHNlZWQgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHNlZWQgPSBzdHJpbmdpZnkoc2VlZCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlKS50b1N0cmluZygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmFuZG9tLmluaXRTdGF0ZSgpO1xuXHRcdFx0cmFuZG9tLmhhc2hTdHJpbmcoc2VlZCk7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgaGFuZHkgZXhwb3J0ZWQgZnVuY3Rpb24gaXMgdXNlZCB0byBhZGQgZW50cm9weSB0byBvdXIgdWhlcHJuZyBhdCBhbnkgdGltZVxuXHRcdHJhbmRvbS5hZGRFbnRyb3B5ID0gZnVuY3Rpb24gKCAvKiBhY2NlcHQgemVybyBvciBtb3JlIGFyZ3VtZW50cyAqLyApIHtcblx0XHRcdHZhciBhcmdzID0gW107XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0fVxuXHRcdFx0aGFzaCgoaysrKSArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgKyBhcmdzLmpvaW4oJycpICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fTtcblxuXHRcdC8vIGlmIHdlIHdhbnQgdG8gcHJvdmlkZSBhIGRldGVybWluaXN0aWMgc3RhcnR1cCBjb250ZXh0IGZvciBvdXIgUFJORyxcblx0XHQvLyBidXQgd2l0aG91dCBkaXJlY3RseSBzZXR0aW5nIHRoZSBpbnRlcm5hbCBzdGF0ZSB2YXJpYWJsZXMsIHRoaXMgYWxsb3dzXG5cdFx0Ly8gdXMgdG8gaW5pdGlhbGl6ZSB0aGUgbWFzaCBoYXNoIGFuZCBQUk5HJ3MgaW50ZXJuYWwgc3RhdGUgYmVmb3JlIHByb3ZpZGluZ1xuXHRcdC8vIHNvbWUgaGFzaGluZyBpbnB1dFxuXHRcdHJhbmRvbS5pbml0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtYXNoKCk7IC8vIHBhc3MgYSBudWxsIGFyZyB0byBmb3JjZSBtYXNoIGhhc2ggdG8gaW5pdFxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG87IGkrKykge1xuXHRcdFx0XHRzW2ldID0gbWFzaCgnICcpOyAvLyBmaWxsIHRoZSBhcnJheSB3aXRoIGluaXRpYWwgbWFzaCBoYXNoIHZhbHVlc1xuXHRcdFx0fVxuXHRcdFx0YyA9IDE7IC8vIGluaXQgb3VyIG11bHRpcGx5LXdpdGgtY2FycnkgY2Fycnlcblx0XHRcdHAgPSBvOyAvLyBpbml0IG91ciBwaGFzZVxuXHRcdH07XG5cblx0XHQvLyB3ZSB1c2UgdGhpcyAob3B0aW9uYWwpIGV4cG9ydGVkIGZ1bmN0aW9uIHRvIHNpZ25hbCB0aGUgSmF2YVNjcmlwdCBpbnRlcnByZXRlclxuXHRcdC8vIHRoYXQgd2UncmUgZmluaXNoZWQgdXNpbmcgdGhlIFwiTWFzaFwiIGhhc2ggZnVuY3Rpb24gc28gdGhhdCBpdCBjYW4gZnJlZSB1cCB0aGVcblx0XHQvLyBsb2NhbCBcImluc3RhbmNlIHZhcmlhYmxlc1wiIGlzIHdpbGwgaGF2ZSBiZWVuIG1haW50YWluaW5nLiAgSXQncyBub3Qgc3RyaWN0bHlcblx0XHQvLyBuZWNlc3NhcnksIG9mIGNvdXJzZSwgYnV0IGl0J3MgZ29vZCBKYXZhU2NyaXB0IGNpdGl6ZW5zaGlwLlxuXHRcdHJhbmRvbS5kb25lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bWFzaCA9IG51bGw7XG5cdFx0fTtcblxuXHRcdC8vIGlmIHdlIGNhbGxlZCBcInVoZXBybmdcIiB3aXRoIGEgc2VlZCB2YWx1ZSwgdGhlbiBleGVjdXRlIHJhbmRvbS5zZWVkKCkgYmVmb3JlIHJldHVybmluZ1xuXHRcdGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJhbmRvbS5zZWVkKHNlZWQpO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIHJhbmdlIChleGNsdXNpdmUpXG5cdFx0cmFuZG9tLnJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tKHJhbmdlKTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIDEgKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20ucmFuZG9tID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHJhbmRvbShOdW1iZXIuTUFYX1ZBTFVFIC0gMSkgLyBOdW1iZXIuTUFYX1ZBTFVFO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20uZmxvYXRCZXR3ZWVuID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChpbmNsdXNpdmUpXG5cdFx0cmFuZG9tLmludEJldHdlZW4gPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHJhbmRvbS5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG5cdFx0fTtcblxuXHRcdC8vIHdoZW4gb3VyIG1haW4gb3V0ZXIgXCJ1aGVwcm5nXCIgZnVuY3Rpb24gaXMgY2FsbGVkLCBhZnRlciBzZXR0aW5nIHVwIG91clxuXHRcdC8vIGluaXRpYWwgdmFyaWFibGVzIGFuZCBlbnRyb3BpYyBzdGF0ZSwgd2UgcmV0dXJuIGFuIFwiaW5zdGFuY2UgcG9pbnRlclwiXG5cdFx0Ly8gdG8gdGhlIGludGVybmFsIGFub255bW91cyBmdW5jdGlvbiB3aGljaCBjYW4gdGhlbiBiZSB1c2VkIHRvIGFjY2Vzc1xuXHRcdC8vIHRoZSB1aGVwcm5nJ3MgdmFyaW91cyBleHBvcnRlZCBmdW5jdGlvbnMuICBBcyB3aXRoIHRoZSBcIi5kb25lXCIgZnVuY3Rpb25cblx0XHQvLyBhYm92ZSwgd2Ugc2hvdWxkIHNldCB0aGUgcmV0dXJuZWQgdmFsdWUgdG8gJ251bGwnIG9uY2Ugd2UncmUgZmluaXNoZWRcblx0XHQvLyB1c2luZyBhbnkgb2YgdGhlc2UgZnVuY3Rpb25zLlxuXHRcdHJldHVybiByYW5kb207XG5cdH0oKSk7XG59O1xuXG4vLyBNb2RpZmljYXRpb24gZm9yIHVzZSBpbiBub2RlOlxudWhlcHJuZy5jcmVhdGUgPSBmdW5jdGlvbiAoc2VlZCkge1xuXHRyZXR1cm4gbmV3IHVoZXBybmcoc2VlZCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB1aGVwcm5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmFuZG9tLXNlZWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5leHBvcnRzLmdldFNlcmlhbGl6ZSA9IHNlcmlhbGl6ZXJcblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaiwgcmVwbGFjZXIsIHNwYWNlcywgY3ljbGVSZXBsYWNlcikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSwgc3BhY2VzKVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHZhciBzdGFjayA9IFtdLCBrZXlzID0gW11cblxuICBpZiAoY3ljbGVSZXBsYWNlciA9PSBudWxsKSBjeWNsZVJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFja1swXSA9PT0gdmFsdWUpIHJldHVybiBcIltDaXJjdWxhciB+XVwiXG4gICAgcmV0dXJuIFwiW0NpcmN1bGFyIH4uXCIgKyBrZXlzLnNsaWNlKDAsIHN0YWNrLmluZGV4T2YodmFsdWUpKS5qb2luKFwiLlwiKSArIFwiXVwiXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgdGhpc1BvcyA9IHN0YWNrLmluZGV4T2YodGhpcylcbiAgICAgIH50aGlzUG9zID8gc3RhY2suc3BsaWNlKHRoaXNQb3MgKyAxKSA6IHN0YWNrLnB1c2godGhpcylcbiAgICAgIH50aGlzUG9zID8ga2V5cy5zcGxpY2UodGhpc1BvcywgSW5maW5pdHksIGtleSkgOiBrZXlzLnB1c2goa2V5KVxuICAgICAgaWYgKH5zdGFjay5pbmRleE9mKHZhbHVlKSkgdmFsdWUgPSBjeWNsZVJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgZWxzZSBzdGFjay5wdXNoKHZhbHVlKVxuXG4gICAgcmV0dXJuIHJlcGxhY2VyID09IG51bGwgPyB2YWx1ZSA6IHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==