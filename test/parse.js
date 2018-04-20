/* All these tests have been source from
 * https://github.com/ljharb/qs/blob/master/test/parse.js
 */
'use strict'

const test = require('tape')

const qs = require('../cjs')

test('parse()', function (t) {
  t.test('parses a simple string', function (st) {
    st.deepEqual(qs.parse('0=foo'), { '0': 'foo' })
    st.deepEqual(qs.parse('foo=c++'), { foo: 'c  ' })
    // st.deepEqual(qs.parse('foo', { strictNullHandling: true }), { foo: null })
    // st.deepEqual(qs.parse('foo'), { foo: '' })
    // st.deepEqual(qs.parse('foo='), { foo: '' })
    // st.deepEqual(qs.parse('foo=bar'), { foo: 'bar' })
    // st.deepEqual(qs.parse(' foo = bar = baz '), { ' foo ': ' bar = baz ' })
    // st.deepEqual(qs.parse('foo=bar=baz'), { foo: 'bar=baz' })
    st.deepEqual(qs.parse('foo=bar&bar=baz'), { foo: 'bar', bar: 'baz' })
    st.deepEqual(qs.parse('foo2=bar2&baz2='), { foo2: 'bar2', baz2: '' })
    // st.deepEqual(qs.parse('foo=bar&baz', { strictNullHandling: true }), { foo: 'bar', baz: null })
    st.deepEqual(qs.parse('foo=bar&baz'), { foo: 'bar', baz: '' })
    st.deepEqual(qs.parse('cht=p3&chd=t:60,40&chs=250x100&chl=Hello|World'), {
      cht: 'p3',
      chd: 't:60,40',
      chs: '250x100',
      chl: 'Hello|World',
    })
    st.end()
  })

  t.test('supports encoded = signs', function (st) {
    st.deepEqual(qs.parse('he%3Dllo=th%3Dere'), { 'he=llo': 'th=ere' })
    st.end()
  })

  t.test('is ok with url encoded strings', function (st) {
    st.deepEqual(qs.parse('a=b%20c'), { a: 'b c' })
    st.end()
  })

  t.test('allows brackets in the value', function (st) {
    st.deepEqual(qs.parse('pets=["tobi"]'), { pets: '["tobi"]' })
    // st.deepEqual(qs.parse('operators=[">=", "<="]'), { operators: '[">=", "<="]' })
    st.end()
  })

  t.test('allows empty values', function (st) {
    st.deepEqual(qs.parse(''), {})
    st.deepEqual(qs.parse(null), {})
    st.deepEqual(qs.parse(undefined), {})
    st.end()
  })
})
