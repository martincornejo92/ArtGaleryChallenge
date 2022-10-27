import React, { useEffect } from "react";
import { View } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { BookDetails, Bookmarks, Home } from "../Screens";
import { SharedScreenParamList } from "./types";

const { Navigator, Screen } =
  createSharedElementStackNavigator<SharedScreenParamList>();
const SharedElementStackNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{ animationEnabled: false }}
        />
        <Screen
          name="BookDetails"
          component={BookDetails}
          sharedElements={({ params }) => [
            {
              id: `image-${params.imdbID}`,
              animation: "fade-in",
              resize: "none",
            },
          ]}
        />
      </Navigator>
    </View>
  );
};

export default SharedElementStackNavigator;
