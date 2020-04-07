const http = require('http');
const iconv = require('iconv-lite')
const csvjson = require('csvjson')

const UNED_UL = 'http://geovision.uned.ac.cr/oges/archivos_covid/04_01/04_01_CSV.csv';

module.exports.getCSV = (req, res) => {
    http.get(UNED_UL, (resp) => {
        var data = [];
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            //data += chunk;
            data.push(chunk);
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            var decodedBody = iconv.decode(Buffer.concat(data), 'macintosh');
            const jsonobj = csvjson.toObject(decodedBody)
            //console.log(jsonobj);
            res.status(200).send(jsonobj);
        });

    }).on("error", (err) => {
        res.status(404).send("No objects found")
        console.log("Error: " + err.message);
    });
}