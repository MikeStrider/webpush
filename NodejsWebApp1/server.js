var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var push = require('web-push');
let vapidKeys = {
    publicKey: 'BOfFv9TlbYfetZ7Cd160G29UH6BUpkfweiZO-ySNtQodj-1qO59QenvY81xEnh_MepqtzK9nVrm5LQLXGnhMgR4',
    privateKey: 'W5RsU0HcLnAISVSvJ4ZrXD8jYUKqDKpGLqfnhl2Szr8'
}

app.get("/", function (req, res, next) {
    res.send("API found.");
});

app.post("/", function (req, res, next) {
    console.log(req.body);
    res.send("Post request was recieved.");
    push.setVapidDetails('mailto:test@mike.com', vapidKeys.publicKey, vapidKeys.privateKey)
    // put your endpoints here, the data should come from the DB
    let sub = { "endpoint": "https://fcm.googleapis.com/fcm/send/dzxIANkdeFg:APA91bGaDfE4YCt7-PsTPK1rRHZiYfEJidvZacmyATXnHv8ixQb57N18xoUCrfP0vngq2ERzUL_FLSG1mkWHVOh5t0t9hasABgurBwc4_rxLdmvYwDtFxLdRLu3VhsHHorTd4G35pkXU", "expirationTime": null, "keys": { "p256dh": "BLh30yVxjBHuXd3mfBlSUkPImcdb-55DBUA6LwzC-BcZvv6Xmr0z6eIo1bheKuVFer6pA0JmSa6U7I_5qar7XLs", "auth": "mehr4_zunScwu11f63hrvg" } };
    push.sendNotification(sub, 'test message');
});

app.listen(3000, function () {
    console.log("Started on port 3000");
});


// how to get a new key
// let vapidKeys = push.generateVAPIDKeys();
// console.log(vapidKeys);




