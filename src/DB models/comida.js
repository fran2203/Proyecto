const mongoose = require('mongoose'); //Importo mongoose
const Schema = mongoose.Schema;     //Asocio la funcion Schema a una constante

const comidaSchema = new Schema({   //Creo un nuevo esquema (defino las caracteriscas de la comida) y lo pongo en una constante
    nombre: String,
    categoria: String,
    cantidad: Number,
    precio: Number,
    imagen: {
        publicID: String,
        URL: String
    }
})

module.exports = mongoose.model('comida',comidaSchema); //Lo exporto para cuando requiera a este archivo en otro