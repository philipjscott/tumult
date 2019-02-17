'use strict'

function falloff (...args) {
  const dims = args.slice(1)
  const t = args[0] - dims.reduce((sum, val) => {
    return sum + val * val
  }, 0)

  return t * t * t * t
}

function lerp (a, b, t) {
  return a * (1 - t) + b * t
}
function fade (t) {
  return t * t * t * (10 + t * (-15 + t * 6))
}
const cut1 = falloff.bind(null, 1)
const cut = falloff.bind(null, 0.5)

module.exports = {
  lerp,
  fade,
  cut1,
  cut
}
