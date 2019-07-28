import React, {Component, Fragment} from 'react';

import {withRouter} from 'react-router-dom';


import {Mutation} from 'react-apollo';
import {AUTH_USER} from "../../mutations";

const initialState = {
    user: '',
    password: ''
};

class Login extends Component {
    state = {
        ...initialState
    };

    actualizarState = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        })
    };


    limpiarState = () => {
        this.setState({...initialState});
    };

    iniciarSesion = (e, authUser) => {
        e.preventDefault();

        authUser().then(async ({data}) => {

            localStorage.setItem('token', data.authUser.token);

            // execute query when be safe

            await this.props.refetch();

            //clean state
            this.limpiarState();


            this.props.history.push('/panel');


        })

    };

    validarForm = () => {
        const {user, password} = this.state;

        const noValido = !user || !password;

        return noValido;
    };

    render() {

        const {user, password} = this.state;

        return (
            <Fragment>
                <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">

                    <Mutation
                        mutation={AUTH_USER}
                        variables={{user, password}}
                    >
                        {(authUser, {loading, error, data}) => {

                            return (

                                <form
                                    onSubmit={e => this.iniciarSesion(e, authUser)}
                                    className="col-md-8"
                                >

                                    {error && <div className="alert alert-danger" role="alert">
                                        {error.message} <span className="alert-link"> Click Here</span>.
                                        Ooopps Incorrect password or username
                                    </div>}


                                    <div className="form-group">
                                        <label>user</label>
                                        <input
                                            onChange={this.actualizarState}
                                            value={user}
                                            type="text"
                                            name="user"
                                            className="form-control"
                                            placeholder="Nombre user"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            onChange={this.actualizarState}
                                            value={password}
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                    </div>

                                    <button
                                        disabled={
                                            loading || this.validarForm()
                                        }
                                        type="submit"
                                        className="btn btn-success float-right">
                                        Iniciar Sesión
                                    </button>

                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);