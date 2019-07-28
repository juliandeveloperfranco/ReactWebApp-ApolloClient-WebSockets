import React, {Fragment} from 'react';
import {Query} from "react-apollo";
import {QUERY_PRODUCTS} from "../../queries";
import Mutation from "react-apollo/Mutation";
import {DELETE_PRODUCT} from "../../mutations";
import {Link} from "react-router-dom";

const Products = () => {

    return (
        <Query query={QUERY_PRODUCTS} pollInterval={200}>

            {({loading, error, data, startPolling, stopPolling}) => {
                if (loading) return "Loading";
                if (error) return error.message;
                 //console.log(data);
                return (
                    <Fragment>
                        <h2 className="text-center mt-4">
                            My Products
                        </h2>

                        <ul className="list-group mt-4">
                            {
                                data.getProducts.map((product) => (
                                    <li key={product.id} className="list-group-item">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                {product.name} {product.price}- {product.stock}
                                            </div>
                                            <div className="col.md-4 d-flex justify-content-end">
                                                <Mutation mutation={DELETE_PRODUCT}>
                                                    {(deleteProduct, {loading, error}) => (
                                                        <button
                                                            onClick={() => {
                                                                deleteProduct({
                                                                    variables: {id: product.id}
                                                                });
                                                            }}
                                                            className="btn btn-outline-danger mr-3 d-black d-block d-md-inline-block">
                                                            Delete
                                                        </button>
                                                    )}
                                                </Mutation>

                                                <Link to={`/products/edit/${product.id}`}
                                                      className="btn btn-outline-info d-black d-block d-md-inline-block">
                                                    Edit Product
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
export default Products;