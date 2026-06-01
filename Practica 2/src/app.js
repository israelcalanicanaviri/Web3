const express = require("express");
const app = express();

const categoriasRoutes =
require("./routes/categorias.routes");

app.use(express.json());

app.use("/api", categoriasRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});