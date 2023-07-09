import { StyleSheet, View, Text } from "react-native";
import React, { Component } from "react";

export default class MessagesFromManagement extends Component{
      
    render(){
        return (
          <View style={styles.container}>
            <Text>MessagesFromManagement</Text>
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
