const express = require('express');
const csvServ = require('./CSVmodule/csv')

const config = {
    name: 'sample-express-app',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();

app.get('/api/reports/cantones', (req, res) => {
    csvServ.getCSV(req, res);
});

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
    console.log("Listening on Port: ",config.port)
});