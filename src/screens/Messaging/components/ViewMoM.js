import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mom } from "../../../shared/Http/momCall";
import { Button, Card } from "@rneui/themed";

export default class ViewMoM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={this.state.data || []}
          renderItem={({ item }) => (
            <Card style={styles.card} containerStyle={styles.card}>
              <Text style={styles.cardTitle}>Agenda: {item.subject}</Text>
              <Text style={styles.cardSubTitle}>Minutes of Meeting</Text>
              <Text style={styles.cardText}>Agenda: {item.subject}</Text>
              <Text style={styles.cardText}>{item.message}</Text>
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
              <View style={styles.btnGroup}>
                <Button
                  color="white"
                  titleStyle={{ color: "black" }}
                  buttonStyle={{ borderRadius: 5 }}
                  title="Edit"
                  size="lg"
                />
                <Button
                  color="black"
                  buttonStyle={{ borderRadius: 5 }}
                  title="Delete"
                  size="lg"
                />
              </View>
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
