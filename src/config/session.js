import session from 'express-session';
import passport from 'passport';
import Sequelize from 'sequelize';
require('dotenv').config();

const configSessison = (app) => {
    const SequelizeStore = require('connect-session-sequelize')(session.Store);
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, null, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        define: {
            freezeTableName: true
        },
    });

    const myStore = new SequelizeStore({
        db: sequelize,
    });

    app.use(
        session({
            secret: "keyboard cat",
            store: myStore,
            resave: false, // we support the touch method so per the express-session docs this should be set to false
            saveUninitialized: false,
            proxy: true, // if you do SSL outside of node.
        })
    );

    myStore.sync();

    app.use(passport.authenticate('session'));

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, user);
        })
    });

    passport.deserializeUser(function (user, cb) {
        return cb(null, user);
    })
}

export default configSessison;