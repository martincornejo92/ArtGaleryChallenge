import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import {
  AppImage,
  globalStyles,
  Loading,
  Rating,
} from "../../../../components";
import { useBookmark } from "../../../../Hooks";
import { StoredArt } from "../../../../models/art";
import { SharedScreenParamList } from "../../../../Navigation/types";

//TODO: Fix the bug with nested navigation
type HomeScreenNavigationProps = StackNavigationProp<SharedScreenParamList>;

interface Props {
  data: StoredArt;
  variant?: "vertical" | "horizontal";
}
const Art = ({ data, variant = "horizontal" }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const [addBookmark, removeBookmark, isBookmarked] = useBookmark(data.id);
  const toggleBookmark = () =>
    isBookmarked ? removeBookmark() : addBookmark(data);
  const isHorizontal = variant === "horizontal";
  const handleNavigation = () => {
    navigation.navigate("BookDetails", data);
  };
  return (
    <Pressable
      onPress={handleNavigation}
      style={{
        flexDirection: isHorizontal ? "row" : "column",
        width: !isHorizontal ? 150 : undefined,
      }}
    >
      <SharedElement id={`image-${data.id}`}>
      <Image
          style={styles.artPic}
          source={{uri: data.thumbnail !== null ? data.thumbnail.lqip : null}}
        />
      </SharedElement>
      <View style={{ flex: 1, padding: isHorizontal ? 10 : 0 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.heading, { marginVertical: isHorizontal ? 5 : 10 }]}
        >
          {data.title}
        </Text>
        <Text numberOfLines={2} style={globalStyles.author}>
          {data.artist_display}
        </Text>

        {isHorizontal && (
          <View>
            <Rating />
            <Text numberOfLines={2}>{data.date_display}</Text>
          </View>
        )}
      </View>
      {isHorizontal && (
        <Ionicons
          name={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={30}
          color={"black"}
          onPress={toggleBookmark}
        />
      )}
    </Pressable>
  );
};

export default Art;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  artPic: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
});
