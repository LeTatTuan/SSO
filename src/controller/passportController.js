import passport from 'passport';
import LocalStrategy from 'passport-local';
import { handleUserLogin } from '../service/loginRegisterService';

const configPassport = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true,
    },
        async (req, username, password, done) => {
            const rawData = {
                valueLogin: username,
                password: password
            }
            const res = await handleUserLogin(rawData);
            if (res && res.EC === 0) {
                return done(null, res.DT);
            } else {
                return done(null, false, req.flash('data', [res.EM, username, res.EC]));
            }
        }));
}

const handleLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
}

module.exports = {
    configPassport, handleLogout
}