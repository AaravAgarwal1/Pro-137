import React, { Component } from "react"; //importing modules
import { //import components
  View, 
  Text,
  FlatList, //to show all the elements and planet names & details 
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements"; //contain the data
import axios from "axios"; //to get request from the server (last class api)

export default class HomeScreen extends Component {
  constructor(props) { //creating constructor
    super(props);
    this.state = {
      listData: [],
      url: "http://localhost:5000/" //url of the site which has all the data
    };
  }

  componentDidMount() { //calling the getplanet function here in another fn
    this.getPlanets();
  }

  getPlanets = () => { //get planet function
    const { url } = this.state;
    axios
      .get(url) //this will get the url and when it finds the data
      .then(response => {//response will have the data
        return this.setState({
          listData: response.data.data //the data will be sent here in the listData
        });
      })
      .catch(error => { // if error it will bring up a error message
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => ( // display the info
    <ListItem //to show the title 
      key={index} //the planets one by one
      title={`Planet : ${item.name}`} //setting name of the planet
      subtitle={`Distance from earth : ${item.distance_from_earth}`} //subtitle would be the distance from the earth of that planet
      titleStyle={styles.title} //style of the planet
      containerStyle={styles.listContainer}
      bottomDivider //styling components
      chevron
      onPress={() => //when we press any planet
        this.props.navigation.navigate("Details", { planet_name: item.name }) // we will navigate to the detials screen, with respect to the planet_name and its data
      }
    />
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    if (listData.length === 0) { //if there is no data we will show the text as Loading
      return (
        <View style={styles.emptyContainer}> 
          <Text>Loading</Text> 
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

//desining the font, bg, text, etcetera
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988" //bg color
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743"
  },
  lowerContainer: {
    flex: 0.9
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold", //bold text font
    color: "#d7385e"
  },
  listContainer: {
    backgroundColor: "#eeecda" //hex code
  }
});