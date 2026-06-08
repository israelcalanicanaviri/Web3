import pool from '../config/db.js';

const CompraModel = {
    obtenerHistorial: async (usuario_id) => {
        const consulta = `
            SELECT 
                c.id_compra,
                c.fecha, 
                p.nombre AS producto, 
                dc.cantidad, 
                dc.precio,
                (dc.cantidad * dc.precio) AS subtotal
            FROM detalle_compra dc
            JOIN compras c ON dc.compra_id = c.id_compra
            JOIN productos p ON dc.producto_id = p.id_producto
            WHERE c.usuario_id = ?
            ORDER BY c.fecha DESC
        `;
        const [rows] = await pool.query(consulta, [usuario_id]);
        return rows;
    },

    //Sin espacio en blanco en el nombre de la función
    guardarCompraCompleta: async (usuario_id, total, productos) => {

        const [resultadoCompra] = await pool.query(
            'INSERT INTO COMPRAS (usuario_id, total) VALUES (?, ?)',
            [usuario_id, total]
        );

        const idCompraRecienCreada = resultadoCompra.insertId;

        // Insertar cada producto en DETALLE_COMPRA
        for (let p of productos) {
            await pool.query(
                'INSERT INTO DETALLE_COMPRA (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
                [idCompraRecienCreada, p.producto_id, p.cantidad, p.precio]
            );
        }
        
        return idCompraRecienCreada;
    }
};

export default CompraModel;