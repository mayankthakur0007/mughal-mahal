import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import LeaveList from "./LeaveList";
import { Card, SearchBar } from "@rneui/themed";
import { leaves } from "../../../shared/Http/leaveCall";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LeavesDisplay = (props) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [leavesData, setLeavesData] = useState({
    loading: false,
    data: [],
    error: null,
  });

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text === "") {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(leavesData.data);
      setSearch(text);
    } else {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = leavesData.data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.appliedBy
          ? item.appliedBy.toUpperCase()
          : "".toUpperCase();
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

  const fetchMyLeaves = async () => {
    let userData = await AsyncStorage.getItem("userInfo");
    let {
      decoded: { id },
    } = JSON.parse(userData);

    setLeavesData({ loading: true });
    const res = await leaves.findOne(id);
    if (res.status === 200) {
      setLeavesData({ loading: false, data: res.data });
      setFilteredDataSource(res.data);
    } else {
      setLeavesData({ loading: false, error: res.error });
    }
  };

  const leavesUpdater = () => {
    if (props.leaveTab === 1) {
      fetchMyLeaves();
    } else {
      fetchAllLeaves();
    }
  };

  const fetchAllLeaves = async () => {
    setLeavesData({ loading: true });
    try {
      const res = await leaves.findAll();
      setLeavesData({ loading: false, data: res.data });
      setFilteredDataSource(res.data);
    } catch (error) {
      console.log(error);
      setLeavesData({ loading: false, error: error });
    }
  };

  React.useEffect(() => {
    leavesUpdater();
  }, [props.leaveTab]);

  return (
    <View>
      {leavesData.loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={leavesData !== undefined && filteredDataSource}
          renderItem={({ item }) => (
            <LeaveList
              leave={item}
              updateShowLeaveInputs={props.updateShowLeaveInputs}
              showLeaveDetails={props.showLeaveDetails}
              updateShowLeaveDetails={props.updateShowLeaveDetails}
              leavesUpdater={leavesUpdater}
            />
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          ListEmptyComponent={() => {
            return (
              <Card>
                <Text>There is no leave !</Text>
              </Card>
            );
          }}
          ListHeaderComponent={
            leavesData == undefined && renderHeader(searchFilterFunction)
          }
        />
      )}
    </View>
  );
};

export default LeavesDisplay;

const styles = StyleSheet.create({});
