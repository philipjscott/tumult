var terrapaint = require('terrapaint')
var tumult = require('../index')
var noise = tumult(Math.random())
terrapaint(noise.perlinN, 512, 512, {
  offset: true
})
