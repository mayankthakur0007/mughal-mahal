import React from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Block, theme } from "galio-framework";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Dialog, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { BranchSchema } from "../../../shared/FormValidationSchema";
import { actionIcons } from "../../../constants/icons";
import { branch } from "../../../shared/Http/branchCall";

const BranchCard = (props) => {
  // props -> branch, branchUpdater
  const [visible, setVisible] = React.useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const onSubmit = async (formData) => {
    await branch.update(props.branch.id, formData);
    props.branchUpdater();
    handleClose();
  };

  const handleClose = () => {
    setVisible(!visible);
    formik.resetForm();
  };

  const handleEdit = (formData) => {
    setVisible(true);
  };
  const handleDelete = async () => {
    await branch.delete(props.branch.id);
    props.branchUpdater();
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      code: props.branch.code,
      name: props.branch.name,
      contactEmail: props.branch.contactEmail,
      contactPhoneNumber: props.branch.contactPhoneNumber,
    },
    onSubmit,
    validationSchema: BranchSchema,
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
      `Are you sure you want to delete ${props.branch.name} from the branchs?`,
      [
        {
          text: "Delete",
          onPress: () => handleDelete(props.branch.id),
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
        <Block style={{ flexDirection: "row" }}>
          <Text style={styles.name}>{props.branch.name}</Text>
          <Text style={styles.code}>{props.branch.code}</Text>
        </Block>
        <Text style={styles.email}>{props.branch.contactEmail}</Text>
        <Text style={styles.phoneNo}>{props.branch.contactPhoneNumber}</Text>
      </Pressable>

      <Dialog
        isVisible={visible}
        onBackdropPress={dialogVisible}
        overlayStyle={{ borderRadius: 10 }}
      >
        <Dialog.Title title="Update Branch" />
        <Input
          onChangeText={formik.handleChange("code")}
          onBlur={formik.handleBlur("code")}
          label="Enter Branch Code"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          keyboardType="number-pad"
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.code}
          containerStyle={{ marginTop: 10 }}
          value={formik.values.code}
        />
        <Input
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          label="Enter Branch Name"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.name}
          value={formik.values.name}
        />
        <Input
          onChangeText={formik.handleChange("contactEmail")}
          onBlur={formik.handleBlur("contactEmail")}
          label="Enter Email"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.contactEmail}
          value={formik.values.contactEmail}
        />

        <Input
          onChangeText={formik.handleChange("contactPhoneNumber")}
          onBlur={formik.handleBlur("contactPhoneNumber")}
          label="Enter Phone Number"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          keyboardType="number-pad"
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.contactPhoneNumber}
          containerStyle={{ marginTop: 10 }}
          value={formik.values.contactPhoneNumber}
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

export default BranchCard;

const styles = StyleSheet.create({
  actionContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    elevation: 2,
    flexDirection: "column",
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
    fontSize: theme.SIZES.FONT,
    color: "#000000",
    fontWeight: "bold",
  },
  code: {
    fontSize: theme.SIZES.FONT,
    color: "#808080",
    fontSize: 14,
    marginRight: 10,
    flexDirection: "row",
    marginLeft: "auto",
  },
  email: {
    fontSize: theme.SIZES.FONT,
    color: "#808080",
    fontSize: 14,
  },
  phoneNo: {
    fontSize: theme.SIZES.FONT,
    color: "#808080",
    fontSize: 14,
  },
  pressed: {
    backgroundColor: "#eee",
  },
});
