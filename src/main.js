//importo express(framework de Nodejs orientado a la creacion de paginas webs y APIs)
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Servidor iniciado')
})