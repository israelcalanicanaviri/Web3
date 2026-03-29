function esPalindromo(texto) {
    let invertido = texto.split("").reverse().join("");
    return texto === invertido;
}

console.log(esPalindromo("oruro"));
console.log(esPalindromo("hola"));