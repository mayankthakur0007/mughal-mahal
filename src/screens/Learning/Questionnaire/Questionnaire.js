import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { Dialog, FAB, Input } from "@rneui/themed";
import { QuestionnaireList } from "./Components/QuestionnaireList";
import { questionnaires } from "../../../shared/Http/questionnaires";
export default class Questionnaire extends Component {
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
    const questionnaire = questionnaires.findAll();
    questionnaire
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

  questionnairesUpdater = (newData) => {
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

  openAnotherPage = () => {
    this.props.navigation.navigate("AddQuestionnaire");
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
        <QuestionnaireList data={this.state.data} questionnairesUpdater={this.questionnairesUpdater} openAnotherPage={this.openAnotherPage}/>
        <FAB
          onPress={this.openAnotherPage}
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
