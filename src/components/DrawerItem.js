import { Block, Text, theme } from "galio-framework";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from '../../src/context/AuthContext'
import Icon from "./Icon";
import React, {useContext} from "react";
import nowTheme from "../constants/Themes";

const DrawerItem=(props)=> {

  renderIcon = () => {
    const { title, focused } = props;
    switch (title) {
      case "Home":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Leave Management":
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
            style={{ opacity: 0.5 }}
          />
        );
        case "MoM":
          return (
            <Icon
              name="atom2x"
              family="NowExtra"
              size={18}
              color={focused ? nowTheme.COLORS.PRIMARY : "black"}
              style={{ opacity: 0.5 }}
            />
          );
        case "Messaging":
          return (
            <Icon
              name="atom2x"
              family="NowExtra"
              size={18}
              color={focused ? nowTheme.COLORS.PRIMARY : "black"}
              style={{ opacity: 0.5 }}
            />
          );
          case "Messages from management":
            return (
              <Icon
                name="atom2x"
                family="NowExtra"
                size={18}
                color={focused ? nowTheme.COLORS.PRIMARY : "black"}
                style={{ opacity: 0.5 }}
              />
            );
            case "Internal Comms":
              return (
                <Icon
                  name="atom2x"
                  family="NowExtra"
                  size={18}
                  color={focused ? nowTheme.COLORS.PRIMARY : "black"}
                  style={{ opacity: 0.5 }}
                />
              );
      case "Designation Management":
        return (
          <Icon
            name="paper"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Branch Management":
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Staff Management":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Settings":
        return (
          <Icon
            name="settings-gear-642x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Loan Management":
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
          />
        );
      case "Study Material":
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
          />
        );
      case "Questionnaire":
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
          />
        );
      case "LOGOUT":
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "black"}
          />
        );
      default:
        return null;
    }
  };

    const { isLogin, logout, isLoading } = useContext(AuthContext);
    const { focused, title, navigation } = props;
    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          title == "GETTING STARTED"
            ? Linking.openURL(
              "https://demos.creative-tim.com/now-ui-pro-react-native/docs/"
            ).catch((err) => console.error("An error occurred", err))
            : title == "LOGOUT"?logout():navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: "montserrat-regular",
                textTransform: "uppercase",
                fontWeight: "300",
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : "black"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  
}

const styles = StyleSheet.create({
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: "white",
  },
  defaultStyle: {
    color: "white",
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default DrawerItem;