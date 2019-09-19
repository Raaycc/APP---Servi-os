import { AsyncStorage } from "react-native";
import axios from "axios";

export const logar = async token => {
    await AsyncStorage.setItem("token", token);
};

export const desLogar = async () => {
    await AsyncStorage.removeItem("token");
};

export const api = "https://api.sae.bet/";

const http = axios.create({
    baseURL: api
});

http.interceptors.request.use(
    async config => {
        config.headers.authorization =
            "Bearer " + (await AsyncStorage.getItem("token"));
        return config;
    },
    error => Promise.reject(error)
);

export { http };
