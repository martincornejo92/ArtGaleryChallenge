import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MainNavigator } from "./src/Navigation";
import "react-native-gesture-handler";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { AppContextWrapper } from "./src/Context";

const App = () => {
  return (
      <PortalProvider>
        <AppContextWrapper>
          <NavigationContainer>
            <MainNavigator />
            <PortalHost name="TabBar" />
          </NavigationContainer>
        </AppContextWrapper>
      </PortalProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
