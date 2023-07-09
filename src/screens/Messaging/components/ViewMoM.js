import { StyleSheet, Text } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default class ViewMoM extends Component{
  constructor(props) {
    super(props);
  }
      
    render(){
        return (
          <SafeAreaView style={styles.container}>
            <Text>View MoM</Text>
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
