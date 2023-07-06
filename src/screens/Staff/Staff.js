import { StyleSheet, View } from "react-native";
import React, { Component } from "react";
import StaffDisplay from "./components/StaffDisplay";
import StaffInputs from "./components/StaffInputs";
import { FAB } from "@rneui/themed";
import { theme } from "galio-framework";
import StaffDetails from "./components/StaffDetails";
import { Users } from "../../shared/data";
import { staff } from "../../shared/Http/staffCall";

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      showStaffInputs: false,
      userStaffData: [],
      showStaffDetails: false,
    };
  }

  updateShowStaffInputs = (value, id, type) => {
    // here we fetch data from api and set it to state so that we can use it in LeaveInputs for editing
    if (!type == "add") {
      const users = Users;
      const res = users.filter((user) => user._id === id);
      this.setState({ showStaffInputs: value, userStaffData: res[0] });
    } else {
      this.setState({ showStaffInputs: value, userStaffData: null });
    }
  };

  updateShowStaffDetails = (isComponentOpen, staff) => {
    this.setState({ showStaffDetails: isComponentOpen, userStaffData: staff });
  };

  componentDidMount() {
    // here we reset the state to default when we come back to this screen
    this.props.navigation.addListener("focus", () => {
      this.setState({ showStaffInputs: false, showStaffDetails: false });
    });
    // here we fire the api call to get the data and then set the state
    this.setState({
      loading: true,
    });
    const users = staff.findAll();
    users
      .then((response) => {
        this.setState({
          data: response.data,
          error: this.error || null,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showStaffInputs && (
          <StaffInputs
            updateShowStaffInputs={this.updateShowStaffInputs}
            userStaffData={this.state.userStaffData}
          />
        )}

        {this.state.showStaffDetails && (
          <StaffDetails
            updateShowStaffDetails={this.updateShowStaffDetails}
            userStaffData={this.state.userStaffData}
          />
        )}

        {!this.state.showStaffInputs && !this.state.showStaffDetails && (
          <View style={{ flex: 1 }}>
            <StaffDisplay
              loading={this.state.loading}
              data={this.state.data}
              option="staffRequested"
              updateShowStaffInputs={this.updateShowStaffInputs}
              updateShowStaffDetails={this.updateShowStaffDetails}
            />
            <FAB
              onPress={() => this.updateShowStaffInputs(true, null, "add")}
              placement="right"
              title="Add"
              icon={{ name: "add", color: "white" }}
              color={theme.COLORS.BLACK}
              style={{ zIndex: 1, flex: 1 }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
});
