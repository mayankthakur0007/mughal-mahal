import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { SearchBar } from "@rneui/themed";
import DesignationAddModal from "./DesignationAddModal";
import DesignationCard from "./DesignationCard";

export const DesignationList = (props) => {
  // props -> data, designationUpdater
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [search, setSearch] = useState("");

  const searchFilterFunction = (text) => {
    if (text === "") {
      setFilteredDataSource(props.data);
      setSearch(text);
    } else {
      const newData = props.data.filter((item) => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    }
  };

  const renderHeader = () => (
    <SearchBar
      placeholder="Type Here..."
      lightTheme
      inputContainerStyle={{ backgroundColor: "white" }}
      inputStyle={{ color: "black" }}
      round
      onChangeText={(text) => searchFilterFunction(text)}
      autoCorrect={false}
      value={search}
    />
  );

  useEffect(() => {
    setFilteredDataSource(props.data);
  }, [props.data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredDataSource}
        renderItem={({ item }) => (
          <DesignationCard
            designation={item}
            designationUpdater={props.designationUpdater}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader(searchFilterFunction)}
      />

      <DesignationAddModal designationUpdater={props.designationUpdater} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DesignationList;
