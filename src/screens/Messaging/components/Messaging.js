import { StyleSheet, View, Text } from "react-native";
import React, { Component } from "react";

export default class Messaging extends Component{
      
    render(){
        return (
          <View style={styles.container}>
            <Text>Messaging</Text>
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
