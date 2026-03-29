function callbackFuncion(cb) {
    setTimeout(() => {
        cb("Hola desde callback");
    }, 1000);
}

function convertirAPromesa() {
    return new Promise((resolve) => {
        callbackFuncion(resolve);
    });
}

convertirAPromesa().then(console.log);