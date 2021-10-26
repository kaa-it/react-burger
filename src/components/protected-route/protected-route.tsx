import React, { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../../services";
import History from "history";

interface IProtectedRouteProps {
  children: ReactNode;
  path: string;
  exact?: boolean;
}

export interface IProtectedRouteLocationProps {
  from: History.Location;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
