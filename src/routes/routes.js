// Creating routes/group's routes
const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const router = express.Router();

// routes '/usuarios' getting the methods  from UsuarioController
router.post('/usuarios', UsuarioController.Insert);
router.get('/usuarios', UsuarioController.SelectAll);
router.get('/usuarios/:id', UsuarioController.SelectDetail);
router.put('/usuarios/:id', UsuarioController.Update);
router.delete('/usuarios/:id', UsuarioController.Delete);

module.exports = router;