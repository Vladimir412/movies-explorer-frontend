import { Route, Redirect } from "react-router"


export const ProtectedRoute = ({component: Component, ...props}) => {

    return (
        <Route>
            {() => props.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />}
        </Route>
    )
}

