const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const passport = require('./utils/passport');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

//Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve static folder
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'))

// Set up Handlebars.js engine
const hbs = exphbs.create({ defaultLayout: 'main', helpers });
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//passport auth middleware
app.use(session(
  {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  }
))
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
