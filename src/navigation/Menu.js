import { Block, theme } from "galio-framework";
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";

const {width } = Dimensions.get("screen");

function CustomDrawerContent({
    drawerPosition,
    navigation,
    profile,
    focused,
    state,
    ...rest
}) {
 const insets = useSafeArea();
 const screens = [
    'Home',
    'Leaves Management',
    'Branch Management',
    'Designation Management',
    'MoM',
    'Messaging',
    "Messages from management",
    "Internal Comms",
    'Staff Management',
    'Loan Management',
    'Study Material',
    'Questionnaire',
    'Settings',
 ];
 return <Block 
    style={styles.container}       
    forceInset={{ top: "always", horizontal: "never" }}
 >
    <Block style={styles.header}>
        <Block right style={styles.headerIcon}>
            <Icon
                name="align-left-22x"
                family="NowExtra"
                size={15}
                color={"black"}
            />
        </Block>
    </Block>
    <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
        })}
        <DrawerCustomItem title="LOGOUT" navigation={navigation} />
        </ScrollView>
    </Block>
 </Block>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: "center",
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: 28,
        paddingTop: theme.SIZES.BASE * 3,
    },
    headerIcon: {
        marginTop: -20,
    },
    // logo: {
    //     height: 40,
    //     width: 37,
    //     tintColor: "black",
    // },
});

export default CustomDrawerContent;
