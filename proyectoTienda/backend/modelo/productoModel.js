import pool from '../config/db.js';

const ProductoModel = {
    //consulta limpia para obtener todos los productos
    obtenerTodos: async () => {
        const [rows] = await pool.query('SELECT * FROM productos');
        return rows;
    }
};

export default ProductoModel;