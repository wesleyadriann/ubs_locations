const express = require('express')
const { parse } = require('csv')
const path = require('path')
const fs = require('fs')

const log = require('./log')

const app = express()
const port = 3000
app.use(express.json())


const locationsFromCSV = [];

app.get('/', (req, res) => {
  // req.header('latitude'),  req.header('longitude'),  req.header('range'))

  res.json({ locations: locationsFromCSV })
})

const startApp = () => {
  app.listen(port, () => {
    log(`app listening at http://localhost:${port}`)
  })
}

const content = fs.readFileSync(path.join(__dirname, 'data', 'cadastro_estabelecimentos_cnes.csv'));
log('start csv')
parse(content,{
  delimiter: ';',
  comment: '#',
  columns: true
}, (err, records) => {
  locationsFromCSV.push(...records)
  log('end csv, quantity', locationsFromCSV.length)
  delete content
  startApp()
});
