const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePDFs} = require('./testpdf')


const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), function (req, res, next) {
    console.log(req.files)
    mergePDFs(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))
    res.redirect("http://localhost:3000/static/merged.pdf")
    // res.send({data: req.files})

    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/about.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})