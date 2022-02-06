import React, { ReactNode } from "react";
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Navigate, Route, useLocation, Outlet} from "react-router-dom";
import { useAppSelector } from "../../services";
import History from "history";

interface IProtectedRouteProps {
  children: ReactNode;
}

export interface IProtectedRouteLocationProps {
  from?: string;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
}) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (accessToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" state={{ from: location.pathname } } replace/>;
  }
};

export default ProtectedRoute;
