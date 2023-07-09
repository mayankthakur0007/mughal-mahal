import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MessageForm from "./MessageForm";
import CustomSwitch from "../../../components/CustomSwitch";

export default function Messaging() {
  const [leaveTab, setLeaveTab] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomSwitch
          selectionMode={leaveTab}
          option1="Send Message"
          option2="Mailbox"
          onSelectSwitch={() => {
            if (leaveTab == 1) {
              setLeaveTab(2);
            } else setLeaveTab(1);
          }}
        />
        {leaveTab == 1 && (
          <>
            <View>
              <Text
                style={{
                  paddingVertical: 10,
                }}
              >
                Select Recipient
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <BouncyCheckbox
                  size={25}
                  fillColor="black"
                  unfillColor="white"
                  textStyle={{
                    textDecorationLine: "none",
                    color: "#070707",
                  }}
                  text={"H.O"}
                  iconStyle={{ borderRadius: 3, borderWidth: 2 }}
                  innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
                  onPress={(isChecked) => {}}
                />
                <BouncyCheckbox
                  size={25}
                  fillColor="black"
                  unfillColor="white"
                  textStyle={{
                    textDecorationLine: "none",
                    color: "#070707",
                  }}
                  text={"H.R"}
                  iconStyle={{ borderRadius: 3, borderWidth: 2 }}
                  innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
                  onPress={(isChecked) => {}}
                />
                <BouncyCheckbox
                  size={25}
                  fillColor="black"
                  unfillColor="white"
                  textStyle={{
                    textDecorationLine: "none",
                    color: "#070707",
                  }}
                  text={"Director"}
                  iconStyle={{ borderRadius: 3, borderWidth: 2 }}
                  innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
                  onPress={(isChecked) => {}}
                />
              </View>
            </View>
            <MessageForm
              label={"Do you want to say something?"}
              from={"Messaging"}
            />
          </>
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
});
