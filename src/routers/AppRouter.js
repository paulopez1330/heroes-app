import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthContext } from "../auth/AuthContext";

import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";



export const AppRouter = () => {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={ user.logged }
            exact path="/login"
            component={ LoginScreen }
          />
          <PrivateRoute
            isAuthenticated={ user.logged }
            path="/"
            component={ DashboardRoutes }
          />
        </Switch>
      </div>
    </Router>
  )
}