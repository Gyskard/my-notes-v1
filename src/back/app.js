const fs = require('fs')
const shell = require('shelljs')
const dirTree = require('directory-tree')
const express = require('express')
const app = express()
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

const deleteNoteInManager = (manager, id) => {
  for (let i = 0; i < manager.note.length; i++) if (parseInt(manager.note[i].number) == id) manager.note.splice(i, 1)
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

app.listen(port, () => console.log(`Server running at port ${port} !`))

// ------------ ENDPOINT ------------//

app.param('id', function (req, res, next, id) {
  if (isNaN(parseInt(id, 10))) res.status(400).send('parameter must be a number')
  else if (!fs.existsSync(`${dataFolderPath}/${req.params.id}.md`)) res.status(404).send('note not found')
  else next()
})

app.get('/note/:id', (req, res) => {
  console.log(`get /note for ${req.params.id}.md`)
  res.download(`${dataFolderPath}/${req.params.id}.md`)
})

app.put('/note', async (req, res) => {
  console.log('put /note')
  if (!req.files) res.status(400).send('no file')
  else {
    const file = req.files['']
    if (file.length > 1) res.status(400).send('multiple files')
    else {
      const name = req.files[''].name
      if (name.substring(name.length - 3, name.length) !== '.md') res.status(400).send('not md file')
      else {
        const title = req.headers.title
        if (file.size === 0) res.status(400).send('empty file')
        else if (!title) res.status(400).send('no title')
        else {
          const manager = JSON.parse(fs.readFileSync(managerFilePath))
          const numberIncrement = manager.number_increment + 1
          if (fs.existsSync(`${dataFolderPath}${numberIncrement}.md`)) res.status(500).send('file already exists')
          else {
            file.mv(`${dataFolderPath}${numberIncrement}.md`, (err) => {
              if (err) res.status(500).send(`impossible to save file : ${err}`)
              else {
                manager.number_increment = numberIncrement
                manager.note.push({ number: numberIncrement, title: title })
                updateManagerFile(manager)
                console.log(`file ${numberIncrement}.md has been created`)
                res.status(200).send(String(numberIncrement))
              }
            })
          }
        }
      }
    }
  }
})

app.delete('/note/:id', function (req, res) {
  const file = `${dataFolderPath}${req.params.id}.md`;
  console.log(`delete /note for ${file}`)
  if (fs.existsSync(file)) {
    fs.unlinkSync(file, (err) => {
      if(err) {
        res.status(500).send(`impossible to delete ${file} file : ${err}`)
        return false
      }
    });
    if (!fs.existsSync(file)) {
      let manager = JSON.parse(fs.readFileSync(managerFilePath))
      manager = deleteNoteInManager(manager, req.params.id) 
      updateManagerFile(manager)
      res.status(200).send('ok')
    } else res.status(500).send(`${file} file has not been deleted`)
  } else res.status(500).send(`${file} file not found`)
})

/*

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



*/

module.exports.checkIfNotDesynchronisation = checkIfNotDesynchronisation
module.exports.deleteNoteInManager = deleteNoteInManager