const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// import sequelize and session storage

const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// configure session

const sess = {
    secret: 'Secrets secrets are no fun, unless they are shared by everyone',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.listen(PORT, () => {
    console.log(`App listening on port localhost:${PORT}`);
    sequelize.sync({ force: false });
});
