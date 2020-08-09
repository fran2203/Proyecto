const mongoose = require('mongoose'); //Importo mongoose

//Conectar mongoose a la base de datos MongoDB
mongoose.connect('mongodb+srv://Francisco:fran123@cluster0.9exsf.gcp.mongodb.net/compraonline?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Base de Datos conectada'))
    .catch(err => console.log(err));