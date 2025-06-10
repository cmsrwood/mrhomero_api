const mysql = require('mysql2');
const menuServices = require('../services/menuServices');

beforeAll(() => {
    global.db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mrhomero_test',
    });
});

afterAll(() => {
    global.db.end();
});

describe('Test de categorias', () => {
    test('Mostrar categorias', async () => {
        const resultado = await menuServices.mostrarCategorias();
        expect(Array.isArray(resultado)).toBe(true);
    });
});