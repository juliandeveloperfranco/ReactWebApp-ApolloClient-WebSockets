import React, {Fragment, useState} from 'react';
import {UPDATE_CLIENT} from "../../mutations";
import {Mutation} from "react-apollo";
import {withRouter} from "react-router-dom";

const FormEditClient = (props) => {

    const {name, lastname, age, company, type} = props.client;
    const {id} = props;
    const dbEmail = props.client.emails;


    const [client, saveClient] = useState({
        name: name,
        lastname: lastname,
        company: company,
        age: age,
        type: type
    });

    const [emails, saveEmails] = useState({
        emails: dbEmail
    });

    const newEmailField = () => {
        saveEmails({
            emails: emails.emails.concat([{email: ''}])
        });
    };

    const deleteEmailField = (i) => {
        saveEmails({
            emails: emails.emails.filter((email, index) => i !== index)
        })
    };

    const readEmailField = (e, i) => {
        const newEmail = emails.emails.map((email, index) => {

            if (i !== index) return email;

            return {
                ...email,
                email: e.target.value
            }

        });

        saveEmails({
            emails: newEmail
        });
    };


    return (
        <Fragment>
            <h2 className="text-center mb-4">Update Client</h2>
            <div className="row justify-content-center">

                <Mutation mutation={UPDATE_CLIENT}
                          onCompleted={() => props.refetch().then(()=>{
                              props.history.push('/clients');
                          })}>
                    {
                        updateClient => (

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const {name, lastname, company, age, type} = client;

                                const input = {
                                    id: id,
                                    name: name,
                                    lastname: lastname,
                                    company: company,
                                    age: Number(age),
                                    emails: emails.emails,
                                    type: type,
                                };

                                updateClient({
                                    variables: {input}
                                })

                            }}
                                  className="col-md-8 m-3">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input
                                            onChange={(e) => saveClient({
                                                ...client,
                                                name: e.target.value
                                            })}
                                            defaultValue={name}
                                            required={true}
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Nombre"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input
                                            required={true}
                                            onChange={(e) => saveClient({
                                                ...client,
                                                lastname: e.target.value
                                            })}
                                            type="text"
                                            defaultValue={lastname}
                                            name="lastname"
                                            className="form-control"
                                            placeholder="Apellido"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Empresa</label>
                                        <input
                                            onChange={(e) => saveClient({
                                                ...client,
                                                company: e.target.value
                                            })}
                                            defaultValue={company}
                                            required={true}
                                            type="text"
                                            name="company"
                                            className="form-control"
                                            placeholder="Empresa"/>
                                    </div>

                                </div>

                                <div className="form-row">

                                    <div className="form-group col-md-12 center-block">
                                        <button onClick={newEmailField} type="button"
                                                className="btn btn-outline-warning btn-lg btn-block">
                                            + Agregar Email
                                        </button>

                                    </div>

                                    {emails.emails.map((email, index) => (

                                        <div className="input-group mb-3" key={index}>
                                            <input
                                                onChange={(e) => readEmailField(e, index)}
                                                type="email" className="form-control"
                                                placeholder={`Email ${index + 1}`}
                                                defaultValue={email.email}
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"/>
                                            <div className="input-group-append">
                                                <button onClick={() => deleteEmailField(index)}
                                                        className="btn btn-outline-danger"
                                                        type="button">Eliminar
                                                </button>
                                            </div>
                                        </div>

                                    ))}

                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input
                                            onChange={(e) => saveClient({
                                                ...client,
                                                age: e.target.value
                                            })}
                                            required={true}
                                            type="text"
                                            name="age"
                                            defaultValue={age}
                                            className="form-control"
                                            placeholder="Edad"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tipo Cliente</label>
                                        <select
                                            onChange={(e) => saveClient({
                                                ...client,
                                                type: e.target.value
                                            })}
                                            defaultValue={type}
                                            required={true}
                                            name="type"
                                            className="form-control">
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASIC">BÁSICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-outline-success float-right">Guardar Cambios
                                </button>
                            </form>

                        )}
                </Mutation>
            </div>
        </Fragment>
    );

};

export default withRouter(FormEditClient);