import React, {Fragment} from 'react';
import {QUERY_CLIENT} from "../../queries";
import {Query} from "react-apollo";
import FormEditClient from "./FormEditClient";

const EditClient = (props) => {

    const {id} = props.match.params;

    return (
        <Fragment>

            <Query query={QUERY_CLIENT}  pollInterval={200} variables={{id}}>
                {({loading, error, data,refetch, startPolling, stopPolling}) => {
                    if (loading) return 'loading';
                    if (error) return error;
                    return (
                        <FormEditClient refetch={refetch} id={id} client={data.getClient}/>
                    );
                }}
            </Query>
        </Fragment>
    );

};
export default EditClient;