import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigate, useLocation } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import CustomButton from "../../../../../components/CustomButton";
import { Match } from "../../../../../models/Match";
import { PressableOpacity } from "../../../../../components/PresableOpacity";
import CustomUserImage from "../../../../../components/CustomUserImage";
import { capitalizeString } from "../../../../../utils";
import { MainScreenContextConfig } from "../../../context";
import { updateMatch, getMatchById } from "../../../../../firebase";
import { User } from "../../../../../models/User";

function SelectSide () {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: currentUser } = useContext(MainScreenContextConfig);

  const [match, setMatch] = useState<Match>();
  const [selectedSide, setSelectedSide] = useState<'white' | 'black'>('white');
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = () => selectedSide === 'white' ? match?.whiteTeam && match?.whiteTeam.length <= match?.playersPerTeam : match?.blackTeam && match?.blackTeam.length <= match?.playersPerTeam;

  const handleSelectSide = (side: 'white' | 'black') => {
    if (side === 'white' && selectedSide !== 'white') {
      // @ts-ignore
      setMatch(prevMatch => ({
        ...prevMatch,
        // @ts-ignore
        whiteTeam: [...prevMatch.whiteTeam, currentUser],
        // @ts-ignore
        blackTeam: prevMatch.blackTeam.filter(player => player.id !== currentUser?.id)
      }));
    }

    if (side === 'black' && selectedSide !== 'black') {
      // @ts-ignore
      setMatch(prevMatch => ({
        ...prevMatch,
        // @ts-ignore
        blackTeam: [...prevMatch?.blackTeam, currentUser],
        // @ts-ignore
        whiteTeam: prevMatch?.whiteTeam.filter(player => player.id !== currentUser?.id)
      }));
    }
  };

  const handleSave = () => {
    if (match) {
      setIsLoading(true);
      match.id && updateMatch(match.id, {
        whiteTeam: match.whiteTeam,
        blackTeam: match.blackTeam
      }).then(({ error }) => {
        if (error) {
          console.log('Error updating match', error);
          return;
        }

        navigate('/main/matches');
      }).finally(() => setIsLoading(false));
    }
  }

  const handleMatchData = (match: Match) => {
    if (isUserInMatch(match)) {
      setMatch(match);
      return;
    }

    if (match.whiteTeam.length < match.playersPerTeam) {
      setMatch({
        ...match,
        whiteTeam: [...match.whiteTeam, currentUser as User]
      });
      return;
    }

    if (match.blackTeam.length < match.playersPerTeam) {
      setMatch({
        ...match,
        blackTeam: [...match.blackTeam, currentUser as User]
      });
      return;
    }
  }

  const isUserInMatch = (match: Match) => match.whiteTeam.some(player => player.id === currentUser?.id) || match.blackTeam.some(player => player.id === currentUser?.id);

  useEffect(() => {
   if (location.state && !location.state.matchId) {
    handleMatchData(location.state);
   }
  }, [location.state]);

  useEffect(() => {
    if (location.state.matchId) {
      getMatchById(location.state.matchId).then(({error, data}) => {
        if (error) {
          console.log('Error getting match', error);
          return;
        }

        data && handleMatchData(data as Match);
      })
    }
  }, [location.state]);

  useEffect(() => {
    if (match) {
      const isUserInWhiteTeam = match.whiteTeam.some(player => player.id === currentUser?.id);
      setSelectedSide(isUserInWhiteTeam ? 'white' : 'black');
    }
  }, [match]);


  return (<>
    <View style={styles.header}>
      <PressableOpacity onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </PressableOpacity>
      <Text style={styles.title}>Elegir lado</Text>
    </View>

    <View style={styles.content}>
      <View style={styles.contentLeft}>
        <PressableOpacity onPress={() => handleSelectSide('white')}>
          <View style={[styles.iconWrapper, selectedSide === 'white' && styles.iconWrapperActive]}>
            <ShirtIcon style={styles.shirtIcon} fill="#fff" />
          </View>
        </PressableOpacity>        

        {match?.whiteTeam.length ? match.whiteTeam.map((singlePlayer, index) => (
          <View style={styles.user} key={index}>
            <CustomUserImage user={singlePlayer} />
            <Text style={styles.userText}>{capitalizeString(singlePlayer.name || singlePlayer.email)}</Text>
          </View>
        )) : <></>}        
      </View>

      <View style={styles.contentRight}>
        <PressableOpacity onPress={() => handleSelectSide('black')}>
          <View style={[styles.iconWrapper, selectedSide === 'black' && styles.iconWrapperActive]}>
            <ShirtIcon style={styles.shirtIcon} fill="#000" />
          </View>
        </PressableOpacity>        

        {match?.blackTeam.length ? match.blackTeam.map((singlePlayer, index) => (
          <View style={styles.user} key={index}>
            <CustomUserImage user={singlePlayer} />
            <Text style={styles.userText}>{capitalizeString(singlePlayer.name || singlePlayer.email)}</Text>
          </View>
        )) : <></>} 
      </View>
    </View>

    <CustomButton text="Guardar" onPress={handleSave} type="primary" disabled={isLoading || !isFormValid()} />
  </>);
}

export default SelectSide;

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
    flex: 1,
    flexDirection: "row",
  },
  contentLeft: {
    width: "50%",
    height: "100%",
    alignItems: "center",
  },
  contentRight: {
    width: "50%",
    height: "100%",
    alignItems: "center",
  },
  shirtIcon: {
    width: 44,
    height: 44,
  },
  iconWrapper: {
    backgroundColor: "#181829",    
    borderRadius: 92,
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32
  },
  iconWrapperActive: {
    backgroundColor: "#2B2B3D",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16
  },
  userText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Lato-Regular"
  }
});