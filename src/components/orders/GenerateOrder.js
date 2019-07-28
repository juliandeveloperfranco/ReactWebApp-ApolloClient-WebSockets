import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import {CREATE_ORDER} from "../../mutations";
import {withRouter} from "react-router-dom";

const GenerateOrder = (props) => {

    const {id} = props.match.params;

    return (
        <Fragment>

            <Mutation mutation={CREATE_ORDER} onCompleted={() => (props.history.push('/clients'))}>
                {
                    createOrder => (
                        <button
                            type="button"
                            className="btn btn-warning mt-4"
                            onClick={(e) => {
                                e.preventDefault();

                                const orderP = props.products.products.map(({name, price, stock, ...object}) => (
                                    object
                                ));

                                const input = {
                                    "client": id,
                                    "total": props.total,
                                    "order": orderP
                                };

                                createOrder({
                                    variables: {input}
                                })
                            }}
                        >
                            Generar Orden
                        </button>
                    )
                }


            </Mutation>

        </Fragment>
    );
};

export default withRouter(GenerateOrder);
