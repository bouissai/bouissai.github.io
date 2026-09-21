import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildScrollVideoStops,
  interpolateVideoTime,
} from '../src/components/background/scrollVideoTimeline.ts'

const stops = [
  { scrollY: 0, time: 0 },
  { scrollY: 1000, time: 1 },
  { scrollY: 2000, time: 3 },
  { scrollY: 3000, time: 4 },
  { scrollY: 4000, time: 6 },
  { scrollY: 5000, time: 8 },
]

test('interpolates the video time between two section anchors', () => {
  assert.equal(interpolateVideoTime(1500, stops), 2)
})

test('clamps the video time before the first and after the last anchor', () => {
  assert.equal(interpolateVideoTime(-100, stops), 0)
  assert.equal(interpolateVideoTime(6000, stops), 8)
})

test('returns the exact time assigned to a section anchor', () => {
  assert.equal(interpolateVideoTime(3000, stops), 4)
})

test('maps every portfolio section and freezes contact on the final frame', () => {
  const timeline = buildScrollVideoStops(
    {
      home: 0,
      about: 900,
      projects: 1900,
      experience: 3100,
      skills: 4400,
      contact: 5400,
    },
    8,
  )

  assert.deepEqual(timeline, [
    { scrollY: 0, time: 0 },
    { scrollY: 900, time: 1 },
    { scrollY: 1900, time: 3 },
    { scrollY: 3100, time: 4 },
    { scrollY: 4400, time: 6 },
    { scrollY: 5400, time: 8 },
  ])
})
