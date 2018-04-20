/* All these tests have been source from
 * https://github.com/ljharb/qs/blob/master/test/stringify.js
 */
'use strict'

const test = require('tape')
const qs = require('../cjs')

test('stringify()', function (t) {
  t.test('stringifies a querystring object', function (st) {
    st.equal(qs.stringify({ a: 'b' }), 'a=b')
    st.equal(qs.stringify({ a: 1 }), 'a=1')
    st.equal(qs.stringify({ a: 1, b: 2 }), 'a=1&b=2')
    st.equal(qs.stringify({ a: 'A_Z' }), 'a=A_Z')
    st.equal(qs.stringify({ a: '€' }), 'a=%E2%82%AC')
    st.equal(qs.stringify({ a: '' }), 'a=%EE%80%80')
    st.equal(qs.stringify({ a: 'א' }), 'a=%D7%90')
    st.equal(qs.stringify({ a: '𐐷' }), 'a=%F0%90%90%B7')
    st.end()
  })

  t.test('stringifies an empty value', function (st) {
    st.equal(qs.stringify({ a: '' }), 'a=')
    // st.equal(qs.stringify({ a: null }, { strictNullHandling: true }), 'a')

    st.equal(qs.stringify({ a: '', b: '' }), 'a=&b=')
    // st.equal(qs.stringify({ a: null, b: '' }, { strictNullHandling: true }), 'a&b=')

    // st.equal(qs.stringify({ a: { b: '' } }), 'a%5Bb%5D=')
    // st.equal(qs.stringify({ a: { b: null } }, { strictNullHandling: true }), 'a%5Bb%5D')
    // st.equal(qs.stringify({ a: { b: null } }, { strictNullHandling: false }), 'a%5Bb%5D=')

    st.end()
  })

  t.test('stringifies an empty object', function (st) {
    var obj = Object.create(null)
    obj.a = 'b'
    st.equal(qs.stringify(obj), 'a=b')
    st.end()
  })

  t.test('returns an empty string for invalid input', function (st) {
    st.equal(qs.stringify(undefined), '')
    st.equal(qs.stringify(false), '')
    st.equal(qs.stringify(null), '')
    st.equal(qs.stringify(''), '')
    st.end()
  })

  t.test('drops keys with a value of undefined', function (st) {
    st.equal(qs.stringify({ a: undefined }), '')

    st.end()
  })

  t.test('url encodes values', function (st) {
    st.equal(qs.stringify({ a: 'b c' }), 'a=b%20c')
    st.end()
  })

  t.test('stringifies a date', function (st) {
    var now = new Date()
    var str = 'a=' + encodeURIComponent(now.toISOString())
    st.equal(qs.stringify({ a: now }), str)
    st.end()
  })

  // t.test('stringifies the weird object from qs', function (st) {
  //   st.equal(qs.stringify({ 'my weird field': '~q1!2"\'w$5&7/z8)?' }), 'my%20weird%20field=~q1%212%22%27w%245%267%2Fz8%29%3F')
  //   st.end()
  // })

  t.test('skips properties that are part of the object prototype', function (st) {
    /* eslint-disable-next-line no-extend-native */
    Object.prototype.crash = 'test'
    st.equal(qs.stringify({ a: 'b' }), 'a=b')
    delete Object.prototype.crash
    st.end()
  })

  t.test('stringifies boolean values', function (st) {
    st.equal(qs.stringify({ a: true }), 'a=true')
    st.equal(qs.stringify({ b: false }), 'b=false')
    st.end()
  })
})
