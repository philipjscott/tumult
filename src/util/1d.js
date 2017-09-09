function Vec1 (x) {
  this.x = x
}
Vec1.prototype.dot = function (x) {
  return this.x * x
}
var g1 = [ new Vec1(1), new Vec1(-1) ]

export function grad1 (p, x) {
  var hash = p[x] % g1.length
  return g1[hash]
}


