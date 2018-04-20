export function stringify (obj) {
  if (!obj) {
    return ''
  }

  return Object.keys(obj).reduce((result, key) => {
    key = encodeURIComponent(key)

    let value = obj[key]

    if (value !== undefined) {
      if (Array.isArray(value)) {
        return result.concat(value.map((value) => `${key}=${encodeURIComponent(value)}`))
      }

      if (!value || typeof value === 'object') {
        value = ''
      } else {
        value = encodeURIComponent(value)
      }

      result.push(`${key}=${value}`)
    }

    return result
  }, []).join('&')
}

export function parse (str) {
  if (!str) {
    return {}
  }

  return str.replace(/\+/g, ' ').split('&').reduce((result, str) => {
    const arr = str.split('=')

    if (arr.length === 1) {
      return
    }

    const [key, val] = arr.map(decodeURIComponent)

    // if there are multiple values per key, concatenate
    result[key] = key in result ? [].concat(result[key], val) : val

    return result
  }, {})
}

export default { parse, stringify }
