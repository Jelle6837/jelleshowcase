const express = require('express');

const app = express();
const port = 3000;
let cors = require('cors')
app.use(cors());
app.use(express.json());

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hallo wereld!");
});

app.listen(port, () => console.log(`Data API listening on port ${port}!`))

let response;

// Ontvang de captcha gegevens vanuit een POST request
app.post('/captcha', async (req, res) => {
    token = req.body.response;
    response = req.body.response;
    // Vul hier je secret key in van Google reCAPTCHA, check dat je dit op een veilige (security) manier doet.
    let secret = "";
    // Verstuur de gegevens naar de Google Api
    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
            method: "POST",
            body: JSON.stringify({
                secret: secret,
                response: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // De response vanuit Google (meer info: https://developers.google.com/recaptcha/docs/v3#site_verify_response):
        const result = await response.json();
       // Stuur het resultaat weer terug naar je client
        res.json(result);
    }
    catch (e) {
        console.log(e);
    }
});

console.log(response);

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2af93bd447caae",
      pass: "a39aa3292031c6"
    }
  });


app.post('/form', async (req, res) => {

    console.log(req.body);

    let email = req.body.email;
    let onderwerp = req.body.onderwerp;
    let bericht = req.body.bericht;

    const info = await transporter.sendMail({
        from: `${email}`, // sender address
        to: "s1181756@student.windesheim.nl", // list of receivers
        subject: `${onderwerp}`, // Subject line
        text: `${bericht}`, // plain text body
        html: `${bericht}`, // html body
      });

    res.json({email: email});
});

