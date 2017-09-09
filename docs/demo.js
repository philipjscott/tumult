import terrapaint from 'terrapaint'
import { Simplex2 } from '../src/index'

var seed = Math.random()
var simplex = new Simplex2(seed)

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
  var map = terrapaint.map(transformedNoise, {
    offset: true,
    period: 1
  })
  map.draw('#noise-canvas')
})

function $ (selector) {
  return document.querySelector(selector)
}
