const express = require('express');
const bodyParser = require('body-parser');
const db = require("./src/quries");
const app = express();

const PORT = process.env.PORT || 3003;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/api/v1/get-original-url', db.getOriginalUrl)

app.post('/api/v1/create-short-url', db.createShortUrl)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
});