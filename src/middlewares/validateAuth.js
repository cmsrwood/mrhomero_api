const { BadRequestError } = require('../errors/ExceptionErrors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateRegistrar = (req, res, next) => {
    const { nombres, apellidos, email, password, confirmPassword } = req.body;

    const error = [];

    if (!nombres) {
        error.push('Falta paramétro: nombres');
    }

    if (!apellidos) {
        error.push('Falta paramétro: apellidos');
    }

    if (!email) {
        error.push('Falta paramétro: email');
    }

    if (!password) {
        error.push('Falta paramétro: password');
    }

    if (!confirmPassword) {
        error.push('Falta paramétro: confirmPassword');
    }

    if (error.length > 0) {
        throw new BadRequestError(error);
    }
    next();
};

const validateUser = (req, res, next) => {
    const { email, password } = req.body;

    const error = []

    if (!email) {
        error.push('Falta paramétro: email');
    }

    if (!password) {
        error.push('Falta paramétro: password');
    }

    if (error.length > 0) {
        throw new BadRequestError(error);
    }
    next();
};

const validateToken = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    const error = [];

    if (!token) {
        error.push('Token no proporcionado');
    }

    if (error.length > 0) {
        throw new BadRequestError(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    }
}

module.exports = {
    validateUser,
    validateToken,
    validateRegistrar,
    allowRoles
};