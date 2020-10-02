const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const imageUploadRouter = require('./routes/imageupload');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/upload', imageUploadRouter);

app.use(bodyParser.json());

module.exports = app;

const PORT = 3001

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});