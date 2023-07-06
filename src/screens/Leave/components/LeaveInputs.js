import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from "formik";
import { LeaveSchema } from "../../../shared/FormValidationSchema";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const LeaveInputs = (props) => {
  const onSubmit = async (formData) => {
    handleClose();
  };

  const handleClose = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      kuwaitPhoneNumber: "",
      alternativePhoneNumber: "",
      leaveType: "",
      status: "",
      startDate: new Date(),
      endDate: new Date(),
      lastVacationDate: new Date(),
      totalDaysAvailed: "",
      isYourLastVacationDelayed: false,
      isFirstVacation: false,
      isMoneyOwed: false,
      dateOfMoneyOwed: new Date(),
      totalMoneyOwed: "",
      flightPreference: "",
      mentionDestinationTicket: "",
      isReadyToPayTicketVariables: false,
      approvedByManager: false,
      approvedByManagerId: "",
      approvedByManagerOn: "",
      approvedByHR: false,
      approvedByHRId: "",
      approvedByHROn: "",
      emergencyDocs: "",
    },
    onSubmit,
    validationSchema: LeaveSchema,
  });

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  };

  return (
    <>
      <ScrollView>
        <Button
          title="Go Back"
          icon={styles.goBackBtn}
          iconContainerStyle={{ marginRight: 10 }}
          onPress={() => props.updateShowLeaveInputs(false)}
        />
        <Card>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              onChangeText={formik.handleChange("kuwaitContactNumber")}
              onBlur={formik.handleBlur("kuwaitContactNumber")}
              label="Kuwait Contact Number"
              labelStyle={styles.labelStyle}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.kuwaitContactNumber}
              keyboardType="number-pad"
              value={
                props.userLeaveData && props.userLeaveData.kuwaitPhoneNumber
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Other Phone Number"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("alternativePhoneNumber")}
              onBlur={formik.handleBlur("alternativePhoneNumber")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.alternativePhoneNumber}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Type </Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("type")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("type", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.type}
              selectedValue={formik.values.type}
              dropdownIconColor="#000"
            >
              <Picker.Item
                label="Regular Due Vacation"
                value="Regular Due Vacation"
              />
              <Picker.Item label="Emergency" value="Emergency" />
              <Picker.Item label="Planned" value="Planned" />
            </Picker>
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Status </Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("status")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("status", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.status}
              selectedValue={formik.values.status}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Approved" value="Approved" />
              <Picker.Item label="Rejected" value="Rejected" />
            </Picker>
          </View>

          <View style={styles.picker}>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              onPress={() => {
                DateTimePickerAndroid.open({
                  value: formik.values.startDate,
                  onChange: (event, date) => {
                    formik.setFieldValue("startDate", date);
                  },
                  mode: "date",
                  is24Hour: true,
                });
              }}
              title="Pick Start Date"
            />
            <Text style={styles.pickerText}>
              Start Date: {formik.values.startDate.toLocaleString()}
            </Text>
          </View>

          <View style={styles.picker}>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              onPress={() => {
                DateTimePickerAndroid.open({
                  value: formik.values.startDate,
                  onChange: (event, date) => {
                    formik.setFieldValue("endDate", date);
                  },
                  mode: "date",
                  is24Hour: true,
                });
              }}
              title="Pick End Date"
            />
            <Text style={styles.pickerText}>
              End Date: {formik.values.endDate.toLocaleString()}
            </Text>
          </View>

          <View style={styles.picker}>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              onPress={() => {
                DateTimePickerAndroid.open({
                  value: formik.values.lastVacationDate,
                  onChange: (event, date) => {
                    formik.setFieldValue("lastVacationDate", date);
                  },
                  mode: "date",
                  is24Hour: true,
                });
              }}
              title="Pick Last Vacation Date"
            />
            <Text style={styles.pickerText}>
              Last Vacation Date:{" "}
              {formik.values.lastVacationDate.toLocaleString()}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Total Days Availed"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("totalDaysAvailed")}
              onBlur={formik.handleBlur("totalDaysAvailed")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.totalDaysAvailed}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>
              Is your last vacation delayed?{" "}
            </Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("isYourLastVacationDelayed")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("isYourLastVacationDelayed", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.isYourLastVacationDelayed}
              selectedValue={formik.values.isYourLastVacationDelayed}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Is first vacation?</Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("isFirstVacation")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("isFirstVacation", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.isFirstVacation}
              selectedValue={formik.values.isFirstVacation}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Is money owed?</Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("isMoneyOwed")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("isMoneyOwed", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.isMoneyOwed}
              selectedValue={formik.values.isMoneyOwed}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          <View style={styles.picker}>
            <Button
              icon={<MaterialIcons name="date-range" size={24} color="white" />}
              onPress={() => {
                DateTimePickerAndroid.open({
                  value: formik.values.dateOfMoneyOwed,
                  onChange: (event, date) => {
                    formik.setFieldValue("dateOfMoneyOwed", date);
                  },
                  mode: "date",
                  is24Hour: true,
                });
              }}
              title="Pick Date of Money Owed"
            />
            <Text style={styles.pickerText}>
              Date of Money Owed:{" "}
              {formik.values.dateOfMoneyOwed.toLocaleString()}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Total Money Owed"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("totalMoneyOwed")}
              onBlur={formik.handleBlur("totalMoneyOwed")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.totalMoneyOwed}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Flight Preferences"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("flightPreferences")}
              onBlur={formik.handleBlur("flightPreferences")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.flightPreferences}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Mention destination ticket"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("mentionDestinationTicket")}
              onBlur={formik.handleBlur("mentionDestinationTicket")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.mentionDestinationTicket}
            />
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>
              Is ready to pay ticket variables?
            </Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("isReadyToPayTicketVariables")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("isReadyToPayTicketVariables", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.isReadyToPayTicketVariables}
              selectedValue={formik.values.isReadyToPayTicketVariables}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Approved By Manager</Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("approvedByManager")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("approvedByManager", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.approvedByManager}
              selectedValue={formik.values.approvedByManager}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          <View style={styles.dropDownContainer}>
            <Text style={styles.labelStyle}>Approved By HR</Text>
            <Picker
              style={styles.dropDown}
              onBlur={formik.handleBlur("approvedByHR")}
              onValueChange={(itemValue, itemIndex) => {
                formik.setFieldValue("approvedByHR", itemValue);
              }}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.approvedByHR}
              selectedValue={formik.values.approvedByHR}
              dropdownIconColor="#000"
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Button
              icon={
                <Ionicons name="ios-document-attach" size={24} color="white" />
              }
              title="Upload Emergency Documents"
              onPress={_pickDocument}
            />
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

export default LeaveInputs;

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
