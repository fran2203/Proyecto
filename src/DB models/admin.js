const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    nombre: String,
    password: String,
})

module.exports = mongoose.model('admin', adminSchema, 'admin');