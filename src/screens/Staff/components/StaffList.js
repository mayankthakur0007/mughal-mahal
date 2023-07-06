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

const StaffList = ({ data, updateShowStaffInputs, updateShowStaffDetails }) => {
  console.log(data);
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionMenu = () => {
    const options = ["View", "Cancel"];
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
          updateShowStaffDetails(true, data);
        } else if (buttonIndex === 1) {
          updateShowStaffInputs(true, data.id, "edit");
        } else if (buttonIndex === 2) {
          confirmDelete(data.id);
        } else if (buttonIndex === 3) {
          return;
        }
      }
    );
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${data.name}`,
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
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onLongPress={openActionMenu}
        >
          <View style={styles.cardHeader}>
            <Text>Civil ID: {data.civil_id}</Text>
            <Badge
              text={data.status === true ? "Active" : "Blocked"}
              containerStyle={styles.badgeContainer}
              backgroundColor={data.status === true ? "green" : "red"}
            />
          </View>
          <View>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.user}>{data.name}</Text>
                <Text>Waiter, Branch: Zehra</Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "grey" }}>
                  Phone Number: {data.phone_number}
                </Text>
                <Text style={{ color: "grey" }}>
                  Date of Joining:
                  {new Date(data.date_of_joining).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Card>
    </ScrollView>
  );
};

export default StaffList;

const styles = StyleSheet.create({
  badgeContainer: { width: 100 },
  cardContainer: { borderRadius: 10, padding: 10 },

  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
