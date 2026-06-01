const express = require("express");
const router = express.Router();

const categoriasController =
require("../controllers/categorias.controller");

router.post("/categorias",
    categoriasController.crearCategoria);

router.get("/categorias",
    categoriasController.obtenerCategorias);

router.get("/categorias/:id",
    categoriasController.obtenerCategoriaPorId);

router.patch("/categorias/:id",
    categoriasController.actualizarCategoria);

router.delete("/categorias/:id",
    categoriasController.eliminarCategoria);

module.exports = router;