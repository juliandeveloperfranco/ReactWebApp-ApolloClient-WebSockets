import React from 'react';

const Products = (props) => {

    const {product} = props;

    return (

        <tr>

            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
                <input
                    type="number"
                    required={true}
                    className="form-control"
                    onChange={(e) => {
                        props.updateQuantity(e.target.value, props.index)
                    }}
                />
            </td>


        </tr>

    )
};

export default Products;