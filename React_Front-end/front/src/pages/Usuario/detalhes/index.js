import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Usuario extends Component {
    state = {
        usuario: {},
    };

    componentDidMount() {
        // obtendo o id através da url
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/usuarios/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
        //acessando a API, e ao localizar, passar para json
    }

    // renderizando no HTML
    render() {
        //criando um objeto "usuario" através do state (API)
        const { usuario } = this.state;

        if (usuario.ativo) {
            usuario.ativo = "Usuário Ativo";
        } else {
            usuario.ativo = "Usuário Inativo";
        }

        // retornando o objeto da API com os campos, tudo em uma div
        return (
            <div className="usuario-info">
                <h1> {usuario.nome} </h1>
                <h1> {usuario.ativo} </h1>
                <h1> {usuario.salario} </h1>
                <h1> {usuario.dataNascimento} </h1>
                <br />
                <Link to={`/usuarios`}> Voltar </Link> <br />
                <Link to={`/editarUsuario/${usuario.id}`}> Editar </Link> <br />
                <Link to={`/deletarUsuario/${usuario.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
