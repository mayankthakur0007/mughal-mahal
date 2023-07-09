import { StyleSheet, View, Text } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../../../components/CustomSwitch";
import Compose from "./Compose";
import ViewMoM from "./ViewMoM";

export default class MoM extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };
  }
    render(){
        return (
          <SafeAreaView style={styles.container}>
            <CustomSwitch
              selectionMode={this.state.activeTab}
              option1="Compose"
              option2="View MoM"
              onSelectSwitch={(tab) => this.setState({activeTab:tab})}
            />
            {this.state.activeTab==1 ? <Compose /> : <ViewMoM />}
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#F5FCFF",
      flex: 1,
    },
  });
