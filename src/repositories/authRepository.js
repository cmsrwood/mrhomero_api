const moment = require('moment');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuarios');

// Repositorio para ingresar
exports.ingresar = async (user) => {
    try {
        const usuario = await Usuario.findOne({
            where: { user_email: user.email }
        });

        return {
            results: usuario,
            message: "¡Bienvenido, has iniciado sesión con éxito!"
        };
    } catch (error) {
        throw error;
    }
}

// Repositorio para traer cliente por email
exports.traerClientePorEmail = async (email) => {
    try {
        return await Usuario.findOne({
            where: { user_email: email }
        });
    } catch (error) {
        throw error;
    }
}

// Repositorio para registrar
exports.registrar = async (user) => {
    try {
        const fecha = moment().format('YYYY-MM-DD HH:mm:ss');
        const hashpassword = bcrypt.hashSync(user.password, 10);
        const nombresConGuiones = user.nombres.replace(/\s+/g, '_');
        const id_unico = `user_${nombresConGuiones}_${Date.now()}`;

        await Usuario.create({
            id_user: id_unico,
            user_nom: user.nombres,
            user_apels: user.apellidos,
            user_email: user.email,
            user_pass: hashpassword,
            id_rol: 3,
            user_fecha_registro: fecha
        });

        return {
            message: "El usuario se ha creado con éxito."
        };
    } catch (error) {
        throw error;
    }
}

// Repositorio para recuperar contraseña
exports.recuperar = async (codigo, expirationDate, id) => {
    try {
        const [updated] = await Usuario.update({
            user_reset_code: codigo,
            user_reset_code_expiration: expirationDate
        }, {
            where: { id_user: id }
        });

        return {
            results: updated,
            message: "El código de recuperación se ha enviado con éxito."
        };
    } catch (error) {
        throw error;
    }
}

// Repositorio para traer usuario para recuperar
exports.traerUsuarioParaRecuperar = async (datos) => {
    try {
        return await Usuario.findOne({
            where: {
                user_reset_code: datos.verificationCode,
                user_email: datos.email,
                user_reset_code_expiration: { [Sequelize.Op.gt]: moment().format('YYYY-MM-DD HH:mm:ss') }
            }
        });
    } catch (error) {
        throw error;
    }
}

// Repositorio para resetear contraseña
exports.resetPassword = async (datos) => {
    try {
        const hashPassword = bcrypt.hashSync(datos.newPassword, 10);

        const [updated] = await Usuario.update({
            user_pass: hashPassword,
            user_reset_code: null,
            user_reset_code_expiration: null
        }, {
            where: { user_email: datos.email }
        });

        return {
            results: updated,
            message: "La contraseña se ha restablecido con éxito."
        };
    } catch (error) {
        throw error;
    }
}