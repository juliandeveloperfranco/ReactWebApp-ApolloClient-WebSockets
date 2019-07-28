import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import {QUERY_CLIENT} from "../../queries";
import Emails from "./Emails";

const ClientInformation = (props) => {

    const {id} = props;

    return (
        <Fragment>

            <h2>Resumen</h2>

            <Query query={QUERY_CLIENT} pollInterval={200} variables={{id}}>

                {({loading, error, data, fetch, startPolling, stopPolling}) => {
                    if (loading) return 'loading';
                    if (error) return error;
                    const {name, lastname, emails, age, type} = data.getClient;
                    return (
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold p-2">
                                <span className="font-weight-normal"><b>Nombre: </b>{name}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                <span className="font-weight-normal"><b>Apellido: </b>{lastname}</span>
                            </li>


                            <li className="border font-weight-bold p-2">
                                <b>Emails:</b> &nbsp;

                                <div>
                                    {
                                        emails.length === 0 ?
                                            'No hay Correos Registrados'
                                            : emails.map((email, index) => {
                                                return (
                                                    <Emails
                                                        email={email}
                                                        key={index}
                                                    />
                                                )
                                            })
                                    }

                                </div>
                            </li>


                            <li className="border font-weight-bold p-2">
                                <span className="font-weight-normal"><b>Edad: </b>{age}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                <span className="font-weight-normal"><b>Tipo Cuenta: </b>{type}</span>
                            </li>
                        </ul>
                    )
                }}

            </Query>

        </Fragment>
    )
};

export default ClientInformation;