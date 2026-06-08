import UsuarioModel from '../modelo/usuarioModel.js';

const usuarioController = {
    registrar: async (req, res) => {
        console.log("Datos recibidos:", req.body); 
        const { usuario, password } = req.body;

        try {
            await UsuarioModel.crearUsuario(usuario, password);
            res.status(201).send({ mensaje: 'Usuario registrado con éxito' });
        } catch (error) {
            console.error("Error en SQL:", error);
            res.status(500).send({ mensaje: 'Error al registrar', detalles: error.message });
        }
    },

    login: async (req, res) => {
        console.log("Datos recibidos en Login:", req.body); 
        const { usuario, password } = req.body;
        try {
            const rows = await UsuarioModel.buscarPorCredenciales(usuario, password);
            
            if (rows && rows.length > 0) {
                res.send({ 
                    mensaje: 'Login correcto', 
                    success: true,
                    id_usuario: rows[0].id_usuario
                });
            } else {
                res.status(401).send({ mensaje: 'Usuario o contraseña incorrectos', success: false });
            }
        } catch (error) {
            console.error("ERROR REAL EN EL LOGIN:", error);
            res.status(500).send({ mensaje: 'Error en el servidor', detalles: error.message });
        }
    },
    
    //cambio de contraseña
    cambiarContrasena: async (req, res) => {
        console.log("Datos recibidos en Cambiar Password:", req.body);
        const { usuario, passwordActual, nuevoPassword } = req.body;

        try {
            await UsuarioModel.actualizarPassword(usuario, passwordActual, nuevoPassword);
            
            res.send({ mensaje: '¡Contraseña actualizada con éxito!', success: true });
        } catch (error) {
            console.error(" ERROR AL CAMBIAR CONTRASEÑA:", error);
            
            if (error.message === 'Usuario o contraseña actual incorrectos') {
                return res.status(400).send({ mensaje: error.message, success: false });
            }

            return res.status(500).send({ mensaje: 'Error servidor', detalles: error.message });
        }
    }
};

export default usuarioController;