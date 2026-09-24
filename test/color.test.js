import { isValidHex, normalizeHex } from '../src/utils/color.js'

describe('isValidHex', () => {
  test('accepts a valid HEX color', () => {
    expect(isValidHex('FF0000')).toBe(true)
  })

  test('accepts lowercase HEX', () => {
    expect(isValidHex('ff0000')).toBe(true)
  })

  test('accepts HEX with #', () => {
    expect(isValidHex('#FF0000')).toBe(true)
  })

  test('rejects HEX with less than 6 characters', () => {
    expect(isValidHex('FFF')).toBe(false)
  })

  test('rejects HEX with more than 6 characters', () => {
    expect(isValidHex('FFFFFF00')).toBe(false)
  })

  test('rejects invalid characters', () => {
    expect(isValidHex('GGGGGG')).toBe(false)
  })
})

describe('normalizeHex', () => {
  test('removes #', () => {
    expect(normalizeHex('#ff0000')).toBe('FF0000')
  })

  test('converts lowercase to uppercase', () => {
    expect(normalizeHex('ff0000')).toBe('FF0000')
  })

  test('normalizes a HEX color', () => {
    expect(normalizeHex('#d4d4d4')).toBe('D4D4D4')
  })
})
