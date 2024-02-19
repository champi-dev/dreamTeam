import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { View, Text, StyleSheet, ScrollView, Image, FlatList, ListRenderItemInfo } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import NotificationIcon from "../../../../../assets/svgs/NotificationIcon";
import PlusIcon from "../../../../../assets/svgs/PlusIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import { mockData, mockUser } from "./mockData";
import { Match } from "../../../../../models/Match";
import { getDayName, convertTimeTo12HourFormat } from "../../../../../utils";
import { User } from "../../../../../models/User";
import { PressableOpacity } from "../../../../../components/PresableOpacity";

function JoinMatch () {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>();
  const [currentUser, setCurrentUser] = useState<User>();

  const userOwnsMatch = (match: Match) => {
    return match.ownerId === currentUser?.id;
  };

  const handleMatchPress = (match: Match) => {
    if (userOwnsMatch(match)) {
      navigate('/main/matches/enterMatchResult');
      return;
    }

    navigate('/main/matches/selectSide');
  }

  useEffect(() => {
    setMatches(mockData);
    setCurrentUser(mockUser);
  }, [])

  const renderItem = ({item}: ListRenderItemInfo<Match>) => {
    return (
      <PressableOpacity onPress={() => handleMatchPress(item)}>
        <View style={styles.matchOverview}>
          <View style={styles.matchOverviewContent}>
            <ScrollView contentContainerStyle={styles.topTeam} horizontal>
              <ShirtIcon style={styles.shirtIcon} fill="#fff" />
              {item.whiteTeam.map((singlePlayer, playerIndex) => (
                <Image key={playerIndex} style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
              ))}              
            </ScrollView>

            <ScrollView contentContainerStyle={styles.bottomTeam} horizontal>
              <ShirtIcon style={styles.shirtIcon} fill="#000" />
              {item.blackTeam.map((singlePlayer, playerIndex) => (
                <Image key={playerIndex} style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
              ))}    
            </ScrollView>

            <Text style={styles.matchText}>{getDayName(item.date)} {convertTimeTo12HourFormat(item.time)}</Text>
            <Text style={styles.matchText}>{item.court} {item.playersPerTeam} vs {item.playersPerTeam}</Text>
          </View>            

          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>{userOwnsMatch(item) ? 'Ingresar resultado' : 'Elegir lado'}</Text>
          </View>
        </View>
      </PressableOpacity> 
    );
  }

  return (
    <>
      <View style={styles.topContent}>
        <Text style={styles.title}>Partidos</Text>
        <PressableOpacity onPress={() => navigate('/main/matches/notifications')}>
          <NotificationIcon style={styles.notificationIcon}/>
        </PressableOpacity>      
      </View>

      <FlatList
        data={matches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    
      <View style={styles.createMatchButton}>      
        <LinearGradient style={styles.gradient} colors={['#F4A58A', '#ED6B4E']}>
          <PressableOpacity onPress={() => navigate('/main/matches/createMatch')}>
          <PlusIcon style={styles.plusIcon} />
          </PressableOpacity>   
        </LinearGradient>        
      </View>    
    </>
  );
}

export default JoinMatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Regular"
  },
  topContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32
  },
  notificationIcon: {
    width: 24,
    height: 24
  },
  matchesGroup: {
    flex: 1,
  },
  matchOverview: {
    width: "100%",
    backgroundColor: "#2B2B3D",
    borderRadius: 16,    
    marginBottom: 14
  },
  matchOverviewContent: {
    width: "100%",
    padding: 16,
  },
  topTeam: {
   flexDirection: "row",
   marginBottom: 16,
   alignItems: "center",
  },
  bottomTeam: {
    flexDirection: "row", 
    alignItems: "center",
    marginBottom: 16,
   },
  shirtIcon: {
    width: 36,
    height: 36,
    marginRight: 16
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16
  },
  createMatchButton: {
    width: 48,
    height: 48,
    borderRadius: 48,
    marginBottom: 24,
    position: "absolute",
    bottom: 0,
    right: 28
  },
  gradient: {
    flex: 1,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  createMatchText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Regular"
  },
  plusIcon: {
    width: 24,
    height: 24
  },
  matchText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Lato-Regular",
  },
  actionContainer: {
    height: 32,
    width: '100%',
    backgroundColor: '#222232',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Bold",
  }
});