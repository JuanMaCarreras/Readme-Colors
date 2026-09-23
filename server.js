import express from 'express'

const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello, Colors!')
})

app.get('/palette', (req, res) => {
  const colors = req.query.c

  res.json({
    colors
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
