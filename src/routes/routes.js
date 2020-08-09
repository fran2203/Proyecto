const {Router} = require('express'); //Importo la funcion Router de express y despues le asocio una constante
const router = Router();

router.get('/', (req, res) => {     //Configuramos que hacer cuando hay un GET a la pag principal (Esto despues lo asociamos al HTML, por ahora lo dejo asi)
    res.render('index');
})

module.exports = router;            //La exporto para poder utilizarla en los demas archivos donde se llama este archivo (Index.js)