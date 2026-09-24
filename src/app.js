import express from 'express'
import generateSVG from './service/svg.js'
import { isValidHex, normalizeHex } from './utils/color.js'

const app = express()

app.get('/palette', (req, res) => {
  const { c } = req.query

  if (!c) {
    return res.status(400).json({
      error: 'Missing colors'
    })
  }

  const colors = c.split(',')

  if (colors.some(color => color.trim() === '')) {
    return res.status(400).json({
      error: 'Colors cannot be empty'
    })
  }

  if (colors.length > 12) {
    return res.status(400).json({
      error: 'The palette must contain between 1 and 12 colors'
    })
  }

  const invalidColors = colors.filter(color => !isValidHex(color))

  if (invalidColors.length > 0) {
    return res.status(400).json({
      error: 'Invalid HEX color',
      colors: invalidColors
    })
  }

  const normalizedColors = colors.map(normalizeHex)

  const svg = generateSVG(normalizedColors)

  res.type('image/svg+xml')
  res.send(svg)
})

export default app
