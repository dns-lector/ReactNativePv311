/**
 * npx react-native run-android
 */

import {  BackHandler, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Calc from '../pages/calc/Calc';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Game from '../pages/game/Game';
import { AppContext } from '../shared/context/AppContext';
import Auth from '../pages/auth/Auth';
import Rates from '../pages/rates/Rates';

function Main() {
  const insets = useSafeAreaInsets();
  //console.log(insets);
  return <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
    <Calc />
  </SafeAreaView>;
}

function App() {
  /* Навігація у мобільних застосунках
  ідея - ведення власної історії переходу між "сторінками"
   */
  type PageInfo = { //  /calc/scientific/hyper?arg=1234&operation=exp
    slug: string,                // calc
    pathParams: Array<string>,   // ["scientific", "hyper"]
    queryParams: object,         // {arg: 1234, operation: "exp"}
  };

  const [page, setPage] = useState("game");
  const [user, setUser] = useState(null as string|null);
  const [history, setHistory] = useState([] as Array<string>);


  const request = (url:string, ini?:any) => {
    if(url.startsWith('/')) {
      url = "https://pv133od0.azurewebsites.net" + url;
      // url = "https://localhost:7224" + url;
    }
    if(user != null) {
      if(typeof ini == 'undefined') {
        ini = {};
      }
      if(typeof ini.headers == 'undefined') {
        ini.headers = {};
      }
      if(typeof ini.headers['Authorization'] == 'undefined') {
        ini.headers['Authorization'] = "Bearer " + user; //.token;
      }
      ini.headers['Authentication-Control'] = "Mobile";
    }
    console.log('request', url, ini);
    return new Promise((resolve, reject) => {
      fetch(url, ini).then(r => r.json()).then(j => {
        if (j.status.isOk) {
          resolve(j.data);
        }
        else {
          console.error(j);
          reject(j);
        }
      });
    }) 
}

  const navigate = (href:string) => {  // додавання до історії поточної сторінки
    if(href == page) {                 // та перехід на нову сторінку
      return;
    }
    history.push(page);
    console.log(history);
    setHistory(history);
    setPage(href);
  };

  const popRoute = () => {            // рух назад по історії (кнопка "<-")
    if(history.length > 0) {
      const page = history.pop() ?? "calc";
      console.log(history);
      setHistory(history);
      setPage(page);
    }
    else {
      BackHandler.exitApp();
    }
  };

  useEffect(() => {
    // перехоплюємо оброблення апаратної кнопки "назад"
    const listener = BackHandler.addEventListener('hardwareBackPress', () => { 
      popRoute();
      return true;   // означає, що подальша обробка не потрібна
    });
    
    return () => {
      listener.remove();
    };
  }, []);

  return (<SafeAreaProvider>
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      {/* передаємо navigate через контекст на всі дочірні елементи*/} 
      <AppContext.Provider value={{navigate, user, setUser, request}}>
        <View style={styles.content}>
          {   page == "calc"  ? <Calc  />
            : page == "auth"  ? <Auth  />
            : page == "rates" ? <Rates />
            : <Game />
          }
        </View>

        <View style={styles.bottomNav}>
          <Pressable onPress={() => navigate("calc")} style={styles.bottomNavItem}>
            <Image source={require("../shared/assets/images/calc.png")} 
                   style={[styles.bottomNavImage,{width: 26, tintColor: "#eee"}]} />
          </Pressable>        
          <Pressable onPress={() => navigate("game")} style={styles.bottomNavItem}>
            <Image source={require("../shared/assets/images/game.jpg")} 
                   style={[styles.bottomNavImage,{width: 34}]} />
          </Pressable>   
          <Pressable onPress={() => navigate("auth")} style={styles.bottomNavItem}>
            <Image source={require("../shared/assets/images/auth.png")} 
                   style={[styles.bottomNavImage,{width: 30}]} />
          </Pressable> 
          <Pressable onPress={() => navigate("rates")} style={styles.bottomNavItem}>
            <Image source={require("../shared/assets/images/coin25.png")} 
                   style={[styles.bottomNavImage,{width: 34}]} />
          </Pressable>
        </View>
      </AppContext.Provider>  
    </SafeAreaView>
  </SafeAreaProvider>);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#444",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", 
    width: "100%"
  },
  content: {
    flex: 1,
    width: "100%"
  },
  bottomNav: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 50,
    width: "100%"
  },
  bottomNavItem: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
  },
  bottomNavImage: {
    height: 34,   
    
  }
});

export default App;
