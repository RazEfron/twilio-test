const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Replace these with your Twilio Account SID and Auth Token
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_SECRET;
const client = new twilio(accountSid, authToken);

app.post('/sms', (req, res) => {
    const incomingMessage = req.body.Body.trim().toLowerCase();

    if (incomingMessage === 'donate') {
        const twiml = new twilio.twiml.MessagingResponse();
        twiml.message("Thank you for your generosity! Donate here: https://example.com/donation");
        res.type('text/xml').send(twiml.toString());
    } else {
        res.send("No action taken");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
