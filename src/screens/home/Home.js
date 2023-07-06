import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Home = ({ navigation }) => {
  const {isLogin,logout,isLoading} = useContext(AuthContext)

  if(!isLogin){
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Mughal Mahal Welfare</Text>
      <Button title="Logout" color="red" onPress={logout}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  welcome:{
    fontSize:20,
    marginBottom:10,
  },
})
