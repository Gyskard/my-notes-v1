const fs = require('fs')
const shell = require('shelljs')
const dirTree = require("directory-tree")
const express = require('express')
const app = express()

const managerFile = 'manager.json'

// ------------ FUNCTIONS ------------//

const updateManagerFile = (data) => fs.writeFileSync(managerFile, JSON.stringify(data))
const checkIfNotDesynchronisation = (manager) => {
  const dataDir = dirTree("./data", { extensions: /\.md/ });
  if(manager.note.length > 0) {
    for (const note in manager.note) {
      console.log(manager.note[note])
    }
  }
  else if (dataDir.children.length > 0) return false
  return true
}

// ------------ MANAGER ------------//

if(!fs.existsSync(managerFile)) updateManagerFile({ "number_increment": 0, "note": {} })
if(!fs.existsSync('data/')) shell.mkdir('data/')

const manager = JSON.parse(fs.readFileSync(managerFile))

if (!checkIfNotDesynchronisation(manager)) throw('data desynchronisation')

// ------------ SERVER ------------//

const port = 3000
app.listen(port, () => console.log(`Server running at port ${port} !`))

// ------------ ENDPOINT ------------//

app.param('id', function (req, res, next, id) {
  const note = manager.note[req.params.id]
  if (isNaN(parseInt(id, 10))) res.status(400).send('parameter must be a number')
  else if (note === undefined) res.status(404).send('note not found')
  else next()
})

app.get('/:id', function (req, res) {
  const note = manager.note[req.params.id]
  res.json(note)
})

app.patch('/:id', function (req, res) {
  const title = req.query.title;
  if (title === undefined) res.status(400).send('query parameter title is missing')
  else if (title.replace(' ', '').length === 0) res.status(400).send('query parameter title is empty')
  else {
    manager.note[req.params.id] = title
    updateManagerFile(manager)
    res.status(200).send('ok')
  }
})

app.delete('/:id', function (req, res) {
  delete manager.note[req.params.id]
  updateManagerFile(manager)
  res.status(200).send('ok')
})

app.put('/', function (req, res) {
  const title = req.query.title;
  if (title === undefined) res.status(400).send('query parameter title is missing')
  else if (title.replace(' ', '').length === 0) res.status(400).send('query parameter title is empty')
  else {
    const numberIncrement = manager.number_increment + 1
    manager.number_increment = numberIncrement
    manager.note[numberIncrement] = title
    updateManagerFile(manager)
    res.status(200).send(String(numberIncrement))
  }
})