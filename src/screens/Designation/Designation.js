import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import DesignationList from "./components/DesignationList";
import { designation } from "../../shared/Http/designationCall";

export default class Designation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };
  }

  componentDidMount() {
    //here we fire the api call to get the data and then set the state
    this.setState({
      loading: true,
    });
    const designations = designation.findAll();
    designations
      .then((response) => {
        this.setState({
          data: response.data,
          error: this.error || null,
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

  designationUpdater = (newData) => {
    if (newData) {
      this.setState((prevState) => {
        return {
          data: [...prevState.data, newData],
        };
      });
    } else {
      this.componentDidMount();
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <DesignationList
          data={this.state.data}
          designationUpdater={this.designationUpdater}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
});
