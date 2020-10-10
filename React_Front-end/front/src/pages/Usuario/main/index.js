import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
//importando bootstrap após instalação
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: [],
            erro: null
        };
    }

    // fazendo conexão com API própria
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))

            )
            .catch(error => this.setState({ error }));


    }

    // jogando tudo oque achar para o state
    render() {
        const { usuario } = this.state;
        // dando tudo que existe no state para  objeto {usuario}
        return (
            <div className="usuario-list">
                <Link to={`/criarUsuario`}> <button type="button" class="btn btn-success"> Novo </button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Salário</th>
                            <th scope="col">Nascimento</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map((usuario, index) =>
                            <tr>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td>{usuario.ativo ? "Sim" : "Não"}</td>
                                <td><Link to={`/usuarios/${usuario.id}`}>
                                    <button type="button" class="btn btn-primary">Detalhes</button>
                                </Link></td>
                                <td><button type="button" class="btn btn-warning"> Atualizar </button> </td>
                                <td><button type="button" class="btn btn-danger"> Excluir </button> </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )

        /*return usuario.map((usuario, index) => (

            <div className="usuario-list">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">Nome: {usuario.nome}</h5>

                    <article key={usuario._id}>
                        <strong>Salário:  {usuario.salario} </strong>
                        <p> <Link to={`/usuarios/${usuario.id}`}> Acessar </Link> </p>
                        <br />
                    </article>
                </div>
            </div>
        )) */
    };
}
