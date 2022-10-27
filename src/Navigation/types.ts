import { NavigatorScreenParams } from "@react-navigation/native"
import { StoredArt } from "../models/art"

export type SharedScreenParamList = {
    BookDetails: StoredArt
    Home: undefined;
    Bookmarks: undefined;
}