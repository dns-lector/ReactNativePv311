
import { useContext, useEffect } from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import { AppContext } from '../../shared/context/AppContext';

export default function Chat() {
    const {navigate, user, showModal} = useContext(AppContext);

    useEffect(() => {
        if(user == null) {
            showModal({
                title: "Комунікатор",
                message: "Доступ до чату можливий після входу",
                positiveButtonText: "До меню входу",
                positiveButtonAction: () => navigate("auth"),
                negativeButtonText: "Покинути чат",
                negativeButtonAction: () => navigate("-1"),
                closeButtonAction: () => navigate("-1"),
            });
        }
    }, [user]);

    return <View>        
        <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => showModal({
                title: "Комунікатор",
                message: "Доступ до чату можливий після входу",
                positiveButtonText: "До меню входу",
                positiveButtonAction: () => navigate("auth"),
                negativeButtonText: "Покинути чат",
                negativeButtonAction: () => navigate("-1"),
            }
        )}>
        <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
/* Д.З. Стилізація модального діалогу
- перевести кнопки на FirmButton
- забезпечити неперекриття тексту з верхньою кнопкою закриття
- обмежити максимальну ширину діалогу
- при довгому тексті повідмолення реалізувати прокрутку (
   кнопки не повинні зникати).
*/