import React from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "galio-framework";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Dialog, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { DesignationSchema } from "../../../shared/FormValidationSchema";
import { actionIcons } from "../../../constants/icons";
import { designation } from "../../../shared/Http/designationCall";

const DesignationCard = (props) => {
  // props -> designation, designationUpdater
  const [visible, setVisible] = React.useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const onSubmit = async (formData) => {
    await designation.update(props.designation.id, formData);
    props.designationUpdater();
    handleClose();
  };

  const handleClose = () => {
    setVisible(!visible);
    formik.resetForm();
  };

  const handleEdit = () => {
    setVisible(true);
  };
  const handleDelete = async () => {
    await designation.delete(props.designation.id);
    props.designationUpdater();
  };

  const formik = useFormik({
    initialValues: {
      name: props.designation.name,
    },
    onSubmit,
    validationSchema: DesignationSchema,
  });

  const openActionMenu = () => {
    const options = ["Edit", "Delete", "Cancel"];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 1;
    showActionSheetWithOptions(
      {
        showSeparators: true,
        containerStyle: styles.actionContainer,
        textStyle: styles.text,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        icons: actionIcons,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleEdit();
        } else if (buttonIndex === 1) {
          confirmDelete();
        }
      }
    );
  };

  const dialogVisible = () => {
    setVisible(!visible);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${props.designation.name} from the designations?`,
      [
        {
          text: "Delete",
          onPress: () => handleDelete(props.designation.id),
          style: "destructive",
        },
        { text: "Cancel" },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        onLongPress={openActionMenu}
      >
        <Text style={styles.name}>{props.designation.name}</Text>
      </Pressable>

      <Dialog
        isVisible={visible}
        onBackdropPress={dialogVisible}
        overlayStyle={{ borderRadius: 10 }}
      >
        <Dialog.Title title="Edit Designation" />
        <Input
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          label="Enter Designation Name"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.name}
          containerStyle={{ marginTop: 10 }}
          value={formik.values.name}
        />

        <Button
          disabled={!(formik.isValid && formik.dirty)}
          title="Submit"
          color={theme.COLORS.BLACK}
          onPress={formik.handleSubmit}
        />
        <Button
          title="Cancel"
          color={theme.COLORS.BLUE}
          onPress={() => setVisible(false)}
        />
      </Dialog>
    </View>
  );
};

export default DesignationCard;

const styles = StyleSheet.create({
  actionContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    elevation: 2,
    flexDirection: "row",
    margin: 10,
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
  },
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  name: {
    flex: 1,
    fontSize: theme.SIZES.FONT,
  },
  pressed: {
    backgroundColor: "#eee",
  },
});
