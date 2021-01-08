const nodemailer = require('nodemailer');

async function sendEmail(datos){
    const HTMLContent = `
        <h1> Hola, usted realizo una compra en nuestra página web, si esto no es así contáctese con nosotros </h1>
        <ul>
            <li>Nombre: ${datos.nombre}</li>
            <li>Apellido: ${datos.apellido}</li>
            <li>Domicilio: ${datos.domicilio}</li>
            <li>Tipo de pago: ${datos.pago}</li>
            <li>Precio total a pagar: $${datos.precioFinal}</li>
        </ul>
    `

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'supermercadoenvios@outlook.com',
            pass: 'Supermercado'
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