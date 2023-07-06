import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const CustomSwitch = ({ selectionMode, option1, option2, onSelectSwitch }) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 1 ? "#fff" : "rgb(243, 243, 243)",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 1 ? "#000" : "rgb(168,173,178)",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={2}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 2 ? "#fff" : "rgb(243, 243, 243)",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 2 ? "#000" : "rgb(168,173,178)",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#AD40AF",
    borderRadius: 10,
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
