import gql from 'graphql-tag';

export const QUERY_CLIENTS = gql`
    query getClients ($seller:String){
        getClients(seller:$seller){
            id
            name
            lastname
            company
            age
            type
        }
    }

`;


export const QUERY_CLIENT = gql`
    query getClient ($id:ID){
        getClient(id: $id) {
            name
            lastname
            company
            emails{
                email
            }
            age
            type

        }
    }

`;


export const QUERY_TOP_CLIENTS = gql`
    query {
        topClients{
            total
            client{
                name
            }
        }
    }
`;

export const QUERY_PRODUCTS = gql`
    {
        getProducts{
            id
            name
            price
            stock
        }
    }
`;

export const QUERY_PRODUCT = gql`
    query getProduct($id:ID){
        getProduct(id:$id){
            id
            name
            price
            stock
        }
    }

`;


export const QUERY_ORDERS = gql`
    query getOrders($client: String) {
        getOrders(client: $client) {
            id
            total
            order {
                id
                quantity
            }
            date
            state
        }
    }


`;


export const QUERY_ORDER = gql`
    query getOrder($id: ID) {
        getOrder(id: $id) {
            order {
                id
                quantity
            }
            total
            date
            state
        }
    }

`;


export const CURRENT_USER = gql`
    query getUser{
        getUser{
            id
            username
            rol
            nameUser
        }
    }
`;




