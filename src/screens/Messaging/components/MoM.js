import { StyleSheet, View, Text } from "react-native";
import React, { Component, useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomSwitch from "../../../components/CustomSwitch";
import Compose from "./Compose";
import ViewMoM from "./ViewMoM";
import { branch } from "../../../shared/Http/branchCall";
import { AuthContext } from "../../../context/AuthContext";

const MoM = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [editData, setEditData] = useState(undefined);
  const { setBranchInfo } = useContext(AuthContext);
  useEffect(() => {
    const branches = branch.findAll();
    branches
      .then((response) => {
        setBranchInfo(response.data);
      })
      .catch((error) => {});
  }, []);
  const switchTab = (tab) => {
    setSelectedTab(tab);
    if (selectedTab != tab) {
      setEditData();
    }
  };

  const onSaveSuccess = () => {
    setEditData();
    setSelectedTab(2);
  };

  const editSelectedData = (data) => {
    setSelectedTab(1);
    setEditData(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomSwitch
        selectionMode={selectedTab}
        option1="Compose"
        option2="View MoM"
        onSelectSwitch={switchTab}
      />
      {selectedTab == 1 && (
        <Compose editData={editData} onSaveSuccess={onSaveSuccess} />
      )}
      {selectedTab == 2 && <ViewMoM editSelectedData={editSelectedData} />}
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
