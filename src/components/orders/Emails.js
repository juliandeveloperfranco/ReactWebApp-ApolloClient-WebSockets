import React, {Fragment} from 'react';

const Emails = (props) => {
    const {email} = props.email;
    return (
        <Fragment>
            <span className="font-weight-normal">{email}</span>
            <br/>
        </Fragment>
    )

};

export default Emails;