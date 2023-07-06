import React from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Block, theme } from "galio-framework";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Dialog, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { BranchSchema } from "../../../../shared/FormValidationSchema";
import { actionIcons } from "../../../../constants/icons";
import { branch } from "../../../../shared/Http/branchCall";
import { studyMaterial } from "../../../../shared/Http/StudyMaterial";

const StudyMaterialCard = (props) => {
  // props -> branch, branchUpdater
  const [visible, setVisible] = React.useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const onSubmit = async (formData) => {
    await branch.update(props.branch.id, formData);
    props.studyMaterialUpdater();
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
    await studyMaterial.delete(props.propData.id);
    props.studyMaterialUpdater();
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      code: props.propData.code,
      name: props.propData.name,
      contactEmail: props.propData.contactEmail,
      contactPhoneNumber: props.propData.contactPhoneNumber,
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
      `Are you sure you want to delete ${props.propData.title} from the study material?`,
      [
        {
          text: "Delete",
          onPress: () => handleDelete(props.propData.id),
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
          <Text style={styles.name}>{props.propData.title}</Text>
        </Block>
        <Text style={styles.email}>{props.propData.description}</Text>
      </Pressable>
    </View>
  );
};

export default StudyMaterialCard;

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
