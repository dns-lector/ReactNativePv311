import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Calc() {

    const onButtonPress = (title:string) => {
        console.log(title);
    };

    return <View style={styles.calcContainer}>
        <Text style={styles.title}>Калькулятор</Text>
        <Text style={styles.expression}>22 + 33 =</Text>
        <Text style={styles.result}>55</Text>
        <View style={styles.calcButtonRow}>
            <CalcButton title="%"        action={onButtonPress}/>
            <CalcButton title="CE"       action={onButtonPress}/> 
            <CalcButton title="C"        action={onButtonPress}/> 
            <CalcButton title={"\u232B"} action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
            <CalcButton title="1/x"        action={onButtonPress}/>
            <CalcButton title="x2"       action={onButtonPress}/> 
            <CalcButton title="2x"        action={onButtonPress}/> 
            <CalcButton title={"\u00F7"} action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
            <CalcButton title="7"        action={onButtonPress}/>
            <CalcButton title="8"       action={onButtonPress}/> 
            <CalcButton title="9"        action={onButtonPress}/> 
            <CalcButton title={"\u232B"} action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
            <CalcButton title="%"        action={onButtonPress}/>
            <CalcButton title="CE"       action={onButtonPress}/> 
            <CalcButton title="C"        action={onButtonPress}/> 
            <CalcButton title={"\u232B"} action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
            <CalcButton title="%"        action={onButtonPress}/>
            <CalcButton title="CE"       action={onButtonPress}/> 
            <CalcButton title="C"        action={onButtonPress}/> 
            <CalcButton title={"\u232B"} action={onButtonPress}/>
        </View>
        <View style={styles.calcButtonRow}>
            <CalcButton title="%"        action={onButtonPress}/>
            <CalcButton title="CE"       action={onButtonPress}/> 
            <CalcButton title="C"        action={onButtonPress}/> 
            <CalcButton title={"\u232B"} action={onButtonPress}/>
        </View>
    </View>;
}

type CalcButtonData = {
    title:  string,
    type?:  string,
    action: (title:string, type?:string) => any
};

function CalcButton({title, type, action}: CalcButtonData) {
    return <TouchableOpacity onPress={() => action(title, type)} style={styles.calcButton}>
        <Text style={styles.calcButtonText}>{title}</Text>
    </TouchableOpacity>;
}


const styles = StyleSheet.create({
  calcButton: {
    backgroundColor: "#323232",
    borderRadius: 7,
    flex: 1,
    margin: 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }, 
  calcButtonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  calcContainer: {
    backgroundColor: "#202020",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
   //  alignItems: "stretch",
    width: "100%"
  },
  title: {
    color: "#ffffff",
    margin: 10,
  },
  expression: {
    color: "#A6A6A6",
    margin: 10,
    textAlign: "right",
  },
  result: {
    color: "#ffffff",
    margin: 10,
    textAlign: "right",
    fontSize: 30,
    fontWeight: 700,
  },
  calcButtonRow: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 3,
  }
});
/* Д.З. Підібрати тексти та спец.символи для 
кнопок калькулятора. 
 додати рядок з функціями управління пам'яттю (МС, MR, M+ ...)
*/