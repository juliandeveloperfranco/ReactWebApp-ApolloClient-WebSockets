import React, {Fragment, useState} from 'react';
import {Mutation} from "react-apollo";
import {CREATE_USER} from "../../mutations";
import {withRouter} from "react-router-dom";

const Register = (props) => {

    const [user, saveUser] = useState({
        username: '',
        password: '',
        rpassword: '',
        nameUser: '',
        rol: ''
    });


    return (
        <Fragment>
            <h1 className="text-center mb-5">Nuevo Usuario</h1>
            <div className="row  justify-content-center">
                <Mutation mutation={CREATE_USER} onCompleted={() => (props.history.push('/login'))}>

                    {(createUser, {error, loading, data}) => (
                        <Fragment>
                            {error && <div className="alert alert-danger" role="alert">
                                {error.message} <span className="alert-link"> Click Here</span>.
                                Ooopps this user alredy exists
                            </div>}
                            <form
                                className="col-md-8"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    if (user.password !== user.rpassword) {
                                        console.log("no coinciden")
                                    } else {

                                        createUser({
                                            variables: {
                                                username: user.username,
                                                password: user.password,
                                                nameUser: user.nameUser,
                                                rol: user.rol
                                            }
                                        })
                                    }
                                }}
                            >
                                <div className="form-group">
                                    <label>Usuario</label>
                                    <input
                                        type="text"
                                        name="usuario"
                                        className="form-control"
                                        placeholder="Usuario"
                                        required={true}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            saveUser({
                                                username: e.target.value
                                            })
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Nombre Usuario</label>
                                    <input
                                        type="text"
                                        name="nameuser"
                                        className="form-control"
                                        placeholder="Nombre Usuario"
                                        required={true}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            saveUser({
                                                ...user,
                                                nameUser: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        required={true}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            saveUser({
                                                ...user,
                                                password: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Repetir Password</label>
                                    <input
                                        type="password"
                                        name="repetirPassword"
                                        className="form-control"
                                        placeholder="Repetir Password"
                                        required={true}
                                        onChange={(e) => {
                                            saveUser({
                                                ...user,
                                                rpassword: e.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tipo Cliente</label>
                                    <select
                                        onChange={(e) => saveUser({
                                            ...user,
                                            rol: e.target.value
                                        })}
                                        required={true}
                                        name="type"
                                        className="form-control">
                                        <option value="">Elegir...</option>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="CLIENT">CLIENT</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success float-right">
                                    Crear Usuario
                                </button>


                            </form>
                        </Fragment>

                    )
                    }

                </Mutation>
            </div>
        </Fragment>
    );
};

export default withRouter(Register);