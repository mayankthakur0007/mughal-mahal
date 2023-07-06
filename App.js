import React from "react";
import { Image } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as SplashScreen from "expo-splash-screen";
import Service from "./src/shared/Http/Http";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./src/navigation/Screens";
import { /* Images, articles, */ nowTheme } from "./src/constants";
import { AuthProvider } from "./src/context/AuthContext";

// cache app images
// const assetImages = [
//   Images.Onboarding,
//   Images.Logo,
//   Images.Pro,
//   Images.NowLogo,
//   Images.iOSLogo,
//   Images.androidLogo,
//   Images.ProfilePicture,
//   Images.CreativeTimLogo,
//   Images.InvisionLogo,
//   Images.RegisterBackground,
//   Images.ProfileBackground,
// ];

// cache product images
// articles.map((article) => assetImages.push(article.image));

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  };

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      global.APIService = new Service();
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  prepareResources = async () => {
    try {
      await this._loadResourcesAsync();
    } catch (e) {
      await this._handleLoadingError(e);
    }
    this.setState({ isLoadingComplete: true }, async () => {
      await SplashScreen.hideAsync();
    });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return null;
    } else {
      return (
        <ActionSheetProvider>
          <AuthProvider>
          <NavigationContainer>
            <GalioProvider theme={nowTheme}>
              <Block flex>
                <Screens />
              </Block>
            </GalioProvider>
          </NavigationContainer>
          </AuthProvider>
        </ActionSheetProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      "montserrat-regular": require("./src/assets/font/Montserrat-Regular.ttf"),
      "montserrat-bold": require("./src/assets/font/Montserrat-Bold.ttf"),
    });

    this.setState({ fontLoaded: true });
    // return Promise.all([...cacheImages(assetImages)]);
    return Promise.all([]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
