import React, {Fragment} from 'react';
import Clients from "./Clients";

const Panel = () => {
    return (
        <Fragment>
            <div className="text-center mt-3">
                <h1 className="mb-5">
                    Top Clientes
                </h1>
                <Clients/>
            </div>
        </Fragment>
    )
};

export default Panel;