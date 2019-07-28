import React, {Fragment} from 'react';
import Products from "./Products";

const Summary = (props) => {

    const products = props.products.products;

    if (products === null || products === undefined || products.length === 0) return (
        <Fragment>
            <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                <strong>Holy guacamole!</strong> No tienes productos para crear un pedido.
            </div>
        </Fragment>
    );

    return (
        <Fragment>
            <h2 className="text-center my-5">Resumen y cantidades</h2>

            <table className="table">

                <thead className="bg-success text-light">

                <tr className="font-weight-bold">

                    <th width='25%'>Products</th>
                    <th width='25%'>Precio</th>
                    <th width='25%'>Inventario</th>
                    <th width='25%'>Cantidad</th>
                </tr>

                </thead>

                <tbody>
                {
                    products === null || products === undefined ?
                        null
                        :
                        products.map((product, index) => {
                            return (
                                <Products
                                    id={product.id}
                                    key={index}
                                    product={product}
                                    index={index}
                                    updateQuantity={props.updateQuantity}
                                />
                            )
                        })
                }

                </tbody>

            </table>

        </Fragment>
    )

};

export default Summary;