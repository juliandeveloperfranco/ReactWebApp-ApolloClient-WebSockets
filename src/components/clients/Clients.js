import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import {QUERY_CLIENTS} from "../../queries";
import {Link} from "react-router-dom";
import Mutation from "react-apollo/Mutation";
import {DELETE_CLIENT} from "../../mutations";
import {Redirect} from "react-router-dom";

const Clients = (props) => {


    if(props.session.getUser === null){
        return (<Redirect to={"/login"}/>);
    }

    let identifier;

    const {rol} = props.session.getUser;

    if (rol === 'SELLER') {
        identifier = props.session.getUser.id;
    } else {
        identifier = '';
    }

    return (
        <Query query={QUERY_CLIENTS} pollInterval={200} variables={{seller: identifier}}>

            {({loading, error, data, startPolling, stopPolling}) => {
                if (loading) return "Loading";
                if (error) return error.message;
                // console.log(data);
                return (
                    <Fragment>
                        <h2 className="text-center mt-4">
                            My Clients
                        </h2>

                        <ul className="list-group mt-4">
                            {
                                data.getClients.map((client) => (
                                    <li key={client.id} className="list-group-item">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-md-6 d-flex justify-content-between align-items-center">
                                                {client.name} {client.lastname}- {client.company}
                                            </div>
                                            <div className="col-md-6 d-flex justify-content-end">
                                                <Mutation mutation={DELETE_CLIENT}>
                                                    {(deleteClient, {loading, error}) => (
                                                        <button
                                                            onClick={() => {
                                                                deleteClient({
                                                                    variables: {id: client.id}
                                                                });
                                                            }}
                                                            className="btn btn-outline-danger mr-2 d-black d-block d-md-inline-block">
                                                            Delete
                                                        </button>
                                                    )}
                                                </Mutation>

                                                <Link to={`/orders/create/${client.id}`}
                                                      className="btn btn-outline-warning mr-2 d-black d-block d-md-inline-block">
                                                    Make Order
                                                </Link>

                                                <Link to={`/orders/${client.id}`}
                                                      className="btn btn-outline-primary mr-2 d-black d-block d-md-inline-block">
                                                    See Order
                                                </Link>

                                                <Link to={`/clients/edit/${client.id}`}
                                                      className="btn btn-outline-info d-black d-block d-md-inline-block">
                                                    Edit Client
                                                </Link>


                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </Fragment>
                )
            }}
        </Query>
    )
};
export default Clients;