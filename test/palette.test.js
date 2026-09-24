import request from 'supertest'
import app from '../src/app.js'

describe('GET /palette', () => {
  test('returns an SVG for valid colors', async () => {
    const response = await request(app)
      .get('/palette')
      .query({ c: 'ff0000,00ff00,0000ff' })
      .buffer(true)
      .parse((res, callback) => {
        let data = ''

        res.setEncoding('utf8')

        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          callback(null, data)
        })
      })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toMatch(/image\/svg\+xml/)
    expect(response.body).toContain('<svg')
    expect(response.body).toContain('#FF0000')
    expect(response.body).toContain('#00FF00')
    expect(response.body).toContain('#0000FF')
  })

  test('returns 400 when colors are missing', async () => {
    const response = await request(app).get('/palette')

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      error: 'Missing colors'
    })
  })

  test('rejects invalid HEX colors', async () => {
    const response = await request(app)
      .get('/palette')
      .query({ c: 'ff0000,rojo,0000ff' })

    expect(response.statusCode).toBe(400)

    expect(response.body).toEqual({
      error: 'Invalid HEX color',
      colors: ['rojo']
    })
  })

  test('rejects empty colors', async () => {
    const response = await request(app)
      .get('/palette')
      .query({ c: 'ff0000,,0000ff' })

    expect(response.statusCode).toBe(400)

    expect(response.body).toEqual({
      error: 'Colors cannot be empty'
    })
  })

  test('rejects more than 12 colors', async () => {
    const colors = Array(13).fill('ffffff').join(',')

    const response = await request(app).get('/palette').query({ c: colors })

    expect(response.statusCode).toBe(400)

    expect(response.body).toEqual({
      error: 'The palette must contain between 1 and 12 colors'
    })
  })

  test('accepts exactly 12 colors', async () => {
    const colors = Array(12).fill('ffffff').join(',')

    const response = await request(app).get('/palette').query({ c: colors })

    expect(response.statusCode).toBe(200)
  })
})
