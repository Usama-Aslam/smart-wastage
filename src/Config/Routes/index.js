import React from "react";
import { Route, withRouter } from "react-router-dom";

import SignIn from "./../../Components/SignIn";
import UserDashboard from "./../../Screens/UserDashboard";

const Routes = props => {
  console.log("router++", props);
  return (
    <div>
      {/* <AppBar {...props} /> */}
      <Route exact path="/" component={SignIn} />
      <Route exact path="/userDashboard" component={UserDashboard} />
    </div>
  );
};
export default withRouter(Routes);
