//Importo express(framework de Nodejs orientado a la creacion de paginas webs y APIs)
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000); /*Setea el puerto al que te da el servidor donde desplegamos el proyecto, si no te da uno, se utiliza el puerto 3000 por defecto*/

//Inicializa el server
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
})