import { CommonActions, useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import apiClient from "../apiServices";

export const useAuth = () => {
    const navigation = useNavigation();
    let tokenCache: string | null = null;


    const saveToken = async (token: string) => {
        tokenCache = token;
        await SecureStore.setItemAsync("userToken", token);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    const getToken = async () => {
        if (tokenCache) return tokenCache;
        tokenCache = await SecureStore.getItemAsync("userToken");
        return tokenCache;
    };

    const isAuthenticated = async () => {
        const token = await getToken();
        return !!token;
    };

    const clearToken = async () => {
        tokenCache = null;
        await SecureStore.deleteItemAsync("userToken");
        delete apiClient.defaults.headers.common["Authorization"];
    };

    const logout = async () => {
        await clearToken();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "HomeTabs" }]
            })
        );
    };

    return { saveToken, getToken, clearToken, logout, isAuthenticated };
};