import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Input, Button,CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from "formik";
import {
  MessageSchema1,
  MessageSchema2,
} from "../../../shared/FormValidationSchema";
import * as FileSystem from "expo-file-system";
import { media } from "../../../shared/Http/media";
import { internalComms } from "../../../shared/Http/internalCommsCall";
import { messaging } from "../../../shared/Http/messagingCall";
import { messageFromManagement } from "../../../shared/Http/messageFromManagementCall";
import IconExtra from "../../../components/Icon";

const MessageForm = ({ label, from, setSelectedTab }) => {
  const [file, setFile] = useState({});
  let mediaPost;
  const onSubmit = async (formData) => {
    if (file.image && file.extension) {
      mediaPost = await media.create(file);
    }
    let module;
    if (from === "Management") {
      module = messageFromManagement;
    } else if (from === "Comms") {
      module = internalComms;
    } else if(from === "Messaging"){
      module = messaging;
    }
    let data = {};
    formData.message && (data.message = formData.message);
    formData.subject && (data.subject = formData.subject);
    formData.email && (data.email = formData.email);
    formData.phone_number && (data.phone_number = formData.phone_number);
    formData.recipient && (data.recipient = formData.recipient);
    if (mediaPost?.data?.path) {
      let { path, file_extension } = mediaPost.data;
      data.file = { path: path, file_extension: file_extension };
    }
    await module.create(data);
    handleClose();
    setSelectedTab && setSelectedTab(2);
  };
  const handleClose = () => {
    formik.resetForm();
    setFile({});
  };
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let base64Img;
    if (result.type == "success" && result.uri) {
      base64Img = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem?.EncodingType?.Base64,
      });
      setFile({
        image: `data:${result.mimeType};base64,${base64Img}`,
        extension: result.mimeType.split("/")[1],
        name: result.name,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      message: "",
      phone_number: "",
      email: "",
      subject: "",
      recipient: [],
    },
    onSubmit,
    validationSchema: from == "Messaging" ? MessageSchema2 : MessageSchema1,
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
            value={formik.values.subject}
          />
        ) : (
          <>
            <View>
              <Text
                style={{
                  paddingVertical: 10,
                }}
              >
                Select Recipient
              </Text>
              <View
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  paddingVertical: 10,
                }}
              >
                <CheckBox size={25}
                  checkedColor="black"
                  uncheckedColor="black"
                  textStyle={{
                    textDecorationLine: "none",
                    color: "#070707",
                  }}
                  title={"H.O"}
                  iconStyle={{ borderRadius: 3, borderWidth: 2 }}
                  innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
                  checked={formik.values.recipient.includes("H.O")}
                  onPress={() => {
                    if (!formik.values.recipient.includes("H.O")) {
                      formik.setFieldValue("recipient", [
                        ...formik.values.recipient,
                        "H.O",
                      ]);
                    } else {
                      formik.setFieldValue(
                        "recipient",
                        formik.values.recipient.filter((e) => e != "H.O")
                      );
                    }
                  }}/>
                {/* <BouncyCheckbox
                  size={25}
                  fillColor="black"
                  unfillColor="white"
                  textStyle={{
                    textDecorationLine: "none",
                    color: "#070707",
                  }}
                  text={"H.O"}
                  iconStyle={{ borderRadius: 3, borderWidth: 2 }}
                  innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
                  isChecked={formik.values.recipient.includes("H.O")}
                  onPress={(isChecked) => {
                    if (isChecked) {
                      formik.setFieldValue("recipient", [
                        ...formik.values.recipient,
                        "H.O",
                      ]);
                    } else {
                      formik.setFieldValue(
                        "recipient",
                        formik.values.recipient.filter((e) => e != "H.O")
                      );
                    }
                  }}
                /> */}
                <CheckBox size={25}
                  checkedColor="black"
                  uncheckedColor="black"
                  textStyle={{
                    textDecorationLine: "none",
                    color: "#070707",
                  }}
                  title={"H.R"}
                  iconStyle={{ borderRadius: 3, borderWidth: 2 }}
                  innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
                  checked={formik.values.recipient.includes("H.R")}
                  onPress={() => {
                    if (!formik.values.recipient.includes("H.R")) {
                      formik.setFieldValue("recipient", [
                        ...formik.values.recipient,
                        "H.R",
                      ]);
                    } else {
                      formik.setFieldValue(
                        "recipient",
                        formik.values.recipient.filter((e) => e != "H.R")
                      );
                    }
                  }}/>
                  <CheckBox size={25}
                  checkedColor="black"
                  uncheckedColor="black"
                  textStyle={{
                    textDecorationLine: "none",
                    color: "#070707",
                  }}
                  title={"Director"}
                  iconStyle={{ borderRadius: 3, borderWidth: 2 }}
                  innerIconStyle={{ borderRadius: 0, borderWidth: 0 }}
                  checked={formik.values.recipient.includes("Director")}
                  onPress={() => {
                    if (!formik.values.recipient.includes("Director")) {
                      formik.setFieldValue("recipient", [
                        ...formik.values.recipient,
                        "Director",
                      ]);
                    } else {
                      formik.setFieldValue(
                        "recipient",
                        formik.values.recipient.filter((e) => e != "Director")
                      );
                    }
                  }}/>
              </View>
            </View>
            <Text
              style={{
                color: "red",
                paddingLeft: 5,
                paddingTop: 5,
                fontSize: 12,
              }}
            >
              {formik.errors.recipient}
            </Text>
            <Input
              style={styles.input}
              label="Email Address"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.email}
              keyboardType="email-address"
              value={formik.values.email}
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
              value={formik.values.phone_number}
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
          value={formik.values.message}
        />
        <View>
          <Button
            color="black"
            containerStyle={{ marginVertical: 10, flexGrow: 0 }}
            buttonStyle={{ borderRadius: 5 }}
            title="Upload files"
            titleStyle={{ color: "white" }}
            onPress={() => _pickDocument()}
          />
          {file.name ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text>{file.name}</Text>
              <TouchableOpacity onPress={() => setFile({})}>
                <IconExtra name="close" family="FontAwesome" color="black" />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.btnGroup}>
            <Button
              color="white"
              containerStyle={{ marginVertical: 10, flexGrow: 0 }}
              titleStyle={{ color: "black" }}
              buttonStyle={{ borderRadius: 5 }}
              title="Cancel"
              onPress={() => handleClose()}
            />
            <Button
              color="black"
              containerStyle={{ marginVertical: 10, flexGrow: 0 }}
              title="Submit"
              titleStyle={{ color: "white" }}
              buttonStyle={{ borderRadius: 5 }}
              onPress={formik.handleSubmit}
            />
          </View>
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
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  labelStyle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
