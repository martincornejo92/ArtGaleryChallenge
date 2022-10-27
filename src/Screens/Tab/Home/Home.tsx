import { Ionicons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles, TabBar } from "../../../components";
import { Art as artModel } from "../../../models/art";
import { SharedScreenParamList } from "../../../Navigation/types";
import getRandomArt from "../../../Utils/getRandomValuesFromArray";
import { FAB, Art, PreLoaders } from "./components";
import axios from 'axios';

type Props = StackScreenProps<SharedScreenParamList, "Home">;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<artModel>>(FlatList);

const t = getRandomArt(28);
const Home = ({ navigation }: Props) => {
  const [titles, sett] = useState(getRandomArt(28));
  const [ data, setData ] = useState(null);
  const [newArt, setNewArt] = useState<artModel[]>([]);
  const scrollY = useSharedValue(0);
  const scrollRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });

  const onRefresh = () => sett(getRandomArt(28));

  useEffect(() => {
    if (data) {
      setNewArt(data.slice(10));
    }
    axios
    .get('https://api.artic.edu/api/v1/artworks?page=2&limit=100')
    .then((response: any) => {
      setData(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.header]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>
            Art Galery Challenge
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <AnimatedFlatList
            ListHeaderComponent={() => (
              <View>
                <Text style={[globalStyles.heading, styles.heading]}>
                  Art Galery
                </Text>
              </View>
            )}
            ref={scrollRef}
            data={newArt}
            renderItem={({ item, index }) => (
              <Art data={item} variant="horizontal" />
            )}
            ListEmptyComponent={() => (
              <PreLoaders count={3} direction="column" />
            )}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
      <FAB
        {...{ scrollY }}
        onPress={() => {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        }}
      />
      <Portal hostName="TabBar">
        <TabBar />
      </Portal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    zIndex: 4,
    backgroundColor: "#fff",
  },
  heading: {
    marginVertical: 20,
  },
});
