//test
//Name of the file : email.js
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'ZGoldman@protonmail.com',					//receiver's email
    from: 'test@example3.com',			//sender's email
    subject: 'SendGrid is working!!',				//Subject
    text: 'and finally  i can send email from sendgrid',		//content
    html: 'and easy to do anywhere, even with Node.js',			//HTML content
};
sgMail.send(msg);