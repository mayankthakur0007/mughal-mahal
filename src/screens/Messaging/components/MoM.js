import { StyleSheet, View, Text } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../../../components/CustomSwitch";

export default class MoM extends Component{
  constructor(props) {
    super(props);
    this.state = {
      leaveTab: 1,
    };
  }
      
    render(){
        return (
          <SafeAreaView style={styles.container}>
            <CustomSwitch
              selectionMode={this.state.leaveTab}
              option1="Compose"
              option2="View MoM"
              onSelectSwitch={()=>{}}
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
  });
