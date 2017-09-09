function falloff (...args) {
  var dims = args.slice(1)
  const t = args[0] - dims.reduce((sum, val) => {
    return sum + val * val
  }, 0)
  return t * t * t * t 
}

export function lerp (a, b, t) {
  return a * (1 - t) + b * t
}
export function fade (t) {
  return t * t * t * (10 + t * (-15 + t * 6))
}
export var cut1 = falloff.bind(null, 1)
export var cut = falloff.bind(null, 0.5)

