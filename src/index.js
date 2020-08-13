const path = require('path'); // Importo Path (sirve para manipular más facilmente la direccion de archivos y ficheros)
const express = require('express');//Importo Express (framework de Nodejs orientado a la creacion de paginas webs y APIs)
const app = express();
const routes = require('./routes/routes'); //LLamo al archivo routes.js (ahi configuro las distintas rutas) que esta en la carpeta routes
const multer = require('multer');
require('./db'); //LLamo al archivo db.js (ahi es donde inicializo la base de datos)

app.set('port', process.env.PORT || 3000); //Setea el puerto al que te da el servidor donde desplegamos el proyecto, si no te da uno, se utiliza el puerto 3000 por defecto
app.set('views', path.join(__dirname, 'views')); //Le doy la direccion de las views(archivos htmls)
app.set('view engine', 'ejs'); //LLama a EJS, que sirve para complementar a HTML y JS(Trabaja con templates, es decir que le da un dinamismo a la pag, ya que hace que las etiquetas no tengan un valor fijo)

const guardado = multer.diskStorage({
    destination: path.join(__dirname, 'static/imagenes'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
});
app.use(multer({storage: guardado}).single('imagen'));
app.use(express.urlencoded({extended: false}));
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'static')));

//Inicializa el server
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
})