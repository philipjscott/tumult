var terrapaint = require('terrapaint')
var tumult = require('../index')
var noise = tumult(Math.random())
terrapaint(noise.perlin2, 512, 512, {
  offset: true
})
