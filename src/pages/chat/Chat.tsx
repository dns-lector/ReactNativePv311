
import { useContext, useEffect, useRef, useState } from 'react';
import {StyleSheet, Text, Pressable, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import { AppContext } from '../../shared/context/AppContext';
import ChatModel from './models/ChatModel';
import ChatMessage from './types/ChatMessage';
import OtherMessage from './components/OtherMessage';
import MyMessage from './components/MyMessage';

export default function Chat() {
  const chatUrl = 'https://chat.momentfor.fun/';
    const scrollViewRef = useRef<ScrollView>(null);
    const {navigate, user, showModal} = useContext(AppContext);
    const [messages, setMessages] = useState(ChatModel.instance.messages);  // useState([] as Array<ChatMessage>) ; // useState(ChatModel.instance.messages);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
      let handle: NodeJS.Timeout|null = null;
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
        else {
          handle = setInterval(updateMessages, 1000);
        }

        return () => {
          if(handle != null) clearInterval(handle);
        }
    }, [user]);

    useEffect(() => {
      if(ChatModel.instance.messages.length == 0) {
            console.log("Loading data");
            fetch(chatUrl)
            .then(r => r.json())
            .then(j => {
                console.log("Loaded data");
                ChatModel.instance.messages = j.data;
                setMessages(j.data);
            });
        }
        else {
            console.log("Used cache data");
        }
    }, []);

    const updateMessages = () => {
      // console.log("Update starts");
      fetch(chatUrl)
      .then(r => r.json())
      .then(j => {
        // перевіряємо, чи є нові повідомлення через порівняння id
        let wasNew = false;
        for(let m of j.data) {
          if(typeof messages.find(e => e.id == m.id) == 'undefined') {
            // це нове повідомлення, його немає у масиві messages
            messages.push(m);
            wasNew = true;
          }
        }
        // якщо були нові повідомлення - оновлюємо стан
        if(wasNew) {
          setMessages([...messages.sort((a,b) => 
            a.moment > b.moment ? 1 
            : a.moment < b.moment ? -1 : 0 )]);
        }
      });
    };

    const messagePressed = (m:ChatMessage) => {
      setMessages([...messages]);
    }

    const onSendPressed = () => {
      console.log(user?.nam, messageText);
      if(messageText.trim().length == 0) {
        showModal({
          title: "Комунікатор",
          message: "Введіть повідомлення",
        });
        return;
      }
      let data = `author=${encodeURIComponent(user!.nam)}&msg=${encodeURIComponent(messageText)}`;
      console.log(data);
      fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      }).then(r => {
        if(r.status == 201) {
          // оновлення переліку повідомлень
          updateMessages();
        }
        else {
          r.json().then(console.error);
          showModal({
            title: "Комунікатор",
            message: "Помилка надсилання. Повторіть пізніше",
          });
        }        
      });
    };

    return user == null ? <View></View> : <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container} >
      <View style={styles.chat}>
        <ScrollView
          ref={scrollViewRef} 
          onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}>
            {messages.map((m, i) =><View key={m.id}>{i % 2 == 0 
              ? <OtherMessage message={m} onPress={messagePressed}  />
              : <MyMessage message={m} onPress={messagePressed}/>}
            </View> )}
        </ScrollView>
      </View>
      <View style={styles.inputRow} >
        <TextInput style={styles.textInput} 
            value={messageText}
            onChangeText={setMessageText} />
        <TouchableOpacity style={styles.sendButton} onPress={onSendPressed} >
          <Text style={{ fontSize: 20,}}>&#10148;</Text>
        </TouchableOpacity>    
      </View>
      <View style={{height:10}}></View>
      </KeyboardAvoidingView>;
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chat: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#F194FF',
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
  },
  textInput: {
    flex: 1,
    borderColor: "#888",
    borderWidth: 1,
    color: "#fff",
    margin: 5,
    paddingVertical: 3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
/* Д.З. Чат:
- розрізняти "свої" повідомлення за збігом авторизованого імені
- для своїх повідомлень не виводити саме ім'я, можна зазначати "Я/від мене"
- прибирати введене повідомлення якщо воно успішно надіслане (якщо ні, то ні)
* розібратись чому "2+2" надсилається як "2 2"
*/