import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageForm from "./MessageForm";
import CustomSwitch from "../../../components/CustomSwitch";
import { Card } from "@rneui/themed";
import Mailbox from "./Mailbox";

export default function Messaging() {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomSwitch
          selectionMode={selectedTab}
          option1="Send Message"
          option2="Mailbox"
          onSelectSwitch={setSelectedTab}
        />
        {selectedTab == 1 && (
          <Card style={styles.card} containerStyle={styles.card}>
            <MessageForm
              setSelectedTab={setSelectedTab}
              label={"Do you want to say something?"}
              from={"Messaging"}
            />
          </Card>
        )}
        {selectedTab == 2 && (
          <Mailbox />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    paddingLeft: 5,
  },
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
  },
});
