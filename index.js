const express = require('express');
const csvServ = require('./CSVmodule/csv')

const config = {
    name: 'sample-express-app',
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
};

const app = express();

app.get('/api/reports/cantones', (req, res) => {
    csvServ.getCSV(req, res);
});

app.get('/', (req, res) => {
    var htmlTemplate = `<h1> This is a districts API </h1>`
    res.send(htmlTemplate);
});

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
    console.log("Listening on Port: ",config.port)
});