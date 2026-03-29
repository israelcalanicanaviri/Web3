new Promise((resolve) => {
    resolve(5);
})
.then(num => num * 2)
.then(num => num + 10)
.then(resultado => console.log(resultado));