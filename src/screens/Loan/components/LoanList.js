import { Pressable, ScrollView, StyleSheet, Text, View,Alert } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { actionIcons } from "../../../constants/icons";
import { theme } from "galio-framework";

const LoanList = ({ loan, updateShowLoanInputs, updateShowLoanDetails }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionMenu = () => {
    const options = ["View", "Edit", "Delete", "Cancel"];
    const viewButtonIndex = 0;
    const editButtonIndex = 1;
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;
    showActionSheetWithOptions(
      {
        showSeparators: true,
        containerStyle: styles.actionContainer,
        textStyle: styles.text,
        options,
        viewButtonIndex,
        editButtonIndex,
        cancelButtonIndex,
        destructiveButtonIndex,
        icons: actionIcons,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          updateShowLoanDetails(true, loan.id);
        } else if (buttonIndex === 1) {
          updateShowLoanInputs(true, loan.id, "edit");
        } else if (buttonIndex === 2) {
          confirmDelete();
        } else if (buttonIndex === 3) {
          return;
        }
      }
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${loan.appliedBy}'s leave?`,
      [
        {
          text: "Delete",
          onPress: () => {},
          style: "destructive",
        },
        { text: "Cancel" },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
        <Pressable
         style={({ pressed }) => [styles.card, pressed && styles.pressed]}
         onLongPress={openActionMenu}
         >
        <View style={styles.cardHeader}>
         <Text style={styles.loanAmount}>Loan Amount:</Text>
         <Text style={styles.loanAmountText}>{loan.loanAmount}</Text>
        </View>
        
        <View style={{marginTop:10}}>
        <Text style={styles.loanAmount}>Purpose:</Text> 
        <Text style={styles.purpose}>{loan.purpose}</Text>
        </View>

        <View style={styles.cardHeaderDate}>
          <Text style={styles.loanAmount}>Date:</Text>        
          <Text style={styles.startDate}>{`${loan.startDate} - ${loan.endDate}`}</Text>
        </View>
        </Pressable>
        </Card>
      </ScrollView>
    </View>
  );
};

export default LoanList;

const styles = StyleSheet.create({
  cardContainer: { borderRadius: 10, padding: 25 },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHeaderDate: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:10,
  },
  loanAmount: {
    color:"black",
  },
  loanAmountText: {
    color:"#808080",
    fontSize:12,
  },
  purpose: {
    color:"#808080",
    fontSize:12,
  },
  startDate: {
    marginTop:5,
    color:"#808080",
    fontSize:12,
  },
  endDate: {
    fontSize: theme.SIZES.FONT,
    color:"#808080",
    fontSize:12,
  },
  leaveType: {
    fontSize: theme.SIZES.BASE,
    marginTop: 10,
  },
  pressed: {
    opacity: 0.5,
  },

  user: {
    color: "#000",
    fontSize: theme.SIZES.BASE,
    fontWeight: "bold",
    marginVertical: 5,
    textTransform: "uppercase",
  },
});
