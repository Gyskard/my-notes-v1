const fs = require('fs')
const shell = require('shelljs')
const dirTree = require('directory-tree')
const express = require('express')
const app = express()

const managerFilePath = 'manager.json'

// ------------ FUNCTIONS ------------//

const updateManagerFile = (data) => fs.writeFileSync(managerFilePath, JSON.stringify(data))

const checkIfNotDesynchronisation = (dataPath, managerPath) => {
  if (!fs.existsSync(dataPath)) {
    console.log('data folder not found')
    return false
  } else if (!fs.existsSync(managerPath)) {
    console.log('manager file not found')
    return false
  } else {
    const dataDir = dirTree(dataPath, { extensions: /\.md/ })
    const manager = JSON.parse(fs.readFileSync(managerPath))
    if (dataDir.children.length !== manager.note.length) {
      console.log('incorrect number of files between data folder and manager file')
      return false
    } else {
      let everyFilesExist = true
      for (let i = 0; i < manager.note.length; i++) {
        const number = manager.note[i].number
        if (!fs.existsSync(`${dataPath}/${number}.md`)) everyFilesExist = false
      }
      if (!everyFilesExist) console.log("files specified in manager file doesn't exist")
      return everyFilesExist
    }
  }
}

// ------------ MANAGER ------------//

if (!fs.existsSync(managerFilePath)) updateManagerFile({ number_increment: 1, note: [] })
if (!fs.existsSync('data/')) shell.mkdir('data/')

if (!checkIfNotDesynchronisation('data/', managerFilePath)) console.log('data desynchronisation')

const manager = JSON.parse(fs.readFileSync(managerFilePath))

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
  const title = req.query.title
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
  const title = req.query.title
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

module.exports.checkIfNotDesynchronisation = checkIfNotDesynchronisation
