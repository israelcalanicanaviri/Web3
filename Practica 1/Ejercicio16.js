function obtenerDatos() {
    return Promise.resolve("Datos obtenidos");
}

// CON PROMESAS
obtenerDatos().then(console.log);

// CON ASYNC/AWAIT
async function mostrarDatos() {
    let datos = await obtenerDatos();
    console.log(datos);
}

mostrarDatos();