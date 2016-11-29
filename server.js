const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance', {pageTitle: 'Maintenance'});
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello S Expresser</h1>');
  res.render('home.hbs', {
    name: 'Neil',
    likes: ['Deb', 'Hannah'],
    welcomeMessage: 'Yo bitches',
    pageTitle: 'Fabome page!'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Fabout us!'
  });
});

app.get('/bad', (req, res) => {
  // res.send('<h1>Hello S Expresser</h1>');
  res.send({
    errorMessage: 'Error Bad'
  })
});
app.listen(3000);
