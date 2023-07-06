import { Button, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Dialog, FAB, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { BranchSchema } from "../../../shared/FormValidationSchema";
import { theme } from "galio-framework";
import { branch } from "../../../shared/Http/branchCall";

const BranchAddModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onSubmit = async (formData) => {
    const res = await branch.create(formData);
    props.branchUpdater(res.data);
    handleClose();
  };

  const handleClose = () => {
    setVisible(!visible);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      contactEmail: "",
      contactPhoneNumber: "",
    },
    onSubmit,
    validationSchema: BranchSchema,
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
        <Dialog.Title title={"Add Branch"} />
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
        />
        <Input
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          label="Enter Branch Name"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.name}
        />
        <Input
          onChangeText={formik.handleChange("contactEmail")}
          onBlur={formik.handleBlur("contactEmail")}
          label="Enter Email"
          labelStyle={styles.labelStyle}
          style={{ fontSize: theme.SIZES.FONT }}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.contactEmail}
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

export default BranchAddModal;

const styles = StyleSheet.create({
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
