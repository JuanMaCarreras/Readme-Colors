import express from 'express'
import nodemon from 'nodemon'
import generateSVG from './service/svg.js'
import config from './config.js'
import { isValidHex, normalizeHex } from './utils/color.js'

const app = express()

app.use(express.json())

app.get('/palette', (req, res) => {
  const { c, direction = 'horizontal' } = req.query

  if (!c) {
    return res.status(400).json({
      error: 'Missing colors'
    })
  }

  if (!['horizontal', 'vertical'].includes(direction)) {
    return res.status(400).json({
      error: 'Invalid direction. Use horizontal or vertical'
    })
  }

  const colors = c.split(',')

  if (colors.some(color => color.trim() === '')) {
    return res.status(400).json({
      error: 'Colors cannot be empty'
    })
  }

  if (colors.length > config.palette.maxColors) {
    return res.status(400).json({
      error: `The palette must contain between 1 and ${config.palette.maxColors} colors`
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

  const svg = generateSVG(normalizedColors, direction)

  res.type('image/svg+xml')
  res.send(svg)
})

export default app
