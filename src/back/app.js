const fs = require('fs')
const shell = require('shelljs')
const dirTree = require('directory-tree')
const express = require('express')
const cors = require('cors')
const app = express();
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const managerFilePath = 'manager.json'
const dataFolderPath = 'data/'

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

const changeNoteTitleInManager = (manager, id, title) => {
  for (let i = 0; i < manager.note.length; i++) if (parseInt(manager.note[i].number) === parseInt(id)) manager.note[i].title = title
  return manager
}

const deleteNoteInManager = (manager, id) => {
  for (let i = 0; i < manager.note.length; i++) if (parseInt(manager.note[i].number) === parseInt(id)) manager.note.splice(i, 1)
  return manager
}

// ------------ MANAGER ------------//

if (!fs.existsSync(managerFilePath)) updateManagerFile({ number_increment: 0, note: [] })
if (!fs.existsSync(dataFolderPath)) shell.mkdir(dataFolderPath)

if (!checkIfNotDesynchronisation(dataFolderPath, managerFilePath)) console.log('data desynchronisation')

// ------------ SERVER ------------//

app.use(fileUpload({
  createParentPath: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.listen(port, () => console.log(`Server running at port ${port} !`))

// ------------ ENDPOINT ------------//

app.param('id', function (req, res, next, id) {
  if (isNaN(parseInt(id, 10))) res.status(400).send('parameter must be a number')
  else if (!fs.existsSync(`${dataFolderPath}/${id}.md`)) res.status(404).send('note not found')
  else next()
})

app.get('/note/:id', (req, res) => {
  const id = req.params.id
  console.log(`get /note for ${id}.md`)
  res.download(`${dataFolderPath}/${id}.md`)
})

app.get('/note/title/:id', (req, res) => {
  const id = req.params.id
  const manager = JSON.parse(fs.readFileSync(managerFilePath))
  let title = ''
  for (let i = 0; i < manager.note.length; i++) {
    if (parseInt(manager.note[i].number, 10) === parseInt(id, 10)) title = manager.note[i].title
  }
  res.send(title)
  console.log(`get title for ${id}.md`)
});

app.get('/list', (req, res) => {
  const manager = JSON.parse(fs.readFileSync(managerFilePath))
  res.json(manager.note)
  console.log('get /note/list')
})

app.put('/note', async (req, res) => {
  console.log('put /note')
  if (!req.files) res.status(400).send('no file')
  else {
    console.log(req.files)
    const file = req.files['file']
    if (file.length > 1) res.status(400).send('multiple files')
    else {
      const name = req.files['file'].name
      if (name.substring(name.length - 3, name.length) !== '.md') res.status(400).send('not md file')
      else {
        const title = req.query.title
        if (file.size === 0) res.status(400).send('empty file')
        else if (!title) res.status(400).send('no title')
        else {
          const manager = JSON.parse(fs.readFileSync(managerFilePath))
          const numberIncrement = manager.number_increment + 1
          if (fs.existsSync(`${dataFolderPath}${numberIncrement}.md`)) res.status(500).send('file already exists')
          else {
            file.mv(`${dataFolderPath}${numberIncrement}.md`, function(err) {
              if (!err) {
                manager.number_increment = numberIncrement
                manager.note.push({ number: numberIncrement, title: title })
                updateManagerFile(manager)
                console.log(`file ${numberIncrement}.md has been created`)
                res.status(200).send(String(numberIncrement))
              } else res.status(500).send(`file ${numberIncrement}.md has not been created`)
            })

          }
        }
      }
    }
  }
})

app.delete('/note/:id', function (req, res) {
  const id = req.params.id
  const file = `${dataFolderPath}${id}.md`
  console.log(`delete /note for ${file}`)
  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
    if (!fs.existsSync(file)) {
      let manager = JSON.parse(fs.readFileSync(managerFilePath))
      manager = deleteNoteInManager(manager, id)
      updateManagerFile(manager)
      console.log(`file ${id}.md has been deleted`)
      res.status(200).send('ok')
    } else res.status(500).send(`${file} file has not been deleted`)
  } else res.status(500).send(`${file} file not found`)
})

app.patch('/note/:id', function (req, res) {
  console.log('patch /note')
  if (!req.files) res.status(400).send('no file')
  else {
    const id = req.params.id
    const file = req.files['file']
    if (file.length > 1) res.status(400).send('multiple files')
    else {
      const name = req.files['file'].name
      if (name.substring(name.length - 3, name.length) !== '.md') res.status(400).send('not md file')
      else {
        const title = req.query.title
        if (file.size === 0) res.status(400).send('empty file')
        else if (!title) res.status(400).send('no title')
        else {
          const filePath = `${dataFolderPath}${id}.md`
          fs.unlinkSync(filePath)
          if (!fs.existsSync(filePath)) {
            file.mv(filePath, function() {
              if (fs.existsSync(filePath)) {
                let manager = JSON.parse(fs.readFileSync(managerFilePath))
                manager = changeNoteTitleInManager(manager, id, title)
                updateManagerFile(manager)
                console.log(`file ${id}.md has been updated`)
                res.status(200).send('ok')
              } else res.status(500).send(`file ${id}.md has not been updated`)
            })
          } else res.status(500).send(`file ${id}.md has not been deleted`)
        }
      }
    }
  }
})

module.exports.checkIfNotDesynchronisation = checkIfNotDesynchronisation
module.exports.changeNoteTitleInManager = changeNoteTitleInManager
module.exports.deleteNoteInManager = deleteNoteInManager
