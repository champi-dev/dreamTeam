import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useNavigate, useLocation } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import SoccerballIcon from "../../../../../assets/svgs/SoccerballIcon";
import CustomInput from "../../../../../components/CustomInput";
import { Match } from "../../../../../models/Match";
import CustomButton from "../../../../../components/CustomButton";
import { PressableOpacity } from "../../../../../components/PresableOpacity";
import CustomUserImage from "../../../../../components/CustomUserImage";
import { capitalizeString } from "../../../../../utils";
import { updateMatch, updateUserPropertyById } from "../../../../../firebase";
import { User } from "../../../../../models/User";
import { useKeyboard } from "../../../../../hooks/keyboard";

function EnterMatchResult () {
  const navigate = useNavigate();
  const location = useLocation();
  const keyboardShown = useKeyboard();
  const [matchData, setMatchData] = useState<Match>();
  const [whiteTeamScore, setWhiteTeamScore] = useState<number>(0);
  const [blackTeamScore, setBlackTeamScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const whiteTeamGoals = matchData?.whiteTeam.reduce((prev, crr) => prev + (crr.goalsInMatch || 0), 0)
  const blackTeamGoals = matchData?.blackTeam.reduce((prev, crr) => prev + (crr.goalsInMatch || 0), 0)
  const isFormValid = whiteTeamGoals === whiteTeamScore && blackTeamGoals === blackTeamScore;

  interface ChangePlayerGoalCountProps {
    playerId: string;
    goalsInMatch: number;
    team: 'white' | 'black';
  }

  const changePlayerGoalCount = ({ playerId, goalsInMatch, team }: ChangePlayerGoalCountProps) => {
    const newMatchData = {...matchData};
    
    if (team === 'white') {
      newMatchData.whiteTeam = newMatchData.whiteTeam?.map((player) => {
        if (player.id === playerId) {
          player.goalsInMatch = goalsInMatch;
        }
        return player;
      });
    } else {
      newMatchData.blackTeam = newMatchData.blackTeam?.map((player) => {
        if (player.id === playerId) {
          player.goalsInMatch = goalsInMatch;
        }
        return player;
      });
    }

    setMatchData(newMatchData as Match);
  };

  const updatePlayerTotalGoals = (player: User) => {
    const updatedPlayer = {...player, goals: player.goals + (player?.goalsInMatch || 0)};

    updateUserPropertyById(player.id, { goals: updatedPlayer.goals })
      .then(({ error }) => {
        if (error) {
          console.log('Error updating player', error);
          return;
        }
      });

    return updatedPlayer;
  };

  const handleSave = () => {
    setIsLoading(true);

    matchData?.id && updateMatch(matchData.id, {
       whiteTeamScore, 
       blackTeamScore, 
       whiteTeam: matchData?.whiteTeam.map(updatePlayerTotalGoals), 
       blackTeam: matchData?.blackTeam.map(updatePlayerTotalGoals), 
       played: true
      }).then(({ error }) => {
        if (error) {
          console.log('Error updating match', error);
          return;
        }
        
        navigate('/main/matches');
      }).finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (location.state) {
      setMatchData(location.state);
    }
  }, [location.state]);

  return (<>
    <View style={styles.header}>
      <PressableOpacity onPress={() => navigate('/main/matches')}>
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
            value={whiteTeamScore.toString()}
            onChangeText={(text) => isNaN(parseInt(text)) ? 0 : setWhiteTeamScore(parseInt(text))}
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
            value={blackTeamScore.toString()}
            onChangeText={(text) => isNaN(parseInt(text)) ? 0 : setBlackTeamScore(parseInt(text))}
            FrontIcon={SoccerballIcon}
            styling="secondary"
            style={styles.itemInput}
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
              value={singlePlayer.goalsInMatch?.toString() || '0'}
              onChangeText={(text) => changePlayerGoalCount({ playerId: singlePlayer.id, goalsInMatch: isNaN(parseInt(text)) ? 0 : parseInt(text), team: 'white'})}
              FrontIcon={SoccerballIcon}
              styling="secondary"
              style={styles.itemInput}
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
              value={singlePlayer.goalsInMatch?.toString() || '0'}
              onChangeText={(text) => changePlayerGoalCount({ playerId: singlePlayer.id, goalsInMatch: isNaN(parseInt(text)) ? 0 : parseInt(text), team: 'black'})}
              FrontIcon={SoccerballIcon}
              styling="secondary"
              style={styles.itemInput}
            />
          </View>
        )) : <></>}
      </ScrollView>
      {keyboardShown ? <></> : (
        <CustomButton text="Guardar" type="primary" onPress={handleSave} disabled={isLoading || !isFormValid} />   
      )}      
    </View>
  </>);
}

export default EnterMatchResult;

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