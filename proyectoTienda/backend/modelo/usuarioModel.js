import pool from '../config/db.js';

const UsuarioModel = {
    //Consulta para registrar un usuario
    crearUsuario: async (usuario, password) => {
        const [resultado] = await pool.query(
            'INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)', 
            [usuario, password]
        );
        return resultado;
    },

    //Consulta para verificar el login
    buscarPorCredenciales: async (usuario, password) => {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE nombre = ? AND contraseña = ?',
            [usuario, password]
        );
        return rows;
    },
    //Cambiar la contraseña en la base de datos
    actualizarPassword: async (usuario, passwordActual, nuevoPassword) => {
        //Se buscamos si existe el usuario con su contraseña actual
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE nombre = ? AND contraseña = ?',
            [usuario, passwordActual]
        );

        //error controlado si no se encuentra ninguna coincidencia
        if (rows.length === 0) {
            throw new Error('Usuario o contraseña actual incorrectos');
        }

        //coincide actualizamos a la nueva contraseña
        const [resultado] = await pool.query(
            'UPDATE usuarios SET contraseña = ? WHERE nombre = ?',
            [nuevoPassword, usuario]
        );

        return resultado;
    }
};

export default UsuarioModel;