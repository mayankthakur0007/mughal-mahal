import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

const LeaveDetails = ({ leave, updateShowLeaveDetails }) => {
  return (
    <ScrollView>
      <Button
        title="Go Back"
        icon={styles.goBackBtn}
        iconContainerStyle={{ marginRight: 10 }}
        onPress={() => updateShowLeaveDetails(false)}
      />
      <Card containerStyle={{ marginBottom: 25 }}>
        <Card.Title>Leave Details</Card.Title>
        <Card.Divider />
        <View style={styles.LeaveEntries}>
          <View style={styles.textContainer}>
            <Text>Full Name:</Text>
            <Text>{leave?.appliedById?.name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Leave Type:</Text>
            <Text>{leave.leaveType}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Leave Date:</Text>
            <Text style={styles.text}>
              {leave.startDate.split("T")[0].split("-").reverse().join("-")} to{" "}
              {leave.endDate.split("T")[0].split("-").reverse().join("-")}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Is delayed from last vacation?:</Text>
            <Text>{leave.isYourLastVacationDelayed ? "Yes" : "No"}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Is first vacation?:</Text>
            <Text>{leave.isFirstVacation ? "Yes" : "No"}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Is money owed?:</Text>
            <Text>{leave.isMoneyOwned ? "Yes" : "No"}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Date of money owed:</Text>
            <Text>
              {leave.dateOfMoneyOwned
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Total money owed:</Text>
            <Text>{leave.totalMoneyOwned}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Flight preference:</Text>
            <Text>{leave.flightPreference}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Mention destination ticked:</Text>
            <Text>{leave.mentionDestinationTicket}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Is ready to pay tickets variable:</Text>
            <Text>{leave.isReadyToPayTicketsVariable ? "Yes" : "No"}</Text>
          </View>
        </View>
        <View>
          <Card.Divider />
          <Card.Title>Personal Details</Card.Title>
          <Card.Divider />
          <View>
            <View style={styles.textContainer}>
              <Text>Company Serial No:</Text>
              <Text>{leave.appliedById.serial_number}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Date of Joining:</Text>
              <Text>
                {leave.appliedById.date_of_joining
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Civil ID Number:</Text>
              <Text>{leave.appliedById.civil_id}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Civil ID Expiry:</Text>
              <Text>
                {leave.appliedById.civil_id_expiry
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Branch:</Text>
              <Text>{leave?.appliedById?.branch}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Designation:</Text>
              <Text>{leave?.appliedById?.designation}</Text>
            </View>
          </View>
        </View>
        <View>
          <Card.Divider />
          <Card.Title>Contact Details</Card.Title>
          <Card.Divider />
          <View>
            <View style={styles.textContainer}>
              <Text>Kuwait Contact Number:</Text>
              <Text>{leave.kuwaitPhoneNumber}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Other Contact Number:</Text>
              <Text>{leave?.alternativePhoneNumber}</Text>
            </View>
          </View>
        </View>
        <Card.Divider />

        <View>
          <Text style={styles.message}>
            Yes I understand tickets are arranged by HR considering Flight fares
            etc. But I am ready to pay the differences in KD. Substitute
            Required? Yes
          </Text>
        </View>
        <Card.Divider />
        <View>
          <Card.Divider />
          <Card.Title>Current Status</Card.Title>
          <Card.Divider />
          <View>
            <View style={styles.textContainer}>
              <Text>Status:</Text>
              {/* <Text>{leave.approvedByManager}</Text> */}
            </View>
            <View style={styles.textContainer}>
              <Text>HR Approval:</Text>
              {/* <Text>{userLeaveData.approvedByHR}</Text> */}
            </View>
          </View>
        </View>
        {leave.status === "pending" && (
          <Button
            buttonStyle={{ backgroundColor: "black" }}
            containerStyle={{ marginVertical: 20, borderRadius: 20 }}
            title="Approved"
          />
        )}
      </Card>
    </ScrollView>
  );
};

export default LeaveDetails;

const styles = StyleSheet.create({
  goBackBtn: {
    name: "arrow-back-sharp",
    type: "ionicon",
    size: 20,
    color: "white",
  },
  LeaveEntries: {
    marginVertical: 10,
  },
  message: {
    marginVertical: 15,
    fontSize: 16,
  },
  textContainer: {
    flexDirection: "row",
    fontSize: 16,
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
