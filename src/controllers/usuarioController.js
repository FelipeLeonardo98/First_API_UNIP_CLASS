// Setting the use of Model Usuario and dependency http=status
const Usuario = require('../models/usuario');
const status = require('http-status');
const { NOT_FOUND } = require('http-status');

// Create method Insert, getting datas received of Request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const salario = req.body.salario;
    const dataNascimento = req.body.dataNascimento;
    const ativo = req.body.ativo;

    //Inserting into model with each field's Request
    Usuario.create({
        nome: nome,
        salario: salario,
        dataNascimento: dataNascimento,
        ativo: ativo,
    })

        //then = register that we want than happend when Promise is resolved
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = register that we want happend when Promise is failed
        .catch(error => next("An error has ocurred: " + error));
};

// Create method SelectAll (Select * from ...)
exports.SelectAll = (req, res, next) => {
    Usuario.findAll()
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next("Sorry, an error ocurred with SelectAll: " + error));

};

exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next("Sorry, an error ocurred when findById was requisited: " + error));
};

