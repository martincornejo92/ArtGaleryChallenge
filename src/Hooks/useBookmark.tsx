import React, { useCallback, useMemo } from "react";
import { useBookmarksContext } from "../Context";
import { StoredArt } from "../models/art";

const useBookmark = (id: StoredArt["id"]) => {
  const { bookmarks, dispatch } = useBookmarksContext();
  const addBookmark = useCallback((art: StoredArt) => {
    dispatch({ type: "add", payload: { art } });
  }, []);
  const removeBookmark = useCallback(() => {
    dispatch({ type: "remove", payload: { id } });
  }, []);
  const isBookmarked = useMemo(() => {
    return bookmarks.some((m) => m.id === id);
  }, [bookmarks]);
  return [addBookmark, removeBookmark, isBookmarked] as const;
};

export default useBookmark;
