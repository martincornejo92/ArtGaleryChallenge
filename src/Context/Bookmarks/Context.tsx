import React, { useContext } from "react";
import { StoredArt } from "../../models/art";

export type BookmarkDispatchAction =
  | { type: "add"; payload: { art: StoredArt } }
  | { type: "remove"; payload: { id: string } };

type bookmarkSchema = {
  bookmarks: StoredArt[];
  dispatch: React.Dispatch<BookmarkDispatchAction>;
};

const BookmarksContext = React.createContext({} as bookmarkSchema);
export const useBookmarksContext = () => React.useContext(BookmarksContext);

export default BookmarksContext;
