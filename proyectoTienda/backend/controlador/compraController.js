import CompraModel from '../modelo/compraModel.js';

const compraController = {
    // Controla el GET de historial
    listarHistorial: async (req, res) => {
        const { usuario_id } = req.params;
        try {
            const rows = await CompraModel.obtenerHistorial(usuario_id);
            res.json(rows);
        } catch (error) {
            console.error("Error al obtener historial:", error);
            res.status(500).json({ mensaje: 'Error al obtener historial' });
        }
    },

    // Controla el POST de guardar compra
    crearCompra: async (req, res) => {
        const { usuario_id, total, productos } = req.body;
        try {
            await CompraModel.guardarCompraCompleta(usuario_id, total, productos);
            res.status(201).send({ mensaje: 'Compra guardada' });
        } catch (error) {
            console.error("Error al guardar la compra:", error);
            res.status(500).send({ mensaje: 'Error base de datos', detalles: error.message });
        }
    }
};

export default compraController;