const mysql = require('mysql2');
const invServices = require('../services/invServices');

beforeAll(() => {
    global.db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mrhomero_test',
        connectTimeout: 10000,
    });
    global.db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });
    global.db.query('TRUNCATE TABLE mrhomero_test.inventario');
});

afterAll(() => {
    global.db.query('TRUNCATE TABLE mrhomero_test.inventario');
    global.db.end();
});

describe('Test de inventario', () => {

    // Test de mostrar productos
    test(`Mostrar inventario`, async () => {
        const resultado = await invServices.mostrarInventario();
        expect(Array.isArray(resultado)).toBe(true);
    });

    // Test de crear producto
    test('Crear producto en el inventario', async () => {
        const nuevoProducto = {
            inv_nombre: 'Producto Test',
            categoria_inv_nom: 'Categoria Test',
            inv_cantidad: 10,
            inv_fecha_ing: '2023-10-01',
            inv_fecha_cad: '2024-10-01',
            inv_cantidad_min: 5,
            id_proveedor: 1
        };
        const resultado = await invServices.crearInventario(nuevoProducto);
        expect(resultado.message).toBe('El producto se ha creado con exito.');
    });

    // Test de crear 1000 productos
    test('Agregar 1.000 productos al inventario', async () => {
        for (let i = 1; i <= 1000; i++) {
            const nuevoProducto = {
                inv_nombre: `Producto Test ${i}`,
                categoria_inv_nom: 'Categoria Test',
                inv_cantidad: 10,
                inv_fecha_ing: '2023-10-01',
                inv_fecha_cad: '2024-10-01',
                inv_cantidad_min: 5,
                id_proveedor: 1
            };
            const resultado = await invServices.crearInventario(nuevoProducto);
            expect(resultado.message).toBe('El producto se ha creado con exito.');
        }
    });

    // Test de mostrar producto
    test('Mostrar un producto del inventario', async () => {
        const id = 1;
        const resultado = await invServices.mostrarProductoInventario(id);
        expect(resultado.length).toBe(1);
    });

    // Test de actualizar producto
    test('Actualizar producto en el inventario', async () => {
        const id = 1;
        const productoActualizado = {
            inv_nombre: 'Producto Actualizado',
            categoria_inv_nom: 'Categoria Actualizada',
            inv_cantidad: 20,
            inv_fecha_ing: '2023-10-01',
            inv_fecha_cad: '2024-10-01',
            inv_cantidad_min: 5,
            id_proveedor: 1
        };
        const resultado = await invServices.actualizarInventario(id, productoActualizado);
        expect(resultado.message).toBe('El producto se ha actualizado con exito.');
    });

    // Test de eliminar producto
    test('Eliminar producto del inventario', async () => {
        const id = 1;
        const resultado = await invServices.eliminarProductoInventario(id);
        expect(resultado.message).toBe('El producto se ha eliminado con exito.');
    });
});
