const express = require('express')
const app = express()
const port = 3000

app.get('/gdpr', (req, res) => {
    res.setHeader('Set-Cookie', 'gdpr=1; path=/; expires=Fri, 1 Nov 2024 23:59:59 GMT');
    res.json('OK');
})

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2af93bd447caae",
      pass: "********31c6"
    }
  });

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object


  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

main().catch(console.error);

