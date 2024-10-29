const connectToMongoFunc = require('./dbconnect');
const bodyParser = require('body-parser');
const cors = require('cors');

connectToMongoFunc();

const express = require('express')
const app = express()
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`INotebook Backend app listening on port ${port}`)
})