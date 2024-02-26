import React, { useEffect, useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ListRenderItemInfo, FlatList } from "react-native";
import ShirtIcon from "../../../../assets/svgs/ShirtIcon";
import { Match } from "../../../../models/Match";
import { PressableOpacity } from "../../../../components/PresableOpacity";
import CustomUserImage from "../../../../components/CustomUserImage";
import { useNavigate } from "react-router-native";
import { getPlayedMatches } from "../../../../firebase";
import { MainScreenContextConfig } from "../../context";
import { convertDateStr } from "../../../../utils";

function MatchesStats () {
  const { playedMatches: matches, setPlayedMatches: setMatches, setLastVisiblePlayedMatchDoc, lastVisiblePlayedMatchDoc } = useContext(MainScreenContextConfig);
  const navigate = useNavigate();
  const handleMatchOverViewPress = (match: Match) => {
    navigate('/main/matches/pastMatchResult', { state: match });
  };

  const handleLoadMore = () => {
    if (!lastVisiblePlayedMatchDoc) {
      return;
    }

    getPlayedMatches(lastVisiblePlayedMatchDoc).then(({ error, data, lastVisible }) => {
      if (error) {
        console.log(error);
        return;
      }

      const sortedMatches = data && matches && [...matches, ...data].sort((a, b) => {
        // @ts-ignore
        const dateA = new Date(convertDateStr(a.date));
        // @ts-ignore
        const dateB = new Date(convertDateStr(b.date));
        // @ts-ignore
        return dateA - dateB;
      });

      matches && setMatches && setMatches(sortedMatches as unknown as Match[]);
      setLastVisiblePlayedMatchDoc && setLastVisiblePlayedMatchDoc(lastVisible);
    });
  };

  useEffect(() => {
    getPlayedMatches().then(({error, data, lastVisible}) => {
      if (error) {
        console.log(error);
        return;
      }

      const sortedMatches = data && matches && data.sort((a, b) => {
        // @ts-ignore
        const dateA = new Date(convertDateStr(a.date));
        // @ts-ignore
        const dateB = new Date(convertDateStr(b.date));
        // @ts-ignore
        return dateA - dateB;
      });

      data && data.length > 10 && setLastVisiblePlayedMatchDoc && setLastVisiblePlayedMatchDoc(lastVisible);
      data && setMatches && setMatches(sortedMatches as Match[]);
    })
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<Match>) => (
    <PressableOpacity onPress={() => handleMatchOverViewPress(item)} style={styles.matchOverview}>
      <View style={styles.matchOverviewContent}>
      <ScrollView contentContainerStyle={styles.topTeam} horizontal showsHorizontalScrollIndicator={false}>
        <ShirtIcon style={styles.shirtIcon} fill="#fff" />
        {item.whiteTeam.map((user, userIndex) => (
          <CustomUserImage key={userIndex} user={user} />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.bottomTeam} horizontal showsHorizontalScrollIndicator={false}>
        <ShirtIcon style={styles.shirtIcon} fill="#000" />
        {item.blackTeam.map((user, userIndex) => (
          <CustomUserImage key={userIndex} user={user} /> 
        ))}
      </ScrollView>
      </View>            

      <View style={styles.actionContainer}>
        <View style={styles.actionTextContainer}>
          <Text style={styles.actionText}>{item.whiteTeamScore}</Text>
        </View>

        <View style={styles.actionTextContainer}>
          <Text style={styles.actionText}>{item.blackTeamScore}</Text>
        </View>
      </View>
    </PressableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Partidos jugados</Text>
        <FlatList 
          data={matches}
          keyExtractor={(_, index)=> `${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
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