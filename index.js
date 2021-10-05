const express = require('express');
const bodyParser = require('body-parser');
const db = require("./src/quries");
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/api/v1/get-original-url', db.getOriginalUrl)

app.post('/api/v1/create-short-url', db.createShortUrl)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});