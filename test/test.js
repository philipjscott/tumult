'use strict'

const test = require('ava')
const tumult = require('../')

function loopcall (depth, iters, fn, memo = null) {
  if (memo === null) {
    memo = new Array(depth).fill(0)
  }

  for (let i = 0; i < iters; i++) {
    if (depth <= 1) {
      fn(memo)
    } else {
      loopcall(depth - 1, iters, fn, memo)
    }

    memo[depth - 1] += 1
  }

  memo[depth - 1] = 0
}

function rangeMacro (t, fn) {
  // iters will significantly affect performance
  const iters = 5
  const constructors = [
    { name: 'Simplex1', d: 1 },
    { name: 'Simplex2', d: 2 },
    { name: 'Perlin1', d: 1 },
    { name: 'Perlin2', d: 2 },
    { name: 'Perlin3', d: 3 },
    { name: 'Perlin4', d: 4 },
    { name: 'PerlinN', d: 5 }
  ]

  constructors.forEach(ctor => {
    const n = new tumult[ctor.name]()

    loopcall(ctor.d, iters, args => {
      const val = fn(n, args)

      if (!Number.isFinite(val) || val > 1 || val < -1) {
        t.fail(`Invalid noise value [${val}]`)
      }
    })
  })

  t.pass()
}

test('returns value within [-1, 1] for all noise types', rangeMacro,
  (n, args) => n.gen(...args.map(x => x / 128)))

test('returns value within [-1, 1] for all noise types with integer input', rangeMacro,
  (n, args) => n.gen(...args))

test('returns value within [-1, 1] for fractal noise', rangeMacro,
  (n, args) => n.octavate(5, ...args))

test('returns value within [-1, 1] for fractal noise with integer input', rangeMacro,
  (n, args) => n.octavate(5, ...args))

test('noise generators with same seed are equal', t => {
  const seed = 'hello'
  const a = new tumult.Simplex1(seed)
  const b = new tumult.Simplex1(seed)

  for (let i = 0; i < 256; i++) {
    const av = a.gen(i / 256)
    const bv = b.gen(i / 256)

    if (Math.abs(av - bv) >= Number.EPSILON) {
      t.fail()
    }
  }

  t.pass()
})

// Note: transform is deprecated; wrap your noise function in another function
test('transform works (I really don\'t know why I added that function...)', t => {
  const simplex = new tumult.Simplex1()
  const transform = simplex.transform(function (x, y) {
    return Math.sin(1 / this.gen(x, y))
  })

  for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 256; j++) {
      const val = transform(i / 256, j / 256)

      if (val > 1 || val < -1) {
        t.fail()
      }
    }
  }

  t.pass()
})
