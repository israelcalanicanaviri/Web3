import ProductoModel from '../modelo/productoModel.js';

const productoController = {
    listarProductos: async (req, res) => {
        try {
            const productos = await ProductoModel.obtenerTodos();
            res.json(productos); 
        } catch (error) {
            console.log(error);
            res.status(500).json({
                mensaje: 'Error al obtener productos'
            });
        }
    }
};

export default productoController;