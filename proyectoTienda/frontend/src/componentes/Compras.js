import React, { useState, useEffect } from 'react';

function Compras({ volverAlCatalogo }) {
    const [historial, setHistorial] = useState({});
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    const usuario = localStorage.getItem("usuarioActivo") || "Usuario";
    const idUsuario = localStorage.getItem("idUsuarioActivo");

    useEffect(() => {
        async function mostrarMiHistorial() {
            if (!idUsuario) {
                setCargando(false);
                return;
            }

            try {
                const respuesta = await fetch(`http://localhost:3001/historial/${idUsuario}`);
                if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");

                const datos = await respuesta.json();
                
                if (!datos || datos.length === 0) {
                    setHistorial({});
                    setCargando(false);
                    return;
                }

                const comprasAgrupadas = {};
                datos.forEach(p => {
                    const idDeLaCompra = p.id_compra;
                    if (!comprasAgrupadas[idDeLaCompra]) {
                        comprasAgrupadas[idDeLaCompra] = { fecha: p.fecha, productos: [] };
                    }
                    comprasAgrupadas[idDeLaCompra].productos.push(p);
                });

                setHistorial(comprasAgrupadas);
                setCargando(false);
            } catch (err) {
                console.error(err);
                setError(true);
                setCargando(false);
            }
        }
        mostrarMiHistorial();
    }, [idUsuario]);

    return (
        <div>
            {/* Navbar Superior Idéntico al Catálogo */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <button className="navbar-brand btn btn-link text-white text-decoration-none" onClick={volverAlCatalogo}>
                        <img src="img/logo.jpeg" alt="Logo" height="50" className="me-2" />
                        Tienda en Línea
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-2">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white-50 text-decoration-none" onClick={volverAlCatalogo}>Inicio</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white-50 text-decoration-none" onClick={volverAlCatalogo}>Catálogo</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white-50 text-decoration-none">Contacto</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white text-decoration-none">Compras</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-3">
                <h4>Bienvenid@ {usuario}</h4>
                <h2 className="my-4">Historial de tus Compras</h2>

                {cargando && (
                    <div className="text-center p-4">
                        <div className="spinner-border text-dark" role="status"></div>
                        <div className="mt-2">Cargando tus compras...</div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger text-center">❌ Error al cargar tu historial.</div>
                )}

                {!cargando && !error && Object.keys(historial).length === 0 && (
                    <div className="text-center p-5 bg-white rounded shadow-sm border">
                        <h4 className="text-muted">No tienes compras registradas aún 🛒</h4>
                    </div>
                )}

                {!cargando && !error && Object.keys(historial).map((id, index) => {
                    let totalCompra = 0;
                    const items = historial[id].productos;

                    return (
                        <div className="card shadow-sm mb-4 bg-white" key={id}>
                            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                                <strong>Compra #{index + 1}</strong>
                                <span>Fecha: {new Date(historial[id].fecha).toLocaleDateString()}</span>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-hover mb-0 text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Producto</th>
                                            <th>Cant.</th>
                                            <th>Precio</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((p, i) => {
                                            const subtotal = p.cantidad * p.precio;
                                            totalCompra += subtotal;
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{p.producto}</td>
                                                    <td>{p.cantidad}</td>
                                                    <td>${parseFloat(p.precio).toFixed(2)}</td>
                                                    <td>${subtotal.toFixed(2)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer text-end bg-light">
                                <h5 className="mb-0">
                                    Total de esta orden: <strong>${totalCompra.toFixed(2)}</strong>
                                </h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Compras;