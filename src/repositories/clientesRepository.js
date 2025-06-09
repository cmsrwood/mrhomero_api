require("dotenv").config();
const axios = require("axios");
const Usuario = require("../models/Usuarios");
const Sequelize = require("sequelize");

// Repositorio para mostrar clientes
exports.mostrarClientes = async () => {
    try {
        return await Usuario.findAll({
            where: { id_rol: 3, user_estado: 1 },
            order: [['user_fecha_registro', 'DESC']]
        });
    } catch (error) {
        throw error;
    }
}

// Repositorio para mostrar cliente
exports.mostrarCliente = async (id) => {
    try {
        return await Usuario.findByPk(id);
    } catch (error) {
        throw error;
    }
}

// Repositorio para mostrar clientes por correo
exports.mostrarClientePorEmail = async (email) => {
    try {
        return await Usuario.findOne({
            where: { user_email: email }
        });
    } catch (error) {
        throw error;
    }
}

exports.mostrarResenas = async (placeId) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&reviews_sort=newest&fields=name,reviews,rating&language=es&key=${apiKey}`);

        return response.data.result.reviews || [];
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        throw new Error("No se pudieron obtener las reseñas.");
    }
}

exports.mostrarRatingResenas = async (placeId) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating&language=es&key=${apiKey}`);

        return response.data.result.rating || [];
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        throw new Error("No se pudieron obtener las reseñas.");
    }
};

// Repositorio para mostrar clientes del último mes
exports.cuentaClientesUltimoMes = async () => {
    try {
        return await Usuario.findAll({
            where: {
                id_rol: 3,
                [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('user_fecha_registro')), new Date().getMonth() + 1),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('user_fecha_registro')), new Date().getFullYear())
                ]
            }
        });
    } catch (error) {
        throw error;
    }
}

// Repositorio para agregar puntos
exports.agregarPuntos = async (id, puntos) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new Error("Usuario no encontrado");

        return await usuario.update({
            user_puntos: usuario.user_puntos + puntos
        });
    } catch (error) {
        throw error;
    }
};

// Repositorio para actualizar cliente
exports.actualizarCliente = async (id, cliente) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw new Error("Usuario no encontrado");

        const actualizacion = {};
        if (cliente.user_nom) actualizacion.user_nom = cliente.user_nom;
        if (cliente.user_apels) actualizacion.user_apels = cliente.user_apels;
        if (cliente.user_tel) actualizacion.user_tel = cliente.user_tel;
        if (cliente.foto) actualizacion.user_foto = cliente.foto;

        await usuario.update(actualizacion);

        return {
            cliente: { ...usuario.get(), ...actualizacion },
            message: "El cliente se ha actualizado correctamente"
        };
    } catch (error) {
        throw error;
    }
}

// Repositorio para eliminar cliente
exports.eliminarCliente = async (id) => {
    try {
        await Usuario.update(
            { user_estado: 0 },
            { where: { id_user: id } }
        );
        return { message: "El cliente se ha borrado correctamente" };
    } catch (error) {
        throw error;
    }
}

// Repositorio para restaurar cliente
exports.restaurarCliente = async (id) => {
    try {
        await Usuario.update(
            { user_estado: 1 },
            { where: { id_user: id } }
        );
        return { message: "El cliente se ha restaurado correctamente" };
    } catch (error) {
        throw error;
    }
}