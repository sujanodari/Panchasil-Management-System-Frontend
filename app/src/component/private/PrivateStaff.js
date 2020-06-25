import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateStaff = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("myToken") && localStorage.getItem('type')==="Staff" ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                    />
                )
            
            
            }
    />
);

export default PrivateStaff