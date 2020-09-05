const fs = require('fs')
const express = require('express')
const app = express()

const manager = JSON.parse(fs.readFileSync('manager.json'))

// ------------ SERVER ------------//

const port = 3000

app.listen(port, () => console.log(`Server running at port ${port} !`))

// ------------ ENDPOINT ------------//

app.param('id', function (req, res, next, id) {
  if (!isNaN(parseInt(id, 10))) next()
  else res.status(400).send('parameter must be a number')
})

app.get('/:id', function (req, res) {
  const id = req.params.id
  if (manager[id] !== undefined) {
    res.send('test')
  } else {
    res.status(404).send('note not found')
  }
})
