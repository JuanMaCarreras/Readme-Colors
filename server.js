import express from 'express'

const app = express()

const PORT = 3000

const isValidHex = color => {
  return /^#?[0-9A-Fa-f]{6}$/.test(color)
}

const generateSVG = colors => {
  const width = 100
  const height = 100

  const rects = colors
    .map((color, index) => {
      return `
        <rect
          x="${index * width}"
          width="${width}"
          height="${height}"
          fill="#${color.replace('#', '')}"
        />
      `
    })
    .join('')

  return `
    <svg
      width="${colors.length * width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${rects}
    </svg>
  `
}

app.get('/', (req, res) => {
  res.send('Color Icons API')
})

app.get('/palette', (req, res) => {
  const { c } = req.query

  if (!c) {
    return res.status(400).json({
      error: 'Missing colors'
    })
  }

  const colors = c.split(',')

  const invalidColors = colors.filter(color => !isValidHex(color))

  if (invalidColors.length > 0) {
    return res.status(400).json({
      error: 'Invalid HEX color',
      colors: invalidColors
    })
  }
  const svg = generateSVG(colors)

  res.type('image/svg+xml')
  res.send(svg)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
