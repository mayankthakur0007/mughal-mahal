import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

const StaffDetails = ({ userStaffData, updateShowStaffDetails }) => {
  return (
    <ScrollView>
      <Button
        title="Go Back"
        icon={styles.goBackBtn}
        iconContainerStyle={{ marginRight: 10 }}
        onPress={() => updateShowStaffDetails(false)}
      />
      <Card>
        <Card.Title>{userStaffData.name}</Card.Title>
        <Card.Divider />
        <View style={styles.LeaveEntries}>
          <View style={styles.textContainer}>
            <Text>Role:</Text>
            <Text>{userStaffData.roles[0]}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Status:</Text>
            <Text>{userStaffData.status ? "Active" : "Blocked"}</Text>
          </View>
          {/* <View style={styles.textContainer}>
            <Text>Designation:</Text>
            <Text>{userStaffData.designationId ?? "Waiter"}</Text>
          </View> */}
          {/* <View style={styles.textContainer}>
            <Text>Branch:</Text>
            <Text>{userStaffData.branchId ?? "Elite"}</Text>
          </View> */}
          <View style={styles.textContainer}>
            <Text>Civil Id:</Text>
            <Text>{userStaffData.civil_id}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Email:</Text>
            <Text>{userStaffData.email}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Phone Number:</Text>
            <Text>{userStaffData.phone_number}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Company Serial Number:</Text>
            <Text>{userStaffData.serial_number}</Text>
          </View>
          {/* <View style={styles.textContainer}>
            <Text>Civil Id Expiry:</Text>
            <Text>{userStaffData.civil_id.toLocaleDateString()}</Text>
          </View> */}
          <View style={styles.textContainer}>
            <Text>Date of Joining:</Text>
            <Text>
              {new Date(userStaffData.date_of_joining).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.textContainer}>
            {/* <Text>Medical Expiry:</Text>
            <Text>{userStaffData.medicalExpiry.toLocaleDateString()}</Text> */}
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

export default StaffDetails;

const styles = StyleSheet.create({
  StaffEntries: {
    marginVertical: 10,
  },
  goBackBtn: {
    name: "arrow-back-sharp",
    type: "ionicon",
    size: 20,
    color: "white",
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
