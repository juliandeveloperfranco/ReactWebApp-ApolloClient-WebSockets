import React, {Fragment, useState} from 'react';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import Summary from "./Summary";
import GenerateOrder from "./GenerateOrder";

const OrderContent = (props) => {

    const [products, saveProducts] = useState([]);

    const [total, saveTotal] = useState(0);

    const selectProduct = (products) => {

        saveProducts({
            products
        })
    };

    const updateQuantity = (quantity, index) => {

        let handleTotal = 0;

        if (products.length === 0) {
            saveTotal(handleTotal);
            return;
        }

        products.products[index].quantity = Number(quantity);

        products.products.map((product) => handleTotal += (product.quantity * product.price));

        saveTotal(handleTotal);

    };

    return (

        <Fragment>
            <div>
                <Select
                    onChange={selectProduct}
                    options={props.products}
                    isMulti={true}
                    components={makeAnimated()}
                    placeholder={"Selecciona Un Producto"}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.name}
                />
            </div>
            <div className="mt-5">
                <Summary
                    products={products}
                    updateQuantity={updateQuantity}
                />
            </div>
            {
                products.length === 0 || products.products === null || products.products.length === 0 ?
                    null
                    :
                    <Fragment>
                        <p className="font-weight-bold float-right mt-4">
                            Total:
                            <span className="font-weight-normal">
                                $ {total}
                            </span>
                        </p>

                        <GenerateOrder
                            products={products}
                            total={total}
                        />
                    </Fragment>
            }

        </Fragment>
    )
};

export default OrderContent;