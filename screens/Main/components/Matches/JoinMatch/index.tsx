import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import NotificationIcon from "../../../../../assets/svgs/NotificationIcon";
import PlusIcon from "../../../../../assets/svgs/PlusIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import { mockData, mockUser } from "./mockData";
import { Match } from "../../../../../models/Match";
import { getDayName, convertTimeTo12HourFormat } from "../../../../../utils";
import { User } from "../../../../../models/User";

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

  return (
    <>
    <View style={styles.topContent}>
      <Text style={styles.title}>Partidos</Text>
      <Pressable onPress={() => navigate('/main/matches/notifications')}>
        <NotificationIcon style={styles.notificationIcon}/>
      </Pressable>      
    </View>

      <ScrollView style={styles.matchesGroup}>
        {matches?.length ? matches.map((singleMatch, index) => (
          <Pressable key={index} onPress={() => handleMatchPress(singleMatch)}>
          <View style={styles.matchOverview}>
            <View style={styles.matchOverviewContent}>
            <ScrollView contentContainerStyle={styles.topTeam} horizontal>
              <ShirtIcon style={styles.shirtIcon} fill="#fff" />
              {singleMatch.whiteTeam.map((singlePlayer, playerIndex) => (
                <Image key={playerIndex} style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
              ))}              
            </ScrollView>
  
            <ScrollView contentContainerStyle={styles.bottomTeam} horizontal>
              <ShirtIcon style={styles.shirtIcon} fill="#000" />
              {singleMatch.blackTeam.map((singlePlayer, playerIndex) => (
                <Image key={playerIndex} style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
              ))}    
          </ScrollView>
  
          <Text style={styles.matchText}>{getDayName(singleMatch.date)} {convertTimeTo12HourFormat(singleMatch.time)}</Text>
          <Text style={styles.matchText}>{singleMatch.court} {singleMatch.playersPerTeam} vs {singleMatch.playersPerTeam}</Text>
          </View>            
  
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>{userOwnsMatch(singleMatch) ? 'Ingresar resultado' : 'Elegir lado'}</Text>
          </View>
        </View>
          </Pressable>   
        )) : <></>}             
    </ScrollView>
    
      <View style={styles.createMatchButton}>      
        <LinearGradient style={styles.gradient} colors={['#F4A58A', '#ED6B4E']}>
          <Pressable onPress={() => navigate('/main/matches/createMatch')}>
          <PlusIcon style={styles.plusIcon} />
          </Pressable>   
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