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
        .catch(error => next(`An error has ocurred ${error}`));
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
        .catch(error => next(`Sorry, an error ocurred with SelectAll:   ${error}`));

};

// Create method that return an only register (Select * from table where id = ....)
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send(`Sorry, user with id ${id} not found!`);
            }
        })
        .catch(error => next(`Sorry, an error ocurred when findById was requisited:  ${error}`));
};

//Create Update method
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const salario = req.body.salario;
    const dataNascimento = req.body.dataNascimento;
    const ativo = req.body.ativo;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.update({
                    nome: nome,
                    salario: salario,
                    dataNascimento: dataNascimento,
                    ativo: ativo
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send(`User with id ${id} updated with success`);
                    })
                    .catch(error => next(`Ops Attention! Look the following error: ${error}`));
            } else {
                res.status(status.NOT_FOUND).send(`Sorry, user with id ${id} not found!`);
            }
        })
        .catch(error => next(`Ops Attention! Look the following error: ${error}`));
};

// Create method delete
exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)

        .then(usuario => {
            if (usuario) {
                usuario.destroy({ where: { id: id } })
                    .then(() => {
                        res.status(status.OK).send(`Done! User with id ${id} was deleted with success!`);
                    })
                    .catch(error => next(`Ops Attention! Look the following error: ${error}`));
            } else {
                res.status(status.NOT_FOUND).send(`Sorry, user with id ${id} not found!`);
            }
        })
        .catch(error => next(`Ops Attention! Look the following error: ${error}`));
}
