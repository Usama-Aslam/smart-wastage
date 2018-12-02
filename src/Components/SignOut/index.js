import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import firebase from "./../../Config/firebase/";

class SignOut extends Component {
  constructor(props){
    super(props)
    this.state={

    }
    this.signOut =this.signOut.bind(this)
  }

  signOut(){
    firebase.auth().signOut().then(resolve => {
      localStorage.setItem("user", null)
      console.log("Succesfully Signed-Out");
  })
  .catch(error => {
      console.log("Error", error);
  });
  }
  
  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.signOut}>Sign Out</Button>
      </div>
    );
  }
}

export default SignOut;
