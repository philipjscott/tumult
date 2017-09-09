import terrapaint from 'terrapaint'
import { Simplex2 } from '../src/index'

var seed = Math.random()
var simplex = new Simplex2(seed)

;(function init() {
  var map = terrapaint.map(simplex.gen, {
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
  var transformFn = (new Function('x', 'y', fnBody)).bind(simplex)

  var transformedNoise = simplex.transform(function(x, y) {
    return transformFn(x, y)
  })
  var map = terrapaint.map(transformedNoise, {
    offset: true,
    period: 1,
    thisArg: simplex
  })
  map.draw('#noise-canvas')
})

function $ (selector) {
  return document.querySelector(selector)
}
