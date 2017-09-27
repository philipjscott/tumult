var tumult = require('../dist/tumult.min')

var simplex2 = new tumult.Simplex2('seed')

for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    console.log(simplex2.gen(i/4,j/4))
  }
}
