import React, {Fragment} from 'react';
import ClientInformation from "./ClientInfomation";
import OrderContent from "./OrderContent";
import {Query} from "react-apollo";
import {QUERY_PRODUCTS} from "../../queries";

const CreateOrder = (props) => {

    const {id} = props.match.params;

    return (
        <Fragment>
            <h1 className="text-center mb-5">Create Order</h1>

            <div className="row">

                <div className="col-md-3">
                    <ClientInformation
                        id={id}
                    />
                </div>

                <div className="col-md-9">
                    <Query query={QUERY_PRODUCTS} pollInterval={200}>
                        {({loading, error, data, startPolling, stopPolling}) => {
                            if (loading) return "Loading";
                            if (error) return error.message;
                            return (
                                <OrderContent products={data.getProducts}/>
                            )
                        }}
                    </Query>
                </div>

            </div>
        </Fragment>
    )
};

export default CreateOrder;