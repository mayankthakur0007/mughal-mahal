import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

const LoanDetails = ({ userLoanData, updateShowLoanDetails }) => {
  return (
    <ScrollView>
      <Button
        title="Go Back"
        icon={styles.goBackBtn}
        iconContainerStyle={{ marginRight: 10 }}
        onPress={() => updateShowLoanDetails(false)}
      />
      <Card>
        <Card.Title>Loan Details</Card.Title>
        <Card.Divider />
        <View style={styles.LoanEntries}>
          <View style={styles.textContainer}>
            <Text>Loan Amount:</Text>
            <Text style={styles.Entiriestext}>{userLoanData.loanAmount}</Text>
          </View>
          <View>
            <Text>Loan Purpose:</Text>
            <Text style={styles.Entiriestext}>{userLoanData.purpose}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Loan Start Date:</Text>
            <Text style={styles.Entiriestext}>
              {`${userLoanData.startDate}`}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Loan End Date:</Text>
            <Text style={styles.Entiriestext}>
              {`${userLoanData.endDate}`}
            </Text>
          </View>
          </View>
      
        <View>
          <Card.Divider />
          <Card.Title>Personal Details</Card.Title>
          <Card.Divider />
          <View>
            <View style={styles.textContainer}>
              <Text>Company Serial No:</Text>
              <Text style={styles.Entiriestext}>21798323322</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Date of Joining:</Text>
              <Text style={styles.Entiriestext}>20/05/90</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Civil ID Number:</Text>
              <Text style={styles.Entiriestext}>32433</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Civil ID Expiry:</Text>
              <Text style={styles.Entiriestext}>20/05/90</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Branch:</Text>
              <Text style={styles.Entiriestext}>Zehra</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Designation:</Text>
              <Text style={styles.Entiriestext}>Waiter</Text>
            </View>
          </View>
        </View>
        <Card.Divider />
        <Card.Divider />
        <Button
          buttonStyle={{ backgroundColor: "green" }}
          containerStyle={{ marginVertical: 20, borderRadius: 20 }}
          title="Approved"
        />
      </Card>
    </ScrollView>
  );
};

export default LoanDetails;

const styles = StyleSheet.create({
  LoanEntries: {
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: "row",
    fontSize: 15,
    justifyContent: "space-between",
    marginVertical: 7,
  },
  goBackBtn: {
    name: "arrow-back-sharp",
    type: "ionicon",
    size: 20,
    color: "white",
  },
  Entiriestext:{
    color:'#808080',
    fontSize:13,
  }
});