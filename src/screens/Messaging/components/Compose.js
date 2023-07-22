import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import { MoMSchema } from "../../../shared/FormValidationSchema";
import { mom } from "../../../shared/Http/momCall";
import { AuthContext } from "../../../context/AuthContext";

const Compose = ({ editData, onSaveSuccess }) => {
  const { branchInfo } = useContext(AuthContext);

  const onSubmit = async (formData) => {
    let branches;
    if (editData) {
      branches = mom.update(editData.id, formData);
    } else {
      branches = mom.create(formData);
    }
    branches
      .then((response) => {
        handleClose();
        onSaveSuccess();
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  const handleClose = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: editData || {
      subject: "",
      hosted_by: "",
      branch: "",
      message: "",
    },
    onSubmit: onSubmit,
    validationSchema: MoMSchema,
  });

  return (
    <>
      <ScrollView>
        <Card style={styles.card} containerStyle={styles.card}>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              onChangeText={formik.handleChange("subject")}
              label="Subject"
              placeholder="Enter Mom Subject"
              labelStyle={styles.labelStyle}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.subject}
              value={formik.values.subject}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              onChangeText={formik.handleChange("hosted_by")}
              label="Hosted By"
              placeholder="Hosted By"
              labelStyle={styles.labelStyle}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.hosted_by}
              value={formik.values.hosted_by}
            />
          </View>
          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Branch</Text>
            <View style={styles.dropDown}>
              <Picker
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  formik.setFieldValue("branch", itemValue);
                }}
                errorStyle={{ color: "red" }}
                errorMessage={formik.errors.branch}
                selectedValue={formik.values.branch}
                dropdownIconColor="#000"
              >
                <Picker.Item label={"Select a branch"} value={""} />
                {branchInfo.map((branch, i) => (
                  <Picker.Item
                    key={i}
                    label={`${branch.name} (${branch.code})`}
                    value={`${branch.name} (${branch.code})`}
                  />
                ))}
              </Picker>
            </View>
            <Text
              style={{
                color: "red",
                paddingLeft: 5,
                paddingTop: 5,
                fontSize: 12,
              }}
            >
              {formik.errors.branch}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              onChangeText={formik.handleChange("message")}
              multiline={true}
              label="Message"
              placeholder=""
              labelStyle={styles.labelStyle}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.message}
              value={formik.values.message}
            />
          </View>
          <View style={styles.btnGroup}>
            {!editData ? (
              <Button
                color="white"
                titleStyle={{ color: "black" }}
                buttonStyle={{ borderRadius: 5 }}
                title="Clear"
                onPress={handleClose}
                size="lg"
              />
            ) : (
              <View />
            )}
            <Button
              color="black"
              buttonStyle={{ borderRadius: 5 }}
              title="Apply"
              onPress={formik.handleSubmit}
              size="lg"
            />
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

export default Compose;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  labelStyle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropDown: {
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 1,
  },
  dropDownContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
