function paso1() {
    return Promise.resolve("Paso 1");
}

function paso2() {
    return Promise.resolve("Paso 2");
}

async function ejecutarPasos() {
    let r1 = await paso1();
    console.log(r1);

    let r2 = await paso2();
    console.log(r2);
}

ejecutarPasos();