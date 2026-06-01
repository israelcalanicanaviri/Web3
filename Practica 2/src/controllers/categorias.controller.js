const db = require("../config/db");


// 1. POST /categorias
exports.crearCategoria = (req, res) => {

    const { nombre, descripcion } = req.body;

    const sql = `
        INSERT INTO categorias(nombre, descripcion)
        VALUES (?, ?)
    `;

    db.query(sql, [nombre, descripcion], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "Categoría creada correctamente",
            id: result.insertId
        });
    });
};


// 2. GET /categorias
exports.obtenerCategorias = (req, res) => {

    const sql = "SELECT * FROM categorias";

    db.query(sql, (err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);
    });
};


// 3. GET /categorias/:id
exports.obtenerCategoriaPorId = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            c.id AS categoria_id,
            c.nombre AS categoria_nombre,
            c.descripcion,
            p.id AS producto_id,
            p.nombre AS producto_nombre,
            p.precio
        FROM categorias c
        LEFT JOIN productos p
        ON c.id = p.categoriaId
        WHERE c.id = ?
    `;

    db.query(sql, [id], (err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        const categoria = {
            id: rows[0].categoria_id,
            nombre: rows[0].categoria_nombre,
            descripcion: rows[0].descripcion,
            productos: []
        };

        rows.forEach(row => {

            if (row.producto_id) {

                categoria.productos.push({
                    id: row.producto_id,
                    nombre: row.producto_nombre,
                    precio: row.precio
                });
            }
        });

        res.json(categoria);
    });
};


// 4. PATCH /categorias/:id
exports.actualizarCategoria = (req, res) => {

    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const sql = `
        UPDATE categorias
        SET nombre = ?, descripcion = ?, updatedAt = NOW()
        WHERE id = ?
    `;

    db.query(sql, [nombre, descripcion, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "Categoría actualizada"
        });
    });
};


// 5. DELETE /categorias/:id
exports.eliminarCategoria = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM categorias
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "Categoría eliminada correctamente"
        });
    });
};