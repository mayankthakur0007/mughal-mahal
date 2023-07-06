import { Button, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, View, ScrollView } from "react-native";
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
import { lmsCategories } from "../../../../shared/Http/LMSCategoried";

const AddStudyMaterial = (props) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [rolesOrUser, setRolesOrUser] = useState('roles');
  const [rolesOrUserFocus, setRolesOrUserFocus] = useState(false);
  const [usersOrRolesList, setUsersOrRolesList] = useState([]);
  const [usersOrRolesSelected, setUsersOrRolesSelected] = useState([]);
  const [questionnaireList, setQuestionnaireList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [questionnaireSelected, setQuestionnaireSelected] = useState([]);

  const fecthQuestionnaire = questionnaires.findAll().then((res) => {
    setQuestionnaireList(res.data);
  });

  const fecthCategories = lmsCategories.findAll().then((res) => {
    setCategoryList(res.data);
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
    <KeyboardAvoidingView
      enabled style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollviewStyle}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Input
          onChangeText={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          placeholder="Enter Study Material Title"
          style={styles.input}
          labelStyle={styles.labelStyle}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.title}
        />
        <Input
          onChangeText={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          placeholder="Enter Study Material Description"
          style={styles.input}
          labelStyle={styles.labelStyle}
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
          data={categoryList}
          labelField="title"
          valueField="id"
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

        <View style={styles.fixToText}>
          <Button
            title="Cancel"
            
          />
          <Button
            title="Save"
            disabled={!(formik.isValid && formik.dirty)}
            onPress={formik.handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddStudyMaterial;

const styles = StyleSheet.create({
  scrollviewStyle: {
    margin: 10
  },
  input: {
    fontSize: theme.SIZES.FONT,
    height: 40
  },
  fixToText: {
    marginTop : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
    padding: 15
  },
  attachmentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
