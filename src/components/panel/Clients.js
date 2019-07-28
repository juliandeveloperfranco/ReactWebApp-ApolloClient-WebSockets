import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import {QUERY_TOP_CLIENTS} from "../../queries";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const Clients = () => {


    return (
        <Fragment>
            <Query query={QUERY_TOP_CLIENTS} pollInterval={200}>
                {({loading, data, error, startPolling, stopPolling}) => {
                    if (loading) return "loading...";
                    if (error) return error;

                    var topClients = [];

                    data.topClients.map((order, index) => (
                        topClients[index] = {
                            ...order.client[0],
                            total: order.total
                        }
                    ));

                    return (
                        <div className="col-xs-1" align="center">
                            <BarChart
                                width={800}
                                height={500}
                                data={topClients}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="total" fill="#8884d8"/>
                            </BarChart>
                        </div>
                    )
                }}
            </Query>
        </Fragment>
    )
};

export default Clients;

