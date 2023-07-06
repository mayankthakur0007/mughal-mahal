import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { branch } from "../../../shared/Http/branchCall";
import BranchList from "../../Branch/Components/BranchList";
import { studyMaterial } from "../../../shared/Http/StudyMaterial";
import AddQuestionnaireModal from "./Components/AddQuestionnaireModal";
import { designation } from "../../../shared/Http/designationCall";
export default class AddQuestionnaire extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: null,
    };
  }

  async componentDidMount() {
    const designations = designation.findAll();
    designations
      .then((response) => {
        this.setState({
          rolesdata: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error)
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
        <AddQuestionnaireModal rolesdata={this.state.rolesdata} />
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
