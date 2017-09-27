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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_tumult_min__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_tumult_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dist_tumult_min__);



var seed = Math.random()
var simplex = new __WEBPACK_IMPORTED_MODULE_1__dist_tumult_min__["Simplex2"](seed)

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define("tumult",[],n):"object"==typeof exports?exports.tumult=n():t.tumult=n()}(this,function(){return function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=11)}([function(t,n,r){"use strict";r.d(n,"a",function(){return c});var e=r(13),o=r.n(e),c=function(t){this.p=new Uint8Array(512),this.seed(t)};c.prototype.gen=function(){},c.prototype.seed=function(t){var n=this;t=t||Math.random();var r,e=o.a.create(t);for(r=0;r<256;r++)n.p[r]=r;for(r=0;r<256;r++){var c=e(256),u=n.p[r];n.p[r]=n.p[c],n.p[c]=u}for(r=0;r<256;r++)n.p[r+256]=n.p[r]},c.prototype.transform=function(t){var n=this;return function(){for(var r=[],e=arguments.length;e--;)r[e]=arguments[e];return t.apply(n,r)}.bind(this)},c.prototype.octavate=function(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];for(var e=n[0],o=n.slice(1),c=0,u=0,i=0;i<e;i++){var a=1<<i;c+=t.gen.apply(t,o.map(function(t){return t*a}))/a}for(var i=0;i<e;i++)u+=1/(1<<i);return c/u}},function(t,n,r){"use strict";function e(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];var r=t.slice(1),e=t[0]-r.reduce(function(t,n){return t+n*n},0);return e*e*e*e}function o(t,n,r){return t*(1-r)+n*r}function c(t){return t*t*t*(10+t*(6*t-15))}n.d=o,n.c=c,r.d(n,"b",function(){return u}),r.d(n,"a",function(){return i});var u=e.bind(null,1),i=e.bind(null,.5)},function(t,n,r){"use strict";var e=r(0),o=r(3),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t){var n=o.a.bind(null,this.p),r=Math.floor(t)%256,e=t-r,u=n(r).dot(e),i=n(r+1).dot(e-1);return Object(c.d)(u,i,Object(c.c)(e))},n}(e.a);n.a=u},function(t,n,r){"use strict";function e(t){this.x=t}function o(t,n){var r=t[n]%c.length;return c[r]}n.a=o,e.prototype.dot=function(t){return this.x*t};var c=[new e(1),new e(-1)]},function(t,n,r){"use strict";var e=r(0),o=r(5),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n){var r=o.c.bind(null,this.p),e=Math.trunc(t)%256,u=Math.trunc(n)%256,i=t-e,a=n-u,f=r(e,u).dot(i,a),d=r(e+1,u).dot(i-1,a),p=r(e,u+1).dot(i,a-1),s=r(e+1,u+1).dot(i-1,a-1);return Object(c.d)(Object(c.d)(f,d,Object(c.c)(i)),Object(c.d)(p,s,Object(c.c)(i)),Object(c.c)(a))},n}(e.a);n.a=u},function(t,n,r){"use strict";function e(t,n){this.x=t,this.y=n}function o(t,n,r){var e=t[n+t[r]]%c.length;return c[e]}n.c=o,r.d(n,"b",function(){return u}),r.d(n,"a",function(){return i}),e.prototype.dot=function(t,n){return this.x*t+this.y*n};var c=[new e(1,0),new e(1,1),new e(0,1),new e(-1,1),new e(-1,0),new e(-1,-1),new e(0,-1),new e(1,-1)],u=.5*(Math.sqrt(3)-1),i=(3-Math.sqrt(3))/6},function(t,n,r){"use strict";var e=r(0),o=r(15),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n,r){var e=o.a.bind(null,this.p),u=Math.trunc(t)%256,i=Math.trunc(n)%256,a=Math.trunc(r)%256,f=t-u,d=n-i,p=r-a,s=e(u,i,a).dot(f,d,p),l=e(u+1,i,a).dot(f-1,d,p),h=e(u,i+1,a).dot(f,d-1,p),b=e(u+1,i+1,a).dot(f-1,d-1,p),v=e(u,i,a+1).dot(f,d,p-1),j=e(u+1,i,a+1).dot(f-1,d,p-1),O=e(u,i+1,a+1).dot(f,d-1,p-1),w=e(u+1,i+1,a+1).dot(f-1,d-1,p-1);return Object(c.d)(Object(c.d)(Object(c.d)(s,l,f),Object(c.d)(h,b,f),Object(c.c)(d)),Object(c.d)(Object(c.d)(v,j,f),Object(c.d)(O,w,f),Object(c.c)(d)),Object(c.c)(p))},n}(e.a);n.a=u},function(t,n,r){"use strict";var e=r(0),o=r(16),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n,r,e){var u=o.a.bind(null,this.p),i=Math.trunc(t)%256,a=Math.trunc(n)%256,f=Math.trunc(r)%256,d=Math.trunc(e)%256,p=t-i,s=n-a,l=r-f,h=e-d,b=u(i,a,f,d).dot(p,s,l,h),v=u(i+1,a,f,d).dot(p-1,s,l),j=u(i,a+1,f,d).dot(p,s-1,l),O=u(i+1,a+1,f,d).dot(p-1,s-1,l),w=u(i,a,f+1,d).dot(p,s,l-1),y=u(i+1,a,f+1,d).dot(p-1,s,l-1),g=u(i,a+1,f+1,d).dot(p,s-1,l-1),_=u(i+1,a+1,f+1,d).dot(p-1,s-1,l-1),x=u(i,a,f,d+1).dot(p,s,l,h-1),M=u(i+1,a,f,d+1).dot(p-1,s,l,h-1),m=u(i,a+1,f,d+1).dot(p,s-1,l,h-1),S=u(i+1,a+1,f,d+1).dot(p-1,s-1,l,h-1),P=u(i,a,f+1,d+1).dot(p,s,l-1,h-1),A=u(i+1,a,f+1,d+1).dot(p-1,s,l-1,h-1),C=u(i,a+1,f+1,d+1).dot(p,s-1,l-1,h-1),z=u(i+1,a+1,f+1,d+1).dot(p-1,s-1,l-1,h-1);return Object(c.d)(Object(c.d)(Object(c.d)(Object(c.d)(b,v,p),Object(c.d)(j,O,p),Object(c.c)(s)),Object(c.d)(Object(c.d)(w,y,p),Object(c.d)(g,_,p),Object(c.c)(s)),Object(c.c)(l)),Object(c.d)(Object(c.d)(Object(c.d)(x,M,p),Object(c.d)(m,S,p),Object(c.c)(s)),Object(c.d)(Object(c.d)(P,A,p),Object(c.d)(C,z,p),Object(c.c)(s)),Object(c.c)(l)),Object(c.c)(h))},n}(e.a);n.a=u},function(t,n,r){"use strict";var e=r(0),o=r(17),c=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(){for(var t=[],n=arguments.length;n--;)t[n]=arguments[n];var r=o.c.bind(null,this.p),e=[],c=[];0===o.a.length&&Object(o.b)(t.length);var u;for(u=0;u<t.length;u++)e[u]=Math.trunc(t[u])%256,c[u]=t[u]-e[u];var i=r(t.length,e,c);return Object(o.d)(i,c)},n}(e.a);n.a=c},function(t,n,r){"use strict";var e=r(0),o=r(3),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t){var n=o.a.bind(null,this.p),r=Math.floor(t)%256,e=t-r;return.5*(Object(c.b)(e)*n(r).dot(e)+Object(c.b)(e-1)*n(r+1).dot(e-1))},n}(e.a);n.a=u},function(t,n,r){"use strict";var e=r(0),o=r(5),c=r(1),u=function(t){function n(n){t.call(this,n)}return t&&(n.__proto__=t),n.prototype=Object.create(t&&t.prototype),n.prototype.constructor=n,n.prototype.gen=function(t,n){void 0===this&&console.log(this);var r=o.c.bind(null,this.p),e=(t+n)*o.b,u=Math.trunc(t+e),i=Math.trunc(n+e),a=(u+i)*o.a,f=u-a,d=i-a,p=t-f,s=n-d,l=p>s?1:0,h=p>s?0:1,b=p-l+o.a,v=s-h+o.a,j=p-1+2*o.a,O=s-1+2*o.a;return 70*(Object(c.a)(p,s)*r(u,i).dot(p,s)+Object(c.a)(b,v)*r(u+l,i+h).dot(b,v)+Object(c.a)(j,O)*r(u+1,i+1).dot(j,O))},n}(e.a);n.a=u},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=r(12),o=r(18),c=r(2);r.d(n,"Perlin1",function(){return c.a});var u=r(4);r.d(n,"Perlin2",function(){return u.a});var i=r(6);r.d(n,"Perlin3",function(){return i.a});var a=r(7);r.d(n,"Perlin4",function(){return a.a});var f=r(8);r.d(n,"PerlinN",function(){return f.a});var d=r(9);r.d(n,"Simplex1",function(){return d.a});var p=r(10);r.d(n,"Simplex2",function(){return p.a}),n.default={Simplex1:o.a,Simplex2:o.b,Perlin1:e.a,Perlin2:e.b,Perlin3:e.c,Perlin4:e.d,PerlinN:e.e}},function(t,n,r){"use strict";var e=r(2);r.d(n,"a",function(){return e.a});var o=r(4);r.d(n,"b",function(){return o.a});var c=r(6);r.d(n,"c",function(){return c.a});var u=r(7);r.d(n,"d",function(){return u.a});var i=r(8);r.d(n,"e",function(){return i.a})},function(t,n,r){"use strict";var e=r(14),o=function(){var t=4022871197;return function(n){if(n){n=n.toString();for(var r=0;r<n.length;r++){t+=n.charCodeAt(r);var e=.02519603282416938*t;t=e>>>0,e-=t,e*=t,t=e>>>0,e-=t,t+=4294967296*e}return 2.3283064365386963e-10*(t>>>0)}t=4022871197}},c=function(t){return function(){var n,r,c=48,u=1,i=c,a=new Array(c),f=0,d=new o;for(n=0;n<c;n++)a[n]=d(Math.random());var p=function(){++i>=c&&(i=0);var t=1768863*a[i]+2.3283064365386963e-10*u;return a[i]=t-(u=0|t)},s=function(t){return Math.floor(t*(p()+1.1102230246251565e-16*(2097152*p()|0)))};s.string=function(t){var n,r="";for(n=0;n<t;n++)r+=String.fromCharCode(33+s(94));return r};var l=function(){var t=Array.prototype.slice.call(arguments);for(n=0;n<t.length;n++)for(r=0;r<c;r++)a[r]-=d(t[n]),a[r]<0&&(a[r]+=1)};return s.cleanString=function(t){return t=t.replace(/(^\s*)|(\s*$)/gi,""),t=t.replace(/[\x00-\x1F]/gi,""),t=t.replace(/\n /,"\n")},s.hashString=function(t){for(t=s.cleanString(t),d(t),n=0;n<t.length;n++)for(f=t.charCodeAt(n),r=0;r<c;r++)a[r]-=d(f),a[r]<0&&(a[r]+=1)},s.seed=function(t){void 0!==t&&null!==t||(t=Math.random()),"string"!=typeof t&&(t=e(t,function(t,n){return"function"==typeof n?n.toString():n})),s.initState(),s.hashString(t)},s.addEntropy=function(){var t=[];for(n=0;n<arguments.length;n++)t.push(arguments[n]);l(f+++(new Date).getTime()+t.join("")+Math.random())},s.initState=function(){for(d(),n=0;n<c;n++)a[n]=d(" ");u=1,i=c},s.done=function(){d=null},void 0!==t&&s.seed(t),s.range=function(t){return s(t)},s.random=function(){return s(Number.MAX_VALUE-1)/Number.MAX_VALUE},s.floatBetween=function(t,n){return s.random()*(n-t)+t},s.intBetween=function(t,n){return Math.floor(s.random()*(n-t+1))+t},s}()};c.create=function(t){return new c(t)},t.exports=c},function(t,n){function r(t,n,r,o){return JSON.stringify(t,e(n,o),r)}function e(t,n){var r=[],e=[];return null==n&&(n=function(t,n){return r[0]===n?"[Circular ~]":"[Circular ~."+e.slice(0,r.indexOf(n)).join(".")+"]"}),function(o,c){if(r.length>0){var u=r.indexOf(this);~u?r.splice(u+1):r.push(this),~u?e.splice(u,1/0,o):e.push(o),~r.indexOf(c)&&(c=n.call(this,o,c))}else r.push(c);return null==t?c:t.call(this,o,c)}}n=t.exports=r,n.getSerialize=e},function(t,n,r){"use strict";function e(t,n,r){this.x=t,this.y=n,this.z=r}function o(t,n,r,e){var o=t[n+t[r+t[e]]]%c.length;return c[o]}n.a=o,e.prototype.dot=function(t,n,r){return this.x*t+this.y*n+this.z*r};var c=[new e(1,1,1),new e(-1,1,1),new e(1,-1,1),new e(-1,-1,1),new e(1,1,0),new e(-1,1,0),new e(1,-1,0),new e(-1,-1,0),new e(1,1,-1),new e(-1,1,-1),new e(1,-1,-1),new e(-1,-1,-1)]},function(t,n,r){"use strict";function e(t,n,r,e){this.x=t,this.y=n,this.z=r,this.t=e}function o(t,n,r,e,o){var u=t[n+t[r+t[e+t[o]]]]%c.length;return c[u]}n.a=o,e.prototype.dot=function(t,n,r,e){return this.x*t+this.y*n+this.z*r+this.t*e};var c=[new e(0,1,1,1),new e(0,1,1,-1),new e(0,1,-1,1),new e(0,1,-1,-1),new e(0,-1,1,1),new e(0,-1,1,-1),new e(0,-1,-1,1),new e(0,-1,-1,-1),new e(1,0,1,1),new e(1,0,1,-1),new e(1,0,-1,1),new e(1,0,-1,-1),new e(-1,0,1,1),new e(-1,0,1,-1),new e(-1,0,-1,1),new e(-1,0,-1,-1),new e(1,1,0,1),new e(1,1,0,-1),new e(1,-1,0,1),new e(1,-1,0,-1),new e(-1,1,0,1),new e(-1,1,0,-1),new e(-1,-1,0,1),new e(-1,-1,0,-1),new e(1,1,1,0),new e(1,1,-1,0),new e(1,-1,1,0),new e(1,-1,-1,0),new e(-1,1,1,0),new e(-1,1,-1,0),new e(-1,-1,1,0),new e(-1,-1,-1,0)]},function(t,n,r){"use strict";function e(t,n){return 1===n.length?t[n[0]]:t[n[0]+e(t,n.slice(1))]}function o(t){this.R=t}function c(t){for(var n=0;n<2*t;n++){var r=new Array(t).fill(0);r[n%t]=n/t>=1?1:-1,f[n]=new o(r)}}function u(t,n){if(1===n.length)return Object(a.d)(t[0],t[1],Object(a.c)(n[0]));var r=t.slice(0,Math.floor(t.length/2)),e=t.slice(Math.ceil(t.length/2));return Object(a.d)(u(r,n.slice(0,n.length-1)),u(e,n.slice(0,n.length-1)),Object(a.c)(n[n.length-1]))}function i(t,n,r,o){for(var c=[],u=0;u<2<<n-1;u++){for(var i=r.slice(),a=o.slice(),d=u,p=0;p<n;p++)1&d&&(i[p]+=1,a[p]-=1),d>>=1;c[u]=f[e(t,i)%f.length].dot(a)}return c}r.d(n,"a",function(){return f}),n.b=c,n.d=u,n.c=i;var a=r(1);o.prototype.dot=function(t){for(var n=this,r=0,e=0;e<t.length;e++)r+=n.R[e]*t[e];return r};var f=[]},function(t,n,r){"use strict";var e=r(9);r.d(n,"a",function(){return e.a});var o=r(10);r.d(n,"b",function(){return o.a})}])});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTVlZDczYTliYTIzNjc2NDBmMzciLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZXJyYXBhaW50L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L3R1bXVsdC5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ21COztBQUVuQjtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOzs7Ozs7O0FDL0RBO0FB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eUJBQXlCLFNBQVMsUUFBUSxtQkFBbUIseUJBQXlCLHFEQUFxRCx3QkFBd0IsWUFBWSxJQUFJLGdCQUFnQixRQUFRLG1CQUFtQixPQUFPLDJDQUEyQyxZQUFZLHFCQUFxQiw4Q0FBOEMsOEJBQThCLDBCQUEwQiw0QkFBNEIsd0NBQXdDLEdBQUcsSUFBSSxxQkFBcUIsZ0JBQWdCLGFBQWEsZUFBZSxvQkFBb0Isa0NBQWtDLGdCQUFnQixjQUFjLGlDQUFpQyxvRkFBb0YsZ0JBQWdCLGVBQWUsc0JBQXNCLGlHQUFpRyxlQUFlLG1DQUFtQywrQkFBK0IsaUJBQWlCLGFBQWEsa0JBQWtCLDJCQUEyQixvQkFBb0IsOEJBQThCLFlBQVksc0NBQXNDLG1DQUFtQyxvTEFBb0wsaUJBQWlCLGFBQWEsb0JBQW9CLG9DQUFvQyxzQkFBc0IsbUNBQW1DLFlBQVksd0NBQXdDLDRDQUE0Qyx3aEJBQXdoQixpQkFBaUIsYUFBYSxnQkFBZ0Isb0RBQW9ELGNBQWMsU0FBUyxjQUFjLFlBQVksTUFBTSxLQUFLLDJCQUEyQixrQ0FBa0MsZ0JBQWdCLGdFQUFnRSx5RUFBeUUscUdBQXFHLG9CQUFvQixpQkFBaUIsU0FBUyxLQUFLLHdDQUF3QyxJQUFJLGlDQUFpQywrQkFBK0IsU0FBUyxxQkFBcUIsU0FBUyxvQkFBb0IsV0FBVyw0QkFBNEIsdUJBQXVCLFdBQVcsbUJBQW1CLFVBQVUsU0FBUyxpQkFBaUIsYUFBYSxXQUFXLHFCQUFxQixXQUFXLEVBQUUsWUFBWSxxQkFBcUIsV0FBVyxFQUFFLEdBQUcsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1NWVkNzNhOWJhMjM2NzY0MGYzNyIsImltcG9ydCB0ZXJyYXBhaW50IGZyb20gJ3RlcnJhcGFpbnQnXHJcbmltcG9ydCB7IFNpbXBsZXgyIH0gZnJvbSAnLi4vZGlzdC90dW11bHQubWluJ1xyXG5cclxudmFyIHNlZWQgPSBNYXRoLnJhbmRvbSgpXHJcbnZhciBzaW1wbGV4ID0gbmV3IFNpbXBsZXgyKHNlZWQpXHJcblxyXG47KGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgdmFyIG1hcCA9IHRlcnJhcGFpbnQubWFwKHNpbXBsZXguZ2VuLCB7XHJcbiAgICBvZmZzZXQ6IHRydWUsXHJcbiAgICBwZXJpb2Q6IDY0LFxyXG4gICAgdGhpc0FyZzogc2ltcGxleFxyXG4gIH0pXHJcbiAgbWFwLmRyYXcoJyNub2lzZS1jYW52YXMnKVxyXG59KSgpXHJcblxyXG4kKCcjZ2VuLW5vaXNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGV2YWxTdHIgPSAkKCcjZXZhbC1zdHInKS52YWx1ZVxyXG4gIHZhciBmbkJvZHkgPSBgXHJcbiAgICB2YXIgbiA9IHRoaXMuZ2VuLmJpbmQodGhpcylcclxuICAgIHZhciBmID0gdGhpcy5vY3RhdmF0ZS5iaW5kKHRoaXMpXHJcbiAgICB2YXIgc2luID0gTWF0aC5zaW5cclxuICAgIHZhciBjb3MgPSBNYXRoLmNvc1xyXG4gICAgdmFyIHBvdyA9IE1hdGgucG93XHJcbiAgICB2YXIgcGkgPSBNYXRoLlBJXHJcbiAgICB2YXIgYWJzID0gTWF0aC5hYnNcclxuICAgIHZhciBlID0gTWF0aC5FXHJcbiAgICByZXR1cm4gJHtldmFsU3RyfVxyXG4gIGBcclxuICB0cnkge1xyXG4gICAgdmFyIHRyYW5zZm9ybUZuID0gKG5ldyBGdW5jdGlvbigneCcsICd5JywgZm5Cb2R5KSkuYmluZChzaW1wbGV4KVxyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGFsZXJ0KGBcclxuICAgICAgU29tZXRoaW5nIGlzIHdyb25nIHdpdGggdGhlIHN5bnRheCBvZiB5b3VyIGZ1bmN0aW9uLlxyXG4gICAgICBQbGVhc2UgZW5zdXJlIGFsbCB0aGUgcGFyZW50aGVzZXMgYXJlIGNsb3NlZCBhbmQgdGhhdCB5b3UncmVcclxuICAgICAgdXNpbmcgdGhlIGNvcnJlY3QgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZSBuYW1lcy5cclxuICAgIGApXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIHZhciB0cmFuc2Zvcm1lZE5vaXNlID0gc2ltcGxleC50cmFuc2Zvcm0oZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHZhbCA9IHRyYW5zZm9ybUZuKHgsIHkpXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGFsZXJ0KGBcclxuICAgICAgICBZb3VyIGZ1bmN0aW9uIGNyZWF0ZWQgYSBydW4tdGltZSBlcnJvci4gUGxlYXNlIGVuc3VyZVxyXG4gICAgICAgIHRoZSBwZXJpb2Qgb2YgdGhlIG5vaXNlIGZ1bmN0aW9uIGlzIGdyZWF0ZXIgdGhhbiBvbmVcclxuICAgICAgICAoaWUuIGRpdmlkZSB4IGFuZCB5IGJ5IGEgdmFsdWUsIGxpa2UgNCBvciAxNiwgYmVmb3JlXHJcbiAgICAgICAgcGFzc2luZyBpdCB0byBuKCkpLlxyXG4gICAgICBgKVxyXG4gICAgICB0aHJvdyAnUnVudGltZSBlcnJvcidcclxuICAgIH1cclxuICAgIHJldHVybiB2YWxcclxuICB9KVxyXG4gIHZhciBtYXAgPSB0ZXJyYXBhaW50Lm1hcCh0cmFuc2Zvcm1lZE5vaXNlLCB7XHJcbiAgICBvZmZzZXQ6IHRydWUsXHJcbiAgICBwZXJpb2Q6IDEsXHJcbiAgICB0aGlzQXJnOiBzaW1wbGV4XHJcbiAgfSlcclxuICBtYXAuZHJhdygnI25vaXNlLWNhbnZhcycpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiAkIChzZWxlY3Rvcikge1xyXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZG9jcy9kZW1vLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInRyeSB7XHJcbiAgdmFyIGltYWdlVGVzdCA9IG5ldyBJbWFnZURhdGEoMjAsIDIwKVxyXG4gIHZhciBudW1iZXJUZXN0ID0gTWF0aC50cnVuYygyMC4xKVxyXG59IGNhdGNoIChlKSB7XHJcbiAgdmFyIGVyciA9ICdFcnJvciwgYnJvd3NlciBub3Qgc3VwcG9ydGVkIGJ5IFRlcnJhcGFpbnQuICdcclxuICBlcnIgKz0gJ1BsZWFzZSBzd2l0Y2ggdG8gVml2YWxkaSwgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgb3IgU2FmYXJpLidcclxuICBjb25zb2xlLmxvZyhlcnIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlcnJhcGFpbnRGYWN0b3J5ICgpIHtcclxuICBmdW5jdGlvbiBvY3RhdmF0ZSAoKSB7XHJcbiAgICB2YXIgdmFsID0gMFxyXG4gICAgdmFyIG1heCA9IDBcclxuICAgIHZhciBwID0gdGhpcy5wZXJpb2RcclxuICAgIHZhciBhbXAgPSBNYXRoLnBvdyh0aGlzLnBlcnNpc3RhbmNlLCB0aGlzLm9jdGF2ZXMpXHJcbiAgICB2YXIgYXJncyA9IFtdXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2N0YXZlczsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgYXJnc1tqXSA9IGFyZ3VtZW50c1tqXSAvIHBcclxuICAgICAgfVxyXG4gICAgICB2YWwgKz0gKHRoaXMubm9pc2UuYXBwbHkodGhpcy50aGlzQXJnLCBhcmdzKSArIHRoaXMub2Zmc2V0KSAqIGFtcFxyXG4gICAgICBtYXggKz0gYW1wICogKHRoaXMub2Zmc2V0ICsgMSlcclxuICAgICAgYW1wIC89IHRoaXMucGVyc2lzdGFuY2VcclxuICAgICAgcCAvPSAyXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsIC8gbWF4XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNldE9wdGlvbnMgKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICB0aGlzLm9jdGF2ZXMgPSBvcHRpb25zLm9jdGF2ZXMgfHwgMVxyXG4gICAgdGhpcy5wZXJpb2QgPSBvcHRpb25zLnBlcmlvZCB8fCAzMlxyXG4gICAgdGhpcy5vZmZzZXQgPSBvcHRpb25zLm9mZnNldCA/IDEgOiAwXHJcbiAgICB0aGlzLnBlcnNpc3RhbmNlID0gb3B0aW9ucy5wZXJzaXN0YW5jZSB8fCAyXHJcbiAgICB0aGlzLnVwZGF0ZSA9IG9wdGlvbnMudXBkYXRlIHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgJ05vIHVwZGF0ZSBmbicgfVxyXG4gICAgdGhpcy5sb29wdmFsdWVzID0gb3B0aW9ucy5pbml0IHx8IFtdXHJcbiAgICB0aGlzLmNvbG9ybWFwID0gb3B0aW9ucy5jb2xvcm1hcCB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gW3YsIHYsIHYsIDI1NV0gfVxyXG4gICAgdGhpcy50aGlzQXJnID0gb3B0aW9ucy50aGlzQXJnIHx8IG51bGxcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gTWFwIChub2lzZSwgb3B0aW9ucykge1xyXG4gICAgc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpXHJcbiAgICB0aGlzLm5vaXNlID0gbm9pc2VcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBtYXAgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkod2lkdGggKiBoZWlnaHQgKiA0KVxyXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5sb29wdmFsdWVzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5sb29wdmFsdWVzID0gdGhpcy51cGRhdGUodGhpcy5sb29wdmFsdWVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9pc2VBcmdzID0gW3gsIHldLmNvbmNhdCh0aGlzLmxvb3B2YWx1ZXMpXHJcbiAgICAgICAgdmFyIHZhbCA9IE1hdGgudHJ1bmMob2N0YXZhdGUuYXBwbHkodGhpcywgbm9pc2VBcmdzKSAqIDI1NSlcclxuICAgICAgICB2YXIgcGl4ZWxEYXRhXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbG9ybWFwID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBwaXhlbERhdGEgPSB0aGlzLmNvbG9ybWFwKHZhbClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGl4ZWxEYXRhID0gdGhpcy5jb2xvcm1hcFt2YWxdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcC5zZXQocGl4ZWxEYXRhLCB4ICogNCArIHkgKiA0ICogd2lkdGgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKG1hcCwgd2lkdGgsIGhlaWdodClcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGNhbnZhcykge1xyXG4gICAgY2FudmFzID0gdHlwZW9mIGNhbnZhcyA9PT0gJ3N0cmluZydcclxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNhbnZhcylcclxuICAgICAgOiBjYW52YXNcclxuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLnB1dEltYWdlRGF0YSh0aGlzLmNvbXB1dGUoXHJcbiAgICAgIGNhbnZhcy53aWR0aCxcclxuICAgICAgY2FudmFzLmhlaWdodFxyXG4gICAgKSwgMCwgMClcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXHJcbiAgfVxyXG4gIE1hcC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHRhcmdldCwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICAgIHRhcmdldCA9IHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnXHJcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXHJcbiAgICAgIDogdGFyZ2V0XHJcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aFxyXG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxyXG4gICAgY3R4LnB1dEltYWdlRGF0YSh0aGlzLmNvbXB1dGUod2lkdGgsIGhlaWdodCksIDAsIDApXHJcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY2FudmFzKVxyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICB2YXIgZm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoYXQuZHJhdyh0aGF0LmNhbnZhcylcclxuICAgICAgdGhpcy5hbmltUmVxID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuKVxyXG4gICAgfVxyXG4gICAgdGhpcy5hbmltUmVxID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuKVxyXG4gIH1cclxuICBNYXAucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1SZXEpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBDdXJ2ZSAobm9pc2UsIG9wdGlvbnMpIHtcclxuICAgIHNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKVxyXG4gICAgdGhpcy5ub2lzZSA9IG5vaXNlXHJcbiAgfVxyXG4gIEN1cnZlLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBjdXJ2ZSA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpLmZpbGwoMjU1KVxyXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxvb3B2YWx1ZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5sb29wdmFsdWVzID0gdGhpcy51cGRhdGUodGhpcy5sb29wdmFsdWVzKVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBub2lzZUFyZ3MgPSBbeF0uY29uY2F0KHRoaXMubG9vcHZhbHVlcylcclxuICAgICAgdmFyIHZhbCA9IE1hdGgudHJ1bmMob2N0YXZhdGUuYXBwbHkodGhpcywgbm9pc2VBcmdzKSAqIDI1NSlcclxuICAgICAgLy9jb25zb2xlLmxvZyh2YWwpXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgY3VydmVbdmFsICogd2lkdGggKiA0ICsgeCAqIDQgKyBpXSA9IDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9jb25zb2xlLmxvZyhjdXJ2ZSlcclxuICAgIC8vdGhyb3cgJ2EnXHJcbiAgICByZXR1cm4gbmV3IEltYWdlRGF0YShjdXJ2ZSwgd2lkdGgsIGhlaWdodClcclxuICB9XHJcbiAgQ3VydmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY2FudmFzKSB7XHJcbiAgICBNYXAucHJvdG90eXBlLmRyYXcuY2FsbCh0aGlzLCBjYW52YXMpXHJcbiAgfVxyXG4gIEN1cnZlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAodGFyZ2V0LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICBNYXAucHJvdG90eXBlLmNyZWF0ZS5jYWxsKHRoaXMsIHRhcmdldCwgd2lkdGgsIGhlaWdodClcclxuICB9XHJcbiAgQ3VydmUucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBNYXAucHJvdG90eXBlLmxvb3AuY2FsbCh0aGlzKVxyXG4gIH1cclxuICBDdXJ2ZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIE1hcC5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpXHJcbiAgfVxyXG5cclxuICB2YXIgbW9kdWxlID0ge1xyXG4gICAgbWFwOiBmdW5jdGlvbiAobm9pc2UsIG9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIG5ldyBNYXAobm9pc2UsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgY3VydmU6IGZ1bmN0aW9uIChub2lzZSwgb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gbmV3IEN1cnZlKG5vaXNlLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIFRIUkVFMjogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFRIUkVFMigpXHJcbiAgICB9LFxyXG4gICAgVEhSRUUzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBuZXcgVEhSRUUzKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBtb2R1bGVcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXJyYXBhaW50RmFjdG9yeSgpXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RlcnJhcGFpbnQvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiFmdW5jdGlvbih0LG4pe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPW4oKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwidHVtdWx0XCIsW10sbik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy50dW11bHQ9bigpOnQudHVtdWx0PW4oKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBuKGUpe2lmKHJbZV0pcmV0dXJuIHJbZV0uZXhwb3J0czt2YXIgbz1yW2VdPXtpOmUsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gdFtlXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxuKSxvLmw9ITAsby5leHBvcnRzfXZhciByPXt9O3JldHVybiBuLm09dCxuLmM9cixuLmQ9ZnVuY3Rpb24odCxyLGUpe24ubyh0LHIpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxyLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6ZX0pfSxuLm49ZnVuY3Rpb24odCl7dmFyIHI9dCYmdC5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIHQuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gdH07cmV0dXJuIG4uZChyLFwiYVwiLHIpLHJ9LG4ubz1mdW5jdGlvbih0LG4pe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxuKX0sbi5wPVwiXCIsbihuLnM9MTEpfShbZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO3IuZChuLFwiYVwiLGZ1bmN0aW9uKCl7cmV0dXJuIGN9KTt2YXIgZT1yKDEzKSxvPXIubihlKSxjPWZ1bmN0aW9uKHQpe3RoaXMucD1uZXcgVWludDhBcnJheSg1MTIpLHRoaXMuc2VlZCh0KX07Yy5wcm90b3R5cGUuZ2VuPWZ1bmN0aW9uKCl7fSxjLnByb3RvdHlwZS5zZWVkPWZ1bmN0aW9uKHQpe3ZhciBuPXRoaXM7dD10fHxNYXRoLnJhbmRvbSgpO3ZhciByLGU9by5hLmNyZWF0ZSh0KTtmb3Iocj0wO3I8MjU2O3IrKyluLnBbcl09cjtmb3Iocj0wO3I8MjU2O3IrKyl7dmFyIGM9ZSgyNTYpLHU9bi5wW3JdO24ucFtyXT1uLnBbY10sbi5wW2NdPXV9Zm9yKHI9MDtyPDI1NjtyKyspbi5wW3IrMjU2XT1uLnBbcl19LGMucHJvdG90eXBlLnRyYW5zZm9ybT1mdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgcj1bXSxlPWFyZ3VtZW50cy5sZW5ndGg7ZS0tOylyW2VdPWFyZ3VtZW50c1tlXTtyZXR1cm4gdC5hcHBseShuLHIpfS5iaW5kKHRoaXMpfSxjLnByb3RvdHlwZS5vY3RhdmF0ZT1mdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLG49W10scj1hcmd1bWVudHMubGVuZ3RoO3ItLTspbltyXT1hcmd1bWVudHNbcl07Zm9yKHZhciBlPW5bMF0sbz1uLnNsaWNlKDEpLGM9MCx1PTAsaT0wO2k8ZTtpKyspe3ZhciBhPTE8PGk7Yys9dC5nZW4uYXBwbHkodCxvLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdCphfSkpL2F9Zm9yKHZhciBpPTA7aTxlO2krKyl1Kz0xLygxPDxpKTtyZXR1cm4gYy91fX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoKXtmb3IodmFyIHQ9W10sbj1hcmd1bWVudHMubGVuZ3RoO24tLTspdFtuXT1hcmd1bWVudHNbbl07dmFyIHI9dC5zbGljZSgxKSxlPXRbMF0tci5yZWR1Y2UoZnVuY3Rpb24odCxuKXtyZXR1cm4gdCtuKm59LDApO3JldHVybiBlKmUqZSplfWZ1bmN0aW9uIG8odCxuLHIpe3JldHVybiB0KigxLXIpK24qcn1mdW5jdGlvbiBjKHQpe3JldHVybiB0KnQqdCooMTArdCooNip0LTE1KSl9bi5kPW8sbi5jPWMsci5kKG4sXCJiXCIsZnVuY3Rpb24oKXtyZXR1cm4gdX0pLHIuZChuLFwiYVwiLGZ1bmN0aW9uKCl7cmV0dXJuIGl9KTt2YXIgdT1lLmJpbmQobnVsbCwxKSxpPWUuYmluZChudWxsLC41KX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO3ZhciBlPXIoMCksbz1yKDMpLGM9cigxKSx1PWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4obil7dC5jYWxsKHRoaXMsbil9cmV0dXJuIHQmJihuLl9fcHJvdG9fXz10KSxuLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQmJnQucHJvdG90eXBlKSxuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1uLG4ucHJvdG90eXBlLmdlbj1mdW5jdGlvbih0KXt2YXIgbj1vLmEuYmluZChudWxsLHRoaXMucCkscj1NYXRoLmZsb29yKHQpJTI1NixlPXQtcix1PW4ocikuZG90KGUpLGk9bihyKzEpLmRvdChlLTEpO3JldHVybiBPYmplY3QoYy5kKSh1LGksT2JqZWN0KGMuYykoZSkpfSxufShlLmEpO24uYT11fSxmdW5jdGlvbih0LG4scil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZSh0KXt0aGlzLng9dH1mdW5jdGlvbiBvKHQsbil7dmFyIHI9dFtuXSVjLmxlbmd0aDtyZXR1cm4gY1tyXX1uLmE9byxlLnByb3RvdHlwZS5kb3Q9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMueCp0fTt2YXIgYz1bbmV3IGUoMSksbmV3IGUoLTEpXX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO3ZhciBlPXIoMCksbz1yKDUpLGM9cigxKSx1PWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4obil7dC5jYWxsKHRoaXMsbil9cmV0dXJuIHQmJihuLl9fcHJvdG9fXz10KSxuLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQmJnQucHJvdG90eXBlKSxuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1uLG4ucHJvdG90eXBlLmdlbj1mdW5jdGlvbih0LG4pe3ZhciByPW8uYy5iaW5kKG51bGwsdGhpcy5wKSxlPU1hdGgudHJ1bmModCklMjU2LHU9TWF0aC50cnVuYyhuKSUyNTYsaT10LWUsYT1uLXUsZj1yKGUsdSkuZG90KGksYSksZD1yKGUrMSx1KS5kb3QoaS0xLGEpLHA9cihlLHUrMSkuZG90KGksYS0xKSxzPXIoZSsxLHUrMSkuZG90KGktMSxhLTEpO3JldHVybiBPYmplY3QoYy5kKShPYmplY3QoYy5kKShmLGQsT2JqZWN0KGMuYykoaSkpLE9iamVjdChjLmQpKHAscyxPYmplY3QoYy5jKShpKSksT2JqZWN0KGMuYykoYSkpfSxufShlLmEpO24uYT11fSxmdW5jdGlvbih0LG4scil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZSh0LG4pe3RoaXMueD10LHRoaXMueT1ufWZ1bmN0aW9uIG8odCxuLHIpe3ZhciBlPXRbbit0W3JdXSVjLmxlbmd0aDtyZXR1cm4gY1tlXX1uLmM9byxyLmQobixcImJcIixmdW5jdGlvbigpe3JldHVybiB1fSksci5kKG4sXCJhXCIsZnVuY3Rpb24oKXtyZXR1cm4gaX0pLGUucHJvdG90eXBlLmRvdD1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLngqdCt0aGlzLnkqbn07dmFyIGM9W25ldyBlKDEsMCksbmV3IGUoMSwxKSxuZXcgZSgwLDEpLG5ldyBlKC0xLDEpLG5ldyBlKC0xLDApLG5ldyBlKC0xLC0xKSxuZXcgZSgwLC0xKSxuZXcgZSgxLC0xKV0sdT0uNSooTWF0aC5zcXJ0KDMpLTEpLGk9KDMtTWF0aC5zcXJ0KDMpKS82fSxmdW5jdGlvbih0LG4scil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9cigwKSxvPXIoMTUpLGM9cigxKSx1PWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4obil7dC5jYWxsKHRoaXMsbil9cmV0dXJuIHQmJihuLl9fcHJvdG9fXz10KSxuLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQmJnQucHJvdG90eXBlKSxuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1uLG4ucHJvdG90eXBlLmdlbj1mdW5jdGlvbih0LG4scil7dmFyIGU9by5hLmJpbmQobnVsbCx0aGlzLnApLHU9TWF0aC50cnVuYyh0KSUyNTYsaT1NYXRoLnRydW5jKG4pJTI1NixhPU1hdGgudHJ1bmMociklMjU2LGY9dC11LGQ9bi1pLHA9ci1hLHM9ZSh1LGksYSkuZG90KGYsZCxwKSxsPWUodSsxLGksYSkuZG90KGYtMSxkLHApLGg9ZSh1LGkrMSxhKS5kb3QoZixkLTEscCksYj1lKHUrMSxpKzEsYSkuZG90KGYtMSxkLTEscCksdj1lKHUsaSxhKzEpLmRvdChmLGQscC0xKSxqPWUodSsxLGksYSsxKS5kb3QoZi0xLGQscC0xKSxPPWUodSxpKzEsYSsxKS5kb3QoZixkLTEscC0xKSx3PWUodSsxLGkrMSxhKzEpLmRvdChmLTEsZC0xLHAtMSk7cmV0dXJuIE9iamVjdChjLmQpKE9iamVjdChjLmQpKE9iamVjdChjLmQpKHMsbCxmKSxPYmplY3QoYy5kKShoLGIsZiksT2JqZWN0KGMuYykoZCkpLE9iamVjdChjLmQpKE9iamVjdChjLmQpKHYsaixmKSxPYmplY3QoYy5kKShPLHcsZiksT2JqZWN0KGMuYykoZCkpLE9iamVjdChjLmMpKHApKX0sbn0oZS5hKTtuLmE9dX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO3ZhciBlPXIoMCksbz1yKDE2KSxjPXIoMSksdT1mdW5jdGlvbih0KXtmdW5jdGlvbiBuKG4pe3QuY2FsbCh0aGlzLG4pfXJldHVybiB0JiYobi5fX3Byb3RvX189dCksbi5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0JiZ0LnByb3RvdHlwZSksbi5wcm90b3R5cGUuY29uc3RydWN0b3I9bixuLnByb3RvdHlwZS5nZW49ZnVuY3Rpb24odCxuLHIsZSl7dmFyIHU9by5hLmJpbmQobnVsbCx0aGlzLnApLGk9TWF0aC50cnVuYyh0KSUyNTYsYT1NYXRoLnRydW5jKG4pJTI1NixmPU1hdGgudHJ1bmMociklMjU2LGQ9TWF0aC50cnVuYyhlKSUyNTYscD10LWkscz1uLWEsbD1yLWYsaD1lLWQsYj11KGksYSxmLGQpLmRvdChwLHMsbCxoKSx2PXUoaSsxLGEsZixkKS5kb3QocC0xLHMsbCksaj11KGksYSsxLGYsZCkuZG90KHAscy0xLGwpLE89dShpKzEsYSsxLGYsZCkuZG90KHAtMSxzLTEsbCksdz11KGksYSxmKzEsZCkuZG90KHAscyxsLTEpLHk9dShpKzEsYSxmKzEsZCkuZG90KHAtMSxzLGwtMSksZz11KGksYSsxLGYrMSxkKS5kb3QocCxzLTEsbC0xKSxfPXUoaSsxLGErMSxmKzEsZCkuZG90KHAtMSxzLTEsbC0xKSx4PXUoaSxhLGYsZCsxKS5kb3QocCxzLGwsaC0xKSxNPXUoaSsxLGEsZixkKzEpLmRvdChwLTEscyxsLGgtMSksbT11KGksYSsxLGYsZCsxKS5kb3QocCxzLTEsbCxoLTEpLFM9dShpKzEsYSsxLGYsZCsxKS5kb3QocC0xLHMtMSxsLGgtMSksUD11KGksYSxmKzEsZCsxKS5kb3QocCxzLGwtMSxoLTEpLEE9dShpKzEsYSxmKzEsZCsxKS5kb3QocC0xLHMsbC0xLGgtMSksQz11KGksYSsxLGYrMSxkKzEpLmRvdChwLHMtMSxsLTEsaC0xKSx6PXUoaSsxLGErMSxmKzEsZCsxKS5kb3QocC0xLHMtMSxsLTEsaC0xKTtyZXR1cm4gT2JqZWN0KGMuZCkoT2JqZWN0KGMuZCkoT2JqZWN0KGMuZCkoT2JqZWN0KGMuZCkoYix2LHApLE9iamVjdChjLmQpKGosTyxwKSxPYmplY3QoYy5jKShzKSksT2JqZWN0KGMuZCkoT2JqZWN0KGMuZCkodyx5LHApLE9iamVjdChjLmQpKGcsXyxwKSxPYmplY3QoYy5jKShzKSksT2JqZWN0KGMuYykobCkpLE9iamVjdChjLmQpKE9iamVjdChjLmQpKE9iamVjdChjLmQpKHgsTSxwKSxPYmplY3QoYy5kKShtLFMscCksT2JqZWN0KGMuYykocykpLE9iamVjdChjLmQpKE9iamVjdChjLmQpKFAsQSxwKSxPYmplY3QoYy5kKShDLHoscCksT2JqZWN0KGMuYykocykpLE9iamVjdChjLmMpKGwpKSxPYmplY3QoYy5jKShoKSl9LG59KGUuYSk7bi5hPXV9LGZ1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1yKDApLG89cigxNyksYz1mdW5jdGlvbih0KXtmdW5jdGlvbiBuKG4pe3QuY2FsbCh0aGlzLG4pfXJldHVybiB0JiYobi5fX3Byb3RvX189dCksbi5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0JiZ0LnByb3RvdHlwZSksbi5wcm90b3R5cGUuY29uc3RydWN0b3I9bixuLnByb3RvdHlwZS5nZW49ZnVuY3Rpb24oKXtmb3IodmFyIHQ9W10sbj1hcmd1bWVudHMubGVuZ3RoO24tLTspdFtuXT1hcmd1bWVudHNbbl07dmFyIHI9by5jLmJpbmQobnVsbCx0aGlzLnApLGU9W10sYz1bXTswPT09by5hLmxlbmd0aCYmT2JqZWN0KG8uYikodC5sZW5ndGgpO3ZhciB1O2Zvcih1PTA7dTx0Lmxlbmd0aDt1KyspZVt1XT1NYXRoLnRydW5jKHRbdV0pJTI1NixjW3VdPXRbdV0tZVt1XTt2YXIgaT1yKHQubGVuZ3RoLGUsYyk7cmV0dXJuIE9iamVjdChvLmQpKGksYyl9LG59KGUuYSk7bi5hPWN9LGZ1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1yKDApLG89cigzKSxjPXIoMSksdT1mdW5jdGlvbih0KXtmdW5jdGlvbiBuKG4pe3QuY2FsbCh0aGlzLG4pfXJldHVybiB0JiYobi5fX3Byb3RvX189dCksbi5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0JiZ0LnByb3RvdHlwZSksbi5wcm90b3R5cGUuY29uc3RydWN0b3I9bixuLnByb3RvdHlwZS5nZW49ZnVuY3Rpb24odCl7dmFyIG49by5hLmJpbmQobnVsbCx0aGlzLnApLHI9TWF0aC5mbG9vcih0KSUyNTYsZT10LXI7cmV0dXJuLjUqKE9iamVjdChjLmIpKGUpKm4ocikuZG90KGUpK09iamVjdChjLmIpKGUtMSkqbihyKzEpLmRvdChlLTEpKX0sbn0oZS5hKTtuLmE9dX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO3ZhciBlPXIoMCksbz1yKDUpLGM9cigxKSx1PWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4obil7dC5jYWxsKHRoaXMsbil9cmV0dXJuIHQmJihuLl9fcHJvdG9fXz10KSxuLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQmJnQucHJvdG90eXBlKSxuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1uLG4ucHJvdG90eXBlLmdlbj1mdW5jdGlvbih0LG4pe3ZvaWQgMD09PXRoaXMmJmNvbnNvbGUubG9nKHRoaXMpO3ZhciByPW8uYy5iaW5kKG51bGwsdGhpcy5wKSxlPSh0K24pKm8uYix1PU1hdGgudHJ1bmModCtlKSxpPU1hdGgudHJ1bmMobitlKSxhPSh1K2kpKm8uYSxmPXUtYSxkPWktYSxwPXQtZixzPW4tZCxsPXA+cz8xOjAsaD1wPnM/MDoxLGI9cC1sK28uYSx2PXMtaCtvLmEsaj1wLTErMipvLmEsTz1zLTErMipvLmE7cmV0dXJuIDcwKihPYmplY3QoYy5hKShwLHMpKnIodSxpKS5kb3QocCxzKStPYmplY3QoYy5hKShiLHYpKnIodStsLGkraCkuZG90KGIsdikrT2JqZWN0KGMuYSkoaixPKSpyKHUrMSxpKzEpLmRvdChqLE8pKX0sbn0oZS5hKTtuLmE9dX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBlPXIoMTIpLG89cigxOCksYz1yKDIpO3IuZChuLFwiUGVybGluMVwiLGZ1bmN0aW9uKCl7cmV0dXJuIGMuYX0pO3ZhciB1PXIoNCk7ci5kKG4sXCJQZXJsaW4yXCIsZnVuY3Rpb24oKXtyZXR1cm4gdS5hfSk7dmFyIGk9cig2KTtyLmQobixcIlBlcmxpbjNcIixmdW5jdGlvbigpe3JldHVybiBpLmF9KTt2YXIgYT1yKDcpO3IuZChuLFwiUGVybGluNFwiLGZ1bmN0aW9uKCl7cmV0dXJuIGEuYX0pO3ZhciBmPXIoOCk7ci5kKG4sXCJQZXJsaW5OXCIsZnVuY3Rpb24oKXtyZXR1cm4gZi5hfSk7dmFyIGQ9cig5KTtyLmQobixcIlNpbXBsZXgxXCIsZnVuY3Rpb24oKXtyZXR1cm4gZC5hfSk7dmFyIHA9cigxMCk7ci5kKG4sXCJTaW1wbGV4MlwiLGZ1bmN0aW9uKCl7cmV0dXJuIHAuYX0pLG4uZGVmYXVsdD17U2ltcGxleDE6by5hLFNpbXBsZXgyOm8uYixQZXJsaW4xOmUuYSxQZXJsaW4yOmUuYixQZXJsaW4zOmUuYyxQZXJsaW40OmUuZCxQZXJsaW5OOmUuZX19LGZ1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1yKDIpO3IuZChuLFwiYVwiLGZ1bmN0aW9uKCl7cmV0dXJuIGUuYX0pO3ZhciBvPXIoNCk7ci5kKG4sXCJiXCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSk7dmFyIGM9cig2KTtyLmQobixcImNcIixmdW5jdGlvbigpe3JldHVybiBjLmF9KTt2YXIgdT1yKDcpO3IuZChuLFwiZFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHUuYX0pO3ZhciBpPXIoOCk7ci5kKG4sXCJlXCIsZnVuY3Rpb24oKXtyZXR1cm4gaS5hfSl9LGZ1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1yKDE0KSxvPWZ1bmN0aW9uKCl7dmFyIHQ9NDAyMjg3MTE5NztyZXR1cm4gZnVuY3Rpb24obil7aWYobil7bj1uLnRvU3RyaW5nKCk7Zm9yKHZhciByPTA7cjxuLmxlbmd0aDtyKyspe3QrPW4uY2hhckNvZGVBdChyKTt2YXIgZT0uMDI1MTk2MDMyODI0MTY5MzgqdDt0PWU+Pj4wLGUtPXQsZSo9dCx0PWU+Pj4wLGUtPXQsdCs9NDI5NDk2NzI5NiplfXJldHVybiAyLjMyODMwNjQzNjUzODY5NjNlLTEwKih0Pj4+MCl9dD00MDIyODcxMTk3fX0sYz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbixyLGM9NDgsdT0xLGk9YyxhPW5ldyBBcnJheShjKSxmPTAsZD1uZXcgbztmb3Iobj0wO248YztuKyspYVtuXT1kKE1hdGgucmFuZG9tKCkpO3ZhciBwPWZ1bmN0aW9uKCl7KytpPj1jJiYoaT0wKTt2YXIgdD0xNzY4ODYzKmFbaV0rMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMCp1O3JldHVybiBhW2ldPXQtKHU9MHx0KX0scz1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5mbG9vcih0KihwKCkrMS4xMTAyMjMwMjQ2MjUxNTY1ZS0xNiooMjA5NzE1MipwKCl8MCkpKX07cy5zdHJpbmc9ZnVuY3Rpb24odCl7dmFyIG4scj1cIlwiO2ZvcihuPTA7bjx0O24rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDMzK3MoOTQpKTtyZXR1cm4gcn07dmFyIGw9ZnVuY3Rpb24oKXt2YXIgdD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO2ZvcihuPTA7bjx0Lmxlbmd0aDtuKyspZm9yKHI9MDtyPGM7cisrKWFbcl0tPWQodFtuXSksYVtyXTwwJiYoYVtyXSs9MSl9O3JldHVybiBzLmNsZWFuU3RyaW5nPWZ1bmN0aW9uKHQpe3JldHVybiB0PXQucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2dpLFwiXCIpLHQ9dC5yZXBsYWNlKC9bXFx4MDAtXFx4MUZdL2dpLFwiXCIpLHQ9dC5yZXBsYWNlKC9cXG4gLyxcIlxcblwiKX0scy5oYXNoU3RyaW5nPWZ1bmN0aW9uKHQpe2Zvcih0PXMuY2xlYW5TdHJpbmcodCksZCh0KSxuPTA7bjx0Lmxlbmd0aDtuKyspZm9yKGY9dC5jaGFyQ29kZUF0KG4pLHI9MDtyPGM7cisrKWFbcl0tPWQoZiksYVtyXTwwJiYoYVtyXSs9MSl9LHMuc2VlZD1mdW5jdGlvbih0KXt2b2lkIDAhPT10JiZudWxsIT09dHx8KHQ9TWF0aC5yYW5kb20oKSksXCJzdHJpbmdcIiE9dHlwZW9mIHQmJih0PWUodCxmdW5jdGlvbih0LG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4/bi50b1N0cmluZygpOm59KSkscy5pbml0U3RhdGUoKSxzLmhhc2hTdHJpbmcodCl9LHMuYWRkRW50cm9weT1mdW5jdGlvbigpe3ZhciB0PVtdO2ZvcihuPTA7bjxhcmd1bWVudHMubGVuZ3RoO24rKyl0LnB1c2goYXJndW1lbnRzW25dKTtsKGYrKysobmV3IERhdGUpLmdldFRpbWUoKSt0LmpvaW4oXCJcIikrTWF0aC5yYW5kb20oKSl9LHMuaW5pdFN0YXRlPWZ1bmN0aW9uKCl7Zm9yKGQoKSxuPTA7bjxjO24rKylhW25dPWQoXCIgXCIpO3U9MSxpPWN9LHMuZG9uZT1mdW5jdGlvbigpe2Q9bnVsbH0sdm9pZCAwIT09dCYmcy5zZWVkKHQpLHMucmFuZ2U9ZnVuY3Rpb24odCl7cmV0dXJuIHModCl9LHMucmFuZG9tPWZ1bmN0aW9uKCl7cmV0dXJuIHMoTnVtYmVyLk1BWF9WQUxVRS0xKS9OdW1iZXIuTUFYX1ZBTFVFfSxzLmZsb2F0QmV0d2Vlbj1mdW5jdGlvbih0LG4pe3JldHVybiBzLnJhbmRvbSgpKihuLXQpK3R9LHMuaW50QmV0d2Vlbj1mdW5jdGlvbih0LG4pe3JldHVybiBNYXRoLmZsb29yKHMucmFuZG9tKCkqKG4tdCsxKSkrdH0sc30oKX07Yy5jcmVhdGU9ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBjKHQpfSx0LmV4cG9ydHM9Y30sZnVuY3Rpb24odCxuKXtmdW5jdGlvbiByKHQsbixyLG8pe3JldHVybiBKU09OLnN0cmluZ2lmeSh0LGUobixvKSxyKX1mdW5jdGlvbiBlKHQsbil7dmFyIHI9W10sZT1bXTtyZXR1cm4gbnVsbD09biYmKG49ZnVuY3Rpb24odCxuKXtyZXR1cm4gclswXT09PW4/XCJbQ2lyY3VsYXIgfl1cIjpcIltDaXJjdWxhciB+LlwiK2Uuc2xpY2UoMCxyLmluZGV4T2YobikpLmpvaW4oXCIuXCIpK1wiXVwifSksZnVuY3Rpb24obyxjKXtpZihyLmxlbmd0aD4wKXt2YXIgdT1yLmluZGV4T2YodGhpcyk7fnU/ci5zcGxpY2UodSsxKTpyLnB1c2godGhpcyksfnU/ZS5zcGxpY2UodSwxLzAsbyk6ZS5wdXNoKG8pLH5yLmluZGV4T2YoYykmJihjPW4uY2FsbCh0aGlzLG8sYykpfWVsc2Ugci5wdXNoKGMpO3JldHVybiBudWxsPT10P2M6dC5jYWxsKHRoaXMsbyxjKX19bj10LmV4cG9ydHM9cixuLmdldFNlcmlhbGl6ZT1lfSxmdW5jdGlvbih0LG4scil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZSh0LG4scil7dGhpcy54PXQsdGhpcy55PW4sdGhpcy56PXJ9ZnVuY3Rpb24gbyh0LG4scixlKXt2YXIgbz10W24rdFtyK3RbZV1dXSVjLmxlbmd0aDtyZXR1cm4gY1tvXX1uLmE9byxlLnByb3RvdHlwZS5kb3Q9ZnVuY3Rpb24odCxuLHIpe3JldHVybiB0aGlzLngqdCt0aGlzLnkqbit0aGlzLnoqcn07dmFyIGM9W25ldyBlKDEsMSwxKSxuZXcgZSgtMSwxLDEpLG5ldyBlKDEsLTEsMSksbmV3IGUoLTEsLTEsMSksbmV3IGUoMSwxLDApLG5ldyBlKC0xLDEsMCksbmV3IGUoMSwtMSwwKSxuZXcgZSgtMSwtMSwwKSxuZXcgZSgxLDEsLTEpLG5ldyBlKC0xLDEsLTEpLG5ldyBlKDEsLTEsLTEpLG5ldyBlKC0xLC0xLC0xKV19LGZ1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKHQsbixyLGUpe3RoaXMueD10LHRoaXMueT1uLHRoaXMuej1yLHRoaXMudD1lfWZ1bmN0aW9uIG8odCxuLHIsZSxvKXt2YXIgdT10W24rdFtyK3RbZSt0W29dXV1dJWMubGVuZ3RoO3JldHVybiBjW3VdfW4uYT1vLGUucHJvdG90eXBlLmRvdD1mdW5jdGlvbih0LG4scixlKXtyZXR1cm4gdGhpcy54KnQrdGhpcy55Km4rdGhpcy56KnIrdGhpcy50KmV9O3ZhciBjPVtuZXcgZSgwLDEsMSwxKSxuZXcgZSgwLDEsMSwtMSksbmV3IGUoMCwxLC0xLDEpLG5ldyBlKDAsMSwtMSwtMSksbmV3IGUoMCwtMSwxLDEpLG5ldyBlKDAsLTEsMSwtMSksbmV3IGUoMCwtMSwtMSwxKSxuZXcgZSgwLC0xLC0xLC0xKSxuZXcgZSgxLDAsMSwxKSxuZXcgZSgxLDAsMSwtMSksbmV3IGUoMSwwLC0xLDEpLG5ldyBlKDEsMCwtMSwtMSksbmV3IGUoLTEsMCwxLDEpLG5ldyBlKC0xLDAsMSwtMSksbmV3IGUoLTEsMCwtMSwxKSxuZXcgZSgtMSwwLC0xLC0xKSxuZXcgZSgxLDEsMCwxKSxuZXcgZSgxLDEsMCwtMSksbmV3IGUoMSwtMSwwLDEpLG5ldyBlKDEsLTEsMCwtMSksbmV3IGUoLTEsMSwwLDEpLG5ldyBlKC0xLDEsMCwtMSksbmV3IGUoLTEsLTEsMCwxKSxuZXcgZSgtMSwtMSwwLC0xKSxuZXcgZSgxLDEsMSwwKSxuZXcgZSgxLDEsLTEsMCksbmV3IGUoMSwtMSwxLDApLG5ldyBlKDEsLTEsLTEsMCksbmV3IGUoLTEsMSwxLDApLG5ldyBlKC0xLDEsLTEsMCksbmV3IGUoLTEsLTEsMSwwKSxuZXcgZSgtMSwtMSwtMSwwKV19LGZ1bmN0aW9uKHQsbixyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKHQsbil7cmV0dXJuIDE9PT1uLmxlbmd0aD90W25bMF1dOnRbblswXStlKHQsbi5zbGljZSgxKSldfWZ1bmN0aW9uIG8odCl7dGhpcy5SPXR9ZnVuY3Rpb24gYyh0KXtmb3IodmFyIG49MDtuPDIqdDtuKyspe3ZhciByPW5ldyBBcnJheSh0KS5maWxsKDApO3JbbiV0XT1uL3Q+PTE/MTotMSxmW25dPW5ldyBvKHIpfX1mdW5jdGlvbiB1KHQsbil7aWYoMT09PW4ubGVuZ3RoKXJldHVybiBPYmplY3QoYS5kKSh0WzBdLHRbMV0sT2JqZWN0KGEuYykoblswXSkpO3ZhciByPXQuc2xpY2UoMCxNYXRoLmZsb29yKHQubGVuZ3RoLzIpKSxlPXQuc2xpY2UoTWF0aC5jZWlsKHQubGVuZ3RoLzIpKTtyZXR1cm4gT2JqZWN0KGEuZCkodShyLG4uc2xpY2UoMCxuLmxlbmd0aC0xKSksdShlLG4uc2xpY2UoMCxuLmxlbmd0aC0xKSksT2JqZWN0KGEuYykobltuLmxlbmd0aC0xXSkpfWZ1bmN0aW9uIGkodCxuLHIsbyl7Zm9yKHZhciBjPVtdLHU9MDt1PDI8PG4tMTt1Kyspe2Zvcih2YXIgaT1yLnNsaWNlKCksYT1vLnNsaWNlKCksZD11LHA9MDtwPG47cCsrKTEmZCYmKGlbcF0rPTEsYVtwXS09MSksZD4+PTE7Y1t1XT1mW2UodCxpKSVmLmxlbmd0aF0uZG90KGEpfXJldHVybiBjfXIuZChuLFwiYVwiLGZ1bmN0aW9uKCl7cmV0dXJuIGZ9KSxuLmI9YyxuLmQ9dSxuLmM9aTt2YXIgYT1yKDEpO28ucHJvdG90eXBlLmRvdD1mdW5jdGlvbih0KXtmb3IodmFyIG49dGhpcyxyPTAsZT0wO2U8dC5sZW5ndGg7ZSsrKXIrPW4uUltlXSp0W2VdO3JldHVybiByfTt2YXIgZj1bXX0sZnVuY3Rpb24odCxuLHIpe1widXNlIHN0cmljdFwiO3ZhciBlPXIoOSk7ci5kKG4sXCJhXCIsZnVuY3Rpb24oKXtyZXR1cm4gZS5hfSk7dmFyIG89cigxMCk7ci5kKG4sXCJiXCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9XSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvdHVtdWx0Lm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9