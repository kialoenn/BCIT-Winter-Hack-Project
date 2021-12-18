const express = require('express');
const app = express();
const fs = require("fs");
const port = 3000;

// APP GETS
app.get('/', function (req, res) {

    fs.readFile("./private/html/index.html", function (error, pgRes) {
        if (error) {
            res.writeHead(404);
            res.write(msg404);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(pgRes);
        }

        res.end();
    });

});

app.listen(port, function() {
    console.log("Listening to " + port + "!");
});
