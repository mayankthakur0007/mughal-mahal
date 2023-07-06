import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import BranchList from "./Components/BranchList";
import { branch } from "../../shared/Http/branchCall";

export default class Branch extends Component {
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
    const branches = branch.findAll();
    branches
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

  branchUpdater = (newData) => {
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
        <BranchList data={this.state.data} branchUpdater={this.branchUpdater} />
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
