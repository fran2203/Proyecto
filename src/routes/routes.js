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
    failureRedirect: '/loggin',
    passReqToCallback: true
}));

router.get('/admin', (req, res) => {
    res.send('Administrar');
})

router.get('/admin:id', (req, res) => {
    res.send('Editar comida');
})

router.post('/admin:id', (req, res) => {
    res.send('Editar comida');
})

router.get('/admin/agregar', (req, res) => {
    res.send('agregar comida');
})

router.post('/admin/agregar', async (req, res) => {
    const comida = new Comida(req.body);
    await comida.save();
    res.send('recibido');
})

router.get('/comprar', (req, res) => {
    res.send('Comprar');
})

router.post('/comprar', (req, res) => {
    res.send('Compra realizada');
})

module.exports = router;            //La exporto para poder utilizarla en los demas archivos donde se llama este archivo (Index.js)