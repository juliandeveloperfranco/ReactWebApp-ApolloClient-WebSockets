import React, {Fragment} from 'react';
import {ApolloConsumer} from "react-apollo";
import {withRouter} from "react-router-dom";

const signOutUser = (client, history) => {
    localStorage.removeItem('token', '');

    client.resetStore();

    history.push('/');
};

const SignOut = ({history}) => (
    <ApolloConsumer>
        {
            client => {
                return (
                    <Fragment>
                        <button
                            onClick={() => signOutUser(client, history)}
                            className="btn btn-outline-danger">
                            Cerrar Sesion
                        </button>
                    </Fragment>
                )
            }
        }
    </ApolloConsumer>
);

export default withRouter(SignOut);
