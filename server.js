const { createServer } = require('http')
const express = require('express')
const { parse } = require('url')
const next = require('next')
const { calculateCurrentPoint } = require('./api/slack')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.get('/api/slackSharingPoint', async (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    let data = await calculateCurrentPoint(query.oldest, query.latest)
    res.send(JSON.stringify(data))
  })
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port = 3000, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
  // createServer(async (req, res) => {
  //   // Be sure to pass `true` as the second argument to `url.parse`.
  //   // This tells it to parse the query portion of the URL.
  //   const parsedUrl = parse(req.url, true)
  //   const { pathname, query } = parsedUrl

  //   if (pathname === '/api/slackSharingPoint') {
  //     let data = await calculateCurrentPoint(query.oldest, query.latest)
  //     res.send(JSON.stringify(data))
  //   } else {
  //     handle(req, res, parsedUrl)
  //   }
  // }).listen(3000, (err) => {
  //   if (err) throw err
  //   console.log('> Ready on http://localhost:3000')
  // })
})