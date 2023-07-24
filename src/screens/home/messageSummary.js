import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mom } from "../../shared/Http/momCall";
import { Button, Card } from "@rneui/themed";
import { internalComms } from "../../shared/Http/internalCommsCall";
import { messageFromManagement } from "../../shared/Http/messageFromManagementCall";
export default class MessageSummary extends Component {
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
    let module;
    if (this.props.from === "Management") {
      module = messageFromManagement;
    } else if (this.props.from === "Comms") {
      module = internalComms;
    } else if (this.props.from === "MOM") {
      module = mom;
    }
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
  getDate = (date) => {
    let d = new Date(date);
    let formattedString = [
      d.getDate().toString().padStart(2, 0),
      d.getMonth().toString().padStart(2, 0),
      d.getFullYear().toString().padStart(4, 0),
    ];
    return formattedString.join("/");
  };
  navigateToScreen = () => {
    if (this.props.from === "Management") {
      this.props.navigate("Messages from management");
    } else if (this.props.from === "Comms") {
      this.props.navigate("Internal Comms");
    } else if (this.props.from === "MOM") {
      this.props.navigate("MoM");
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 5,
          }}
        >
          <Text style={styles.cardTitle}>
            {this.props.from == "MOM" ? "Minutes of Meeting" : this.props.from == "Management"?"Messages from Management":"Internal Communication"}
          </Text>
          <View style={{ padding: 20 }}>
            {(this.state.data || [])
              .reverse()
              .slice(0, 3)
              .map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    borderBottomEndRadius: 1,
                    borderBottomWidth: 1,
                    marginBottom: 10,
                  }}
                >
                  <View>
                    <Text style={styles.cardSubTitle}>{item.subject}</Text>
                    {item.branch && (
                      <Text style={styles.cardText}>
                        {"At: " + item.branch.split(" ")[0]}
                      </Text>
                    )}
                  </View>
                  {item.createdAt && (
                    <Text>{this.getDate(item.createdAt)}</Text>
                  )}
                </View>
              ))}
            {(this.state.data || []).length == 0 && (
              <Text style={styles.cardSubTitle}>No messages to display.</Text>
            )}
          </View>
          {(this.state.data || []).length > 0 && (
            <TouchableOpacity
              onPress={this.navigateToScreen}
              style={styles.cardFooter}
            >
              <Text>View more</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
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
    fontSize: 20,
    backgroundColor: "#007bff",
    padding: 20,
  },
  cardFooter: {
    color: "#000",
    fontSize: 20,
    padding: 20,
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardSubTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardText: {
    color: "#000",
    fontSize: 16,
  },
});
