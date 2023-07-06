import { StyleSheet, View } from "react-native";
import React, { Component } from "react";
import LoansDisplay from "./components/LoansDisplay";
import LoanInputs from "./components/LoanInputs";
import { FAB } from "@rneui/themed";
import CustomSwitch from "../../components/CustomSwitch";
import LoanDetails from "./components/LoanDetails";
import { theme } from "galio-framework";
import { myRequestedLoans } from "./components/loans";

export default class Loan extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loanTab: 1,
      showLoanInputs: false,
      userLoanData: {},
      showLoanDetails: false,
    };
  }

  onSelectSwitch = (value) => {
    this.setState({ loanTab: value });
  };

  updateShowLoanInputs = (value, id, type) => {
    // here we fetch data from api and set it to state so that we can use it in LoanInputs for editing
    if (type === "edit") {
    }
    const res = myRequestedLoans.filter((loan) => loan.id === id);
    this.setState({ showLoanInputs: value, userLoanData: res[0] });
  };

  updateShowLoanDetails = (value, id) => {
    const res = myRequestedLoans.filter((loan) => loan.id === id);
    this.setState({ showLoanDetails: value, userLoanData: res[0] });
  };

    
    componentDidMount() {
      this.props.navigation.addListener("focus", () => {
        this.setState({ showLoanInputs: false, showLoanDetails: false });
      });
      }

      
    render(){
        return (
        <View style={styles.container}>
        
        {this.state.showLoanInputs && (
          <LoanInputs
            updateShowLoanInputs={this.updateShowLoanInputs}
            userLoanData={this.state.userLoanData}
          />
          )}
        
        {this.state.showLoanDetails && (
          <LoanDetails
            updateShowLoanDetails={this.updateShowLoanDetails}
            userLoanData={this.state.userLoanData}
            />
            )}

        {!this.state.showLoanInputs && !this.state.showLoanDetails && (
          <View style={{ flex: 1 }}>
            <CustomSwitch
              selectionMode={2}
              option1="My Loan"
              option2="All Loan"
              onSelectSwitch={this.onSelectSwitch}
            />
            {this.state.loanTab == 1 && (
              <LoansDisplay
                option="myLoan"
                updateShowLoanInputs={this.updateShowLoanInputs}
                updateShowLoanDetails={this.updateShowLoanDetails}
              />
            )}
            {this.state.loanTab == 2 && (
              <LoansDisplay
                option="allLoan"
                updateShowLoanInputs={this.updateShowLoanInputs}
                updateShowLoanDetails={this.updateShowLoanDetails}
              />
            )}
            <FAB
              onPress={() => this.setState({ showLoanInputs: true })}
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
