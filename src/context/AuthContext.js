import React, { createContext, useEffect, useState } from "react";
import { Alert } from 'react-native'
import { user } from "../shared/Http/userCall";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[userInfo,setUserInfo] = useState();
    const[isLoading,setIsLoading] = useState(false);
    const[isLogin,setIsLogin] = useState(false);

    const login = (formData) =>{
         setIsLoading(true);

           user.create(formData).then((res) => {
            let userInfo = res.data;
            let token = userInfo.token;
            userDetails(token,userInfo);
         
          })
          .catch((error)=>{
            if (error.response) {
              console.log(error.response.data.error);
              Alert.alert(error.response.data.error.message)
            }
            setIsLoading(false)
          });
    }

    userDetails = (token,userInfo) =>{
      user.findOne(token).then((res) =>{
        let decoded = res.data;
        if(!decoded.status) {
          Alert.alert("Oops! your account has been blocked. Please contact admin.")
          return false;
        }
        setIsLoading(false)
        setIsLogin(true) 
        let userData = {...userInfo,decoded}
        setUserInfo(userData)
        AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      })
      .catch((error) => {
         console.log(error); 
      });

    }

    const logout = () =>{
        AsyncStorage.removeItem('userInfo');
        setUserInfo()
        setIsLogin(false);
        setIsLoading(false);
      }

    const isLoggedIn = async () =>{
        try {
          let userData = await AsyncStorage.getItem('userInfo');
          let parsedUserData = JSON.parse(userData); 
          if(parsedUserData && parsedUserData.status==200)
          {
            setUserInfo(userData);
            setIsLogin(true); 
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      useEffect(() => {
        isLoggedIn();
      },[]);

    return ( 
        <AuthContext.Provider 
            value={{
                login,
                isLoading,
                userInfo,
                isLogin,
                logout,
            }}>
                {children}
                </AuthContext.Provider>
    );
};
