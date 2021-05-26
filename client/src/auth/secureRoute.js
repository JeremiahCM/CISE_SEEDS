import { Redirect, Route } from "react-router-dom";

export function SecureRoute({ component: Component, login = false, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={
            {
              pathname: '/signin',
              state: {
                from: props.location
              }
            }
          }/>
        }
        
      }}
    />
  );
}
