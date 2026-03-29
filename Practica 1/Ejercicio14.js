function conCallback(callback) {
    promesaEjemplo().then(resultado => callback(resultado));
}

conCallback((res) => {
    console.log("Callback:", res);
});