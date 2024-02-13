import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from "react-native";
import ShirtIcon from "../../../../assets/svgs/ShirtIcon";
import { Match } from "../../../../models/Match";
import { mockData } from "./mockData";
import { PressableOpacity } from "../../../../components/PresableOpacity";
import { useNavigate } from "react-router-native";

function MatchesStats () {
  const [matches, setMatches] = useState<Match[]>([]);
  const navigate = useNavigate();
  const handleMatchOverViewPress = () => {
    navigate('/Main/Matches/PastMatchResult');
  }

  useEffect(() => {
    setMatches(mockData);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Partidos jugados</Text>
        {matches.length ? matches.map((singleMatch, index) => (
          <PressableOpacity onPress={handleMatchOverViewPress} key={index} style={styles.matchOverview}>
          <View style={styles.matchOverviewContent}>
          <ScrollView contentContainerStyle={styles.topTeam} horizontal>
            <ShirtIcon style={styles.shirtIcon} fill="#fff" />
            {singleMatch.whiteTeam.map((user, userIndex) => (
              <Image key={userIndex} style={styles.userImage} source={{ uri: user.avatarImgUrl, cache: "force-cache" }} />
            ))}
          </ScrollView>

          <ScrollView contentContainerStyle={styles.bottomTeam} horizontal>
            <ShirtIcon style={styles.shirtIcon} fill="#000" />
            {singleMatch.blackTeam.map((singleUser, userIndex) => (
              <Image key={userIndex} style={styles.userImage} source={{ uri: singleUser.avatarImgUrl, cache: "force-cache" }} />    
            ))}
          </ScrollView>
          </View>            

          <View style={styles.actionContainer}>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionText}>{singleMatch.whiteTeamScore}</Text>
            </View>

            <View style={styles.actionTextContainer}>
              <Text style={styles.actionText}>{singleMatch.blackTeamScore}</Text>
            </View>
          </View>
        </PressableOpacity>
        )) : <></>}
      </View>
    </SafeAreaView>
  );
}

export default MatchesStats;

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
    fontFamily: "Lato-Regular",
    marginBottom: 32
  },
  matchOverview: {
    maxHeight: 200,
    width: "100%",
    backgroundColor: "#2B2B3D",
    borderRadius: 16,    
    marginBottom: 14,
    flexDirection: "row",
  },
  matchOverviewContent: {
    width: "80%",
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
  matchText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Lato-Regular",
  },
  actionContainer: {
    height: '100%',
    width: '20%',
    backgroundColor: '#222232',
    padding: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  actionTextContainer: {
    width: "100%",
    height: 80 - (16 * 2),
    justifyContent: "center",
  },
  actionText: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Bold",
    textAlign: "center"
  }
});