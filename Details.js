import React, { Component } from "react"; //importing all the modules
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";//card = display info, and contains content and actions about a single subject
import axios from "axios";
export default class DetailsScreen extends Component {
  constructor(props) { //making the constructor
    super(props);
    this.state = {
      details: {},
      imagePath: "", //empty rn
      url: `http://localhost:5000/planet?name=${this.props.navigation.getParam( //setting the url
        "planet_name"
      )}`
    };
  }

  componentDidMount() {
    this.getDetails(); //calling the fn here
  }
  getDetails = () => { //get the details of the planets
    const { url } = this.state;
    axios
      .get(url) 
      .then(response => {
        this.setDetails(response.data.data);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  setDetails = planetDetails => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) { //see the planet type; terrestrial, super_earth....based on it we will set the image path
      case "Gas Giant":
        imagePath = require("../assets/planet_type/gas_giant.png"); //images
        break;
      case "Terrestrial":
        imagePath = require("../assets/planet_type/terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/planet_type/super_earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/planet_type/neptune_like.png");
        break;
      default:
        imagePath = require("../assets/planet_type/gas_giant.png"); //if none of the above planet type then we set as gas giant
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath //img path
    });
  };

  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name} //title would be planet_name
            image={imagePath} //then comes the image
            imageProps={{ resizeMode: "contain", width: "100%" }} //setting the size of the img
          > 
            <View>
              <Text //then displaying the information of each planet
                style={styles.cardItem}
              >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Speed : ${details.orbital_speed}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Mass : ${details.planet_mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Radius : ${details.planet_radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Type : ${details.planet_type}`}</Text>
            </View>
            <View style={[styles.cardItem, { flexDirection: "column" }]}> 
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>
              {details.specifications.map((item, index) => ( //styling
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10 //margin index
  }
});