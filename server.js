const express = require('express');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index.js');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', async (req, res) => { return indexRoute.get(req, res)});
app.post('/', async (req, res) => { return indexRoute.post(req, res) });

app.listen(3000, () => console.log('Example app listening on port 3000!'));