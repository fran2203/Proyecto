const {Router} = require('express'); //Importo la funcion Router de express y despues le asocio una constante
const router = Router();
const Comida = require('../DB models/comida');
const passport = require('passport');
const sendEmail  = require('../libs/nodemailer');
const {unlink} = require('fs-extra');
const path = require('path');

router.get('/', (req, res) => {     //Configuramos que hacer cuando hay un GET a la pag principal (Esto despues lo asociamos al HTML, por ahora lo dejo asi)
    res.render('home');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('autentificacion', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/admin', autentificacion, async (req, res) => {
    const comidas = await Comida.find();
    res.render('admin/admin', { 
        comidas
    });
})

router.get('/admin/editar/:id', autentificacion, async (req, res) => {
    const { id } = req.params;
    const comida = await Comida.findById(id)
    
    res.render('admin/editar', {
        comida
    });
})

router.post('/admin/editar/:id', autentificacion, async (req, res) => {
    const {id} = req.params;
    if (req.file == undefined) {
        await Comida.findByIdAndUpdate(id, req.body);
        res.redirect('/admin');
    } else {
        const comida = await Comida.findById(id);

        if (comida.imagen != undefined){
            await unlink(path.resolve('./src/static/imagenes/' + comida.imagen));
        }

        let food = {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            imagen: req.file.filename
        }

        await Comida.findByIdAndUpdate(id, food);
        res.redirect('/admin');
    }

})

router.get('/admin/eliminar/:id', autentificacion,  async (req, res) => {
    const {id} = req.params;
    const comida = await Comida.findByIdAndRemove(id);

    await unlink(path.resolve('./src/static/imagenes/' + comida.imagen));

    res.redirect('/admin');
})

router.get('/admin/agregar', autentificacion, (req, res) => {
    res.render('admin/agregar');
})

router.post('/admin/agregar', autentificacion, async (req, res) => {
    console.log(req.file)
    const comida = new Comida(req.body);
    comida.imagen = req.file.filename;
    
    await comida.save();
    res.redirect('/admin');
})

router.get('/comprar', async (req, res) => {
    const comidas = await Comida.find();
    res.render('comprar', {
        comidas,
        msg
    });
})

let msg = '';

router.post('/comprar', async (req, res) => {
    msg = '';
    let verificar = true;
    let contMsg = 1;
    datos.comidaActualizada = [];
    datos.comida = [];

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
        } else if(req.body[i] > 0){              // Si la cantidad digitada es correcta, se creará el nuevo valor de la comida con la cantidad restante actualizada
            var nuevaCantidad = (x[0].cantidad - req.body[i]);
            var nuevaComida = {
                _id: x[0]._id,
                nombre: x[0].nombre, 
                categoria: x[0].categoria, 
                cantidad: nuevaCantidad,
                precio: x[0].precio
            }
            datos.comidaActualizada.push(nuevaComida);
            var comidaPedida = {
                nombre: x[0].nombre,
                cantidad: req.body[i]
            }
            datos.comida.push(comidaPedida);
        }
    }

    if (verificar) {
        res.redirect('/datos');
    } else {
        res.redirect('/comprar'); // Si verificar es falso, se redirecciona nuevamente a la pagina con el mensaje de lo que hace falta
    }
})

var datos = {
    comidaActualizada: [],
    comida: [],
    nombre: '',
    apellido: '',
    domicilio: '',
    email: '',
    pago: ''
}

router.get('/datos', (req, res) => {
    if(datos.comida.length == 0){
	res.redirect('/comprar');
    }
    else{
	res.render('datos')
    }
})

router.post('/datos', async (req, res) => {
    if (req.body.pago == "Efectivo") {
        var { nombre, apellido, domicilio, email, pago } = req.body;
        datos.nombre = nombre;
        datos.apellido = apellido;
        datos.domicilio = domicilio;
        datos.email = email;
        datos.pago = pago

        for (let i in datos.comidaActualizada) {
            await Comida.findByIdAndUpdate(datos.comidaActualizada[i]._id, datos.comidaActualizada[i])
        }
        sendEmail(datos);
        res.redirect('/compra-realizada')
    }
    else {
        res.redirect('/tarjeta')
    }
})

router.get('/compra-realizada', (req, res) => {
    res.send('se realizo la compra')
})

router.get('/tarjeta', (req, res) => {
    if(datos.comida.length == 0){
	res.redirect('/comprar')
    }
    else{
	res.render('payment')
    }
})

function autentificacion(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;    //La exporto para poder utilizarla en los demas archivos donde se llama este archivo (Index.js)
