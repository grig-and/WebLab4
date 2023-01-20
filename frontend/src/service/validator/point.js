const regularExpression = /^[+-]?\d+(\.\d+)?$/

export function isXValid(x) {
  return (x != null)
}

export function isYValid(y) {
  let yVal = toFloat(y)
  return (yVal != null && yVal >= -3 && yVal <= 5)
}

export function isRValid(r) {
  return (r != null && r > 0 && r <= 5)
}

export function toFloat(val) {
  if (val == null || val.trim() === '') return null

  let float = val.trim().replace(',', '.')

  if (regularExpression.test(float)) {
    return parseFloat(float)
  }
  return null
}
