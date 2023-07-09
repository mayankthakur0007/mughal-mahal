import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Input } from "@rneui/themed";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from "formik";
import { MessageSchema } from "../../../shared/FormValidationSchema";
import { Button } from "@rneui/base";

const MessageForm = ({ label, from }) => {
  const onSubmit = async (formData) => {
    console.log(formData);
    handleClose();
  };
  const handleClose = () => {
    formik.resetForm();
  };
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
  };
  const formik = useFormik({
    initialValues: {
      message: "",
      phone_number: "",
      email: "",
      subject: ""
    },
    onSubmit,
    validationSchema: MessageSchema,
  });
  return (
    <ScrollView>
      <View>
        <Text
          style={{
            paddingVertical: 10,
          }}
        >
          {label}
        </Text>
        {from == "Management" || from == "Comms" ? (
          <Input
            style={styles.input}
            label="Subject"
            labelStyle={styles.labelStyle}
            onChangeText={formik.handleChange("subject")}
            onBlur={formik.handleBlur("subject")}
            errorStyle={{ color: "red" }}
            errorMessage={formik.errors.subject}
            keyboardType="number-pad"
          />
        ) : (
          <>
            <Input
              style={styles.input}
              label="Email Address"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.email}
              keyboardType="number-pad"
            />
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
          </>
        )}
        <Input
          style={styles.input}
          label="Message"
          multiline={true}
          labelStyle={styles.labelStyle}
          onChangeText={formik.handleChange("message")}
          onBlur={formik.handleBlur("message")}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.message}
          keyboardType="number-pad"
        />
        <View>
          <Button
            containerStyle={{ marginVertical: 10 }}
            onPress={() => _pickDocument()}
          >
            <Text>Upload files</Text>
          </Button>
          <Button
            containerStyle={{ marginVertical: 10 }}
            onPress={() => handleClose()}
          >
            <Text>Cancel</Text>
          </Button>
          <Button
            containerStyle={{ marginVertical: 10 }}
            onPress={() => onSubmit()}
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default MessageForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    paddingHorizontal: 10,
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
});
