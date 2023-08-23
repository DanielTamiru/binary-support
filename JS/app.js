
let express = require('express');
let app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


const nodemailer = require('nodemailer');
// Create Transporter
let transporter = nodemailer.createTransport({
    host: 'smtp.ionos.com', // TODO: update
    port: 587,	// TODO: update
    auth: {
        user: 'info@binarysupport.net',	
        pass: 'Leadingxx63!'	// TODO: update
    }
})

app.post('/', function(request, response) {
    
    message = request.body;

    if (!message.text || message.text === "") {
        response.status(500).send({error: "A message must be included"});
    }
    else if (!message.sender || !message.address) {
        response.status(500).send({error: "Request must 'sender' and 'email' attributes (even if empty)"});
    }
    else {
        sender = message.sender;
        address = message.address;
        if (sender === "") {
            sender = "[Anonymous Stakeholder]";
        }
        if (address !== "") {
            address = ' (' + address + ')';
        }

        let mailOptions = {
            from: 'info@binarysupport.com',	// TODO: .net
            to: 'danny.tamiru@gmail.com',
            subject: 'Website Message from ' + sender + address,
            text: 'Message Received from BinarySupport.net:\n\n\n' + sender + ' said:\n\n' + message.text,                
        };

        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log("An error occured while attempting to send the email ", err);
            } else {
                console.log('Email Sent');
            }
        });

        response.status(200).send("Email was sent successfully")
    }
});


app.listen(3000, function() {
	console.log("BinarySupport Contact App is now running on port 3000!")
});


