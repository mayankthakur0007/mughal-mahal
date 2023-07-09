import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { Component, useState } from "react";
import MessageForm from "./MessageForm";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../../../components/CustomSwitch";
import { Card } from "@rneui/themed";

const MessagesFromManagement = () => {
  const [leaveTab, setLeaveTab] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomSwitch
          selectionMode={leaveTab}
          option1="Add Message"
          option2="View Message"
          onSelectSwitch={() => {
            if (leaveTab == 1) {
              setLeaveTab(2);
            } else setLeaveTab(1);
          }}
        />
        {leaveTab == 1 && (
          <Card style={styles.card} containerStyle={styles.card}>
            <MessageForm
              label={"Add Message from Management"}
              from={"Management"}
            />
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default MessagesFromManagement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 10,
  },
});
