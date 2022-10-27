import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { globalStyles } from "../../components";
import { SharedScreenParamList } from "../../Navigation/types";
import { useBookmark, useToggleTabBarVisibility } from "../../Hooks";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BookDetailsScreenProps = StackScreenProps<
  SharedScreenParamList,
  "BookDetails"
>;

const BookDetails = ({ navigation, route }: BookDetailsScreenProps) => {
  const {
    title,
    artist_display,
    place_of_origin,
    thumbnail,
    credit_line,
    date_display,
    id,
  } = route.params;
  const [addBookmark, removeBookmark, isBookmarked] = useBookmark(id);
  useToggleTabBarVisibility(navigation);
  const handleBackNavigation = () => navigation.goBack();

  const handleBookmarkPress = () => {
    isBookmarked
      ? removeBookmark()
      : addBookmark({
          title,
          artist_display,
          place_of_origin,
          thumbnail,
          credit_line,
          date_display,
          id,
        });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <Ionicons name="arrow-back" size={30} onPress={handleBackNavigation} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.flexItem}>
          <SharedElement id={`image-${id}`}>
            <View>
            <Image
          style={styles.artPic}
          source={{uri: thumbnail !== null ? thumbnail.lqip : null}}
        />
            </View>
          </SharedElement>
          <Text
            style={[
              globalStyles.heading,
              {
                textAlign: "center",
                marginVertical: 10,
                fontSize: title.length > 20 ? 20 : 30,
              },
            ]}
          >
            {title}
          </Text>
          <Text style={globalStyles.author}>{artist_display}</Text>
          <View>
            <Text style={globalStyles.author}>{credit_line}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[globalStyles.author, styles.description]}>{date_display}</Text>
          <TouchableOpacity
            onPress={() => handleBookmarkPress()}
            activeOpacity={0.8}
            style={[styles.button]}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              {isBookmarked ? "Remove from" : "Add to"} bookmarks{" "}
              <Ionicons name="bookmarks-outline" color={"white"} size={20} />{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  flexItem: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  description: {
    textAlign: "center",
    marginVertical: 10,
  },
  artPic: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
});
