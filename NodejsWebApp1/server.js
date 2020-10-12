var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var fs = require('fs');
var push = require('web-push');

let vapidKeys = {
    publicKey: 'BOfFv9TlbYfetZ7Cd160G29UH6BUpkfweiZO-ySNtQodj-1qO59QenvY81xEnh_MepqtzK9nVrm5LQLXGnhMgR4',
    privateKey: 'W5RsU0HcLnAISVSvJ4ZrXD8jYUKqDKpGLqfnhl2Szr8'
}

app.get("/", function (req, res, next) {
    res.send("API found.");
});

// loads data from file and sends to all users
app.post("/PostNotification/", function (req, res, next) {
    fs.readFile('mynewfile1.txt', function (err, data) {
        //res.writeHead(200, { 'Content-Type': 'text/html' });
        //res.write(data);
        //return res.end();
        //res.send(data);
        let sub = JSON.parse(data);

        push.setVapidDetails('mailto:test@mike.com', vapidKeys.publicKey, vapidKeys.privateKey)
        push.sendNotification(sub, 'test message');
        res.send("Post was successfully sent.");
    });

    
});

// accepts the endpoint data, amends to a file
app.post("/SaveURL/", function (req, res, next) {

    fs.appendFile('mynewfile1.txt', JSON.stringify(req.body), function (err) {
        if (err) throw err;
        console.log(req.body);
        console.log('Data saved.');
    });
    res.send("URL was saved.");

});

app.listen(3000, function () {
    console.log("Started on port 3000");
});


// how to get a new key
// let vapidKeys = push.generateVAPIDKeys();
// console.log(vapidKeys);




