import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import {QUERY_PRODUCT} from "../../queries";
import FormEditProduct from "./FormEditProduct";

const EditProduct =(props)=>{
    const {id} = props.match.params;

    return (
        <Fragment>
            <Query query={QUERY_PRODUCT}  pollInterval={200} variables={{id}}>
                {({loading, error, data,refetch, startPolling, stopPolling}) => {
                    if (loading) return 'loading';
                    if (error) return error;
                    return (
                        <FormEditProduct refetch={refetch} id={id} product={data.getProduct}/>
                    );
                }}
            </Query>
        </Fragment>
    );

};

export default EditProduct;