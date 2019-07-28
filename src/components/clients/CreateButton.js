import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const CreateButton = (props) => {
    return (
        <Fragment>
            <li className="nav-item active mr-4">
                <Link to={'/clients/create'} className="btn btn-outline-success">Nuevo Cliente</Link>
            </li>
        </Fragment>
    )
};

export default CreateButton;