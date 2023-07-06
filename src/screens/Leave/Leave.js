import { StyleSheet, View } from "react-native";
import React, { Component } from "react";
import LeavesDisplay from "./components/LeavesDisplay";
import LeaveInputs from "./components/LeaveInputs";
import { FAB } from "@rneui/themed";
import CustomSwitch from "../../components/CustomSwitch";
import { theme } from "galio-framework";
import { myRequestedLeaves } from "./components/leaves";
import LeaveDetails from "./components/LeaveDetails";

export default class Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveTab: 1,
      showLeaveInputs: false,
      userLeaveData: {},
      showLeaveDetails: false,
    };
  }

  onSelectSwitch = (value) => {
    this.setState({ leaveTab: value });
  };

  updateShowLeaveInputs = (value, id, type) => {
    // here we fetch data from api and set it to state so that we can use it in LeaveInputs for editing
    if (type === "edit") {
    }
    const res = myRequestedLeaves.filter((leave) => leave.id === id);
    this.setState({ showLeaveInputs: value, userLeaveData: res[0] });
  };

  updateShowLeaveDetails = (value, leave) => {
    this.setState({ showLeaveDetails: value, userLeaveData: leave });
  };

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setState({ showLeaveInputs: false, showLeaveDetails: false });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showLeaveInputs && (
          <LeaveInputs
            updateShowLeaveInputs={this.updateShowLeaveInputs}
            userLeaveData={this.state.userLeaveData}
          />
        )}

        {this.state.showLeaveDetails && (
          <LeaveDetails
            updateShowLeaveDetails={this.updateShowLeaveDetails}
            leave={this.state.userLeaveData}
          />
        )}

        {!this.state.showLeaveInputs && !this.state.showLeaveDetails && (
          <View style={{ flex: 1 }}>
            <CustomSwitch
              selectionMode={this.state.leaveTab}
              option1="My Leaves"
              option2="All Leaves"
              onSelectSwitch={this.onSelectSwitch}
            />
            <LeavesDisplay
              leaveTab={this.state.leaveTab}
              updateShowLeaveInputs={this.updateShowLeaveInputs}
              updateShowLeaveDetails={this.updateShowLeaveDetails}
            />
            {this.state.leaveTab === 1 && (
              <FAB
                onPress={() => this.setState({ showLeaveInputs: true })}
                placement="right"
                title="Add"
                icon={{ name: "add", color: "white" }}
                color={theme.COLORS.BLACK}
                style={{ zIndex: 1, flex: 1 }}
              />
            )}
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
