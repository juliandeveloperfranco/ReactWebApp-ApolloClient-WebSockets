import React, {Fragment} from 'react';
import {Mutation, Query} from "react-apollo";
import {QUERY_PRODUCT} from "../../queries";
import {UPDATE_ORDER} from "../../mutations";

const Order = (props) => {

    const {total, state, id, date, order} = props.order;
    const dateO = new Date(Number(date));


    let classNameField;

    if (state === 'CANCELED') {
        classNameField = 'border-danger'
    } else if (state === 'SUCCESS') {
        classNameField = 'border-success'
    } else if (state === 'PENDING') {
        classNameField = 'border-warning'
    } else if (state === 'PROCESS') {
        classNameField = 'border-info'
    }

    const stylesheet = {
        borderWidth: '3px'
    };

    return (
        <Fragment>

            <div className="col-md-4">
                <div className={`card mb-3 ${classNameField}`} style={stylesheet}>
                    <div className="card-body">
                        <p className="card-text font-weight-bold ">Estado:
                            <Mutation mutation={UPDATE_ORDER}>
                                {
                                    updateOrder => (
                                        <select
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const input = {
                                                    id,
                                                    order: order,
                                                    date: date,
                                                    total: total,
                                                    state: e.target.value,
                                                    client: props.client
                                                };

                                                updateOrder({
                                                    variables: {input}
                                                })
                                            }}
                                            value={state}
                                            name="type"
                                            className="form-control">
                                            <option value="CANCELED">CANCELED</option>
                                            <option value="PROCESS">IN PROGRESS</option>
                                            <option value="SUCCESS">SUCCESS</option>
                                            <option value="PENDING">PENDING</option>
                                        </select>
                                    )

                                }
                            </Mutation>
                        </p>
                        <p className="card-text font-weight-bold">Pedido ID:
                            <span className="font-weight-normal"> {id}</span>
                        </p>
                        <p className="card-text font-weight-bold">Fecha Pedido:
                            <span className="font-weight-normal"> {dateO.toLocaleString('es-CO')}</span>
                        </p>
                        <p className="card-text font-weight-bold">Total:
                            <span className="font-weight-normal">$ {total} </span>
                        </p>

                        <h3 className="card-text text-center mb-3">Artículos del pedido</h3>

                        {
                            order.map((order) => {
                                const {id} = order;
                                return (
                                    <Query key={order.id} query={QUERY_PRODUCT} pollInterval={200} variables={{id}}>
                                        {({loading, error, data, startPolling, stopPolling}) => {
                                            if (loading) return loading;
                                            if (error) return error;
                                            return (
                                                <Fragment>
                                                    <div className="card mt-3">
                                                        <div className="card-header">
                                                            {data.getProduct.name}
                                                        </div>
                                                        <ul className="list-group list-group-flush">
                                                            <li className="list-group-item">Precio: {data.getProduct.price}</li>
                                                            <li className="list-group-item">Stock: {data.getProduct.stock}</li>
                                                            <li className="list-group-item">Cantidad: {order.quantity}</li>
                                                        </ul>
                                                    </div>
                                                </Fragment>
                                            )
                                        }}
                                    </Query>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>

    )
};
export default Order;