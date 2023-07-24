import { StyleSheet, Text, View, Button,ScrollView } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MessageSummary from "./messageSummary";
import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const { isLogin, logout, isLoading } = useContext(AuthContext);
  const { navigate } = useNavigation();
  if (!isLogin) {
    navigation.navigate("Login");
  }

  return (
    <ScrollView style={styles.container}>
      <MessageSummary navigate={navigate} from="MOM" />
      <MessageSummary navigate={navigate} from="Management" />
      <MessageSummary navigate={navigate} from="Comms" />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 20,
    marginBottom: 10,
  },
});
