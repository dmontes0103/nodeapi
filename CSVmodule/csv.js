const http = require('http');
const iconv = require('iconv-lite');
const csvjson = require('csvjson')
const strftime = require('strftime')

module.exports.getDateMonth = () => {
    var date = new Date()
    date.setDate( date.getDate());
    var offset = -6;
    var utc = date.getTime() + ( date.getTimezoneOffset() * 60000);
    var nd = new Date( utc + 3600000 * offset)
    //console.log(strftime('%m %d', date));
    var day = strftime('%d', nd);
    var month = strftime('%m', nd);
    var URL =`http://geovision.uned.ac.cr/oges/archivos_covid/${month}_${day}/${month}_${day}_CSV.csv`;
    //console.log(nd);
    //console.log(URL);
    return URL;
}

module.exports.getCSV = (req, res) => {
    var UNED_UL = this.getDateMonth();
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