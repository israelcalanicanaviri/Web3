import React, { useState, useEffect } from 'react';
import Login from './componentes/Login'; 
import Catalogo from './componentes/Catalogo.js'; 

function App() {

  const [sesionActiva, setSesionActiva] = useState(false);

  // recarga la página
  useEffect(() => {
    // Se revisa si LocalStorage ya existe el ID que guarda tu Login exitoso
    const idUsuario = localStorage.getItem("idUsuarioActivo");
    
    if (idUsuario) {
      setSesionActiva(true); // Si el ID existe (encendemos la sesión)
    }
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Si la sesión está activa muestra el Catálogo, si no, muestra el Login */}
      {sesionActiva ? <Catalogo /> : <Login />}
    </div>
  );
}

export default App;