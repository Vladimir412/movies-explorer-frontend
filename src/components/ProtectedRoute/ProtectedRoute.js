import { Redirect, Route } from "react-router-dom"


export const ProtectedRoute = ({component: Component, ...props}) => {    

    return (
        <Route>
            {() => props.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />}
        </Route>
    )
}

