import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import { AppContext } from "../../shared/context/AppContext";
import { useContext, useState } from "react";

type EventData = {
    x: number,
    y: number,
    t: number
};
const distanceThreshold = 50;  // поріг спрацьовування свайпу (мін. відстань проведення)
const timeThreshold = 500;     // поріг спрацьовування свайпу (макс. час проведення)

export default function Game() {
    const {navigate} = useContext(AppContext);
    const {width} = useWindowDimensions();

    // swipes - жести проведення з обмеженням мінімальних
    // відстаней та швидкостей
    const [text,setText] = useState("Game");
    var startData: EventData|null = null;
    const detectSwipe = (finishData: EventData) => {
        if(startData == null) return;
        const dx = finishData.x - startData!.x;
        const dy = finishData.y - startData!.y;
        const dt = finishData.t - startData!.t;
        // console.log(dx,dy,dt);
        if(dt < timeThreshold) {
            if(Math.abs(dx) > Math.abs(dy)) {  // horizontal
                if(Math.abs(dx) > distanceThreshold) {
                    if(dx > 0) {
                        setText("Right");
                    }
                    else {
                        setText("Left");
                    }
                }
            }
            else {  // vertical
                if(Math.abs(dy) > distanceThreshold) {
                    if(dy > 0) {
                        setText("Down");
                    }
                    else {
                        setText("Up");
                    }
                }
            }
        }
    };

    return <View style={styles.container}>
        <View style={[styles.topBlock, {marginHorizontal: width * 0.025}]}>
            <Text style={styles.topBlockText}>
                2048
            </Text>
            <View  style={styles.topBlockSub}>
                <View  style={styles.topBlockScores}>
                    <View style={styles.topBlockScore}>
                        <Text style={styles.topBlockScoreText}>SCORE</Text>
                        <Text style={styles.topBlockScoreText}>100500</Text>
                    </View>
                    
                    <View style={styles.topBlockScore}>
                        <Text style={styles.topBlockScoreText}>BEST</Text>
                        <Text style={styles.topBlockScoreText}>100500</Text>
                    </View>
                </View>

                <View style={styles.topBlockButtons}>
                    <Pressable style={styles.topBlockButton}><Text style={styles.topBlockButtonText}>NEW</Text></Pressable>
                    <Pressable style={styles.topBlockButton}><Text style={styles.topBlockButtonText}>UNDO</Text></Pressable>
                </View>
            </View>
        </View>

        <Text>
            Join the numbers and get to the 2048 tile!
        </Text>
        
        <TouchableWithoutFeedback
                onPressIn = {e => {startData = {
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY,
                    t: e.nativeEvent.timestamp
                }}}
                onPressOut={e => detectSwipe({
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY,
                    t: e.nativeEvent.timestamp
                })}> 

            <View style={[styles.field, {width: width * 0.95, height: width * 0.95}]}>
                <Pressable onPress={() => navigate('calc')}>
                    <Text>{text}</Text>    
                </Pressable> 
            </View>
        </TouchableWithoutFeedback>
    </View>
    ;
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCF7F0",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },
  topBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBlockText: {
    backgroundColor: "gold",
    borderRadius: 5,
    color: "white",
    fontSize: 32,
    marginVertical: 5,
    paddingHorizontal: 10,
    verticalAlign: "middle"
  },
  topBlockSub: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBlockScores: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBlockScore: {
    backgroundColor: "#3C3A34",
    borderRadius: 5,
    flex: 1,
    marginVertical: 5,
    marginLeft: 10,
    padding: 10,
  },
  topBlockScoreText: {
    color: "white",
    textAlign: "center"
  },
  topBlockButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

  },
  topBlockButton: {
    backgroundColor: "#E06849",
    borderRadius: 5,
    flex: 1,
    marginVertical: 5,
    marginLeft: 10,
    padding: 10,

  },
  topBlockButtonText: {
    color: "white",
    textAlign: "center"
  },
  field: {
    backgroundColor: "#A29383",
    borderRadius: 10,
    marginHorizontal: "auto"
  }
});
