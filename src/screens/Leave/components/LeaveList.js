import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import Badge from "../../../components/Badge";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { actionIcons } from "../../../constants/icons";
import { theme } from "galio-framework";
import { leaves } from "../../../shared/Http/leaveCall";

const LeaveList = ({
  leave,
  updateShowLeaveInputs,
  updateShowLeaveDetails,
  leavesUpdater,
}) => {
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
          updateShowLeaveDetails(true, leave);
        } else if (buttonIndex === 1) {
          updateShowLeaveInputs(true, leave.id, "edit");
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
      `Are you sure you want to delete ${leave.appliedById.name}'s leave?`,
      [
        {
          text: "Delete",
          onPress: () => handleDelete(),
          style: "destructive",
        },
        { text: "Cancel" },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async () => {
    // delete leave from api
    await leaves.delete(leave.id);
    leavesUpdater();
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onLongPress={openActionMenu}
        >
          <View style={styles.cardHeader}>
            <Text>Civil ID: {leave.appliedById.civil_id}</Text>
            <Badge
              text={leave.status ? "Approved" : "Pending"}
              containerStyle={styles.badgeContainer}
              backgroundColor={leave.status ? "success" : "warning"}
            />
          </View>
          <View>
            <Text style={styles.leaveType}>{`${leave.leaveType} leave`}</Text>
            <Text style={styles.leaveDates}>
              {leave.startDate.split("T")[0].split("-").reverse().join("-")} to{" "}
              {leave.endDate.split("T")[0].split("-").reverse().join("-")}
            </Text>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.user}>{leave.appliedById.name}</Text>
                <Text>
                  Designation: {leave.appliedById.designation}, Branch:{" "}
                  {leave.appliedById.branch}
                </Text>
              </View>
            </View>
            <Card.Divider />
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Raised on :{" "}
              {leave.updatedAt.split("T")[0].split("-").reverse().join("-")}
            </Text>
          </View>
        </Pressable>
      </Card>
    </ScrollView>
  );
};

export default LeaveList;

const styles = StyleSheet.create({
  badgeContainer: { width: 100 },
  cardContainer: { borderRadius: 10, padding: 10 },
  cardFooter: {
    marginBottom: 10,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leaveDates: { color: "grey", marginVertical: 5 },
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
