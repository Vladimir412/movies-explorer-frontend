import { Route, Redirect } from "react-router-dom"


export const ProtectedRoute = ({component: Component, ...props}) => {

    return (
        <Route>
            {() => props.isLoggidIn ? <Component {...props} /> : <Redirect to="/" />}
        </Route>
    )
}
