import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StaffList from "./StaffList";
import { Card, SearchBar } from "@rneui/themed";

const StaffDisplay = (props) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(props.data);
  const [masterDataSource, setMasterDataSource] = useState(props.data);

  const searchFilterFunction = (text) => {
    if (text === "") {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    } else {
      const newData = masterDataSource.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
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
    setMasterDataSource(props.data);
    setFilteredDataSource(props.data);
  }, [props.data]);
  return (
    <View>
      {props.loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={filteredDataSource}
          renderItem={({ item }) => (
            <StaffList
              data={item}
              updateShowStaffInputs={props.updateShowStaffInputs}
              showStaffDetails={props.showStaffDetails}
              updateShowStaffDetails={props.updateShowStaffDetails}
            />
          )}
          keyExtractor={(item) => {
            return item.id;
          }}
          ListEmptyComponent={() => {
            return (
              <Card>
                <Text>There is no staff !</Text>
              </Card>
            );
          }}
          ListHeaderComponent={masterDataSource.length > 0 && renderHeader()}
        />
      )}
    </View>
  );
};

export default StaffDisplay;
