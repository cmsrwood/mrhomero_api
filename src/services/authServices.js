const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');
const authRepository = require('../repositories/authRepository');
const clientesRepository = require('../repositories/clientesRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';
const nodemailer = require('nodemailer');
const moment = require('moment');
const util = require('util');

const verifyAsync = util.promisify(jwt.verify);

// Configuración de transporte de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "notificadormrhomero@gmail.com",
        pass: "exwr frwt rvbm kkgb"
    }
});

// Servicio para ingresar
exports.ingresar = async (user) => {
    const usuario = await authRepository.traerClientePorEmail(user.email);

    if (!usuario) {
        throw new NotFoundError('El correo no está registrado en el sistema');
    }

    if (usuario.user_estado === 0) {
        throw new BadRequestError('El usuario se encuentra inactivo');
    }

    const passwordMatch = bcrypt.compareSync(user.password, usuario.user_pass);
    if (!passwordMatch) {
        throw new BadRequestError('Contraseña incorrecta');
    }

    const recuerdame = user.recuerdame ? true : false;
    const token = jwt.sign(
        { id: usuario.id_user, rol: usuario.id_rol },
        secret,
        { expiresIn: recuerdame ? '30d' : '30d' }
    );

    return {
        token: token,
        rol: usuario.id_rol,
        email: usuario.user_email,
        message: '¡Bienvenido, has iniciado sesión con éxito!'
    };
}

// Servicio para validar el token
exports.validarToken = async (token) => {
    try {
        const decoded = await verifyAsync(token, secret);
        return {
            rol: decoded.rol,
            decoded: decoded
        };
    } catch (err) {
        console.error("Error al verificar el token:", err);
        throw new BadRequestError('Token inválido');
    }
};

// Servicio para registrar
exports.registrar = async (user) => {
    const existe = await authRepository.traerClientePorEmail(user.email);
    if (existe) {
        throw new BadRequestError('El correo ya se encuentra registrado.');
    }

    try {
        const response = await authRepository.registrar(user);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error al registrar el usuario.');
    }
};

// Servicio para recuperar contraseña
exports.recuperar = async (email) => {
    const usuario = await clientesRepository.mostrarClientePorEmail(email);

    if (!usuario) {
        throw new NotFoundError('El correo no se encuentra registrado en el sistema');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationDate = moment().add(12, 'hour').format('YYYY-MM-DD HH:mm:ss');

    try {
        await authRepository.recuperar(verificationCode, expirationDate, usuario.id_user);
    } catch (error) {
        throw new BadRequestError('Error al guardar el código de verificación');
    }

    const mailOptions = {
        from: 'notificadormrhomero@gmail.com',
        to: email,
        subject: 'Código de verificación para restablecer contraseña || Mr. Homero',
        html: `
            <div class="container" style="background-color: #212529; color: #fff; padding: 80px;">
                <div class="imagen" style="text-align: center;">
                    <img src="https://mrhomero.onrender.com/logo.png" alt="https://mrhomero.onrender.com/logo.png"
                        style="width: 20%; height: 20%;">
                </div>
                <h1>Recuperación de Contraseña</h1>
                <p style="font-size: 25px;">Tu código de verificación es:</p>
                <h2 style="font-size: 40px; font-weight: bold; color: #FFC107;">${verificationCode}</h2>
                <p>Por favor, ingrésalo en el formulario de recuperación de contraseña.</p>
                <p>Este código caducará en 1 hora.</p>
                <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                <p>Gracias,</p>
                <p>El equipo de soporte</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { message: 'Código de verificación enviado por correo electrónico', email: email };
    } catch (error) {
        throw new Error('Error al enviar el correo electrónico');
    }
}

// Servicio para resetear contraseña
exports.resetPassword = async (datos) => {
    const usuarioRecuperar = await authRepository.traerUsuarioParaRecuperar(datos);
    if (!usuarioRecuperar) {
        throw new BadRequestError('Revisa el código de verificación');
    }

    const response = await authRepository.resetPassword(datos);
    return response;
}