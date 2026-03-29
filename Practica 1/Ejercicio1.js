function contarVocales(texto) {
    let vocales = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    for (let letra of texto.toLowerCase()) {
        if (vocales.hasOwnProperty(letra)) {
            vocales[letra]++;
        }
    }

    return vocales;
}

console.log(contarVocales("euforia"));