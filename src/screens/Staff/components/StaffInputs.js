import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from "formik";
import { StaffSchema } from "../../../shared/FormValidationSchema";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const StaffInputs = ({ userStaffData, updateShowStaffInputs }) => {
  const onSubmit = async (formData) => {
    handleClose();
  };

  const handleClose = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      civil_id: "",
      date_of_joining: new Date(),
      email: "",
      name: "",
      phone_number: "",
      roles: "",
      serial_number: "",
      status: true,
      name: "",
      email: "",
    },
    onSubmit,
    validationSchema: StaffSchema,
  });

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
  };

  return (
    <>
      <ScrollView>
        <Button
          title="Go Back"
          icon={styles.goBackBtn}
          iconContainerStyle={{ marginRight: 10 }}
          onPress={() => updateShowStaffInputs(false)}
        />
        <Card>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              label="Name"
              labelStyle={styles.labelStyle}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.name}
              value={userStaffData && userStaffData.name}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Phone Number"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("phone_number")}
              onBlur={formik.handleBlur("phone_number")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.phone_number}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              label="Email"
              labelStyle={styles.labelStyle}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.email}
              value={userStaffData && userStaffData.email}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Serial Number"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("serial_number")}
              onBlur={formik.handleBlur("serial_number")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.serial_number}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.picker}>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              onPress={() => {
                DateTimePickerAndroid.open({
                  value: formik.values.date_of_joining,
                  onChange: (event, date) => {
                    formik.setFieldValue("date_of_joining", date_of_joining);
                  },
                  mode: "date",
                  is24Hour: true,
                });
              }}
              title="Date of Joining"
            />
            <Text style={styles.pickerText}>
              Date of Joining: {formik.values.date_of_joining.toLocaleString()}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Branch Id"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("branch_id")}
              onBlur={formik.handleBlur("branch_id")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.branch_id}
              keyboardType="number-pad"
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Designation Id"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("designationId")}
              onBlur={formik.handleBlur("designationId")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.designationId}
              keyboardType="number-pad"
            />
          </View> */}
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Civil Id"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("civil_id")}
              onBlur={formik.handleBlur("civil_id")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.civil_id}
              keyboardType="number-pad"
            />
          </View>

          {/* <View style={styles.picker}>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              onPress={() => {
                DateTimePickerAndroid.open({
                  value: formik.values.civilIdExpiry,
                  onChange: (event, date) => {
                    formik.setFieldValue("civilIdExpiry", date);
                  },
                  mode: "date",
                  is24Hour: true,
                });
              }}
              title="Civil Id Expiry"
            />
            <Text style={styles.pickerText}>
              Civil Id Expiry: {formik.values.civilIdExpiry.toLocaleString()}
            </Text>
          </View> */}

          {/* <View style={styles.picker}>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              onPress={() => {
                DateTimePickerAndroid.open({
                  value: formik.values.medicalExpiry,
                  onChange: (event, date) => {
                    formik.setFieldValue("medicalExpiry", date);
                  },
                  mode: "date",
                  is24Hour: true,
                });
              }}
              title="Medical Expiry"
            />
            <Text style={styles.pickerText}>
              Medical Expiry: {formik.values.dateOfJoining.toLocaleString()}
            </Text>
          </View> */}

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Roles</Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("roles")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("roles", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.roles}
              selectedValue={formik.values.roles}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Staff" value="staff" />
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Management" value="management" />
            </Picker>
          </View>

          <View style={styles.applyBtn}>
            <Button
              color="black"
              buttonStyle={{ borderRadius: 20 }}
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

export default StaffInputs;

const styles = StyleSheet.create({
  applyBtn: {
    marginBottom: 10,
    marginTop: 20,
  },
  dropDown: {
    backgroundColor: "#f2f2f2",
    marginBottom: 15,
  },
  dropDownContainer: {
    paddingHorizontal: 10,
  },
  goBackBtn: {
    name: "arrow-back-sharp",
    type: "ionicon",
    size: 20,
    color: "white",
  },
  input: {
    backgroundColor: "#f2f2f2",
    paddingLeft: 5,
  },
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    marginVertical: 3,
    paddingHorizontal: 10,
  },
  pickerText: {
    marginVertical: 10,
  },
});
