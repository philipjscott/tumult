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
