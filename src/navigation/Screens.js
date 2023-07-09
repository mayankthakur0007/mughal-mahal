import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { nowTheme } from "../constants";
import CustomDrawerContent from "./Menu";
import Header from "../components/Header";
import Home from "../screens/home/Home";
import Leave from "../screens/Leave/Leave";
import Branch from "../screens/Branch/Branch";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Messaging from "../screens/Messaging/components/Messaging";
import Loan from "../screens/Loan/Loan";
import Designation from "../screens/Designation/Designation";
import Staff from "../screens/Staff/Staff";
import { AuthContext } from "../context/AuthContext";
import StudyMaterial from "../screens/Learning/StudyMaterial/StudyMaterial";
import Questionnaire from "../screens/Learning/Questionnaire/Questionnaire";
import AddStudyMaterial from "../screens/Learning/StudyMaterial/Components/AddStudyMaterial";
import AddQuestionnaireModal from "../screens/Learning/Questionnaire/Components/AddQuestionnaireModal";
import AddQuestionnaire from "../screens/Learning/Questionnaire/AddQuestionnaire";

const { width } = Dimensions.get("screen");


export const Stack = createStackNavigator();
export const Drawer = createDrawerNavigator();


function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => {
            return (
              <Header
                title="Home Management"
                search
                navigation={navigation}
                scene={scene}
              />
            )},
            cardStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
      </Stack.Navigator>
    );
}

function DesignationManagementStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Designation"
        component={Designation}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Designation Management"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack.Navigator>
  );
}

function StaffManagementStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Staff Management"
        component={Staff}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Staff Management"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      {/* <Stack.Screen
        name="Settings"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      /> */}
    </Stack.Navigator>
  );
}

function BranchStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Branch"
        component={Branch}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Branch Management"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack.Navigator>
  );
}

function LoanManagementStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Loan Management"
        component={Loan}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Loan Management"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack.Navigator>
  );
}

function StudyMaterialStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Study Material"
        component={StudyMaterial}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Study Material"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
      <Stack.Screen
        name="AddStudyMaterial"
        component={AddStudyMaterial}
        options={{ title: 'Add Study Material' }}
      />
    </Stack.Navigator>
  );
}

function QuestionnaireStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Questionnaire"
        component={Questionnaire}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Questionnaire"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
      <Stack.Screen
        name="AddQuestionnaire"
        component={AddQuestionnaire}
        options={{ title: 'Add Questionnaire' }}
      />
    </Stack.Navigator>
  );
}

export function LeaveManagementStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
      initialRouteName="Leaves"
    >
      <Stack.Screen
        name="Leaves"
        component={Leave}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Leaves Management"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {  
  return (
    <Stack.Navigator
    >
    <Stack.Screen
            name="Login"
            component={Login}
            options={{
              header: ({ navigation, scene }) => (
                <Header
                  title="Login Account"
                  transparent
                  iconColor={"#333"}
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#FFFFFF" },
              headerTransparent: true,
            }}
          />
    </Stack.Navigator>
  );
}

function AppStack(props) {

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Leaves Management"
        component={LeaveManagementStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Branch Management"
        component={BranchStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Designation Management"
        component={DesignationManagementStack}
        options={{ headerShown: false }}
      />
       <Drawer.Screen
        name="Messaging"
        component={Messaging}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Staff Management"
        component={StaffManagementStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Loan Management"
        component={LoanManagementStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Study Material"
        component={StudyMaterialStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Questionnaire"
        component={QuestionnaireStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  const {isLogin} = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >

      {isLogin ? ( 
          <Stack.Screen name="App" component={AppStack} /> 
          ) : (
          <Stack.Screen name="Login" component={LoginStack} />
      )}

    </Stack.Navigator>
  );
}
