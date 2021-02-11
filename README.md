# my-notes-v1

Web application to manage markdown notes (`v1`).

## Description

Features :

* Upload a markdown file.
* Upload a new markdown file to replace a markdown note.
* Show a markdown note.
* Delete a markdown note.

This is the `v1` of the project : the front-end code quality is not good enough and the back-end stores the files without using a database. The `v2` of the project will (at least) have a database to manage the files.

## Getting started

Local installation tested with Windows 10.

### Prerequisites

* npm (version 6.14.5 has been used).

### Installation and building (development)

```
// clone the repository

git clone https://github.com/Gyskard/my-notes

// for the server

cd ./my-notes/src/back
npm install
npm run server

// for the client

cd ./my-notes/src/front/my-notes
npm install
npm run serve
```

### Build with

* [VueJS](https://vuejs.org/) - the ProgressiveJavaScript Framework.
* [Axios](https://github.com/axios/axios) - promise based HTTP client for the browser and node.js.
* [Vuetify](https://v3.vuejs.org/) - A Material Design Framework for Vue.js.
* [vue-markdown](https://github.com/miaolz123/vue-markdown) - A Powerful and Highspeed Markdown Parser for Vue.

## Authors

* **Thomas Margueritat** - *Initial work* - [Gyskard](https://github.com/Gyskard)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.