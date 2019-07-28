import React, {Fragment, useState} from 'react';
import {Mutation} from "react-apollo";
import {UPDATE_PRODUCT} from "../../mutations";
import {withRouter} from "react-router-dom";

const FormEditProduct = (props) => {

    const {name, price, stock, id} = props.product;
    const [product, saveProduct] = useState({
        name: name,
        price: price,
        stock: stock,
    });


    return (
        <Fragment>
            <h2 className="text-center mb-4">Actualizar Producto</h2>
            <div className="row justify-content-center">
                <Mutation mutation={UPDATE_PRODUCT}
                          onCompleted={() => props.refetch().then(()=>{
                              props.history.push('/products');
                          })}>

                    {
                        updateProduct => (

                            <form
                                className="col-md-8"
                                onSubmit={(e) => {
                                    e.preventDefault();


                                    const {name, price, stock} = product;

                                    const input = {
                                        id,
                                        name,
                                        price,
                                        stock
                                    };

                                    updateProduct({
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
                                        defaultValue={product.name}
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
                                            defaultValue={product.price}
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
                                        defaultValue={product.stock}
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
                                    Actulizar Producto
                                </button>
                            </form>
                        )}
                </Mutation>
            </div>
        </Fragment>

    )
};

export default withRouter(FormEditProduct);