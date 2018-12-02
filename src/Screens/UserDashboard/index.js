import React, { Component } from "react";
import MyMapComponent from "../../Components/GoogleMap";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import {
  TextField,
  Slide,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  Modal
} from "@material-ui/core";

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import base64Img from "base64-img";

import firebase from "./../../Config/firebase";

import "typeface-roboto";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  mainDiv: {
    marginLeft: theme.spacing.unit * 8,
    display: "flex",
    flex: 1,
    flexDirection: "column",

  },
  imageDiv: {
    flex: 1,
    marginTop: 30,
    marginLeft: 80,
    maxWidth: "300px",
    height: "200px",
    backgroundColor: "green"
  },
  infoDiv: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  },
  mapDiv: {
    maxWidth: "700px",
    height: "300px",
    backgroundColor: "green"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          name: "Solid Waste",
          image: require("../../Images/solid.png")
        },
        {
          name: "Liquid Waste",
          image: require("../../Images/liquid.jpg")
        },
        {
          name: "Organic Waste",
          image: require("../../Images/organic.jpg")
        },
        {
          name: "Hazardous Waste",
          image: require("../../Images/hazardous.jpg")
        }
      ],
      open: false,
      catName: "",
      user: null,
      openCamera: false,
      coords: { latitude: 24.88385439601565, longitude: 67.04778058545844 },
      phone:"",
      description:"",
      dataUri:""
    };
  }

  submitReport = ()=>{
    let {user, coords, catName, dataUri, phone, description } = this.state;
    if(user){
      let object = {
        user: user.name,
        catName,
        coords,
        image:dataUri,
        phone,
        description
      }
      firebase.database().ref(`/complaints/${user.uid}/`)
        .push(object).then(()=>{
        console.log('complaint is sent to the admin depart.\nThank You.')
      })
    }
  }
  

  onTakePhoto(dataUri) {
    // Do stuff with the dataUri photo...
    console.log("takePhoto");
    console.log(dataUri);
    this.setState({dataUri})

    // let storageRef = firebase
    //   .storage()
    //   .ref()
    //   .child("images");

    // storageRef
    //   .putString(JSON.stringify(dataUri.split(",")[1]), "base64")
    //   .then(snapshot => {
    //     console.log("Uploaded a base64 string!");
    //   });
    // storageRef.getDownloadURL().then(url => {
    //   this.setState({ image: url });
    //   console.log(url);
    // });
  }
  getPosition=()=> {
    navigator.geolocation.getCurrentPosition(res => {
      this.setState({
        coords: {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        }
      });
    });
  }

  handleClickOpen = catName => {
    this.setState({
      open: true,
      catName
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getPosition();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        firebase
          .database()
          .ref(`/users/${user.uid}`)
          .once("value", data => {
            // console.log(data.val());
        console.log("USER IS AVAILABLE");
      });
      } else {
        this.setState({ user: null });
        console.log("USER IS NOT AVAILABLE");

      }
    });
  }

  render() {
    const { categories, user } = this.state;
    const { classes } = this.props;
    return (
      <div className="App">
        <div style={{ margin: "80px 3% 3% 3%" }}>
          {categories.map((value, index) => {
            return (
              <Card
                // className={classes.card}
                style={{ maxWidth: 345, display: "inline-block", margin: "1%" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    // className={classes.media}
                    style={{ objectFit: "cover" }}
                    height="160"
                    image={value.image}
                    title={value.name}
                  />

                  <CardContent>
                    <Typography variant="h6">{value.name}</Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.handleClickOpen(value.name)}
                  >
                    Report File
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>

        <div>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.flex}
                >
                  Report File
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.mainDiv}>
              <div className={classes.infoDiv}>
                <div>
                  <TextField
                    label={user ? "":"Phone"}
                    id="standard-name"
                    className={classes.textField}
                    margin="normal"
                    value={user?user.name:""}
                    disabled={!user ? true:false}
                  />
                  <br />
                  <TextField
                    id="standard-contact"
                    label="Phone"
                    className={classes.textField}
                    onChnage={e=>{this.setState({phone:e.target.value})}}
                    margin="normal"
                  />
                  <br />
                  <TextField
                    id="standard-email"
                    label="Description"
                    className={classes.textField}
                    margin="normal"
                    onChnage={e=>{this.setState({description:e.target.value})}}                    
                  />

                  <br />
                  <Button variant="contained" color="primary" className={classes.button} onClick={()=>{this.setState({openCamera:true})}}>
                    Take Photo
                  </Button>
                  <Modal open={this.state.openCamera}>
                  <div  style={{backgroundColor:"white", padding:"10px"}}>
                    <Button color="secondary" variant="contained" onClick={()=>{this.setState({openCamera:false})}}>Close</Button>
                  <Camera
                    imageType="IMAGE_TYPES.JPG"
                    onTakePhoto={dataUri => {
                      this.onTakePhoto(dataUri);
                    }}
                  />
                  </div>
                  </Modal>
                  <MyMapComponent
          coords={this.state.coords}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `80%`, width:"80%" }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `80%`, width:"80%" }} />}
        />
                </div>
                
                <br />
                <br />
                
              </div>
              
              

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ display: "inline" }}
                  onClick={this.submitReport}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}
UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserDashboard);
