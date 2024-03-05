import React, { useContext, useEffect, useRef } from "react";
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
import { getAllCourts, listenForUserById, updateUserPropertyById } from "../../firebase";
import { GlobalContextConfig } from "../../globalContext";
import { Court } from "../../models/Court";
import { registerForPushNotificationsAsync } from "../../utils";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userId, authToken } = useContext(GlobalContextConfig);
  const { user, setUser, setAvailableCourts, availableCourts } = useContext(MainScreenContextConfig);

 const handlePushToken = async () => {
    const pushToken = await registerForPushNotificationsAsync();

    if (pushToken) {
      user && setUser && setUser({...user, pushToken});
      user?.id && updateUserPropertyById(user.id, { pushToken }).then(({ error }) => {
        if (error) {
          console.log(error);
        }
      })
    }
  }

  useEffect(() => {
    if (!userId || !setUser) {
      return;
    }

    const unsubscribe = listenForUserById({ userId, setUser, authToken });
    return unsubscribe;
  }, [userId, listenForUserById, setUser]);

  useEffect(() => {
    if (!availableCourts || !availableCourts.length) {
      getAllCourts().then(({error, data}) => {
        if (error) {
          console.log(error);
          return;
        }
        setAvailableCourts && setAvailableCourts(data as Court[]);
      });
    }
  }, [availableCourts]);

  useEffect(() => {
    if (user?.id) {
      handlePushToken();
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id && user?.matchIdForNotification && user?.redirectToForNotification) {
      navigate(user.redirectToForNotification, { state: { matchId: user.matchIdForNotification } });
      updateUserPropertyById(user.id, { redirectToForNotification: '', matchIdForNotification: '' });
    }
  }, [user]);

  useEffect(() => {
    if (pathname === '/') {
      navigate('/main/matches');
    }
  }, [pathname]);

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