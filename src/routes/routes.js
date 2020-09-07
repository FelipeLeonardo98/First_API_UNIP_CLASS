// Creating routes/group's routes
const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const router = express.Router();

// route '/usuarios' getting the method 'Insert' from UsuarioController
router.post('/usuarios', UsuarioController.Insert);


module.exports = router;