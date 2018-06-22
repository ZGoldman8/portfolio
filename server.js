require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//var profile = require('./profile')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use('/profile', profile)

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Zach',
            lastName: 'Goldman',
        }
    }

    // Notice now the data is the second argument passed to the template render method
    res.render('index', data);
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/thanks', (req, res) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'ZGoldman@protonmail.com',					//receiver's email
        from: req.body.email,			//sender's email
        subject: 'A new contact request via SendGrid',				//Subject
        text: req.body.firstName + " " + req.body.lastName + ": " + req.body.textarea,		//content
        html: req.body.firstName + " " + req.body.lastName + ": " + req.body.textarea,			//HTML content
    };
    sgMail.send(msg);

    res.render('thanks', { contact: req.body })
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('listening at http://localhost:8080');
});
