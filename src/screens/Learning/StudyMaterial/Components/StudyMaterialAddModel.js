import { Button, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Dialog, FAB, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { theme } from "galio-framework";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { staff } from "../../../../shared/Http/staffCall";
import { designation } from "../../../../shared/Http/designationCall";
import { questionnaires } from "../../../../shared/Http/questionnaires";
import * as DocumentPicker from 'expo-document-picker';
import { studyMaterial } from "../../../../shared/Http/StudyMaterial";
import { StudyMaterialSchema } from "../../../../shared/FormValidationSchema";
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];
const StudyMaterialAddModel = (props) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [rolesOrUser, setRolesOrUser] = useState('roles');
  const [rolesOrUserFocus, setRolesOrUserFocus] = useState(false);
  const [usersOrRolesList, setUsersOrRolesList] = useState([]);
  const [usersOrRolesSelected, setUsersOrRolesSelected] = useState([]);
  const [questionnaireList, setQuestionnaireList] = useState([]);
  const [questionnaireSelected, setQuestionnaireSelected] = useState([]);

  const fecthQuestionnaire = questionnaires.findAll().then((res) => {
    setQuestionnaireList(res.data);
  });
  const onSubmit = async (formData) => {
    //const res = await studyMaterial.create(formData);
    //props.branchUpdater(res.data);
    //handleClose();
    alert(formik.values.mediaid)
  };

  const handleClose = () => {
    setVisible(!visible);
    formik.resetForm();
  };


  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      mediaid: [],
      categories: [],
      assignedType: '',
      assingedTo: [],
      attachedQuestionnaires: [],
    },
    onSubmit,
    validationSchema: StudyMaterialSchema,
  });

  const setFieldValue = (fieldName, fieldValue) => {
    formik.setFieldValue(fieldName, fieldValue);
  }

  const dialogVisible = () => {
    setVisible(!visible);
  };

  const getRolesOrUsers = (value) => {
    if (value == 'roles') {
      const designations = designation.findAll();
      designations
        .then((response) => {
          setUsersOrRolesList(response.data);
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      const users = staff.findAll();
      users
        .then((response) => {
          setUsersOrRolesList(response.data);
        })
        .catch((error) => {
        });
    }

  }

  const handleAttachmentSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        type: 'image/*',
      });

      if (result.type === 'success') {

        let file = { ...result };
        if (Platform.OS === 'android') {
          const uriComponents = result.uri.split('/');
          file.name = uriComponents[uriComponents.length - 1];
          file.path = result.uri;
        } else {
          file.name = result.name;
          file.path = result.uri;
        }
        formik.setFieldValue('mediaid', [...formik.values.mediaid, file])
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttachmentRemove = (indexToRemove) => {
    let newList = formik.values.mediaid.filter((attachment, index) => {
      return index !== indexToRemove
    })
    formik.setFieldValue('mediaid', newList)
  };


  const [attachment, setAttachment] = useState(null);

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
        <Dialog.Title title={"Add Study Material"} />
        <ScrollView>
          <Input
            onChangeText={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            label="Enter Topic Title"
            labelStyle={styles.labelStyle}
            style={{ fontSize: theme.SIZES.FONT }}
            errorStyle={{ color: "red" }}
            errorMessage={formik.errors.title}
            containerStyle={{ marginTop: 10 }}
          />
          <Input
            onChangeText={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            label="Enter Description"
            labelStyle={styles.labelStyle}
            style={{ fontSize: theme.SIZES.FONT }}
            errorStyle={{ color: "red" }}
            errorMessage={formik.errors.description}
          />


          <TouchableOpacity style={styles.attachmentButton} onPress={handleAttachmentSelect}>
            <Text style={styles.attachmentButtonText}>Add Attachment</Text>
          </TouchableOpacity>

          {formik.values.mediaid.map((file, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>

              <TouchableOpacity
                onPress={() => handleAttachmentRemove(index)}
                style={{ marginTop: 5 }}>
                <Text>{file.name}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={formik.values.categories}
            onChange={item => {
              setFieldValue('categories', item)
              setSelected(item);
            }}
            selectedStyle={styles.selectedStyle}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={[{ "value": "roles", "label": "Assing by Role" }, { "value": "users", "label": "Assing by Users" }]}
            search
            labelField="label"
            valueField="value"
            placeholder={!rolesOrUserFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={formik.values.assignedType}
            onChange={item => {
              getRolesOrUsers(item.value);
              setRolesOrUser(item.value);
              setRolesOrUserFocus(false);
              setFieldValue('assignedType', item.value)
            }}
          />

          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={usersOrRolesList}
            labelField="name"
            valueField="id"
            placeholder={rolesOrUser == 'users' ? "Select Users" : "Select Roles"}
            value={formik.values.assingedTo}
            onChange={item => {
              setFieldValue('assingedTo', item)
              setUsersOrRolesSelected(item);
            }}
            selectedStyle={styles.selectedStyle}
          />


          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={questionnaireList}
            labelField="title"
            valueField="id"
            placeholder="Select Questionnaires"
            value={formik.values.attachedQuestionnaires}
            onChange={item => {
              setFieldValue('attachedQuestionnaires', item)
              setQuestionnaireSelected(item);
            }}
            selectedStyle={styles.selectedStyle}
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
        </ScrollView>
      </Dialog>
    </View>
  );
};

export default StudyMaterialAddModel;

const styles = StyleSheet.create({
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    height: 50,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    fontSize: 16,
    height: 40,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  attachmentButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  attachmentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  attachmentText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
});
