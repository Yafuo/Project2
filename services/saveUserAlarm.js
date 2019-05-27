const express = require('express');
const app = express();

app.get('http://localhost:3000/user-alarm', (req, res) => {
    var userAlarm = req.body.userAlarm;
    console.log(`Received: ${userAlarm}`);
});
