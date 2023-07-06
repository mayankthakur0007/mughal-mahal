import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Button, Card, Input } from "@rneui/themed";
import { useFormik } from "formik";
import { LoginSchema } from "../shared/FormValidationSchema";
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const Login = ({ navigation }) => {
  
  const {isLoading,login}= useContext(AuthContext);

  navigation.setOptions({headerShown: false});

    const onSubmit = async (formData) => {
     login(formData);
    };
    
    const formik = useFormik({
    initialValues: {
        civil_id: "",
        password: "",
    },
    onSubmit,
    validationSchema: LoginSchema,
    });

    if (isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
        <View style={styles.container}>
          <View  style={{alignItems:'center'}}>
            <Image 
            source={require('../assets/imgs/MMEWA-icon.png')}
            style={{width:'60%', height:190}}
            >
            </Image>
          </View>
         <Card>
         <View style={styles.inputContainer}>
             <Text style={styles.loginHeader}>Welcome </Text>
           </View>
         <View style={styles.inputContainer}>
             <Text style={{fontSize:13,color:'gray',marginLeft:10,marginBottom:20}}>Sign in to continue! </Text>
           </View>

            <View style={styles.inputContainer}>
             <Input
              style={styles.input}
              onChangeText={formik.handleChange("civil_id")}
              onBlur={formik.handleBlur("civil_id")}
              label="Enter Civil ID"
              labelStyle={styles.labelStyle}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.civil_id}
              keyboardType="number-pad"
            />
           </View>
         
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              label="Enter Password"
              labelStyle={styles.labelStyle}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              errorStyle={{ color: "red" }}
              errorMessage={formik.errors.password}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.applyBtn}>
            <Button
              color="green"
              title="Sign in"
              onPress={formik.handleSubmit}
              size="lg"
            />

            <View style={{flexDirection:'row',marginTop:7,justifyContent:'center'}} >
             <Text style={{fontSize:13,color:'gray'}}>Don't have an account? </Text>
             <TouchableOpacity>
             <Text style={{fontSize:13,color:'red'}}>Sign Up</Text>
             </TouchableOpacity>
           </View>
           <TouchableOpacity>
           <Text style={{fontSize:13,color:'red',marginTop:25,textAlign:'center',padding:20}}>Forgot Password?</Text>
           </TouchableOpacity>
          </View>
        </Card>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent:'center'
  },
  loginHeader:{
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginTop:20,
    marginLeft:10,
  },
    applyBtn: {
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
  },
  input: {
    paddingLeft: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  labelStyle: {
    color: "grey",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
