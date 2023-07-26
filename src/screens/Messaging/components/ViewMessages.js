import {
  FlatList,
  StyleSheet,
  Text,
  View,
  PixelRatio,
} from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { internalComms } from "../../../shared/Http/internalCommsCall";
import { messageFromManagement } from "../../../shared/Http/messageFromManagementCall";
import { Button, Card } from "@rneui/themed";
import { AuthContext } from "../../../context/AuthContext";
import { WebView } from 'react-native-webview';
import { SearchBar } from "@rneui/themed";

export default class ViewMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      webViewHeight:0,
      filteredDataSource: [],
      search:'',
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
    let { from } = this.props;
    let module;
    if (from == "Comms") {
      module = internalComms;
    } else if (from == "Management") {
      module = messageFromManagement;
    }
    const getInfo = module.findAll();
    getInfo
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
  };

  delete = async (id) => {
    this.setState({
      loading: true,
    });
    let { from } = this.props;
    let module;
    if (from == "Comms") {
      module = internalComms;
    } else if (from == "Management") {
      module = messageFromManagement;
    }
    await module.delete(id);
    this.fetchData();
  };

  onWebViewMessage = (event) => {
    this.setState({webViewHeight: Number(event.nativeEvent.data)/PixelRatio.get()})
  }

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
              <Text style={styles.cardText}>Message: {item.message}</Text>
              {item?.file?.path && <WebView
          style={{ height: this.state.webViewHeight }}
          source={{uri: item.file.path}}
          onMessage={this.onWebViewMessage}
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
        />}
              <AuthContext.Consumer>
                {({ role }) =>
                  role == "admin" && (
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
                  )
                }
              </AuthContext.Consumer>
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
