import { AsyncStorage } from "react-native";
import axios from "axios";

export const logar = async dados => {
    await AsyncStorage.setItem("token", dados.token);
    await AsyncStorage.setItem("usuario", JSON.stringify(dados.usuario));
};

export const desLogar = async () => {
    await AsyncStorage.removeItem("token");
};

export const api = "https://powerful-brook-93789.herokuapp.com/";

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
