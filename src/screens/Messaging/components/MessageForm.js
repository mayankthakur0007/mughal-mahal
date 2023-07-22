import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from "formik";
import { MessageSchema1 } from "../../../shared/FormValidationSchema";
import * as FileSystem from "expo-file-system";
import { media } from "../../../shared/Http/media";
import { internalComms } from "../../../shared/Http/internalCommsCall";
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
    }
    let data = {};
    data.message = formData.message;
    data.subject = formData.subject;
    if (mediaPost?.data?.path) {
      let { path, file_extension } = mediaPost.data;
      data.file = { path: path, file_extension: file_extension };
    }
    await module.create(data);
    handleClose();
    setSelectedTab(2);
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
    },
    onSubmit,
    validationSchema: MessageSchema1,
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
