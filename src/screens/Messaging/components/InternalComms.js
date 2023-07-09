import { StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import MessageForm from "./MessageForm";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../../../components/CustomSwitch";
import { Card } from "@rneui/themed";

const InternalComms = () => {
  const [leaveTab, setLeaveTab] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomSwitch
          selectionMode={leaveTab}
          option1="Compose"
          option2="Mailbox"
          onSelectSwitch={() => {
            if (leaveTab == 1) {
              setLeaveTab(2);
            } else setLeaveTab(1);
          }}
        />
        {leaveTab == 1 && (
          <Card style={styles.card} containerStyle={styles.card}>
            <MessageForm label={"Add Comms"} from={"Comms"} />
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default InternalComms;

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
