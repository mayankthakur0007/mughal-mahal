import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { messaging } from "../../../shared/Http/messagingCall";
import { Button, Card } from "@rneui/themed";

export default class Mailbox extends Component {
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
  fetchData = () => {
    let module = messaging;
    const getInfo = module.findAll();
    getInfo
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
  };

  delete = async (id) => {
    this.setState({
      loading: true,
    });
    let module = messaging;
    await module.delete(id);
    this.fetchData();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={this.state.data || []}
          renderItem={({ item }) => (
            <Card style={styles.card} containerStyle={styles.card}>
              <Text style={styles.cardTitle}>To: {item.recipient}</Text>
              <Text style={styles.cardText}>{item.message}</Text>
              <Text style={styles.cardText}>{item.email}</Text>
              <Text style={styles.cardText}>{item.phone_number}</Text>
              {item?.file?.path && (
                <Text style={styles.cardText}>{item.file.path}</Text>
              )}
              <View style={styles.btnGroup}>
                <Button
                  color="white"
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
            </Card>
          )}
          keyExtractor={(item) => item.id}
        />
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
    marginTop: 10,
  },
  meetingInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  cardContent: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  cardTitle: {
    color: "#000",
    fontSize: 24,
  },
  cardSubTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardText: {
    color: "#000",
    fontSize: 16,
    marginTop: 10,
  },
});
