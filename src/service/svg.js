import config from '../config.js'

const generateSVG = (colors, direction = 'horizontal') => {
  let width = config.palette.width
  let height = config.palette.height

  if (direction === 'vertical') {
    ;[width, height] = [height, width]
  }

  const colorSize =
    direction === 'horizontal' ? width / colors.length : height / colors.length

  const rects = colors
    .map((color, index) => {
      if (direction === 'horizontal') {
        return `
          <rect
            x="${index * colorSize}"
            y="0"
            width="${colorSize}"
            height="${height}"
            fill="#${color}"
          />
        `
      }

      return `
        <rect
          x="0"
          y="${index * colorSize}"
          width="${width}"
          height="${colorSize}"
          fill="#${color}"
        />
      `
    })
    .join('')

  return `
    <svg
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Color palette"
    >
      ${rects}
    </svg>
  `
}

export default generateSVG
