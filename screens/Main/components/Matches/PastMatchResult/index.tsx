import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView, Image } from "react-native";
import { useNavigate } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import SoccerballIcon from "../../../../../assets/svgs/SoccerballIcon";
import CustomInput from "../../../../../components/CustomInput";
import { mockData } from "./mockData";
import { Match } from "../../../../../models/Match";

function PastMatchResult () {
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<Match>();

  useEffect(() => {
    setMatchData(mockData);
  }, []);

  return (<>
    <View style={styles.header}>
      <Pressable onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </Pressable>
      <Text style={styles.title}>Resultado</Text>
    </View>

    <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.item}>
          <ShirtIcon style={styles.shirtIcon} fill="#fff" />
          <CustomInput 
          keyboardType="numeric"
            placeholder="Goles" 
            placeholderTextColor="#65656B" 
            value={matchData?.whiteTeamScore?.toString() || ""}
            FrontIcon={SoccerballIcon}
            styling="secondary"
            style={styles.itemInput}
          />
        </View>

        <View style={styles.item}>
          <ShirtIcon style={styles.shirtIcon} fill="#000" />
          <CustomInput
          keyboardType="numeric" 
            placeholder="Goles" 
            placeholderTextColor="#65656B" 
            value={matchData?.blackTeamScore?.toString() || ""}
            FrontIcon={SoccerballIcon}
            styling="secondary"
            style={styles.itemInput}
          />
        </View>

        {!!matchData ? matchData.whiteTeam.map((singlePlayer) => (
          <View style={styles.item} key={singlePlayer.id}>
            <Image key={singlePlayer.id} style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
            <Text style={styles.userName}>{singlePlayer.name}</Text>
            <CustomInput 
              keyboardType="numeric"
              placeholder="Goles" 
              placeholderTextColor="#65656B" 
              value={singlePlayer.goalsInMatch?.toString() || ""}
              FrontIcon={SoccerballIcon}
              styling="secondary"
              style={styles.itemInput}
            />
          </View>
        )) : <></>}
        {!!matchData ? matchData.blackTeam.map((singlePlayer) => (
          <View style={styles.item} key={singlePlayer.id}>
            <Image key={singlePlayer.id} style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
            <Text style={styles.userName}>{singlePlayer.name}</Text>
            <CustomInput 
              keyboardType="numeric"
              placeholder="Goles" 
              placeholderTextColor="#65656B" 
              value={singlePlayer.goalsInMatch?.toString() || ""}
              FrontIcon={SoccerballIcon}
              styling="secondary"
              style={styles.itemInput}
            />
          </View>
        )) : <></>}
      </ScrollView>
    </View>
  </>);
}

export default PastMatchResult;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32
  },
  headerIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Regular",
    marginLeft: 16
  },
  content: {
    flex: 1
  },
  shirtIcon: {
    width: 36,
    height: 36,
    marginRight: 16
  },
  item: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 16
  },
  itemInput: {
    flexGrow: 1,
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16,
  },
  userName: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 12,
    marginRight: 16,
    width: "40%"
  }

});