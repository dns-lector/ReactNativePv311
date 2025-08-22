import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChatMessage from "../types/ChatMessage";
import { displayDate } from "../../../shared/services/helper";
import { Key } from "react";

export default function MyMessage(
    {message, onPress}:
    {message:ChatMessage, onPress:(message:ChatMessage)=>void}) 
{
    return <TouchableOpacity 
                style={styles.container}
                onPress={() => onPress(message)}>
        <Text>{displayDate(message.moment)}</Text>
        <Text>{message.author}</Text>
        <Text>{message.text}</Text>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccddcc",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 10,
    marginLeft: 80,
    marginRight: 8,
    padding: 10,
    elevation: 2,
  },
});

/*
Задача: відображення дати/часу
- якщо дата за "сьогодні", то виводити лише час до секунд
- якщо не далі трьох днів, то виводити "2 дні тому" і час до хвилин
- якщо старші, то дата в стилі "10 червня" і час до хвилин
- якщо дата минулих років, то додавати рік "10 червня 2024 р." 
*/