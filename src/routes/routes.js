const {Router} = require('express'); //Importo la funcion Router de express y despues le asocio una constante
const router = Router();
const Comida = require('../DB models/comida');
const Admin = require('../DB models/admin');
const passport = require('passport');

router.get('/', (req, res) => {     //Configuramos que hacer cuando hay un GET a la pag principal (Esto despues lo asociamos al HTML, por ahora lo dejo asi)
    res.render('home');
})

router.get('/login', (req, res) => {
    res.send('login');
})

router.post('/login', passport.authenticate('autentificacion', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/admin', autentificacion,(req, res) => {
    res.send('Administrar');
})

router.get('/admin/:id', autentificacion,(req, res) => {
    res.send('Editar comida');
})

router.post('/admin/:id', autentificacion, (req, res) => {
    res.send('Editar comida');
})

router.get('/admin/agregar', autentificacion, (req, res) => {
    res.send('agregar comida');
})

router.post('/admin/agregar', autentificacion, async (req, res) => {
    const comida = new Comida(req.body);
    await comida.save();
    res.send('recibido');
})

router.get('/comprar', async (req, res) => {
    const comidas = await Comida.find();
    res.render('comprar', {
        comidas
    });
})

router.post('/comprar', (req, res) => {
    res.send('Compra realizada');
})

function autentificacion(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;            //La exporto para poder utilizarla en los demas archivos donde se llama este archivo (Index.js)