
const nodemailer = require('nodemailer');
const moment = require('moment');
const { NotFoundError, BadRequestError } = require('../errors/ExceptionErrors');


// Configuración de transporte de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "notificadormrhomero@gmail.com",
        pass: "exwr frwt rvbm kkgb"
    }
});

const authServices = require('../services/authServices');

exports.ingresar = async (req, res, next) => {
    try {
        const user = req.body
        const respose = await authServices.ingresar(user);
        res.status(200).json(respose);
    } catch (err) {
        next(err)
    }
};

exports.validarToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const response = await authServices.validarToken(token);
        req.user = response.decoded
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

exports.registrar = async (req, res, next) => {
    try {
        const user = req.body
        const response = await authServices.registrar(user);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
};
exports.recuperar = async (req, res, next) => {
    try {
        const email = req.body.email;
        const response = await authServices.recuperar(email);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const datos = req.body
        const response = await authServices.resetPassword(datos);
        res.status(200).json(response);
    }
    catch (err) {
        next(err)
    }
};