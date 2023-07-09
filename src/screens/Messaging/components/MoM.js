import { StyleSheet, View, Text } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default class MoM extends Component{
      
    render(){
        return (
          <SafeAreaView style={styles.container}>
            <Text>MoM</Text>
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
