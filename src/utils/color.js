export const isValidHex = color => {
  return /^#?[0-9A-Fa-f]{6}$/.test(color)
}

export const normalizeHex = color => {
  return color.replace('#', '').toUpperCase()
}
