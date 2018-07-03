const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

//middelware
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;

   fs.appendFile('server.log',log + '\n', (err) =>{
      if(err){
         console.log('Unable to find in server log');
      }
   });

   next();
});
// app.use((req, res, next)=>{
//    res.render('maintenance.hbs');
//    //next();
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
      pageTitle: 'Home Page',
      summary: 'Welcome to our website!'
   });

   //   res.send('<h2>Hello Express!</h2>');
   //   res.send({
   //      name : 'asad',
   //      age : 29,
   //      likes : [
   //         'biking',
   //         'swimming'
   //      ]
   //   });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
      pageTitle: 'About us!',
      summary: `I am a Software developer, building single page applications.`
   });
});

app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to handle request'
   });
});

app.listen(3000, () => {
   console.log('Server is up for port 3000');
});