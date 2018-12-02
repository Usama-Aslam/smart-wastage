import React from "react";
import { Button } from "@material-ui/core";
import firebase from "./../../Config/firebase/";
// import { askForPermissioToReceiveNotifications } from "../../push-notification";

class SigninWithFacebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this);
  }

  login() {
    // console.log(myProps);
    // const props = this.props;
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var user = result.user.toJSON();
        localStorage.setItem("user", JSON.stringify(user))
        const userObj = {
          uid: user.uid,
          name: user.displayName,
          email: user.email || null,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        }
        firebase.database().ref(`users/${user.uid}`).set(userObj)
        // console.log(user, "loginbtn");
        // askForPermissioToReceiveNotifications();
      })
      .catch(function (error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
      });
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.login}>Signin with Facebook</Button>
    );
  }
}

export default SigninWithFacebook;
