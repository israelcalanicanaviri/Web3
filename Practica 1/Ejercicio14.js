function promesaEjemplo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hola desde promesa");
        }, 2000);
    });
}

function conCallback(callback) {
    promesaEjemplo().then(resultado => callback(resultado));
}

conCallback((res) => {
    console.log("Resultado:", res);
});
