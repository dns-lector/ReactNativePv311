import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FirmButton from "../../features/buttons/ui/FirmButton";
import { ButtonTypes } from "../../features/buttons/model/ButtonTypes";

export default function Auth() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onEnterPress = () => {
        console.log(login, password);
    };

    const isFormValid = () => login.length > 1 && password.length > 2;

    return <View>
        <Text>Вхід до кабінету</Text>

        <View style={styles.textInputContainer}>
            <Text style={styles.textInputTitle}>Логін:</Text>
            <TextInput style={styles.textInput} 
                value={login}
                onChangeText={setLogin} />
        </View>        

        <View style={styles.textInputContainer}>
            <Text style={styles.textInputTitle}>Пароль:</Text>
            <TextInput style={styles.textInput} 
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} />
        </View>
        <FirmButton title="Вхід" 
            type={isFormValid() ? ButtonTypes.primary : ButtonTypes.secondary} 
            action={isFormValid() ? onEnterPress : () => {}} />
    </View>;
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#888",
    borderWidth: 1,
    margin: 10,
  },
  textInputContainer: {
    backgroundColor: "#555",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
  textInputTitle: {
    color: "#eee",
    marginLeft: 10,
    marginTop: 10,
  }
});
