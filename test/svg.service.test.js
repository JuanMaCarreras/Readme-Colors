import generateSVG from '../src/service/svg.js'

describe('generateSVG', () => {
  test('generates a valid SVG', () => {
    const svg = generateSVG(['FF0000', '00FF00'])

    expect(svg).toContain('<svg')
    expect(svg).toContain('width="400"')
    expect(svg).toContain('height="80"')
    expect(svg).toContain('viewBox="0 0 400 80"')
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
  })

  test('generates one rectangle per color', () => {
    const svg = generateSVG(['FF0000', '00FF00', '0000FF'])

    const rectangles = svg.match(/<rect/g)

    expect(rectangles).toHaveLength(3)
  })

  test('uses the provided colors', () => {
    const svg = generateSVG(['050505', 'FFFFFF'])

    expect(svg).toContain('fill="#050505"')
    expect(svg).toContain('fill="#FFFFFF"')
  })
})
