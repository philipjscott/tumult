var terrapaint = require('terrapaint')
var tumult = require('../tumult')(0)
terrapaint(tumult.perlin2, 512, 512, {
  offset: true
})
