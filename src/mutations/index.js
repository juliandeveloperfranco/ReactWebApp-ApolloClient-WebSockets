import gql from 'graphql-tag';


/* CLIENTS */
export const CREATE_CLIENT = gql`

    mutation createClient($input: ClientInput) {
        createClient(input: $input) {
            id
            name
            lastname
        }
    }

`;

/* CLIENTS */
export const UPDATE_CLIENT = gql`

    mutation updateClient($input: ClientInput) {
        updateClient(input: $input) {
            id
            name
            lastname
            company
            emails {
                email
            }
            age
            type
        }
    }

`;

/* CLIENTS */
export const DELETE_CLIENT = gql`

    mutation deleteClient($id:ID){
        deleteClient(id:$id)
    }

`;

/* PRODUCTS */
export const CREATE_PRODUCT = gql`
    mutation createProduct($input:ProductInput){
        createProduct(input:$input){
            id
            name
            price
            stock
        }
    }
`;


/* PRODUCTS */
export const UPDATE_PRODUCT = gql`
    mutation updateProduct($input:ProductInput){
        updateProduct(input:$input){
            id
            name
            price
        }
    }
`;


/* PRODUCTS */
export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id:ID){
        deleteProduct(id:$id)
    }
`;


/* ORDERS */
export const CREATE_ORDER = gql`
    mutation createOrder ($input:OrderInput){
        createOrder(input:$input){
            order{
                id
                quantity
            }
            total
            date
            client

        }
    }
`;


/* ORDERS */
export const UPDATE_ORDER = gql`
    mutation updateOrder($input:OrderInput){
        updateOrder(input:$input){
            id
            order{
                id
            }
            state
        }
    }
`;

/* USER */

export const CREATE_USER = gql`

    mutation createUser($username:String!,$password:String!,$nameUser:String!,$rol:String!){
        createUser(username:$username,password:$password,nameUser:$nameUser,rol:$rol)
    }

`;



/* USER */

export const AUTH_USER = gql`

    mutation authUser ($user:String!,$password:String!){
        authUser(username:$user,password:$password){
            token
        }
    }

`;

