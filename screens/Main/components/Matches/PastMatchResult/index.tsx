import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useNavigate, useLocation } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import SoccerballIcon from "../../../../../assets/svgs/SoccerballIcon";
import CustomInput from "../../../../../components/CustomInput";
import { Match } from "../../../../../models/Match";
import { PressableOpacity } from "../../../../../components/PresableOpacity";
import CustomUserImage from "../../../../../components/CustomUserImage";
import { capitalizeString } from "../../../../../utils";

function PastMatchResult () {
  const navigate = useNavigate();
  const location = useLocation();
  const [matchData, setMatchData] = useState<Match>();

  useEffect(() => {
    if (location.state) {
      setMatchData(location.state as Match);
    }
  }, [location.state]);

  return (<>
    <View style={styles.header}>
      <PressableOpacity onPress={() => navigate('/main/matchesStats')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </PressableOpacity>
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
            value={matchData?.whiteTeamScore?.toString() || "0"}
            FrontIcon={SoccerballIcon}
            styling="secondary"
            style={styles.itemInput}
            disabled
          />
        </View>

        <View style={styles.item}>
          <ShirtIcon style={styles.shirtIcon} fill="#000" />
          <CustomInput
          keyboardType="numeric" 
            placeholder="Goles" 
            placeholderTextColor="#65656B" 
            value={matchData?.blackTeamScore?.toString() || "0"}
            FrontIcon={SoccerballIcon}
            styling="secondary"
            style={styles.itemInput}
            disabled
          />
        </View>

        {!!matchData ? matchData.whiteTeam.map((singlePlayer) => (
          <View style={styles.item} key={singlePlayer.id}>
            <CustomUserImage key={singlePlayer.id} user={singlePlayer} />
            <Text style={styles.userName}>{capitalizeString(singlePlayer.name || singlePlayer.email)}</Text>
            <CustomInput 
              keyboardType="numeric"
              placeholder="Goles" 
              placeholderTextColor="#65656B" 
              value={singlePlayer.goalsInMatch?.toString() || "0"}
              FrontIcon={SoccerballIcon}
              styling="secondary"
              style={styles.itemInput}
              disabled
            />
          </View>
        )) : <></>}
        {!!matchData ? matchData.blackTeam.map((singlePlayer) => (
          <View style={styles.item} key={singlePlayer.id}>
            <CustomUserImage key={singlePlayer.id} user={singlePlayer} />
            <Text style={styles.userName}>{capitalizeString(singlePlayer.name || singlePlayer.email)}</Text>
            <CustomInput 
              keyboardType="numeric"
              placeholder="Goles" 
              placeholderTextColor="#65656B" 
              value={singlePlayer.goalsInMatch?.toString() || "0"}
              FrontIcon={SoccerballIcon}
              styling="secondary"
              style={styles.itemInput}
              disabled
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