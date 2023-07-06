import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Badge = ({
  containerStyle,
  text,
  textStyle,
  textColor,
  backgroundColor,
}) => {
  return (
    <View style={containerStyle}>
      <Text
        style={{
          backgroundColor:
            backgroundColor === "success"
              ? "#2dce89"
              : backgroundColor === "warning"
              ? "#fb6340"
              : backgroundColor === "danger"
              ? "#f5365c"
              : backgroundColor === "info"
              ? "#11cdef"
              : backgroundColor === "primary"
              ? "#5e72e4"
              : backgroundColor === "secondary"
              ? "#8898aa"
              : backgroundColor === "default"
              ? "#172b4d"
              : backgroundColor,
          borderRadius: 15,
          color: textColor ? textColor : "white",
          fontWeight: "bold",
          textAlign: "center",
          padding: 5,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({});
