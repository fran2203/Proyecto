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
        comidas,
        msg
    });
})

var msg = '';

router.post('/comprar', async (req, res) => {
    msg = '';
    let verificar = true;
    let contMsg = 1;
    var ComidaAActualizar = [];

    for (let i in req.body) {                   // i = nombre comida / req.body[i] = cantidad solicitada
        let x = await Comida.find({nombre: i}); // x = comida a modificar
        if ((x[0].cantidad - req.body[i]) < 0 || req.body[i] < 0) {     // Si no hay suficiente cantidad en la base de datos, o si el numero es negativo, dará un mensaje de error
            if (contMsg == 1) {
                msg = msg + `No hay suficiente cantidad de: ${i}`;   // Este mensaje aparecera en la pagina
                contMsg++;
            } else {
                msg = msg + `, ${i}`;
            }
            verificar = false; // Si verificar es falso, no se realizara la compra
        } else {              // Si la cantidad digitada es correcta, se creará el nuevo valor de la comida con la cantidad restante actualizada
            var nuevaCantidad = (x[0].cantidad - req.body[i]);
            var nuevaComida = {
                nombre: x[0].nombre, 
                categoria: x[0].categoria, 
                cantidad: nuevaCantidad,
                precio: x[0].precio
            }
            ComidaAActualizar.push(nuevaComida);
            // await Comida.findByIdAndUpdate(x[0]._id, nuevaComida);
        }
    }

    console.log(ComidaAActualizar);

    if (verificar) {
        console.log('Todo OK');
        res.send('Compra realizada');
    } else {
        console.log('Verifica que haya tal cantidad');
        res.redirect('/comprar'); // Si verificar es falso, se redirecciona nuevamente a la pagina con el mensaje de lo que hace falta
    }
})

function autentificacion(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;            //La exporto para poder utilizarla en los demas archivos donde se llama este archivo (Index.js)