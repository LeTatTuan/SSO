import session from 'express-session';
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


    app.use(
        session({
            secret: "keyboard cat",
            store: new SequelizeStore({
                db: sequelize,
            }),
            resave: false, // we support the touch method so per the express-session docs this should be set to false
            proxy: true, // if you do SSL outside of node.
        })
    );
}

export default configSessison;