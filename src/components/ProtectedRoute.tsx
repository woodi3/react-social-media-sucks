import React from "react";
import {
  Route,
  Redirect,
  RouteProps
} from "react-router-dom";

export interface IProctectedRouteProps extends RouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<IProctectedRouteProps> = ({
  children,
  isAuthenticated,
  ...rest
}: IProctectedRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
