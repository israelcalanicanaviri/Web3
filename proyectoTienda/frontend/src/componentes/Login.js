import React, { useState } from 'react';
import api from '../servicios/api.js'; // Tu configuración de Axios

function Login() {
    //  Estados para el Login
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    // Estados para el Registro
    const [newUser, setNewUser] = useState('');
    const [newPass, setNewPass] = useState('');

    // Estado para el mensaje dinámico e interactivo
    const [mensaje, setMensaje] = useState('');
    const [colorMensaje, setColorMensaje] = useState('black');

    // NUEVOS ESTADOS DE SEGURIDAD PARA CAMBIAR CONTRASEÑA 
    const [changeUser, setChangeUser] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [changeNewPass, setChangeNewPass] = useState('');

    // Función auxiliar para emular tu "mostrarMensaje" original
    const mostrarMensaje = (texto, color) => {
        setMensaje(texto);
        setColorMensaje(color);
    };

    // --- FUNCIÓN REGISTRAR ---
    const manejarRegistrar = async (e) => {
        e.preventDefault();
        if (newUser === "" || newPass === "") {
            mostrarMensaje("⚠️ Completa los campos", "orange");
            return;
        }

        try {
            const respuesta = await api.post('/registrar', {
                usuario: newUser,
                password: newPass
            });

            mostrarMensaje("✅ ¡Registrado!", "green");
            setNewUser('');
            setNewPass('');

            // Recarga la página después de 1 segundo como tu código original
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            const msgError = error.response?.data?.mensaje || "Error en el servidor";
            mostrarMensaje(" Error: " + msgError, "red");
        }
    };

    // --- FUNCIÓN LOGIN ---
    const manejarLogin = async (e) => {
        e.preventDefault();
        if (usuario === "" || password === "") {
            mostrarMensaje("⚠️ Completa los campos", "orange");
            return;
        }

        try {
            const respuesta = await api.post('/login', {
                usuario: usuario,
                password: password
            });

            const datos = respuesta.data;

            // Guardamos los datos de inmediato en el LocalStorage
            localStorage.setItem("usuarioActivo", usuario);
            localStorage.setItem("idUsuarioActivo", datos.id_usuario);

            // Mostramos primero el mensaje azul de transición
            mostrarMensaje("🚀 Entrando al catálogo...", "blue");

            // Redirección simulada o cambio de estado tras 1 segundo
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            const msgError = error.response?.data?.mensaje || "Error de conexión";
            mostrarMensaje("❌ " + msgError, "red");
        }
    };

    // --- FUNCIÓN CAMBIAR CONTRASEÑA ---
    const manejarCambiarPassword = async (e) => {
        e.preventDefault();
        if (changeUser === "" || currentPass === "" || changeNewPass === "") {
            mostrarMensaje("⚠️ Completa todos los campos", "orange");
            return;
        }

        try {
            const respuesta = await api.post('/cambiar-password', {
                usuario: changeUser,
                passwordActual: currentPass,
                nuevoPassword: changeNewPass
            });

            mostrarMensaje("🔄 ¡Contraseña actualizada!", "green");
            setChangeUser('');
            setCurrentPass('');
            setChangeNewPass('');

            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            const msgError = error.response?.data?.mensaje || "No se pudo cambiar la contraseña";
            mostrarMensaje(" Error: " + msgError, "red");
        }
    };
    

    return (
        <div style={estilos.body}>
            <div style={estilos.container}>
                <h2>🔐 Login</h2>
                <form onSubmit={manejarLogin}>
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        style={estilos.input}
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        style={estilos.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" style={estilos.button}>Ingresar</button>
                </form>

                <h3>📝 Registrarse</h3>
                <form onSubmit={manejarRegistrar}>
                    <input 
                        type="text" 
                        placeholder="Nuevo usuario" 
                        style={estilos.input}
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Nueva contraseña" 
                        style={estilos.input}
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                    />
                    <button type="submit" style={estilos.button}>Registrar</button>
                </form>

                {/* cambiar contraseña */}
                <hr style={{ border: '0', height: '1px', background: '#eee', margin: '15px 0' }} />

                <h3>🔄 Cambiar Contraseña</h3>
                <form onSubmit={manejarCambiarPassword}>
                    <input 
                        type="text" 
                        placeholder="Tu usuario" 
                        style={estilos.input}
                        value={changeUser}
                        onChange={(e) => setChangeUser(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña actual" 
                        style={estilos.input}
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Nueva contraseña" 
                        style={estilos.input}
                        value={changeNewPass}
                        onChange={(e) => setChangeNewPass(e.target.value)}
                    />
                    <button type="submit" style={{ ...estilos.button, background: '#5c6bc0' }}>Actualizar</button>
                </form>

                {/* Tu etiqueta de mensaje original con color dinámico */}
                <p style={{ ...estilos.mensaje, color: colorMensaje }}>{mensaje}</p>
            </div>
        </div>
    );
}

// Objeto con tus estilos CSS originales corregidos para React (camelCase)
const estilos = {
    body: {
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0
    },
    container: {
        background: 'white',
        padding: '25px',
        borderRadius: '15px',
        width: '320px',
        textAlign: 'center', 
        boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
        maxHeight: '90vh',        //  Evita que se salga de la pantalla si crece mucho
        overflowY: 'auto'        //  Añade scroll interno si la pantalla es muy chica
    },
    input: {
        width: '90%',
        padding: '10px',
        margin: '8px 0',
        borderRadius: '8px',
        border: '1px solid #ccc',
        boxSizing: 'border-box' 
    },
    button: {
        width: '90%',
        padding: '10px',
        margin: '8px 0',
        borderRadius: '8px',
        border: 'none',
        background: '#2a5298',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    mensaje: {
        fontWeight: 'bold',
        marginTop: '15px'
    }
};

export default Login;