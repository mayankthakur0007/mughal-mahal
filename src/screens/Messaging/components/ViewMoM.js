import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mom } from "../../../shared/Http/momCall";
import { Button, Card } from "@rneui/themed";
import { AuthContext } from "../../../context/AuthContext";
import { SearchBar } from "@rneui/themed";

export default class ViewMoM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      filteredDataSource: [],
      search:'',
      error: null,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    this.fetchData();
  }
  fetchData=()=>{
    const moms = mom.findAll();
    moms
      .then((response) => {
        this.setState({
          data: response.data,
          filteredDataSource: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }
  delete = async (id) => {
    this.setState({
      loading: true,
    });
    await mom.delete(id);
    this.fetchData();
  };

  searchFilterFunction = (text) => {
    if (text === "") {
      this.setState({search:text,filteredDataSource:this.state.data});

    } else {
      const newData = this.state.data.filter((item) => {
        const itemData = item.subject ? item.subject.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({search:text,filteredDataSource:newData});
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
       <SearchBar
      placeholder="Type Here..."
      lightTheme
      inputContainerStyle={{ backgroundColor: "white" }}
      inputStyle={{ color: "black" }}
      round
      onChangeText={(text) => this.searchFilterFunction(text)}
      autoCorrect={false}
      value={this.state.search}
    />
        <FlatList
          style={styles.container}
          data={this.state.filteredDataSource || []}
          renderItem={({ item }) => (
            <Card style={styles.card} containerStyle={styles.card}>
              <Text style={styles.cardTitle}>Agenda: {item.subject}</Text>
              <Text style={styles.cardSubTitle}>Minutes of Meeting</Text>
              <Text style={styles.cardText}>Message: {item.message}</Text>
              <View style={styles.meetingInfo}>
                <Button
                  color="primary"
                  titleStyle={{ color: "white" }}
                  buttonStyle={{ borderRadius: 5 }}
                  title="Hosted By"
                  size="sm"
                />
                <Text style={styles.cardContent}>{item.hosted_by}</Text>
                <Button
                  color="error"
                  titleStyle={{ color: "white" }}
                  buttonStyle={{ borderRadius: 5 }}
                  title="At"
                  size="sm"
                />
                <Text style={styles.cardContent}>{item.branch}</Text>
              </View>
              {
                <AuthContext.Consumer>
                  {({ role }) =>
                    role == "admin" && (
                      <View style={styles.btnGroup}>
                        <Button
                          color="white"
                          onPress={() => this.props.editSelectedData(item)}
                          titleStyle={{ color: "black" }}
                          buttonStyle={{ borderRadius: 5 }}
                          title="Edit"
                          size="lg"
                        />
                        <Button
                          onPress={() => this.delete(item.id)}
                          color="black"
                          buttonStyle={{ borderRadius: 5 }}
                          title="Delete"
                          size="lg"
                        />
                      </View>
                    )
                  }
                </AuthContext.Consumer>
              }
            </Card>
          )}
          keyExtractor={(item) => item.id}
        />

        <Text></Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
  card: {
    borderRadius: 10,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:10
  },
  meetingInfo:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginTop:10

  },
  cardContent: {
    color: "#000",
    fontSize: 16,
    fontWeight:"bold",
    marginHorizontal: 10,
  },
  cardTitle: {
    color: "#000",
    fontSize: 24,
  },
  cardSubTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight:"bold",
    marginTop:10
  },
  cardText: {
    color: "#000",
    fontSize: 16,
    marginTop:10
  },
});
