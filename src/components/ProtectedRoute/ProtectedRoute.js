import { Route, Redirect } from "react-router"


export const ProtectedRoute = ({component: Component, ...props}) => {

    return (
        <Route>
            {() => props.isLoggidIn ? <Component {...props} /> : <Redirect to="/" />}
        </Route>
    )
}

