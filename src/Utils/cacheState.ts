import AsyncStorage from "@react-native-async-storage/async-storage";
import { CACHE_KEY } from "../Constants";
import { StoredArt } from "../models/art";


export const setCacheData = async (art: StoredArt[]) => {
    try {
        const value = JSON.stringify(art);
        await AsyncStorage.setItem(CACHE_KEY, value);
    } catch (error) {
        
    }
}

export const getCacheData = async ()=> {
    try {
        const value = await AsyncStorage.getItem(CACHE_KEY);
        if (value !== null) {
            return JSON.parse(value) as StoredArt[];
        }
        else{
            return [] as StoredArt[]
        }
    } catch (error) {
        
    }
}