function mayorMenor(arr) {
    let mayor = Math.max(...arr);
    let menor = Math.min(...arr);

    return { mayor, menor };
}

console.log(mayorMenor([3,1,5,4,2]));