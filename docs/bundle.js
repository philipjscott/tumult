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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_index__);


var noise = __WEBPACK_IMPORTED_MODULE_1__src_index___default()(Math.random())
__WEBPACK_IMPORTED_MODULE_0_terrapaint___default()(noise.perlinN, 256, 256, {
  offset: true
})
__WEBPACK_IMPORTED_MODULE_0_terrapaint___default()(noise.perlin2, 256, 256, {
  offset: true
})


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
/***/ (function(module, exports, __webpack_require__) {

var rand = __webpack_require__(3)

// Tumult, JavaScript noise generator
// Created by Philip Scott | ScottyFillups, 2017
// https://github.com/ScottyFillups

// Noise algorithms by Ken Perlin
// Uses "random-seed" package on NPM for seeding function

function tumultFactory (seed) {
  seed = seed || Math.random()

  var rng = rand.create(seed)
  var p = new Uint8Array(512)
  var g1 = [ new Vec1(1), new Vec1(-1) ]
  var g2 = [
    new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1), new Vec2(-1, 1),
    new Vec2(-1, 0), new Vec2(-1, -1), new Vec2(0, -1), new Vec2(1, -1)
  ]
/*  var g2 = [new Vec2(1, 0), new Vec2(-1, 0), new Vec2(0, 1), new Vec2(0, -1)]*/
  var g3 = [
    new Vec3(1, 1, 1), new Vec3(-1, 1, 1), new Vec3(1, -1, 1), new Vec3(-1, -1, 1),
    new Vec3(1, 1, 0), new Vec3(-1, 1, 0), new Vec3(1, -1, 0), new Vec3(-1, -1, 0),
    new Vec3(1, 1, -1), new Vec3(-1, 1, -1), new Vec3(1, -1, -1), new Vec3(-1, -1, -1)
  ]
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
  var gN = []
  function generateGN (count) {
    for (var i = 0; i < count * 2; i++) {
      var vec = new Array(count).fill(0)
      vec[i % count] = i / count >= 1 ? 1 : -1
      gN[i] = new VecN(vec)
    }
  }
  function lerp (a, b, t) {
    return a * (1 - t) + b * t
  }
  // too many Ns
  function lerpN (ns, ds) {
    if (ds.length === 1) return lerp(ns[0], ns[1], ds[0])
    var ns1 = ns.slice(0, ns.length / 2)
    var ns2 = ns.slice(ns.length / 2)
    return lerp(
      lerpN(ns1, ds.slice(1)),
      lerpN(ns2, ds.slice(1)),
      fade(ds[0])
    )
  }
  function fade (t) {
    return t * t * t * (10 + t * (-15 + t * 6))
  }
  function grad1 (x) {
    var hash = p[x] % g1.length
    return g1[hash]
  }
  function grad2 (x, y) {
    var hash = p[x + p[y]] % g2.length
    return g2[hash]
  }
  function grad3 (x, y, z) {
    var hash = p[x + p[y + p[z]]] % g3.length
    return g3[hash]
  }
  function grad4 (x, y, z, t) {
    var hash = p[x + p[y + p[z + p[t]]]] % g4.length
    return g4[hash]
  }
  function hashN (gs) {
    if (gs.length === 1) return p[gs[0]]
    return p[gs[0] + hashN(gs.slice(1))]
  }
  function getNs (count, gs, ds) {
    var ns = []
    for (var i = 0; i < (2 << (count - 1)); i++) {
      var gsPerm = gs.slice()
      var dsPerm = ds.slice()
      var temp = i

      for (var j = 0; j < count; j++) {
        if (temp & 1) {
          gsPerm[j] += 1
          dsPerm[j] -= 1
        }
        temp = temp >> 1
      }
      ns[i] = gN[hashN(gsPerm) % (count * 2)].dot(dsPerm)
    }
    return ns
  }
  function Vec1 (x) {
    this.x = x
  }
  function Vec2 (x, y) {
    this.x = x
    this.y = y
  }
  function Vec3 (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  function Vec4 (x, y, z, t) {
    this.x = x
    this.y = y
    this.z = z
    this.t = t
  }
  function VecN(R) {
    this.R = R
  }
  Vec1.prototype.dot = function (x) {
    return this.x * x
  }
  Vec2.prototype.dot = function (x, y) {
    return this.x * x + this.y * y
  }
  Vec3.prototype.dot = function (x, y, z) {
    return this.x * x + this.y * y + this.z * z
  }
  Vec4.prototype.dot = function (x, y, z, t) {
    return this.x * x + this.y * y + this.z * z + this.t * t
  }
  VecN.prototype.dot = function (R) {
    var val = 0
    for (var i = 0; i < R.length; i++) {
      val += this.R[i] * R[i]
    }
    return val
  }

  var i
  for (i = 0; i < 256; i++) p[i] = i
  for (i = 0; i < 256; i++) {
    var r = rng(256)
    var temp = p[i]
    p[i] = p[r]
    p[r] = temp
  }
  for (i = 0; i < 256; i++) p[i + 256] = p[i]

  var module = {
    seed: function (s) {
      rng = rand.create(s)
    },
    perlin1: function (x) {
      var gx = Math.trunc(x) % 256
      var dx = x - gx

      var n0 = grad1(gx).dot(dx)
      var n1 = grad1(gx + 1).dot(dx - 1)

      return lerp(n0, n1, fade(dx))
    },
    perlin2: function (x, y) {
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
    },
    perlin3: function (x, y, z) {
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
    },
    perlin4: function (x, y, z, t) {
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
    },
    perlinN: function () {
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
      return lerpN(ns, ds.reverse())
    }
  }

  return module
}

module.exports = tumultFactory


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTM0YTk0MGM4MzkyMzJkNTVkNjUiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JhbmRvbS1zZWVkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ1JEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixhQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMURBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHdCQUF3QjtBQUMzQztBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7OztBQ25TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsNkNBQTZDO0FBQzdDLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsWUFBWTtBQUNaLFlBQVk7QUFDWix1QkFBdUI7QUFDdkIsUUFBUTtBQUNSLFFBQVE7QUFDUixZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0c7QUFDaEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsV0FBVztBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxpQkFBaUI7QUFDL0IsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLHNDQUFzQztBQUN0QyxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsY0FBYyxrQkFBa0IsT0FBTztBQUN2Qyw0QkFBNEI7QUFDNUIsZUFBZSxPQUFPLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHNCQUFzQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGNBQWMsT0FBTztBQUNyQixxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzUUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxMzRhOTQwYzgzOTIzMmQ1NWQ2NSIsImltcG9ydCB0ZXJyYXBhaW50IGZyb20gJ3RlcnJhcGFpbnQnXHJcbmltcG9ydCB0dW11bHQgZnJvbSAnLi4vc3JjL2luZGV4J1xyXG52YXIgbm9pc2UgPSB0dW11bHQoTWF0aC5yYW5kb20oKSlcclxudGVycmFwYWludChub2lzZS5wZXJsaW5OLCAyNTYsIDI1Niwge1xyXG4gIG9mZnNldDogdHJ1ZVxyXG59KVxyXG50ZXJyYXBhaW50KG5vaXNlLnBlcmxpbjIsIDI1NiwgMjU2LCB7XHJcbiAgb2Zmc2V0OiB0cnVlXHJcbn0pXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZG9jcy9kZW1vLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInRyeSB7XHJcbiAgdmFyIGltYWdlVGVzdCA9IG5ldyBJbWFnZURhdGEoMjAsIDIwKVxyXG4gIHZhciBudW1iZXJUZXN0ID0gTWF0aC50cnVuYygyMC4xKVxyXG59IGNhdGNoIChlKSB7XHJcbiAgdmFyIGVyciA9ICdFcnJvciwgYnJvd3NlciBub3Qgc3VwcG9ydGVkIGJ5IFRlcnJhcGFpbnQuICdcclxuICBlcnIgKz0gJ1BsZWFzZSBzd2l0Y2ggdG8gVml2YWxkaSwgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgb3IgU2FmYXJpLidcclxuICBjb25zb2xlLmxvZyhlcnIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlcnJhcGFpbnQgKG5vaXNlLCB3LCBoLCBvcHRpb25zKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICB2YXIgb2N0YXZlcyA9IG9wdGlvbnMub2N0YXZlcyB8fCAxXHJcbiAgdmFyIHBlcmlvZCA9IG9wdGlvbnMucGVyaW9kIHx8IDMyXHJcbiAgdmFyIG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0ID8gMSA6IDBcclxuICB2YXIgcGVyc2lzdGFuY2UgPSBvcHRpb25zLnBlcnNpc3RhbmNlIHx8IDJcclxuICB2YXIgY29sb3JtYXAgPSBvcHRpb25zLmNvbG9ybWFwIHx8IGZ1bmN0aW9uICh2KSB7IHJldHVybiBbdiwgdiwgdiwgMjU1XSB9XHJcbiAgdmFyIHRhcmdldCA9IG9wdGlvbnMudGFyZ2V0IHx8IGRvY3VtZW50LmJvZHlcclxuICB0YXJnZXQgPSB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyBcclxuICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXHJcbiAgICA6IHRhcmdldFxyXG5cclxuICB2YXIgb2N0YXZhdGUgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgdmFsID0gMFxyXG4gICAgdmFyIG1heCA9IDBcclxuICAgIHZhciBwID0gcGVyaW9kXHJcbiAgICB2YXIgYW1wID0gTWF0aC5wb3cocGVyc2lzdGFuY2UsIG9jdGF2ZXMpXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9jdGF2ZXM7IGkrKykge1xyXG4gICAgICB2YWwgKz0gKG5vaXNlKHggLyBwLCB5IC8gcCkgKyBvZmZzZXQpICogYW1wXHJcbiAgICAgIG1heCArPSBhbXAgKiAob2Zmc2V0ICsgMSlcclxuICAgICAgYW1wIC89IHBlcnNpc3RhbmNlXHJcbiAgICAgIHAgLz0gMlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbCAvIG1heFxyXG4gIH1cclxuIFxyXG4gIHZhciBtYXAgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkodyAqIGggKiA0KVxyXG4gIGZvciAodmFyIHkgPSAwOyB5IDwgaDsgeSsrKSB7XHJcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHc7IHgrKykge1xyXG4gICAgICB2YXIgdmFsID0gTWF0aC50cnVuYyhvY3RhdmF0ZSh4LCB5KSAqIDI1NSlcclxuICAgICAgdmFyIHBpeGVsRGF0YVxyXG4gICAgICBpZiAodHlwZW9mIGNvbG9ybWFwID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcGl4ZWxEYXRhID0gY29sb3JtYXAodmFsKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBpeGVsRGF0YSA9IGNvbG9ybWFwW3ZhbF1cclxuICAgICAgfVxyXG4gICAgICBtYXAuc2V0KHBpeGVsRGF0YSwgeCAqIDQgKyB5ICogNCAqIHcpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICB2YXIgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShtYXAsIHcsIGgpXHJcbiAgY2FudmFzLndpZHRoID0gd1xyXG4gIGNhbnZhcy5oZWlnaHQgPSBoXHJcbiAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXHJcbiAgdGFyZ2V0LmFwcGVuZENoaWxkKGNhbnZhcylcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXJyYXBhaW50XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJhcGFpbnQvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciByYW5kID0gcmVxdWlyZSgncmFuZG9tLXNlZWQnKVxyXG5cclxuLy8gVHVtdWx0LCBKYXZhU2NyaXB0IG5vaXNlIGdlbmVyYXRvclxyXG4vLyBDcmVhdGVkIGJ5IFBoaWxpcCBTY290dCB8IFNjb3R0eUZpbGx1cHMsIDIwMTdcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL1Njb3R0eUZpbGx1cHNcclxuXHJcbi8vIE5vaXNlIGFsZ29yaXRobXMgYnkgS2VuIFBlcmxpblxyXG4vLyBVc2VzIFwicmFuZG9tLXNlZWRcIiBwYWNrYWdlIG9uIE5QTSBmb3Igc2VlZGluZyBmdW5jdGlvblxyXG5cclxuZnVuY3Rpb24gdHVtdWx0RmFjdG9yeSAoc2VlZCkge1xyXG4gIHNlZWQgPSBzZWVkIHx8IE1hdGgucmFuZG9tKClcclxuXHJcbiAgdmFyIHJuZyA9IHJhbmQuY3JlYXRlKHNlZWQpXHJcbiAgdmFyIHAgPSBuZXcgVWludDhBcnJheSg1MTIpXHJcbiAgdmFyIGcxID0gWyBuZXcgVmVjMSgxKSwgbmV3IFZlYzEoLTEpIF1cclxuICB2YXIgZzIgPSBbXHJcbiAgICBuZXcgVmVjMigxLCAwKSwgbmV3IFZlYzIoMSwgMSksIG5ldyBWZWMyKDAsIDEpLCBuZXcgVmVjMigtMSwgMSksXHJcbiAgICBuZXcgVmVjMigtMSwgMCksIG5ldyBWZWMyKC0xLCAtMSksIG5ldyBWZWMyKDAsIC0xKSwgbmV3IFZlYzIoMSwgLTEpXHJcbiAgXVxyXG4vKiAgdmFyIGcyID0gW25ldyBWZWMyKDEsIDApLCBuZXcgVmVjMigtMSwgMCksIG5ldyBWZWMyKDAsIDEpLCBuZXcgVmVjMigwLCAtMSldKi9cclxuICB2YXIgZzMgPSBbXHJcbiAgICBuZXcgVmVjMygxLCAxLCAxKSwgbmV3IFZlYzMoLTEsIDEsIDEpLCBuZXcgVmVjMygxLCAtMSwgMSksIG5ldyBWZWMzKC0xLCAtMSwgMSksXHJcbiAgICBuZXcgVmVjMygxLCAxLCAwKSwgbmV3IFZlYzMoLTEsIDEsIDApLCBuZXcgVmVjMygxLCAtMSwgMCksIG5ldyBWZWMzKC0xLCAtMSwgMCksXHJcbiAgICBuZXcgVmVjMygxLCAxLCAtMSksIG5ldyBWZWMzKC0xLCAxLCAtMSksIG5ldyBWZWMzKDEsIC0xLCAtMSksIG5ldyBWZWMzKC0xLCAtMSwgLTEpXHJcbiAgXVxyXG4gIHZhciBnNCA9IFtcclxuICAgIG5ldyBWZWM0KDAsIDEsIDEsIDEpLCBuZXcgVmVjNCgwLCAxLCAxLCAtMSksIG5ldyBWZWM0KDAsIDEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgMSwgLTEsIC0xKSxcclxuICAgIG5ldyBWZWM0KDAsIC0xLCAxLCAxKSwgbmV3IFZlYzQoMCwgLTEsIDEsIC0xKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAxKSwgbmV3IFZlYzQoMCwgLTEsIC0xLCAtMSksXHJcbiAgICBuZXcgVmVjNCgxLCAwLCAxLCAxKSwgbmV3IFZlYzQoMSwgMCwgMSwgLTEpLCBuZXcgVmVjNCgxLCAwLCAtMSwgMSksIG5ldyBWZWM0KDEsIDAsIC0xLCAtMSksXHJcbiAgICBuZXcgVmVjNCgtMSwgMCwgMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAxLCAtMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgMSksIG5ldyBWZWM0KC0xLCAwLCAtMSwgLTEpLFxyXG4gICAgbmV3IFZlYzQoMSwgMSwgMCwgMSksIG5ldyBWZWM0KDEsIDEsIDAsIC0xKSwgbmV3IFZlYzQoMSwgLTEsIDAsIDEpLCBuZXcgVmVjNCgxLCAtMSwgMCwgLTEpLFxyXG4gICAgbmV3IFZlYzQoLTEsIDEsIDAsIDEpLCBuZXcgVmVjNCgtMSwgMSwgMCwgLTEpLCBuZXcgVmVjNCgtMSwgLTEsIDAsIDEpLCBuZXcgVmVjNCgtMSwgLTEsIDAsIC0xKSxcclxuICAgIG5ldyBWZWM0KDEsIDEsIDEsIDApLCBuZXcgVmVjNCgxLCAxLCAtMSwgMCksIG5ldyBWZWM0KDEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoMSwgLTEsIC0xLCAwKSxcclxuICAgIG5ldyBWZWM0KC0xLCAxLCAxLCAwKSwgbmV3IFZlYzQoLTEsIDEsIC0xLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAxLCAwKSwgbmV3IFZlYzQoLTEsIC0xLCAtMSwgMClcclxuICBdXHJcbiAgdmFyIGdOID0gW11cclxuICBmdW5jdGlvbiBnZW5lcmF0ZUdOIChjb3VudCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudCAqIDI7IGkrKykge1xyXG4gICAgICB2YXIgdmVjID0gbmV3IEFycmF5KGNvdW50KS5maWxsKDApXHJcbiAgICAgIHZlY1tpICUgY291bnRdID0gaSAvIGNvdW50ID49IDEgPyAxIDogLTFcclxuICAgICAgZ05baV0gPSBuZXcgVmVjTih2ZWMpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGxlcnAgKGEsIGIsIHQpIHtcclxuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0XHJcbiAgfVxyXG4gIC8vIHRvbyBtYW55IE5zXHJcbiAgZnVuY3Rpb24gbGVycE4gKG5zLCBkcykge1xyXG4gICAgaWYgKGRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGxlcnAobnNbMF0sIG5zWzFdLCBkc1swXSlcclxuICAgIHZhciBuczEgPSBucy5zbGljZSgwLCBucy5sZW5ndGggLyAyKVxyXG4gICAgdmFyIG5zMiA9IG5zLnNsaWNlKG5zLmxlbmd0aCAvIDIpXHJcbiAgICByZXR1cm4gbGVycChcclxuICAgICAgbGVycE4obnMxLCBkcy5zbGljZSgxKSksXHJcbiAgICAgIGxlcnBOKG5zMiwgZHMuc2xpY2UoMSkpLFxyXG4gICAgICBmYWRlKGRzWzBdKVxyXG4gICAgKVxyXG4gIH1cclxuICBmdW5jdGlvbiBmYWRlICh0KSB7XHJcbiAgICByZXR1cm4gdCAqIHQgKiB0ICogKDEwICsgdCAqICgtMTUgKyB0ICogNikpXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdyYWQxICh4KSB7XHJcbiAgICB2YXIgaGFzaCA9IHBbeF0gJSBnMS5sZW5ndGhcclxuICAgIHJldHVybiBnMVtoYXNoXVxyXG4gIH1cclxuICBmdW5jdGlvbiBncmFkMiAoeCwgeSkge1xyXG4gICAgdmFyIGhhc2ggPSBwW3ggKyBwW3ldXSAlIGcyLmxlbmd0aFxyXG4gICAgcmV0dXJuIGcyW2hhc2hdXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdyYWQzICh4LCB5LCB6KSB7XHJcbiAgICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbel1dXSAlIGczLmxlbmd0aFxyXG4gICAgcmV0dXJuIGczW2hhc2hdXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdyYWQ0ICh4LCB5LCB6LCB0KSB7XHJcbiAgICB2YXIgaGFzaCA9IHBbeCArIHBbeSArIHBbeiArIHBbdF1dXV0gJSBnNC5sZW5ndGhcclxuICAgIHJldHVybiBnNFtoYXNoXVxyXG4gIH1cclxuICBmdW5jdGlvbiBoYXNoTiAoZ3MpIHtcclxuICAgIGlmIChncy5sZW5ndGggPT09IDEpIHJldHVybiBwW2dzWzBdXVxyXG4gICAgcmV0dXJuIHBbZ3NbMF0gKyBoYXNoTihncy5zbGljZSgxKSldXHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldE5zIChjb3VudCwgZ3MsIGRzKSB7XHJcbiAgICB2YXIgbnMgPSBbXVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAoMiA8PCAoY291bnQgLSAxKSk7IGkrKykge1xyXG4gICAgICB2YXIgZ3NQZXJtID0gZ3Muc2xpY2UoKVxyXG4gICAgICB2YXIgZHNQZXJtID0gZHMuc2xpY2UoKVxyXG4gICAgICB2YXIgdGVtcCA9IGlcclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY291bnQ7IGorKykge1xyXG4gICAgICAgIGlmICh0ZW1wICYgMSkge1xyXG4gICAgICAgICAgZ3NQZXJtW2pdICs9IDFcclxuICAgICAgICAgIGRzUGVybVtqXSAtPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXAgPSB0ZW1wID4+IDFcclxuICAgICAgfVxyXG4gICAgICBuc1tpXSA9IGdOW2hhc2hOKGdzUGVybSkgJSAoY291bnQgKiAyKV0uZG90KGRzUGVybSlcclxuICAgIH1cclxuICAgIHJldHVybiBuc1xyXG4gIH1cclxuICBmdW5jdGlvbiBWZWMxICh4KSB7XHJcbiAgICB0aGlzLnggPSB4XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIFZlYzIgKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHhcclxuICAgIHRoaXMueSA9IHlcclxuICB9XHJcbiAgZnVuY3Rpb24gVmVjMyAoeCwgeSwgeikge1xyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gICAgdGhpcy56ID0gelxyXG4gIH1cclxuICBmdW5jdGlvbiBWZWM0ICh4LCB5LCB6LCB0KSB7XHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcbiAgICB0aGlzLnogPSB6XHJcbiAgICB0aGlzLnQgPSB0XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIFZlY04oUikge1xyXG4gICAgdGhpcy5SID0gUlxyXG4gIH1cclxuICBWZWMxLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHhcclxuICB9XHJcbiAgVmVjMi5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLnggKiB4ICsgdGhpcy55ICogeVxyXG4gIH1cclxuICBWZWMzLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSwgeikge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5ICsgdGhpcy56ICogelxyXG4gIH1cclxuICBWZWM0LnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAoeCwgeSwgeiwgdCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5ICsgdGhpcy56ICogeiArIHRoaXMudCAqIHRcclxuICB9XHJcbiAgVmVjTi5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKFIpIHtcclxuICAgIHZhciB2YWwgPSAwXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFsICs9IHRoaXMuUltpXSAqIFJbaV1cclxuICAgIH1cclxuICAgIHJldHVybiB2YWxcclxuICB9XHJcblxyXG4gIHZhciBpXHJcbiAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSBwW2ldID0gaVxyXG4gIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykge1xyXG4gICAgdmFyIHIgPSBybmcoMjU2KVxyXG4gICAgdmFyIHRlbXAgPSBwW2ldXHJcbiAgICBwW2ldID0gcFtyXVxyXG4gICAgcFtyXSA9IHRlbXBcclxuICB9XHJcbiAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSBwW2kgKyAyNTZdID0gcFtpXVxyXG5cclxuICB2YXIgbW9kdWxlID0ge1xyXG4gICAgc2VlZDogZnVuY3Rpb24gKHMpIHtcclxuICAgICAgcm5nID0gcmFuZC5jcmVhdGUocylcclxuICAgIH0sXHJcbiAgICBwZXJsaW4xOiBmdW5jdGlvbiAoeCkge1xyXG4gICAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICAgIHZhciBkeCA9IHggLSBneFxyXG5cclxuICAgICAgdmFyIG4wID0gZ3JhZDEoZ3gpLmRvdChkeClcclxuICAgICAgdmFyIG4xID0gZ3JhZDEoZ3ggKyAxKS5kb3QoZHggLSAxKVxyXG5cclxuICAgICAgcmV0dXJuIGxlcnAobjAsIG4xLCBmYWRlKGR4KSlcclxuICAgIH0sXHJcbiAgICBwZXJsaW4yOiBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcclxuXHJcbiAgICAgIHZhciBkeCA9IHggLSBneFxyXG4gICAgICB2YXIgZHkgPSB5IC0gZ3lcclxuXHJcbiAgICAgIHZhciBuMDAgPSBncmFkMihneCwgZ3kpLmRvdChkeCwgZHkpXHJcbiAgICAgIHZhciBuMTAgPSBncmFkMihneCArIDEsIGd5KS5kb3QoZHggLSAxLCBkeSlcclxuICAgICAgdmFyIG4wMSA9IGdyYWQyKGd4LCBneSArIDEpLmRvdChkeCwgZHkgLSAxKVxyXG4gICAgICB2YXIgbjExID0gZ3JhZDIoZ3ggKyAxLCBneSArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSlcclxuXHJcbiAgICAgIHJldHVybiBsZXJwKFxyXG4gICAgICAgIGxlcnAobjAwLCBuMTAsIGZhZGUoZHgpKSxcclxuICAgICAgICBsZXJwKG4wMSwgbjExLCBmYWRlKGR4KSksXHJcbiAgICAgICAgZmFkZShkeSlcclxuICAgICAgKVxyXG4gICAgfSxcclxuICAgIHBlcmxpbjM6IGZ1bmN0aW9uICh4LCB5LCB6KSB7XHJcbiAgICAgIHZhciBneCA9IE1hdGgudHJ1bmMoeCkgJSAyNTZcclxuICAgICAgdmFyIGd5ID0gTWF0aC50cnVuYyh5KSAlIDI1NlxyXG4gICAgICB2YXIgZ3ogPSBNYXRoLnRydW5jKHopICUgMjU2XHJcblxyXG4gICAgICB2YXIgZHggPSB4IC0gZ3hcclxuICAgICAgdmFyIGR5ID0geSAtIGd5XHJcbiAgICAgIHZhciBkeiA9IHogLSBnelxyXG5cclxuICAgICAgdmFyIG4wMDAgPSBncmFkMyhneCwgZ3ksIGd6KS5kb3QoZHgsIGR5LCBkeilcclxuICAgICAgdmFyIG4xMDAgPSBncmFkMyhneCArIDEsIGd5LCBneikuZG90KGR4IC0gMSwgZHksIGR6KVxyXG4gICAgICB2YXIgbjAxMCA9IGdyYWQzKGd4LCBneSArIDEsIGd6KS5kb3QoZHgsIGR5IC0gMSwgZHopXHJcbiAgICAgIHZhciBuMTEwID0gZ3JhZDMoZ3ggKyAxLCBneSArIDEsIGd6KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6KVxyXG4gICAgICB2YXIgbjAwMSA9IGdyYWQzKGd4LCBneSwgZ3ogKyAxKS5kb3QoZHgsIGR5LCBkeiAtIDEpXHJcbiAgICAgIHZhciBuMTAxID0gZ3JhZDMoZ3ggKyAxLCBneSwgZ3ogKyAxKS5kb3QoZHggLSAxLCBkeSwgZHogLSAxKVxyXG4gICAgICB2YXIgbjAxMSA9IGdyYWQzKGd4LCBneSArIDEsIGd6ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSlcclxuICAgICAgdmFyIG4xMTEgPSBncmFkMyhneCArIDEsIGd5ICsgMSwgZ3ogKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSlcclxuXHJcbiAgICAgIHJldHVybiBsZXJwKFxyXG4gICAgICAgIGxlcnAoXHJcbiAgICAgICAgICBsZXJwKG4wMDAsIG4xMDAsIGR4KSxcclxuICAgICAgICAgIGxlcnAobjAxMCwgbjExMCwgZHgpLFxyXG4gICAgICAgICAgZmFkZShkeSlcclxuICAgICAgICApLFxyXG4gICAgICAgIGxlcnAoXHJcbiAgICAgICAgICBsZXJwKG4wMDEsIG4xMDEsIGR4KSxcclxuICAgICAgICAgIGxlcnAobjAxMSwgbjExMSwgZHgpLFxyXG4gICAgICAgICAgZmFkZShkeSlcclxuICAgICAgICApLFxyXG4gICAgICAgIGZhZGUoZHopXHJcbiAgICAgIClcclxuICAgIH0sXHJcbiAgICBwZXJsaW40OiBmdW5jdGlvbiAoeCwgeSwgeiwgdCkge1xyXG4gICAgICB2YXIgZ3ggPSBNYXRoLnRydW5jKHgpICUgMjU2XHJcbiAgICAgIHZhciBneSA9IE1hdGgudHJ1bmMoeSkgJSAyNTZcclxuICAgICAgdmFyIGd6ID0gTWF0aC50cnVuYyh6KSAlIDI1NlxyXG4gICAgICB2YXIgZ3QgPSBNYXRoLnRydW5jKHQpICUgMjU2XHJcblxyXG4gICAgICB2YXIgZHggPSB4IC0gZ3hcclxuICAgICAgdmFyIGR5ID0geSAtIGd5XHJcbiAgICAgIHZhciBkeiA9IHogLSBnelxyXG4gICAgICB2YXIgZHQgPSB0IC0gZ3RcclxuXHJcbiAgICAgIHZhciBuMDAwMCA9IGdyYWQ0KGd4LCBneSwgZ3osIGd0KS5kb3QoZHgsIGR5LCBkeiwgZHQpXHJcbiAgICAgIHZhciBuMTAwMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6LCBndCkuZG90KGR4IC0gMSwgZHksIGR6KVxyXG4gICAgICB2YXIgbjAxMDAgPSBncmFkNChneCwgZ3kgKyAxLCBneiwgZ3QpLmRvdChkeCwgZHkgLSAxLCBkeilcclxuICAgICAgdmFyIG4xMTAwID0gZ3JhZDQoZ3ggKyAxLCBneSArIDEsIGd6LCBndCkuZG90KGR4IC0gMSwgZHkgLSAxLCBkeilcclxuICAgICAgdmFyIG4wMDEwID0gZ3JhZDQoZ3gsIGd5LCBneiArIDEsIGd0KS5kb3QoZHgsIGR5LCBkeiAtIDEpXHJcbiAgICAgIHZhciBuMTAxMCA9IGdyYWQ0KGd4ICsgMSwgZ3ksIGd6ICsgMSwgZ3QpLmRvdChkeCAtIDEsIGR5LCBkeiAtIDEpXHJcbiAgICAgIHZhciBuMDExMCA9IGdyYWQ0KGd4LCBneSArIDEsIGd6ICsgMSwgZ3QpLmRvdChkeCwgZHkgLSAxLCBkeiAtIDEpXHJcbiAgICAgIHZhciBuMTExMCA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiArIDEsIGd0KS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6IC0gMSlcclxuICAgICAgdmFyIG4wMDAxID0gZ3JhZDQoZ3gsIGd5LCBneiwgZ3QgKyAxKS5kb3QoZHgsIGR5LCBkeiwgZHQgLSAxKVxyXG4gICAgICB2YXIgbjEwMDEgPSBncmFkNChneCArIDEsIGd5LCBneiwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSwgZHosIGR0IC0gMSlcclxuICAgICAgdmFyIG4wMTAxID0gZ3JhZDQoZ3gsIGd5ICsgMSwgZ3osIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6LCBkdCAtIDEpXHJcbiAgICAgIHZhciBuMTEwMSA9IGdyYWQ0KGd4ICsgMSwgZ3kgKyAxLCBneiwgZ3QgKyAxKS5kb3QoZHggLSAxLCBkeSAtIDEsIGR6LCBkdCAtIDEpXHJcbiAgICAgIHZhciBuMDAxMSA9IGdyYWQ0KGd4LCBneSwgZ3ogKyAxLCBndCArIDEpLmRvdChkeCwgZHksIGR6IC0gMSwgZHQgLSAxKVxyXG4gICAgICB2YXIgbjEwMTEgPSBncmFkNChneCArIDEsIGd5LCBneiArIDEsIGd0ICsgMSkuZG90KGR4IC0gMSwgZHksIGR6IC0gMSwgZHQgLSAxKVxyXG4gICAgICB2YXIgbjAxMTEgPSBncmFkNChneCwgZ3kgKyAxLCBneiArIDEsIGd0ICsgMSkuZG90KGR4LCBkeSAtIDEsIGR6IC0gMSwgZHQgLSAxKVxyXG4gICAgICB2YXIgbjExMTEgPSBncmFkNChneCArIDEsIGd5ICsgMSwgZ3ogKyAxLCBndCArIDEpLmRvdChkeCAtIDEsIGR5IC0gMSwgZHogLSAxLCBkdCAtIDEpXHJcblxyXG4gICAgICByZXR1cm4gbGVycChcclxuICAgICAgICBsZXJwKFxyXG4gICAgICAgICAgbGVycChcclxuICAgICAgICAgICAgbGVycChuMDAwMCwgbjEwMDAsIGR4KSxcclxuICAgICAgICAgICAgbGVycChuMDEwMCwgbjExMDAsIGR4KSxcclxuICAgICAgICAgICAgZmFkZShkeSlcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICBsZXJwKFxyXG4gICAgICAgICAgICBsZXJwKG4wMDEwLCBuMTAxMCwgZHgpLFxyXG4gICAgICAgICAgICBsZXJwKG4wMTEwLCBuMTExMCwgZHgpLFxyXG4gICAgICAgICAgICBmYWRlKGR5KVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIGZhZGUoZHopXHJcbiAgICAgICAgKSxcclxuICAgICAgICBsZXJwKFxyXG4gICAgICAgICAgbGVycChcclxuICAgICAgICAgICAgbGVycChuMDAwMSwgbjEwMDEsIGR4KSxcclxuICAgICAgICAgICAgbGVycChuMDEwMSwgbjExMDEsIGR4KSxcclxuICAgICAgICAgICAgZmFkZShkeSlcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICBsZXJwKFxyXG4gICAgICAgICAgICBsZXJwKG4wMDExLCBuMTAxMSwgZHgpLFxyXG4gICAgICAgICAgICBsZXJwKG4wMTExLCBuMTExMSwgZHgpLFxyXG4gICAgICAgICAgICBmYWRlKGR5KVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIGZhZGUoZHopXHJcbiAgICAgICAgKSxcclxuICAgICAgICBmYWRlKGR0KVxyXG4gICAgICApXHJcbiAgICB9LFxyXG4gICAgcGVybGluTjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgZ3MgPSBbXVxyXG4gICAgICB2YXIgZHMgPSBbXVxyXG5cclxuICAgICAgaWYgKGdOLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGdlbmVyYXRlR04oYXJndW1lbnRzLmxlbmd0aClcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGlcclxuICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGdzW2ldID0gTWF0aC50cnVuYyhhcmd1bWVudHNbaV0pICUgMjU2XHJcbiAgICAgICAgZHNbaV0gPSBhcmd1bWVudHNbaV0gLSBnc1tpXVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBucyA9IGdldE5zKGFyZ3VtZW50cy5sZW5ndGgsIGdzLCBkcylcclxuICAgICAgcmV0dXJuIGxlcnBOKG5zLCBkcy5yZXZlcnNlKCkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdHVtdWx0RmFjdG9yeVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuICogcmFuZG9tLXNlZWRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9za3JhdGNoZG90L3JhbmRvbS1zZWVkXG4gKlxuICogVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgU3RldmUgR2lic29uIGFuZCBjYW4gYmUgZm91bmQgaGVyZTpcbiAqXG4gKiBodHRwczovL3d3dy5ncmMuY29tL290Zy91aGVwcm5nLmh0bVxuICpcbiAqIEl0IHdhcyBzbGlnaHRseSBtb2RpZmllZCBmb3IgdXNlIGluIG5vZGUsIHRvIHBhc3MganNoaW50LCBhbmQgYSBmZXcgYWRkaXRpb25hbFxuICogaGVscGVyIGZ1bmN0aW9ucyB3ZXJlIGFkZGVkLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMyBza3JhdGNoZG90XG4gKiBEdWFsIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBhbmQgdGhlIG9yaWdpbmFsIEdSQyBjb3B5cmlnaHQvbGljZW5zZVxuICogaW5jbHVkZWQgYmVsb3cuXG4gKi9cbi8qXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFx0XHRcdFx0XHRcdFx0XHRHaWJzb24gUmVzZWFyY2ggQ29ycG9yYXRpb25cblx0XHRcdFx0VUhFUFJORyAtIFVsdHJhIEhpZ2ggRW50cm9weSBQc2V1ZG8tUmFuZG9tIE51bWJlciBHZW5lcmF0b3Jcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRMSUNFTlNFIEFORCBDT1BZUklHSFQ6ICBUSElTIENPREUgSVMgSEVSRUJZIFJFTEVBU0VEIElOVE8gVEhFIFBVQkxJQyBET01BSU5cblx0R2lic29uIFJlc2VhcmNoIENvcnBvcmF0aW9uIHJlbGVhc2VzIGFuZCBkaXNjbGFpbXMgQUxMIFJJR0hUUyBBTkQgVElUTEUgSU5cblx0VEhJUyBDT0RFIE9SIEFOWSBERVJJVkFUSVZFUy4gQW55b25lIG1heSBiZSBmcmVlbHkgdXNlIGl0IGZvciBhbnkgcHVycG9zZS5cblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRUaGlzIGlzIEdSQydzIGNyeXB0b2dyYXBoaWNhbGx5IHN0cm9uZyBQUk5HIChwc2V1ZG8tcmFuZG9tIG51bWJlciBnZW5lcmF0b3IpXG5cdGZvciBKYXZhU2NyaXB0LiBJdCBpcyBkcml2ZW4gYnkgMTUzNiBiaXRzIG9mIGVudHJvcHksIHN0b3JlZCBpbiBhbiBhcnJheSBvZlxuXHQ0OCwgMzItYml0IEphdmFTY3JpcHQgdmFyaWFibGVzLiAgU2luY2UgbWFueSBhcHBsaWNhdGlvbnMgb2YgdGhpcyBnZW5lcmF0b3IsXG5cdGluY2x1ZGluZyBvdXJzIHdpdGggdGhlIFwiT2ZmIFRoZSBHcmlkXCIgTGF0aW4gU3F1YXJlIGdlbmVyYXRvciwgbWF5IHJlcXVpcmVcblx0dGhlIGRldGVyaW1pbmlzdGljIHJlLWdlbmVyYXRpb24gb2YgYSBzZXF1ZW5jZSBvZiBQUk5zLCB0aGlzIFBSTkcncyBpbml0aWFsXG5cdGVudHJvcGljIHN0YXRlIGNhbiBiZSByZWFkIGFuZCB3cml0dGVuIGFzIGEgc3RhdGljIHdob2xlLCBhbmQgaW5jcmVtZW50YWxseVxuXHRldm9sdmVkIGJ5IHBvdXJpbmcgbmV3IHNvdXJjZSBlbnRyb3B5IGludG8gdGhlIGdlbmVyYXRvcidzIGludGVybmFsIHN0YXRlLlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdEVORExFU1MgVEhBTktTIGFyZSBkdWUgSm9oYW5uZXMgQmFhZ29lIGZvciBoaXMgY2FyZWZ1bCBkZXZlbG9wbWVudCBvZiBoaWdobHlcblx0cm9idXN0IEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb25zIG9mIEpTIFBSTkdzLiAgVGhpcyB3b3JrIHdhcyBiYXNlZCB1cG9uIGhpc1xuXHRKYXZhU2NyaXB0IFwiQWxlYVwiIFBSTkcgd2hpY2ggaXMgYmFzZWQgdXBvbiB0aGUgZXh0cmVtZWx5IHJvYnVzdCBNdWx0aXBseS1cblx0V2l0aC1DYXJyeSAoTVdDKSBQUk5HIGludmVudGVkIGJ5IEdlb3JnZSBNYXJzYWdsaWEuIE1XQyBBbGdvcml0aG0gUmVmZXJlbmNlczpcblx0aHR0cDovL3d3dy5HUkMuY29tL290Zy9NYXJzYWdsaWFfUFJOR3MucGRmXG5cdGh0dHA6Ly93d3cuR1JDLmNvbS9vdGcvTWFyc2FnbGlhX01XQ19HZW5lcmF0b3JzLnBkZlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFRoZSBxdWFsaXR5IG9mIHRoaXMgYWxnb3JpdGhtJ3MgcHNldWRvLXJhbmRvbSBudW1iZXJzIGhhdmUgYmVlbiB2ZXJpZmllZCBieVxuXHRtdWx0aXBsZSBpbmRlcGVuZGVudCByZXNlYXJjaGVycy4gSXQgaGFuZGlseSBwYXNzZXMgdGhlIGZlcm1pbGFiLmNoIHRlc3RzIGFzXG5cdHdlbGwgYXMgdGhlIFwiZGllaGFyZFwiIGFuZCBcImRpZWhhcmRlclwiIHRlc3Qgc3VpdGVzLiAgRm9yIGluZGl2aWR1YWxzIHdpc2hpbmdcblx0dG8gZnVydGhlciB2ZXJpZnkgdGhlIHF1YWxpdHkgb2YgdGhpcyBhbGdvcml0aG0ncyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMsIGFcblx0MjU2LW1lZ2FieXRlIGZpbGUgb2YgdGhpcyBhbGdvcml0aG0ncyBvdXRwdXQgbWF5IGJlIGRvd25sb2FkZWQgZnJvbSBHUkMuY29tLFxuXHRhbmQgYSBNaWNyb3NvZnQgV2luZG93cyBzY3JpcHRpbmcgaG9zdCAoV1NIKSB2ZXJzaW9uIG9mIHRoaXMgYWxnb3JpdGhtIG1heSBiZVxuXHRkb3dubG9hZGVkIGFuZCBydW4gZnJvbSB0aGUgV2luZG93cyBjb21tYW5kIHByb21wdCB0byBnZW5lcmF0ZSB1bmlxdWUgZmlsZXNcblx0b2YgYW55IHNpemU6XG5cdFRoZSBGZXJtaWxhYiBcIkVOVFwiIHRlc3RzOiBodHRwOi8vZm91cm1pbGFiLmNoL3JhbmRvbS9cblx0VGhlIDI1Ni1tZWdhYnl0ZSBzYW1wbGUgUFJOIGZpbGUgYXQgR1JDOiBodHRwczovL3d3dy5HUkMuY29tL290Zy91aGVwcm5nLmJpblxuXHRUaGUgV2luZG93cyBzY3JpcHRpbmcgaG9zdCB2ZXJzaW9uOiBodHRwczovL3d3dy5HUkMuY29tL290Zy93c2gtdWhlcHJuZy5qc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFF1YWxpZnlpbmcgTVdDIG11bHRpcGxpZXJzIGFyZTogMTg3ODg0LCA2ODYxMTgsIDg5ODEzNCwgMTEwNDM3NSwgMTI1MDIwNSxcblx0MTQ2MDkxMCBhbmQgMTc2ODg2My4gKFdlIHVzZSB0aGUgbGFyZ2VzdCBvbmUgdGhhdCdzIDwgMl4yMSlcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcblxuLypcdD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblRoaXMgaXMgYmFzZWQgdXBvbiBKb2hhbm5lcyBCYWFnb2UncyBjYXJlZnVsbHkgZGVzaWduZWQgYW5kIGVmZmljaWVudCBoYXNoXG5mdW5jdGlvbiBmb3IgdXNlIHdpdGggSmF2YVNjcmlwdC4gIEl0IGhhcyBhIHByb3ZlbiBcImF2YWxhbmNoZVwiIGVmZmVjdCBzdWNoXG50aGF0IGV2ZXJ5IGJpdCBvZiB0aGUgaW5wdXQgYWZmZWN0cyBldmVyeSBiaXQgb2YgdGhlIG91dHB1dCA1MCUgb2YgdGhlIHRpbWUsXG53aGljaCBpcyBnb29kLlx0U2VlOiBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2hhc2gvYXZhbGFuY2hlLnhodG1sXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qL1xudmFyIE1hc2ggPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBuID0gMHhlZmM4MjQ5ZDtcblx0dmFyIG1hc2ggPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuXHRcdFx0XHR2YXIgaCA9IDAuMDI1MTk2MDMyODI0MTY5MzggKiBuO1xuXHRcdFx0XHRuID0gaCA+Pj4gMDtcblx0XHRcdFx0aCAtPSBuO1xuXHRcdFx0XHRoICo9IG47XG5cdFx0XHRcdG4gPSBoID4+PiAwO1xuXHRcdFx0XHRoIC09IG47XG5cdFx0XHRcdG4gKz0gaCAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcblx0XHR9IGVsc2Uge1xuXHRcdFx0biA9IDB4ZWZjODI0OWQ7XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbWFzaDtcbn07XG5cbnZhciB1aGVwcm5nID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0cmV0dXJuIChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG8gPSA0ODsgLy8gc2V0IHRoZSAnb3JkZXInIG51bWJlciBvZiBFTlRST1BZLWhvbGRpbmcgMzItYml0IHZhbHVlc1xuXHRcdHZhciBjID0gMTsgLy8gaW5pdCB0aGUgJ2NhcnJ5JyB1c2VkIGJ5IHRoZSBtdWx0aXBseS13aXRoLWNhcnJ5IChNV0MpIGFsZ29yaXRobVxuXHRcdHZhciBwID0gbzsgLy8gaW5pdCB0aGUgJ3BoYXNlJyAobWF4LTEpIG9mIHRoZSBpbnRlcm1lZGlhdGUgdmFyaWFibGUgcG9pbnRlclxuXHRcdHZhciBzID0gbmV3IEFycmF5KG8pOyAvLyBkZWNsYXJlIG91ciBpbnRlcm1lZGlhdGUgdmFyaWFibGVzIGFycmF5XG5cdFx0dmFyIGk7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXHRcdHZhciBqOyAvLyBnZW5lcmFsIHB1cnBvc2UgbG9jYWxcblx0XHR2YXIgayA9IDA7IC8vIGdlbmVyYWwgcHVycG9zZSBsb2NhbFxuXG5cdFx0Ly8gd2hlbiBvdXIgXCJ1aGVwcm5nXCIgaXMgaW5pdGlhbGx5IGludm9rZWQgb3VyIFBSTkcgc3RhdGUgaXMgaW5pdGlhbGl6ZWQgZnJvbSB0aGVcblx0XHQvLyBicm93c2VyJ3Mgb3duIGxvY2FsIFBSTkcuIFRoaXMgaXMgb2theSBzaW5jZSBhbHRob3VnaCBpdHMgZ2VuZXJhdG9yIG1pZ2h0IG5vdFxuXHRcdC8vIGJlIHdvbmRlcmZ1bCwgaXQncyB1c2VmdWwgZm9yIGVzdGFibGlzaGluZyBsYXJnZSBzdGFydHVwIGVudHJvcHkgZm9yIG91ciB1c2FnZS5cblx0XHR2YXIgbWFzaCA9IG5ldyBNYXNoKCk7IC8vIGdldCBhIHBvaW50ZXIgdG8gb3VyIGhpZ2gtcGVyZm9ybWFuY2UgXCJNYXNoXCIgaGFzaFxuXG5cdFx0Ly8gZmlsbCB0aGUgYXJyYXkgd2l0aCBpbml0aWFsIG1hc2ggaGFzaCB2YWx1ZXNcblx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRzW2ldID0gbWFzaChNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cblx0XHQvLyB0aGlzIFBSSVZBVEUgKGludGVybmFsIGFjY2VzcyBvbmx5KSBmdW5jdGlvbiBpcyB0aGUgaGVhcnQgb2YgdGhlIG11bHRpcGx5LXdpdGgtY2Fycnlcblx0XHQvLyAoTVdDKSBQUk5HIGFsZ29yaXRobS4gV2hlbiBjYWxsZWQgaXQgcmV0dXJucyBhIHBzZXVkby1yYW5kb20gbnVtYmVyIGluIHRoZSBmb3JtIG9mIGFcblx0XHQvLyAzMi1iaXQgSmF2YVNjcmlwdCBmcmFjdGlvbiAoMC4wIHRvIDwxLjApIGl0IGlzIGEgUFJJVkFURSBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBkZWZhdWx0XG5cdFx0Ly8gWzAtMV0gcmV0dXJuIGZ1bmN0aW9uLCBhbmQgYnkgdGhlIHJhbmRvbSAnc3RyaW5nKG4pJyBmdW5jdGlvbiB3aGljaCByZXR1cm5zICduJ1xuXHRcdC8vIGNoYXJhY3RlcnMgZnJvbSAzMyB0byAxMjYuXG5cdFx0dmFyIHJhd3BybmcgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoKytwID49IG8pIHtcblx0XHRcdFx0cCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdCA9IDE3Njg4NjMgKiBzW3BdICsgYyAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG5cdFx0XHRyZXR1cm4gc1twXSA9IHQgLSAoYyA9IHQgfCAwKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiBpcyB0aGUgZGVmYXVsdCBmdW5jdGlvbiByZXR1cm5lZCBieSB0aGlzIGxpYnJhcnkuXG5cdFx0Ly8gVGhlIHZhbHVlcyByZXR1cm5lZCBhcmUgaW50ZWdlcnMgaW4gdGhlIHJhbmdlIGZyb20gMCB0byByYW5nZS0xLiBXZSBmaXJzdFxuXHRcdC8vIG9idGFpbiB0d28gMzItYml0IGZyYWN0aW9ucyAoZnJvbSByYXdwcm5nKSB0byBzeW50aGVzaXplIGEgc2luZ2xlIGhpZ2hcblx0XHQvLyByZXNvbHV0aW9uIDUzLWJpdCBwcm5nICgwIHRvIDwxKSwgdGhlbiB3ZSBtdWx0aXBseSB0aGlzIGJ5IHRoZSBjYWxsZXInc1xuXHRcdC8vIFwicmFuZ2VcIiBwYXJhbSBhbmQgdGFrZSB0aGUgXCJmbG9vclwiIHRvIHJldHVybiBhIGVxdWFsbHkgcHJvYmFibGUgaW50ZWdlci5cblx0XHR2YXIgcmFuZG9tID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihyYW5nZSAqIChyYXdwcm5nKCkgKyAocmF3cHJuZygpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTYpKTsgLy8gMl4tNTNcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBFWFBPUlRFRCBmdW5jdGlvbiAnc3RyaW5nKG4pJyByZXR1cm5zIGEgcHNldWRvLXJhbmRvbSBzdHJpbmcgb2Zcblx0XHQvLyAnbicgcHJpbnRhYmxlIGNoYXJhY3RlcnMgcmFuZ2luZyBmcm9tIGNocigzMykgdG8gY2hyKDEyNikgaW5jbHVzaXZlLlxuXHRcdHJhbmRvbS5zdHJpbmcgPSBmdW5jdGlvbiAoY291bnQpIHtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIHMgPSAnJztcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cdFx0XHRcdHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMyArIHJhbmRvbSg5NCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgUFJJVkFURSBcImhhc2hcIiBmdW5jdGlvbiBpcyB1c2VkIHRvIGV2b2x2ZSB0aGUgZ2VuZXJhdG9yJ3MgaW50ZXJuYWxcblx0XHQvLyBlbnRyb3B5IHN0YXRlLiBJdCBpcyBhbHNvIGNhbGxlZCBieSB0aGUgRVhQT1JURUQgYWRkRW50cm9weSgpIGZ1bmN0aW9uXG5cdFx0Ly8gd2hpY2ggaXMgdXNlZCB0byBwb3VyIGVudHJvcHkgaW50byB0aGUgUFJORy5cblx0XHR2YXIgaGFzaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHtcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goYXJnc1tpXSk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJjbGVhbiBzdHJpbmdcIiBmdW5jdGlvbiByZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlcyBhbmQgbm9uLXByaW50aW5nXG5cdFx0Ly8gY29udHJvbCBjaGFyYWN0ZXJzLCBpbmNsdWRpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlLXJldHVybiAoQ1IpIGFuZCBsaW5lLWZlZWQgKExGKSBjaGFyYWN0ZXJzLFxuXHRcdC8vIGZyb20gYW55IHN0cmluZyBpdCBpcyBoYW5kZWQuIHRoaXMgaXMgYWxzbyB1c2VkIGJ5IHRoZSAnaGFzaHN0cmluZycgZnVuY3Rpb24gKGJlbG93KSB0byBoZWxwXG5cdFx0Ly8gdXNlcnMgYWx3YXlzIG9idGFpbiB0aGUgc2FtZSBFRkZFQ1RJVkUgdWhlcHJuZyBzZWVkaW5nIGtleS5cblx0XHRyYW5kb20uY2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoaW5TdHIpIHtcblx0XHRcdGluU3RyID0gaW5TdHIucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2dpLCAnJyk7IC8vIHJlbW92ZSBhbnkvYWxsIGxlYWRpbmcgc3BhY2VzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1tcXHgwMC1cXHgxRl0vZ2ksICcnKTsgLy8gcmVtb3ZlIGFueS9hbGwgY29udHJvbCBjaGFyYWN0ZXJzXG5cdFx0XHRpblN0ciA9IGluU3RyLnJlcGxhY2UoL1xcbiAvLCAnXFxuJyk7IC8vIHJlbW92ZSBhbnkvYWxsIHRyYWlsaW5nIHNwYWNlc1xuXHRcdFx0cmV0dXJuIGluU3RyOyAvLyByZXR1cm4gdGhlIGNsZWFuZWQgdXAgcmVzdWx0XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgXCJoYXNoIHN0cmluZ1wiIGZ1bmN0aW9uIGhhc2hlcyB0aGUgcHJvdmlkZWQgY2hhcmFjdGVyIHN0cmluZyBhZnRlciBmaXJzdCByZW1vdmluZ1xuXHRcdC8vIGFueSBsZWFkaW5nIG9yIHRyYWlsaW5nIHNwYWNlcyBhbmQgaWdub3JpbmcgYW55IGVtYmVkZGVkIGNhcnJpYWdlIHJldHVybnMgKENSKSBvciBMaW5lIEZlZWRzIChMRilcblx0XHRyYW5kb20uaGFzaFN0cmluZyA9IGZ1bmN0aW9uIChpblN0cikge1xuXHRcdFx0aW5TdHIgPSByYW5kb20uY2xlYW5TdHJpbmcoaW5TdHIpO1xuXHRcdFx0bWFzaChpblN0cik7IC8vIHVzZSB0aGUgc3RyaW5nIHRvIGV2b2x2ZSB0aGUgJ21hc2gnIHN0YXRlXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgaW5TdHIubGVuZ3RoOyBpKyspIHsgLy8gc2NhbiB0aHJvdWdoIHRoZSBjaGFyYWN0ZXJzIGluIG91ciBzdHJpbmdcblx0XHRcdFx0ayA9IGluU3RyLmNoYXJDb2RlQXQoaSk7IC8vIGdldCB0aGUgY2hhcmFjdGVyIGNvZGUgYXQgdGhlIGxvY2F0aW9uXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvOyBqKyspIHsgLy9cdFwibWFzaFwiIGl0IGludG8gdGhlIFVIRVBSTkcgc3RhdGVcblx0XHRcdFx0XHRzW2pdIC09IG1hc2goayk7XG5cdFx0XHRcdFx0aWYgKHNbal0gPCAwKSB7XG5cdFx0XHRcdFx0XHRzW2pdICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIHRoaXMgRVhQT1JURUQgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZWVkIHRoZSByYW5kb20gZ2VuZXJhdG9yLlxuXHRcdHJhbmRvbS5zZWVkID0gZnVuY3Rpb24gKHNlZWQpIHtcblx0XHRcdGlmICh0eXBlb2Ygc2VlZCA9PT0gJ3VuZGVmaW5lZCcgfHwgc2VlZCA9PT0gbnVsbCkge1xuXHRcdFx0XHRzZWVkID0gTWF0aC5yYW5kb20oKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0c2VlZCA9IHN0cmluZ2lmeShzZWVkLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAodmFsdWUpLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyYW5kb20uaW5pdFN0YXRlKCk7XG5cdFx0XHRyYW5kb20uaGFzaFN0cmluZyhzZWVkKTtcblx0XHR9O1xuXG5cdFx0Ly8gdGhpcyBoYW5keSBleHBvcnRlZCBmdW5jdGlvbiBpcyB1c2VkIHRvIGFkZCBlbnRyb3B5IHRvIG91ciB1aGVwcm5nIGF0IGFueSB0aW1lXG5cdFx0cmFuZG9tLmFkZEVudHJvcHkgPSBmdW5jdGlvbiAoIC8qIGFjY2VwdCB6ZXJvIG9yIG1vcmUgYXJndW1lbnRzICovICkge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0YXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHR9XG5cdFx0XHRoYXNoKChrKyspICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArIGFyZ3Muam9pbignJykgKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2Ugd2FudCB0byBwcm92aWRlIGEgZGV0ZXJtaW5pc3RpYyBzdGFydHVwIGNvbnRleHQgZm9yIG91ciBQUk5HLFxuXHRcdC8vIGJ1dCB3aXRob3V0IGRpcmVjdGx5IHNldHRpbmcgdGhlIGludGVybmFsIHN0YXRlIHZhcmlhYmxlcywgdGhpcyBhbGxvd3Ncblx0XHQvLyB1cyB0byBpbml0aWFsaXplIHRoZSBtYXNoIGhhc2ggYW5kIFBSTkcncyBpbnRlcm5hbCBzdGF0ZSBiZWZvcmUgcHJvdmlkaW5nXG5cdFx0Ly8gc29tZSBoYXNoaW5nIGlucHV0XG5cdFx0cmFuZG9tLmluaXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1hc2goKTsgLy8gcGFzcyBhIG51bGwgYXJnIHRvIGZvcmNlIG1hc2ggaGFzaCB0byBpbml0XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbzsgaSsrKSB7XG5cdFx0XHRcdHNbaV0gPSBtYXNoKCcgJyk7IC8vIGZpbGwgdGhlIGFycmF5IHdpdGggaW5pdGlhbCBtYXNoIGhhc2ggdmFsdWVzXG5cdFx0XHR9XG5cdFx0XHRjID0gMTsgLy8gaW5pdCBvdXIgbXVsdGlwbHktd2l0aC1jYXJyeSBjYXJyeVxuXHRcdFx0cCA9IG87IC8vIGluaXQgb3VyIHBoYXNlXG5cdFx0fTtcblxuXHRcdC8vIHdlIHVzZSB0aGlzIChvcHRpb25hbCkgZXhwb3J0ZWQgZnVuY3Rpb24gdG8gc2lnbmFsIHRoZSBKYXZhU2NyaXB0IGludGVycHJldGVyXG5cdFx0Ly8gdGhhdCB3ZSdyZSBmaW5pc2hlZCB1c2luZyB0aGUgXCJNYXNoXCIgaGFzaCBmdW5jdGlvbiBzbyB0aGF0IGl0IGNhbiBmcmVlIHVwIHRoZVxuXHRcdC8vIGxvY2FsIFwiaW5zdGFuY2UgdmFyaWFibGVzXCIgaXMgd2lsbCBoYXZlIGJlZW4gbWFpbnRhaW5pbmcuICBJdCdzIG5vdCBzdHJpY3RseVxuXHRcdC8vIG5lY2Vzc2FyeSwgb2YgY291cnNlLCBidXQgaXQncyBnb29kIEphdmFTY3JpcHQgY2l0aXplbnNoaXAuXG5cdFx0cmFuZG9tLmRvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtYXNoID0gbnVsbDtcblx0XHR9O1xuXG5cdFx0Ly8gaWYgd2UgY2FsbGVkIFwidWhlcHJuZ1wiIHdpdGggYSBzZWVkIHZhbHVlLCB0aGVuIGV4ZWN1dGUgcmFuZG9tLnNlZWQoKSBiZWZvcmUgcmV0dXJuaW5nXG5cdFx0aWYgKHR5cGVvZiBzZWVkICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmFuZG9tLnNlZWQoc2VlZCk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgcmFuZ2UgKGV4Y2x1c2l2ZSlcblx0XHRyYW5kb20ucmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiByYW5kb20ocmFuZ2UpO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm5zIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgMSAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5yYW5kb20gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gcmFuZG9tKE51bWJlci5NQVhfVkFMVUUgLSAxKSAvIE51bWJlci5NQVhfVkFMVUU7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybnMgYSByYW5kb20gZmxvYXQgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKVxuXHRcdHJhbmRvbS5mbG9hdEJldHdlZW4gPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0XHRcdHJldHVybiByYW5kb20ucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcblx0XHRyYW5kb20uaW50QmV0d2VlbiA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IocmFuZG9tLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblx0XHR9O1xuXG5cdFx0Ly8gd2hlbiBvdXIgbWFpbiBvdXRlciBcInVoZXBybmdcIiBmdW5jdGlvbiBpcyBjYWxsZWQsIGFmdGVyIHNldHRpbmcgdXAgb3VyXG5cdFx0Ly8gaW5pdGlhbCB2YXJpYWJsZXMgYW5kIGVudHJvcGljIHN0YXRlLCB3ZSByZXR1cm4gYW4gXCJpbnN0YW5jZSBwb2ludGVyXCJcblx0XHQvLyB0byB0aGUgaW50ZXJuYWwgYW5vbnltb3VzIGZ1bmN0aW9uIHdoaWNoIGNhbiB0aGVuIGJlIHVzZWQgdG8gYWNjZXNzXG5cdFx0Ly8gdGhlIHVoZXBybmcncyB2YXJpb3VzIGV4cG9ydGVkIGZ1bmN0aW9ucy4gIEFzIHdpdGggdGhlIFwiLmRvbmVcIiBmdW5jdGlvblxuXHRcdC8vIGFib3ZlLCB3ZSBzaG91bGQgc2V0IHRoZSByZXR1cm5lZCB2YWx1ZSB0byAnbnVsbCcgb25jZSB3ZSdyZSBmaW5pc2hlZFxuXHRcdC8vIHVzaW5nIGFueSBvZiB0aGVzZSBmdW5jdGlvbnMuXG5cdFx0cmV0dXJuIHJhbmRvbTtcblx0fSgpKTtcbn07XG5cbi8vIE1vZGlmaWNhdGlvbiBmb3IgdXNlIGluIG5vZGU6XG51aGVwcm5nLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZWVkKSB7XG5cdHJldHVybiBuZXcgdWhlcHJuZyhzZWVkKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHVoZXBybmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yYW5kb20tc2VlZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbmV4cG9ydHMuZ2V0U2VyaWFsaXplID0gc2VyaWFsaXplclxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCByZXBsYWNlciwgc3BhY2VzLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpLCBzcGFjZXMpXG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgdmFyIHN0YWNrID0gW10sIGtleXMgPSBbXVxuXG4gIGlmIChjeWNsZVJlcGxhY2VyID09IG51bGwpIGN5Y2xlUmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrWzBdID09PSB2YWx1ZSkgcmV0dXJuIFwiW0NpcmN1bGFyIH5dXCJcbiAgICByZXR1cm4gXCJbQ2lyY3VsYXIgfi5cIiArIGtleXMuc2xpY2UoMCwgc3RhY2suaW5kZXhPZih2YWx1ZSkpLmpvaW4oXCIuXCIpICsgXCJdXCJcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciB0aGlzUG9zID0gc3RhY2suaW5kZXhPZih0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBzdGFjay5zcGxpY2UodGhpc1BvcyArIDEpIDogc3RhY2sucHVzaCh0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBrZXlzLnNwbGljZSh0aGlzUG9zLCBJbmZpbml0eSwga2V5KSA6IGtleXMucHVzaChrZXkpXG4gICAgICBpZiAofnN0YWNrLmluZGV4T2YodmFsdWUpKSB2YWx1ZSA9IGN5Y2xlUmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgICBlbHNlIHN0YWNrLnB1c2godmFsdWUpXG5cbiAgICByZXR1cm4gcmVwbGFjZXIgPT0gbnVsbCA/IHZhbHVlIDogcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9