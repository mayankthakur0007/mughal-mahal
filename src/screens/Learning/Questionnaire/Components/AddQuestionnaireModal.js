import { Button, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, View, ScrollView, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Dialog, FAB, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Block, theme } from "galio-framework";
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { staff } from "../../../../shared/Http/staffCall";
import { designation } from "../../../../shared/Http/designationCall";
import { questionnaires } from "../../../../shared/Http/questionnaires";
import * as DocumentPicker from 'expo-document-picker';
import { studyMaterial } from "../../../../shared/Http/StudyMaterial";
import { QuestionnaireSchema, QuestionSchema, StudyMaterialSchema } from "../../../../shared/FormValidationSchema";
import { lmsCategories } from "../../../../shared/Http/LMSCategoried";
import { actionIcons } from "../../../../constants/icons";
import * as FileSystem from 'expo-file-system';

const questionOptions = [{
  id: 'a',
  value: 'a'
},
{
  id: 'b',
  value: 'b'
},
{
  id: 'c',
  value: 'c'
},
{
  id: 'd',
  value: 'd'
},
{
  id: 'e',
  value: 'e'
},
{
  id: 'f',
  value: 'f'
}]

const AddQuestionnaireModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [rolesOrUser, setRolesOrUser] = useState('roles');
  const [rolesOrUserFocus, setRolesOrUserFocus] = useState(false);
  const [usersOrRolesList, setUsersOrRolesList] = useState(props.rolesdata || 0);
  const [usersOrRolesSelected, setUsersOrRolesSelected] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [questionnaireSelected, setQuestionnaireSelected] = useState([]);
  const [optionsSelected, setOptionsSelected] = useState([]);
  const { showActionSheetWithOptions } = useActionSheet();
  const [ value, setValue ] = useState(props.rolesdata || 0)
  const fecthCategories = lmsCategories.findAll().then((res) => {
    setCategoryList(res.data);
  });

  const onSubmit = async (formData) => {
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
      assignedType: 'roles',
      assingedTo: [],
      questions: [],
    },
    onSubmit,
    validationSchema: QuestionnaireSchema,
  });

  const questionFormik = useFormik({
    initialValues: {
      title: '',
      mediaid: [],
      options: '',
      correctOption: '',
      pointsOnCorrentAns: null
    },
    onSubmit: (values) => {
      formik.values.questions.push(values)
      questionFormik.resetForm();
      questionFormik.values.title = '';
      questionFormik.values.pointsOnCorrentAns = null;
    },
    validationSchema: QuestionSchema,
  });

  const setFieldValue = (fieldName, fieldValue) => {
    formik.setFieldValue(fieldName, fieldValue);
  }

  const setquestionFieldValue = (fieldName, fieldValue) => {
    questionFormik.setFieldValue(fieldName, fieldValue);
  }

  const dialogVisible = () => {
    setVisible(!visible);
  };

  const getRolesOrUsers = (value) => {
    console.log(value)
    if (value === 'roles') {
      console.log('designation')
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
        let filedata = {
          name: file.name,
          path: file.path,
          mimeType: result.mimeType,
          base64String: ""
        }

        const b64 = await FileSystem.readAsStringAsync(file.path, { encoding: FileSystem?.EncodingType?.Base64 })
        filedata.base64String = b64;
        questionFormik.setFieldValue('mediaid', [...questionFormik.values.mediaid, filedata])
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttachmentRemove = (indexToRemove) => {
    let newList = questionFormik.values.mediaid.filter((attachment, index) => {
      return index !== indexToRemove
    })
    questionFormik.setFieldValue('mediaid', newList)
  };

  const renderAttachmentButton = () => {
    if (questionFormik.values.mediaid.length < 1) {
      return <TouchableOpacity visible={questionFormik.values.mediaid.length < 1} style={styles.attachmentButton} onPress={handleAttachmentSelect}>
        <Text style={styles.attachmentButtonText}>Add Attachment</Text>
      </TouchableOpacity>
    }
  }
  const renderQuestionsList = () => {
    if (formik.values.questions.length > 0) {
      return (
        <FlatList
          data={formik.values.questions}
          renderItem={({ item, index }) => (
            <View>
              <Pressable
                style={({ pressed }) => [styles.card, pressed && styles.pressed]}
                onLongPress={(index) => {
                  const options = ["Delete", "Cancel"];
                  const cancelButtonIndex = 2;
                  const destructiveButtonIndex = 1;
                  showActionSheetWithOptions(
                    {
                      showSeparators: true,
                      containerStyle: styles.actionContainer,
                      textStyle: styles.text,
                      options,
                      cancelButtonIndex,
                      destructiveButtonIndex,
                    },
                    (buttonIndex) => {
                      if (buttonIndex === 0) {
                        handleQuestionDelete(index);
                      }
                    }
                  );
                }}
              >
                <Block style={{ flexDirection: "row" }}>
                  <Text style={styles.name}>{item.title}</Text>
                </Block>
              </Pressable>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      );
    }
  }


  const handleQuestionDelete = (index) => {
    formik.values.questions.splice(index, 1);
  };


  return (
    <KeyboardAvoidingView
      enabled style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollviewStyle}
      >
        <Input
          onChangeText={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          placeholder="Enter Questionnaire Title"
          style={styles.input}
          labelStyle={styles.labelStyle}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.title}
        />
        <Input
          onChangeText={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          placeholder="Enter Questionnaire Description"
          style={styles.input}
          labelStyle={styles.labelStyle}
          errorStyle={{ color: "red" }}
          errorMessage={formik.errors.description}
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





        <View style={styles.questionCard}>
          <Input
            onChangeText={questionFormik.handleChange("title")}
            onBlur={questionFormik.handleBlur("title")}
            placeholder="Enter Question Title"
            style={styles.input}
            labelStyle={styles.labelStyle}
            errorStyle={{ color: "red" }}
            errorMessage={questionFormik.errors.title}
          />

          {renderAttachmentButton()}
          {questionFormik.values.mediaid.map((file, index) => (
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
            data={questionOptions}
            labelField="value"
            valueField="id"
            placeholder="Select Options"
            value={questionFormik.values.options}
            onChange={item => {
              const selectedOptions = item.map((it) => {
                return {
                  id: it,
                  value: it
                }
              })
              setquestionFieldValue('options', item)
              setOptionsSelected(selectedOptions);
            }}
            selectedStyle={styles.selectedStyle}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={optionsSelected}
            search
            labelField="value"
            valueField="id"
            placeholder='Select Correct Answer'
            searchPlaceholder="Search..."
            value={questionFormik.values.correctOption}
            onChange={item => {
              setquestionFieldValue('correctOption', item.value)
            }}
          />

          <Input
            onChangeText={questionFormik.handleChange("pointsOnCorrentAns")}
            onBlur={questionFormik.handleBlur("pointsOnCorrentAns")}
            placeholder="Enter Points on Correct Answer"
            style={styles.input}
            labelStyle={styles.labelStyle}
            errorStyle={{ color: "red" }}
            errorMessage={questionFormik.errors.pointsOnCorrentAns}
          />


          <Button
            title="Save"
            disabled={!(questionFormik.isValid && questionFormik.dirty)}
            onPress={questionFormik.handleSubmit}
          />
          {renderQuestionsList()}
        </View>
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

export default AddQuestionnaireModal;

const styles = StyleSheet.create({
  scrollviewStyle: {
    margin: 10
  },

  questionCard: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5
  },

  input: {
    fontSize: theme.SIZES.FONT,
    height: 40
  },
  fixToText: {
    marginTop: 10,
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
    margin: 10,
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
    padding: 15,
    margin: 10
  },
  attachmentButtonDisabled: {
    backgroundColor: '#e3e3e3',
    borderRadius: 20,
    padding: 15,
    margin: 10
  },
  attachmentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    elevation: 2,
    flexDirection: "column",
    margin: 10,
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
  },
  labelStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  name: {
    fontSize: theme.SIZES.FONT,
    color: "#000000",
    fontWeight: "bold",
  },
  code: {
    fontSize: theme.SIZES.FONT,
    color: "#808080",
    fontSize: 14,
    marginRight: 10,
    flexDirection: "row",
    marginLeft: "auto",
  },
  email: {
    fontSize: theme.SIZES.FONT,
    color: "#808080",
    fontSize: 14,
  },
  phoneNo: {
    fontSize: theme.SIZES.FONT,
    color: "#808080",
    fontSize: 14,
  },
  pressed: {
    backgroundColor: "#eee",
  },
});
