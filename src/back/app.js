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

// ------------ MANAGER ------------//

if (!fs.existsSync(managerFilePath)) updateManagerFile({ number_increment: 0, note: [] })
if (!fs.existsSync(dataFolderPath)) shell.mkdir(dataFolderPath)

if (!checkIfNotDesynchronisation(dataFolderPath, managerFilePath)) console.log('data desynchronisation')

const manager = JSON.parse(fs.readFileSync(managerFilePath))

// ------------ SERVER ------------//

app.use(fileUpload({
  createParentPath: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`Server running at port ${port} !`))

// ------------ ENDPOINT ------------//

app.param('id', function (req, res, next, id) {
  if (isNaN(parseInt(id, 10))) res.status(400).send('parameter must be a number')
  else if (!fs.existsSync(`${dataFolderPath}/${req.params.id}.md`)) res.status(404).send('note not found')
  else next()
})

app.get('/note/:id', (req, res) => res.download(`${dataFolderPath}/${req.params.id}.md`))

app.put('/note', async (req, res) => {  
  if (!req.files) res.status(400).send('no file')
  else {
    const file = req.files[''];
    if(file.length > 1) res.status(400).send('multiple files')
    else {
      const name = req.files[''].name
      if(name.substring(name.length - 3, name.length) !== '.md') res.status(400).send('not md file')
      else {
        const title = req.headers.title;
        if (file.size === 0) res.status(400).send('empty file')
        else if (!title) res.status(400).send('no title')
        else {
          file.mv(`${dataFolderPath}1.md`, (err) => {
            if (err) return res.status(500).send(err);
          });
        }
      }
    }
  }
  /*
  const title = req.query.title
  if (title === undefined) res.status(400).send('query parameter title is missing')
  else if (title.replace(' ', '').length === 0) res.status(400).send('query parameter title is empty')
  else {
    const numberIncrement = manager.number_increment + 1
    manager.number_increment = numberIncrement
    manager.note.push({"number":numberIncrement,"title":title})
    updateManagerFile(manager)
    res.status(200).send(String(numberIncrement))s
  }
  */
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

app.delete('/:id', function (req, res) {
  delete manager.note[req.params.id]
  updateManagerFile(manager)
  res.status(200).send('ok')
})


*/

module.exports.checkIfNotDesynchronisation = checkIfNotDesynchronisation
