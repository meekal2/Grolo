import React from "react";
import { Route } from "react-router-dom";
import AppUserList from "./AppUserList";
import AppUserRegister from "./AppUserRegister";
import AppUserLogin from "./AppUserLogin";
import AppUserPassword from "./AppUserPassword";
import AppUserResetPassword from "./AppUserResetPassword";
import AppUserPages from "../appUser/components/AppUserPages";

function AppUser(props) {
  const prefix = props.match.path;
  const token = props.match.path.search;
  return (
    <React.Fragment>
      <Route exact path={prefix + "/forgotpassword"} component={AppUserPassword} />
      <Route exact path={prefix + "/register"} component={AppUserRegister} />
      <Route exact path={prefix + "/resetPassword"} component={AppUserResetPassword} />
      <Route exact path={prefix + "/userlist"} component={AppUserList} />
      <Route path={prefix + "/login"} component={AppUserLogin} />
      <Route exact path={prefix + "/confirmwait"} component={AppUserPages} />
    </React.Fragment>
  );
}

export default AppUser;
