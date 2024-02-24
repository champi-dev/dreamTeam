import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import Profile from "./components/Profile";
import Matches from "./components/Matches";
import MatchesStats from "./components/MatchesStats";
import PlayerStats from "./components/PlayerStats";
import HomeIcon from "../../assets/svgs/HomeIcon";
import ChartIcon from "../../assets/svgs/ChartIcon";
import SoccerballIcon from "../../assets/svgs/SoccerballIcon";
import ProfileIcon from "../../assets/svgs/ProfileIcon";
import { PressableOpacity } from "../../components/PresableOpacity";
import { MainScreenContext, MainScreenContextConfig } from "./context";
import { getUserById } from "../../firebase";
import { GlobalContextConfig } from "../../globalContext";
import { User } from "../../models/User";

function Main () {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return <View style={styles.container}>
    <MainScreenContext>
      <MainRoutes />
    </MainScreenContext>

    <View style={styles.bottomBar}>
      <View style={styles.bottomBarIcons}>
        <PressableOpacity style={styles.iconWrapper}  onPress={() => navigate('/main/matches')}>
          <HomeIcon style={styles.icon} active={
            pathname === '/main/matches' || pathname === '/main/matches/notifications' || pathname === '/main/matches/createMatch' || pathname === '/main/matches/selectSide' || pathname === '/main/matches/enterMatchResult'
          } />
        </PressableOpacity>

        <PressableOpacity  style={styles.iconWrapper} onPress={() => navigate('/main/matchesStats')}>
          <ChartIcon style={styles.icon} active={pathname === '/main/matchesStats' || pathname === '/main/matches/pastMatchResult'} />
        </PressableOpacity>

        <PressableOpacity  style={styles.iconWrapper} onPress={() => navigate('/main/playerStats')}>
          <SoccerballIcon style={styles.icon} active={pathname === '/main/playerStats'} />
        </PressableOpacity>

        <PressableOpacity  style={styles.iconWrapper} onPress={() => navigate('/main/profile')}>
          <ProfileIcon style={styles.icon} active={pathname === '/main/profile'} />
        </PressableOpacity>
      </View>
    </View>
  </View>
}

function MainRoutes () {
  const { userId } = useContext(GlobalContextConfig);
  const { setUser } = useContext(MainScreenContextConfig);

  useEffect(() => {
    if (userId) {
      getUserById(userId).then(({error, data}) => {
        if (error) {
          console.error(error);
          return;
        }

        data && setUser && setUser(data as User);
      })
    }
  }, [userId, getUserById]);

  return (
    <Routes>
      <Route path="/matches/*" element={<Matches />} />
      <Route path="/matchesStats" element={<MatchesStats />} />
      <Route path="/playerStats" element={<PlayerStats />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
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
    alignItems: "center" ,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    width: 20,
    height: 20,
  }
});