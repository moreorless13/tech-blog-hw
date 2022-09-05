const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// import sequelize and session storage

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// configure session

const sess = {
    secret: 'Secrets secrets are no fun, unless they are shared by everyone',
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'

    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// tell express to use the session configs

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// tell express where routing exists

app.use(require('./controllers/'))

// start the server by telling which port to listen to
app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
    sequelize.sync({ force: false });
});
