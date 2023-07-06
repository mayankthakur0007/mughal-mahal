import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { useFormik } from "formik";
import { LoanSchema } from "../../../shared/FormValidationSchema";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

const LoanInputs = (props) => {
  const day = new Date().getDay();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const onSubmit = async (formData) => {
    handleClose();
  };

  const handleClose = () => {
    //formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      loanAmount: (props.userLoanData && props.userLoanData.loanAmount) || "",
      purpose: (props.userLoanData && props.userLoanData.purpose) || "",
      startDate: new Date(),
      endDate: new Date(year, month, day),
    },
    onSubmit,
    validationSchema: LoanSchema,
  });

  return (
    <>
      <ScrollView>
        <Button
          title="Go Back"
          icon={styles.goBackBtn}
          iconContainerStyle={{ marginRight: 10 }}
          onPress={() => props.updateShowLoanInputs(false)}
        />
        <Card>
          <Input
            style={{
              backgroundColor: "#f2f2f2",
              paddingVertical: 15,
              height: 50,
            }}
            onChangeText={formik.handleChange("loanAmount")}
            onBlur={formik.handleBlur("loanAmount")}
            label="Enter Loan Amount"
            labelStyle={styles.labelStyle}
            errorStyle={{ color: "red" }}
            errorMessage={formik.errors.loanAmount}
            keyboardType="number-pad"
            value={props.userLoanData && formik.values.loanAmount}
          />

          <Input
            style={{
              backgroundColor: "#f2f2f2",
              paddingVertical: 15,
              height: 100,
            }}
            onChangeText={formik.handleChange("purpose")}
            onBlur={formik.handleBlur("purpose")}
            label="Enter Loan Purpose"
            labelStyle={styles.labelStyle}
            errorStyle={{ color: "red" }}
            errorMessage={formik.errors.purpose}
            numberOfLines={8}
            multiline={true}
            value={props.userLoanData && formik.values.purpose}
          />

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
          <Text style={{ marginTop: 5, marginBottom: 15 }}>
            Start Date: {formik.values.startDate.toLocaleString()}
          </Text>

          <Button
            style={{ marginTop: 10 }}
            icon={<MaterialIcons name="date-range" size={24} color="white" />}
            onPress={() => {
              DateTimePickerAndroid.open({
                value: formik.values.startDate,
                minimumDate: new Date(year, month, day),
                onChange: (event, date) => {
                  formik.setFieldValue("endDate", date);
                },
                mode: "date",
                is24Hour: true,
              });
            }}
            title="Pick End Date"
          />
          <Text style={{ marginTop: 5, marginBottom: 15 }}>
            End Date: {formik.values.endDate.toLocaleString()}
          </Text>

          <Button
            color="green"
            title="Apply"
            onPress={formik.handleSubmit}
            size="lg"
          />
        </Card>
      </ScrollView>
    </>
  );
};

export default LoanInputs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
  },
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  goBackBtn: {
    name: "arrow-back-sharp",
    type: "ionicon",
    size: 20,
    color: "white",
  },
});
