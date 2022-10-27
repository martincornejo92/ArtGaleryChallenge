import React, {
  FC,
  Reducer,
  ReducerAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Art, StoredArt } from "../../models/art";
import BookmarksContext, { BookmarkDispatchAction } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCacheData, setCacheData } from "../../Utils";

const reducer: Reducer<StoredArt[], BookmarkDispatchAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "add": {
      const newState = [...state, action.payload.art];
      setCacheData(newState);
      return newState;
    }
    case "remove": {
      const newState = state.filter((m) => m.id !== action.payload.id);
      setCacheData(newState);
      return newState;
    }
    default:
      return state;
  }
};

const BookmarkProvider: FC = ({ children }) => {
  const [bookmarks, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    getCacheData().then((data) => {
      data?.map((art) => dispatch({ type: "add", payload: { art } }));
    });
    // AsyncStorage.clear();
  }, []);

  return (
    <BookmarksContext.Provider value={{ bookmarks, dispatch }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarkProvider;

const styles = StyleSheet.create({});
