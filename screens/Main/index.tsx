import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import Profile from "./components/Profile";
import Matches from "./components/Matches";
import MatchesStats from "./components/MatchesStats";
import PlayerStats from "./components/PlayerStats";
import HomeIcon from "../../assets/svgs/HomeIcon";
import ChartIcon from "../../assets/svgs/ChartIcon";
import SoccerballIcon from "../../assets/svgs/SoccerballIcon";
import ProfileIcon from "../../assets/svgs/ProfileIcon";

function Main () {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return <View style={styles.container}>
    <Routes>
      <Route path="/matches/*" element={<Matches />} />
      <Route path="/matchesStats" element={<MatchesStats />} />
      <Route path="/playerStats" element={<PlayerStats />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

    <View style={styles.bottomBar}>
      <View style={styles.bottomBarIcons}>
        <Pressable onPress={() => navigate('/main/matches')}>
          <HomeIcon style={styles.icon} active={
            pathname === '/main/matches' || pathname === '/main/matches/notifications' || pathname === '/main/matches/createMatch'
          } />
        </Pressable>

        <Pressable onPress={() => navigate('/main/matchesStats')}>
          <ChartIcon style={styles.icon} active={pathname === '/main/matchesStats'} />
        </Pressable>

        <Pressable onPress={() => navigate('/main/playerStats')}>
          <SoccerballIcon style={styles.icon} active={pathname === '/main/playerStats'} />
        </Pressable>

        <Pressable onPress={() => navigate('/main/profile')}>
          <ProfileIcon style={styles.icon} active={pathname === '/main/profile'} />
        </Pressable>
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