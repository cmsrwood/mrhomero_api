const mysql = require('mysql2');
const invServices = require('../services/invServices');

beforeAll(() => {
    global.db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mrhomero'
    });
});

afterAll(() => {
    global.db.end();
});

describe('Test de inventario', () => {
    // Test de mostrar productos
    test('Mostrar inventario', async () => {
        const resultado = await invServices.mostrarInventario();
        expect(Array.isArray(resultado)).toBe(true);
    });
    // Test de mostrar producto
    test('Mostrar un producto del inventario', async () => {
        const id = 1;
        const resultado = await invServices.mostrarProductoInventario(id);
        expect(resultado.length).toBe(1);
    });
});
