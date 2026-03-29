// CALLBACK (difícil)
setTimeout(() => {
    console.log("Paso 1");
    setTimeout(() => {
        console.log("Paso 2");
    }, 1000);
}, 1000);

// ASYNC/AWAIT (mejor)
function esperar(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function ejecutar() {
    await esperar(1000);
    console.log("Paso 1");
    await esperar(1000);
    console.log("Paso 2");
}

ejecutar();