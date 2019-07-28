import React, {Fragment, useState} from 'react';
import {Mutation} from "react-apollo";
import {CREATE_PRODUCT} from "../../mutations";

const CreateProduct = (props) => {

    const [product, saveProduct] = useState({
        name: '',
        price: '',
        stock: ''
    });


    return (
        <Fragment>
            <h2 className="text-center mb-4">Create Client</h2>
            <div className="row justify-content-center">
                <Mutation mutation={CREATE_PRODUCT} onCompleted={() => (props.history.push('/products'))}>
                    {
                        createProduct => (

                            <form
                                className="col-md-8"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const {name, price, stock} = product;

                                    const input = {
                                        name,
                                        price,
                                        stock
                                    };

                                    createProduct({
                                        variables: {input}
                                    })

                                }}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Nombre del Producto"
                                        required={true}
                                        onChange={(e) => {
                                            saveProduct({
                                                ...product,
                                                name: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input
                                            type="number"
                                            name="precio"
                                            className="form-control"
                                            placeholder="Precio del Producto"
                                            required={true}
                                            onChange={(e) => {
                                                saveProduct({
                                                    ...product,
                                                    price: Number(e.target.value)
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-control"
                                        placeholder="stock del Producto"
                                        required={true}
                                        onChange={(e) => {
                                            saveProduct({
                                                ...product,
                                                stock: Number(e.target.value)
                                            })
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success float-right">
                                    Crear Producto
                                </button>
                            </form>
                        )}
                </Mutation>
            </div>
        </Fragment>

    )
};

export default CreateProduct;