import React from 'react'
import {
    TextInput,
    StyleSheet
} from "react-native";
export default function InputDefault({ nome, value, onChange, senha }) {
    return (
        <TextInput
            style={styles.inputLogin}
            placeholder={nome}
            secureTextEntry={senha}
            onChangeText={text => onChange(text)}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    inputLogin: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 20,
        textAlign: "center",
        borderRadius: 10,
        fontSize: 21,
        borderColor: "#FF6700",
        borderWidth: 1
    }
});