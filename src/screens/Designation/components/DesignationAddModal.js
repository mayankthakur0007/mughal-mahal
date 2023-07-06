import { Button, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Dialog, FAB, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { DesignationSchema } from "../../../shared/FormValidationSchema";
import { theme } from "galio-framework";
import { designation } from "../../../shared/Http/designationCall";

const DesignationAddModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onSubmit = async (formData) => {
    // here we create designation in database and then response update through designationUpdater callback
    const res = await designation.create(formData);
    props.designationUpdater(res.data);
    handleClose();
  };

  const handleClose = () => {
    setVisible(!visible);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit,
    validationSchema: DesignationSchema,
  });

  const dialogVisible = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <FAB
        onPress={dialogVisible}
        placement="right"
        title="Add"
        icon={{ name: "add", color: "white" }}
        color={theme.COLORS.BLACK}
      />

      <Dialog
        isVisible={visible}
        onBackdropPress={dialogVisible}
        overlayStyle={{ borderRadius: 10 }}
      >
        <Dialog.Title title={"Add Designation"} />
        <Input
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          label="Enter Designation Name"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.name}
          containerStyle={{ marginTop: 10 }}
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

export default DesignationAddModal;

const styles = StyleSheet.create({
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
