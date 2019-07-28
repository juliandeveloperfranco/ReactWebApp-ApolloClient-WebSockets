import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import SignOut from "../Auth/SignOut";
import CreateButton from "../clients/CreateButton";

const Header = ({session}) => {

    let userRol;
     session.getUser ? userRol = session.getUser.rol : userRol = 'NULL';

    let isAuthNavbar = (session.getUser) ? <AuthHeader userRol={userRol}/> : <NoAuthHeader/>;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex">
            <div className="container">
                {isAuthNavbar}
            </div>
        </nav>
    )

};


const AuthHeader = (props) => {

    let userRol = props.userRol;

    return (
        <Fragment>
            <Link to={"/"} className="navbar-brand text-light font-weight-bold">CRM</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion"
                    aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item active">
                        <Link to={'/products'} className="btn btn-outline-warning mr-3">Productos</Link>
                    </li>

                    <li className="nav-item active">
                        <Link to={'/products/create'} className="btn btn-outline-warning mr-3">Nuevo Producto</Link>
                    </li>

                    <li className="nav-item active">
                        <Link to={'/clients'} className="btn btn-outline-success mr-3">Clientes</Link>
                    </li>


                    { userRol === 'ADMIN' ? <CreateButton/> : null }

                    <SignOut/>

                </ul>
            </div>
        </Fragment>
    )
};

const NoAuthHeader = () => {
    return (
        <Fragment>
            <h3 to="/" className="navbar-brand text-light font-weight-bold">CRM</h3>
        </Fragment>
    )
};

export default Header;