/* global alert */

'use strict'

import terrapaint from 'terrapaint'
import { Simplex2 } from '../'

const seed = Math.random()
const simplex = new Simplex2(seed)

;(function () {
  const map = terrapaint.map(simplex.gen, {
    offset: true,
    period: 64,
    thisArg: simplex
  })
  map.draw('#noise-canvas')
})()

$('#gen-noise').addEventListener('click', function () {
  const evalStr = $('#eval-str').value
  const fnBody = `
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

  let transformFn

  try {
    transformFn = (new Function('x', 'y', fnBody)).bind(simplex)
  } catch (e) {
    alert(`
      Something is wrong with the syntax of your function.
      Please ensure all the parentheses are closed and that you're
      using the correct functions and variable names.
    `)

    return
  }

  const transformedNoise = simplex.transform(function (x, y) {
    try {
      return transformFn(x, y)
    } catch (e) {
      alert(`
        Your function created a run-time error. Please ensure
        the period of the noise function is greater than one
        (ie. divide x and y by a value, like 4 or 16, before
        passing it to n()).
      `)
      throw new Error('Runtime error')
    }
  })
  const map = terrapaint.map(transformedNoise, {
    offset: true,
    period: 1,
    thisArg: simplex
  })
  map.draw('#noise-canvas')
})

function $ (selector) {
  return document.querySelector(selector)
}
