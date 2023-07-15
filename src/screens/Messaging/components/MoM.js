import { StyleSheet, View, Text } from "react-native";
import React, { Component, useEffect, useState,useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../../../components/CustomSwitch";
import Compose from "./Compose";
import ViewMoM from "./ViewMoM";
import { branch } from "../../../shared/Http/branchCall";
import { AuthContext } from "../../../context/AuthContext";

const MoM = () => {
  const [leaveTab, setLeaveTab] = useState(1);
  const { setBranchInfo } = useContext(AuthContext);
  useEffect(() => {
    const branches = branch.findAll();
    branches
      .then((response) => {
        console.log("ggg",JSON.stringify(response.data))
        setBranchInfo(response.data);
      })
      .catch((error) => {
        
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomSwitch
        selectionMode={leaveTab}
        option1="Compose"
        option2="View MoM"
        onSelectSwitch={() => {
          if (leaveTab == 1) {
            setLeaveTab(2);
          } else setLeaveTab(1);
        }}
      />
      {leaveTab == 1 ? <Compose /> : <ViewMoM />}
    </SafeAreaView>
  );
};
export default MoM;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
});
