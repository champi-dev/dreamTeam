import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeIcon from "../../assets/svgs/HomeIcon";
import ChartIcon from "../../assets/svgs/ChartIcon";
import SoccerballIcon from "../../assets/svgs/SoccerballIcon";
import ProfileIcon from "../../assets/svgs/ProfileIcon";

function Main () {
  return <View style={styles.container}>
    <Text>Main</Text>
    <View style={styles.bottomBar}>
      <View style={styles.bottomBarIcons}>
        <HomeIcon style={styles.icon} />
        <ChartIcon style={styles.icon} />
        <SoccerballIcon style={styles.icon} />
        <ProfileIcon style={styles.icon} />
      </View>
    </View>
  </View>
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingBottom: 96,
  },
  bottomBar: {
    height: 96,
    width: "100%",
    backgroundColor: "#222232",
    position: "absolute",
    bottom: 0,
  },
  bottomBarIcons: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center" 
  },
  icon: {
    width: 20,
    height: 20,
  }
});