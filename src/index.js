const express = require('express')
const { parse } = require('csv')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const log = require('./log')
const calculateDistance = require('./utils/calculateDistance')

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

const locationsFromCSV = [];

app.get('/', (req, res) => {
  log('searching locations to', req.header('latitude'), req.header('longitude'), req.header('range'))

  const foundedLocations = locationsFromCSV?.reduce((acc, location) => {
    const distance = calculateDistance(
      parseFloat(req.header('latitude')),
      parseFloat(req.header('longitude')),
      location.latitude,
      location.longitude
    )
    return distance < parseFloat(req.header('range')) ? [...acc, {...location, distancia: distance.toFixed(2) }] : acc
  }, [])
  log('found locations', foundedLocations.length)

  const locations = foundedLocations.sort((locationA, locationB) =>
    parseFloat(locationA.distancia) -  parseFloat(locationB.distancia))
  res.json({ locations })
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
  columns: (header) => header.map((label) => label.toLowerCase()),
  cast: (value, context) => {
    if (context.column === 'latitude' || context.column === 'longitude') return parseFloat(value.replace(',', '.'));
    return value;
  },
}, (err, records) => {
  locationsFromCSV.push(...records)
  log('end csv, quantity', locationsFromCSV.length)
  delete content
  startApp()
});
