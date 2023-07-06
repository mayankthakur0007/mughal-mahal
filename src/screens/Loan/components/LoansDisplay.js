import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import LoanList from "./LoanList";
import { Card, SearchBar } from "@rneui/themed";
import { myRequestedLoans } from "../components/loans";

const LoansDisplay = (props) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [loansData, setLoansData] = useState({
    loading: false,
    data: [],
    error: null,
  });

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text === "") {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(loansData.data);
      setSearch(text);
    } else {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = loansData.data.filter(function (item) {
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
  React.useEffect(() => {
    //based on props changes here we fetch data from server and set it to state
    if (props.option == "myLoan") {
      setFilteredDataSource(myRequestedLoans);
      setLoansData((prevState) => ({
        ...prevState,
        loading: false,
        data: myRequestedLoans,
      }));
    } else {
      if (props.option === "allLoan") {
        setLoansData((prevState) => ({
          ...prevState,
          loading: false,
          data: [],
        }));
      }
    }
  }, [props.option]);

  return (
    <View>
      {loansData.loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={loansData.data.length > 0 && filteredDataSource}
          renderItem={({ item }) => (
            <LoanList
              loan={item}
              updateShowLoanInputs={props.updateShowLoanInputs}
              showLoanDetails={props.showLoanDetails}
              updateShowLoanDetails={props.updateShowLoanDetails}
            />
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          ListEmptyComponent={() => {
            return (
              <Card>
                <Text>There is no loan !</Text>
              </Card>
            );
          }}
          ListHeaderComponent={
            loansData.data.length > 0 && renderHeader(searchFilterFunction)
          }
        />
      )}
    </View>
  );
};

export default LoansDisplay;

const styles = StyleSheet.create({});
