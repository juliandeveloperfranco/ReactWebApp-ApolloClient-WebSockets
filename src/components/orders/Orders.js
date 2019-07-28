import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import {QUERY_ORDERS} from "../../queries";
import Order from "./Order";

const Orders = (props) => {

    const client = props.match.params.id;

    return (
        <Fragment>
            <Query query={QUERY_ORDERS} pollInterval={200} variables={{client}}>

                {({loading, error, data, startPolling, stopPolling}) => {
                    if (loading) return "loading...";
                    if (error) return `error: ${error}`;

                    return (
                        <div className="card-group mt-4">
                            {data.getOrders.map((order, index) => {
                                return (
                                    <Order
                                        client={client}
                                        key={index}
                                        order={order}
                                    />
                                );
                            })}
                        </div>
                    );
                }}

            </Query>


        </Fragment>
    )
};

export default Orders;

