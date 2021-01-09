const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

async function sendEmail(datos){

    const HTMLContent = await ejs.renderFile(path.join(__dirname, '../views/nodemailer/mail.ejs'), {
        nombre: datos.nombre,
        apellido: datos.apellido,
        domicilio: datos.domicilio,
        pago: datos.pago,
        comida: datos.comida,
        largo: datos.comida.length,
        precioFinal: datos.precioFinal
    })

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'supermercadoenvios@outlook.com',
            pass: process.env.MAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    await transporter.sendMail({
        from: "'SupermercadoEnvios' <supermercadoenvios@outlook.com>",
        to: datos.email,
        subject: 'Compra realizada',
        html: HTMLContent
    });
}

module.exports = sendEmail;