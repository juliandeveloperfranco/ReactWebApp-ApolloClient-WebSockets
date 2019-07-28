import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./layout/Header";
import Clients from "./clients/Clients";
import CreateClient from "./clients/CreateClient";
import EditClient from "./clients/EditClient";
import Products from "./products/Products";
import CreateProduct from "./products/CreateProduct";
import Home from "./layout/Home";
import EditProduct from "./products/EditProduct";
import CreateOrder from "./orders/CreateOrder";
import Orders from "./orders/Orders";
import Panel from "./panel/Panel";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Session from "./Session";


const App = ({refetch, session}) => {

    const {getUser} = session;

    const message = (getUser) ? `Bienvenido ${getUser.nameUser}` : <Redirect to={'/login'}/>;

    return (
        <Router>
            <Header session={session}/>

            <div className="container">
                <p>{message}</p>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/clients" render={() => <Clients session={session}/>}/>
                    <Route exact path="/clients/create" render={() => <CreateClient session={session}/>}/>
                    <Route exact path="/clients/edit/:id" component={EditClient}/>
                    <Route exact path="/products" component={Products}/>
                    <Route exact path="/products/create" component={CreateProduct}/>
                    <Route exact path="/products/edit/:id" component={EditProduct}/>
                    <Route exact path="/orders/:id" component={Orders}/>
                    <Route exact path="/orders/create/:id" component={CreateOrder}/>
                    <Route exact path={'/register'} component={Register}/>
                    <Route exact path={'/login'} render={() => <Login refetch={refetch}/>}/>
                    <Route exact path={'/panel'} component={Panel}/>

                </Switch>
            </div>
        </Router>
    );
};


const RootSession = Session(App);

export {RootSession};
