import React from "react";
import { View, StyleSheet } from "react-native";
import { Routes, Route, useLocation } from "react-router";
import Profile from "./components/Profile";
import HomeIcon from "../../assets/svgs/HomeIcon";
import ChartIcon from "../../assets/svgs/ChartIcon";
import SoccerballIcon from "../../assets/svgs/SoccerballIcon";
import ProfileIcon from "../../assets/svgs/ProfileIcon";

function Main () {
  const { pathname } = useLocation();

  return <View style={styles.container}>
    <Routes>
      <Route path="/profile" element={<Profile />} />
    </Routes>

    <View style={styles.bottomBar}>
      <View style={styles.bottomBarIcons}>
        <HomeIcon style={styles.icon} active={pathname === '/main/matches'} />
        <ChartIcon style={styles.icon} active={pathname === '/main/matchesStats'} />
        <SoccerballIcon style={styles.icon} active={pathname === '/main/playerStats'} />
        <ProfileIcon style={styles.icon} active={pathname === '/main/profile'} />
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