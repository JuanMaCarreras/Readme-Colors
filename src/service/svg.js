const generateSVG = colors => {
  const width = 400
  const height = 80
  const colorWidth = width / colors.length

  const rects = colors
    .map((color, index) => {
      return `
        <rect
          x="${index * colorWidth}"
          width="${colorWidth}"
          height="${height}"
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
