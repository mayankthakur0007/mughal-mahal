import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import { MoMSchema } from "../../../shared/FormValidationSchema";

const Compose = () => {
  const onSubmit = async (formData) => {
    console.log(formData);
    handleClose();
  };

  const handleClose = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      subject: "",
      hosted_by: "",
      branch: "",
      message: "",
    },
    onSubmit :onSubmit,
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
                onValueChange={(itemValue, itemIndex) => {
                  formik.setFieldValue("branch", itemValue);
                }}
                errorStyle={{ color: "red" }}
                errorMessage={formik.errors.branch}
                selectedValue={formik.values.branch}
                dropdownIconColor="#000"
              >
                <Picker.Item label="Sharq (SHRQ)" value="Sharq (SHRQ)" />
                <Picker.Item label="Hawally (HWLY)" value="Hawally (HWLY)" />
                <Picker.Item
                  label="Farwaniya (FRWN)"
                  value="Farwaniya (FRWN)"
                />
                <Picker.Item label="Jahra (JHRA)" value="Jahra (JHRA)" />
                <Picker.Item label="Mahboula (MAHB)" value="Mahboula (MAHB)" />
                <Picker.Item label="Elite (SLMY#1)" value="Elite (SLMY#1)" />
                <Picker.Item
                  label="Multicuisine (SLMY#2)"
                  value="Multicuisine (SLMY#2)"
                />
                <Picker.Item
                  label="Marina Mall (MRML)"
                  value="Marina Mall (MRML)"
                />
                <Picker.Item label="Fahaheel (FAHL)" value="Fahaheel (FAHL)" />
                <Picker.Item
                  label="Head Office (H.O)"
                  value="Head Office (H.O)"
                />
                <Picker.Item
                  label="Mughal Mahal General Trading Company (MMGTC)"
                  value="Mughal Mahal General Trading Company (MMGTC)"
                />
                <Picker.Item label="Shuwaikh (SHKW)" value="Shuwaikh (SHKW)" />
                <Picker.Item label="Khiran (KHRN)" value="Khiran (KHRN)" />
              </Picker>
            </View>
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
            <Button
              color="white"
              titleStyle={{ color: "black" }}
              buttonStyle={{ borderRadius: 5 }}
              title="Clear"
              onPress={handleClose}
              size="lg"
            />
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
