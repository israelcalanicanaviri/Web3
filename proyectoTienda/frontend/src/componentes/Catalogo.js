import React, { useState, useEffect } from 'react';
import Compras from './Compras'; 

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [vistaActual, setVistaActual] = useState("catalogo"); 
    
    // Estados para los filtros
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroMarca, setFiltroMarca] = useState("");
    const [filtroTamaño, setFiltroTamaño] = useState("");

    const usuario = localStorage.getItem("usuarioActivo") || "Usuario";

    // Conexión con la tabla Productos 
    useEffect(() => {
        async function cargarProductos() {
            try {
                const respuesta = await fetch("http://localhost:3001/productos");
                const datos = await respuesta.json();
                if (Array.isArray(datos)) {
                    setProductos(datos);
                } else {
                    setProductos([]);
                }
            } catch (error) {
                console.error("Error cargando productos:", error);
                setProductos([]);
            }
        }
        cargarProductos();
    }, []);

    // Función para manejar el desplazamiento suave hacia el catálogo
    const irAlCatalogo = () => {
        setVistaActual("catalogo");
        // Esperamos un milisegundo a que se monte la vista y hacemos scroll
        setTimeout(() => {
            const seccionCatalogo = document.getElementById("seccion-catalogo");
            if (seccionCatalogo) {
                seccionCatalogo.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    //  FUNCIÓN DE CONTACTOS  mensaje flotante
    const mostrarContacto = () => {
        alert("✉️ Contacto de la Tienda:\n\n👤 Nombre: Mamani choque  Sandra Irene\n📞 Cell: +591 69968940\n📇 CI: 9224545 L.P.\n\n👤 Nombre: Calani Canaviri Israel Lucas\n📞 Cell: +591 69702544 \n📇 CI: 11103103 L.P.\n⏰ Horario: Lunes y Miercoles 10:00 - 12:00");
    };

    if (vistaActual === "compras") {
        return <Compras volverAlCatalogo={() => setVistaActual("catalogo")} />;
    }

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioActivo");
        localStorage.removeItem("idUsuarioActivo");
        window.location.href = "login.html"; 
    };

    const agregarAlCarrito = (id, nombre, precio) => {
        const productoExistente = carrito.find(p => p.producto_id === id);
        if (productoExistente) {
            setCarrito(carrito.map(p => 
                p.producto_id === id ? { ...p, cantidad: p.cantidad + 1 } : p
            ));
        } else {
            setCarrito([...carrito, { producto_id: id, nombre, precio: parseFloat(precio), cantidad: 1 }]);
        }
    };

    const eliminarProducto = (index) => {
        setCarrito(carrito.filter((_, i) => i !== index));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const comprar = async () => {
        if (carrito.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        const usuarioId = localStorage.getItem("idUsuarioActivo"); 
        if (!usuarioId) {
            alert("Sesión expirada. Por favor, inicia sesión de nuevo.");
            return;
        }

        const totalSuma = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

        const datosCompra = {
            usuario_id: parseInt(usuarioId),
            total: parseFloat(totalSuma),
            productos: carrito 
        };

        try {
            const respuesta = await fetch("http://localhost:3001/compras", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosCompra)
            });

            if (respuesta.ok) {
                alert("¡Compra realizada y guardada en la base de datos!");
                vaciarCarrito();
            } else {
                alert("Error al procesar la compra en el servidor");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor para guardar la compra");
        }
    };

    const productosFiltrados = Array.isArray(productos) 
        ? productos.filter((p) => {
            const matchCategoria = !filtroCategoria || p.tipo === filtroCategoria;
            const matchMarca = !filtroMarca || p.marca === filtroMarca;
            const matchTamaño = !filtroTamaño || p.tamaño === filtroTamaño;
            return matchCategoria && matchMarca && matchTamaño;
          })
        : [];

    const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <button className="navbar-brand btn btn-link text-white text-decoration-none" onClick={() => setVistaActual("catalogo")}>
                        <img src="img/logo.jpeg" alt="Logo" height="50" className="me-2" />
                        Tienda en Línea
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-2">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white text-decoration-none" onClick={() => setVistaActual("catalogo")}>Inicio</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white-50 text-decoration-none" onClick={irAlCatalogo}>Catálogo</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white-50 text-decoration-none" onClick={mostrarContacto}>Contacto</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-white-50 text-decoration-none" onClick={() => setVistaActual("compras")}>Compras</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Nombre del cliente */}
            <div className="container mt-3 d-flex justify-content-between align-items-center">
                <h4>Bienvenid@ {usuario}</h4>
                <button className="btn btn-danger" onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </div>

            {/* Filtros */}
            <div className="container mt-4">
                <h2>Productos de la Tienda</h2>
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">Categoria:</label>
                        <select className="form-select" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="Snack">Snack</option>
                            <option value="Bebida">Bebida</option>
                            <option value="Chocolates">Chocolates</option>      
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Marca:</label>
                        <select className="form-select" value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="Coca Cola">Coca Cola</option>
                            <option value="Estrella">Estrella</option>
                            <option value="Nestle">Nestle</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Tamaño:</label>
                        <select className="form-select" value={filtroTamaño} onChange={(e) => setFiltroTamaño(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="pequeño">pequeño</option>
                            <option value="grande">grande</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Identificador id="seccion-catalogo" añadido aquí para el scroll */}
            <div id="seccion-catalogo" className="container mt-4 pt-2">
                <h2>Catálogo de Productos</h2>
                <div className="row">
                    {productosFiltrados.map((p) => (
                        <div className="col-md-3" key={p.id_producto}>
                            <div className="card mb-4" style={{ width: "100%" }}>
                                <img src={p.imagen} className="card-img-top" alt={p.nombre} style={{ height: "180px", objectFit: "contain", paddingTop: "15px" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.nombre}</h5>
                                    <p className="card-text">
                                        Categoria: {p.tipo}<br />
                                        Tamaño: {p.tamaño}<br />
                                        Marca: {p.marca}<br />
                                        Precio: ${parseFloat(p.precio).toFixed(2)}
                                    </p>
                                    <button className="btn btn-primary" onClick={() => agregarAlCarrito(p.id_producto, p.nombre, p.precio)}>
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Carrito de Compras */}
            <div className="container mt-4">
                <h2>Carrito de Compras</h2>
                <ul className="list-group mb-3">
                    {carrito.map((item, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            <span>{item.nombre} (x{item.cantidad})</span>
                            <div>
                                <span className="badge bg-primary rounded-pill me-2">
                                    ${(item.precio * item.cantidad).toFixed(2)}
                                </span>
                                <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(index)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <h5>Total: ${totalCarrito.toFixed(2)}</h5>
                <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={comprar}>Comprar</button>
                    <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar carrito</button>
                </div>
            </div>

            {/* Carrusel */}
            <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="img/cocaBaner.jpg" className="d-block w-100" alt="Banner 1" style={{ height: "400px", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="img/laEstrella.jpg" className="d-block w-100" alt="Banner 2" style={{ height: "400px", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="img/nestle.jpg" className="d-block w-100" alt="Banner 3" style={{ height: "400px", objectFit: "cover" }} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <div className="container">
                    <p className="mb-0">&copy; 2026 Tienda en Línea. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Catalogo;