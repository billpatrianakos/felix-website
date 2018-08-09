// Server startup script
// =====================
// Main entry point for the app

// Import all our dependencies
// ---------------------------
// TODO: Remove all the deps we're not using anymore like ejs and csurf
const express     = require('express');
const app         = express();
const session     = require('express-session');
const config      = require('./config/app')[process.env.NODE_ENV || 'development'];
const RedisStore  = require('connect-redis')(session);
const morgan      = require('morgan');
const fs          = require('fs');
const bodyParser  = require('body-parser');
const csurf       = require('csurf'); // TODO: CONFIGURE THIS
const ejs         = require('ejs');
const path        = require('path');

console.log('ENVIRONMENT IS: ', process.env.NODE_ENV);
// Set up all middleware
// ---------------------
app.use(morgan((process.env.NODE_ENV === 'production') ? 'combined' : 'dev', {
  stream: process.env.NODE_ENV === 'production' ? fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) : process.stdout,
  skip: (req, res) => { return process.env.NODE_ENV === 'production' && res.statusCode < 400 }
}));
app.use(bodyParser.json());

require('./api')(app); // Sneak the API in here since it doesn't need all the middleware

// Continue setting up middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  config.session.store = new RedisStore({ logErrors: true });
  app.set('trust proxy', 1); // Trust Nginx as proxy server
}
app.use(session(config.session));


// Require all other routes
// ------------------------
require('./routes')(app);

app.get('/?', (req, res, next) => {
  res.render('login', { title: 'Login', foo: 'bar' });
});


// 404 Handler
// -----------
app.use((req, res, next) => {
  if (req.xhr)
    res.status(404).json({ status: 'error', message: '404 - Page not found' });
  else
    res.status(404).render('404', { error: 'Page not found' });
});

// Error handling
// --------------
app.use((err, req, res, next) => {
  if (req.xhr)
    res.status(500).json({ status: 'error', message: process.env.NODE_ENV === 'production' ? 'An unexpected error was encountered' : `Error: ${err}` });
  else
    res.send(err);
    // res.status(500).render('500', { error: err })
});


let server = app.listen(process.env.PORT || 9000, () => {
  console.log(`App is listening on localhost:${server.address().port}`);
});
