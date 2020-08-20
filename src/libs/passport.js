const passport = require('passport');
const passportLocal = require('passport-local');
const Strategy = passportLocal.Strategy;
const Admin = require('../DB models/admin');

passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
    const admin = await Admin.findById(id);
    done(null, admin);
});

passport.use('autentificacion', new Strategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, name, password, done) => {
    const admin = await Admin.findOne({name: name});
    const pass = await Admin.findOne({password: password});

    if(!admin) {
        return done(null, false, req.flash('verficacion', 'El usuario no existe'));
    }
    if(!pass) {
        return done(null, false, req.flash('verificacion', 'Contraseña incorrecta'));
    }
    done(null, admin);
}));