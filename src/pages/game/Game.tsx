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

function tileBackground(tileValue: number) {
    return tileValue == 0 ? "#BDAFA2"
    : tileValue == 2      ? "#EEE3DB"
    : tileValue == 4      ? "#EEE1D0"
    : tileValue == 8      ? "#E8B486"
    : tileValue == 16     ? "#E79B73"
    : tileValue == 32     ? "#E4846E"
    : tileValue == 64     ? "#E26A51"
    : tileValue == 128    ? "#bbb"
    : tileValue == 256    ? "#bbb"
    : tileValue == 512    ? "#bbb"
    : tileValue == 1024   ? "#bbb"
    : tileValue == 2048   ? "#bbb"
    : tileValue == 4096   ? "#bbb"
                          : "#bbb";
}

function tileForeground(tileValue: number) {
    return tileValue == 0 ? "#BDAFA2"
    : tileValue == 2      ? "#746C63"
    : tileValue == 4      ? "#766E66"
    : tileValue == 8      ? "#FAF3EF"
    : tileValue == 16     ? "#FBF5F2"
    : tileValue == 32     ? "#FBF5F2"
    : tileValue == 64     ? "#FBF5F2"
    : tileValue == 128    ? "#444"
    : tileValue == 256    ? "#444"
    : tileValue == 512    ? "#444"
    : tileValue == 1024   ? "#444"
    : tileValue == 2048   ? "#444"
    : tileValue == 4096   ? "#444"
                          : "#444";
}


export default function Game() {
    const {navigate} = useContext(AppContext);
    const {width} = useWindowDimensions();
    const [tiles, setTiles] = useState([
        0,    2,    4,     8,
        16,   32,   64,    128,
        256,  512,  1024,  2048,
        4096, 8192, 16384, 32768
    ]);

    const tileFontSize = (tileValue: number) => {
        return tileValue < 10 ? width * 0.12
        : tileValue < 100     ? width * 0.1
        : tileValue < 1000    ? width * 0.08
        : tileValue < 10000   ? width * 0.07
                              : width * 0.06;
    };

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

    const spawnTile = () => {
        var freeTiles = [];
        for(let i = 0; i < tiles.length; i += 1) {
            if(tiles[i] == 0) {
                freeTiles.push(i);
            }
        }
        const randomIndex = freeTiles[Math.floor(Math.random() * freeTiles.length)];
        tiles[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    };

    const newGame = () => {
        for(let i = 0; i < tiles.length; i += 1) {
            tiles[i] = 0;
        }
        spawnTile();
        spawnTile();
        setTiles([...tiles]);
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
                    <Pressable style={styles.topBlockButton} onPress={newGame}><Text style={styles.topBlockButtonText}>NEW</Text></Pressable>
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
                {tiles.map((tile, index) => <Text key={index}
                style={[styles.tile, {
                    backgroundColor: tileBackground(tile),
                    color: tileForeground(tile),
                    width: width * 0.21,
                    fontSize: tileFontSize(tile),
                    fontWeight: 900,
                    height: width * 0.21,
                    marginLeft: width * 0.022,
                    marginTop: width * 0.022,
                }]}>{tile}</Text>)}
            </View>
        </TouchableWithoutFeedback>

        <Text>{text}</Text>
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: "auto"
  },
  tile: {
    borderRadius: 5,
    textAlign: "center",
    verticalAlign: "middle"
  }
});
/*
Д.З. Завершити оформлення віджета з грою 2048
- відступи та втяжки
- розміри шрифтів та кольори
- загальні відступи (повітря) */