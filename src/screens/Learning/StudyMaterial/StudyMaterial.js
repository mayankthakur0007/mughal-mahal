import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { Dialog, FAB, Input } from "@rneui/themed";
import { branch } from "../../../shared/Http/branchCall";
import BranchList from "../../Branch/Components/BranchList";
import StudyMaterialList from "./Components/StudyMaterialList";
import { studyMaterial } from "../../../shared/Http/StudyMaterial";
export default class StudyMaterial extends Component {
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
    const branches = studyMaterial.findAll();
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
  studyMaterialUpdater = (newData) => {
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

  addStudyMaterial = () => {
    //this.props.navigation.navigate("AddStudyMaterial");
    this.props.navigation.navigate('AddStudyMaterial', {
      onNavigateBack: () => {
        alert('rr')
      },
    });
  }

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
        <StudyMaterialList data={this.state.data} studyMaterialUpdater={this.studyMaterialUpdater} />
        <FAB
          onPress={this.addStudyMaterial}
          placement="right"
          title="Add"
          icon={{ name: "add", color: "white" }}
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
