const mongoose = require('mongoose'); //Importo mongoose

//Conectar mongoose a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('Base de Datos conectada'))
    .catch(err => console.log(err));