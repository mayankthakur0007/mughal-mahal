import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { Component, useState, useContext } from "react";
import MessageForm from "./MessageForm";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../../../components/CustomSwitch";
import { Card } from "@rneui/themed";
import ViewMessages from "./ViewMessages";
import { AuthContext } from "../../../context/AuthContext";

const MessagesFromManagement = () => {
  const [selectedTab, setSelectedTab] = useState(2);
  const { role } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {role == "admin" && <CustomSwitch
          selectionMode={selectedTab}
          option1="Add Message"
          option2="View Message"
          onSelectSwitch={setSelectedTab}
        />}
        {selectedTab == 1 && (
          <Card style={styles.card} containerStyle={styles.card}>
            <MessageForm
              setSelectedTab={setSelectedTab}
              label={"Add Message from Management"}
              from={"Management"}
            />
          </Card>
        )}
        {selectedTab == 2 && (
          <ViewMessages setSelectedTab={setSelectedTab} from={"Management"} />
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
