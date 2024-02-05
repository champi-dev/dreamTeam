import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigate } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import CustomButton from "../../../../../components/CustomButton";
import { mockData, mockCurrentUser } from "./mockData";
import { Match } from "../../../../../models/Match";
import { User } from "../../../../../models/User";

function SelectSide () {
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [selectedSide, setSelectedSide] = useState<'white' | 'black'>('white');

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
  }

  useEffect(() => {
    setMatch(mockData)
    setCurrentUser(mockCurrentUser)
  }, []);

  useEffect(() => {
    if (match) {
      const isUserInWhiteTeam = match.whiteTeam.some(player => player.id === currentUser?.id);
      setSelectedSide(isUserInWhiteTeam ? 'white' : 'black');
    }
  }, [match])


  return (<>
    <View style={styles.header}>
      <Pressable onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </Pressable>
      <Text style={styles.title}>Elegir lado</Text>
    </View>

    <View style={styles.content}>
      <View style={styles.contentLeft}>
        <Pressable onPress={() => handleSelectSide('white')}>
          <View style={[styles.iconWrapper, selectedSide === 'white' && styles.iconWrapperActive]}>
            <ShirtIcon style={styles.shirtIcon} fill="#fff" />
          </View>
        </Pressable>        

        {match?.whiteTeam.length ? match.whiteTeam.map((singlePlayer, index) => (
          <View style={styles.user} key={index}>
            <Image style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
            <Text style={styles.userText}>{singlePlayer.name}</Text>
          </View>
        )) : <></>}        
      </View>

      <View style={styles.contentRight}>
        <Pressable onPress={() => handleSelectSide('black')}>
          <View style={[styles.iconWrapper, selectedSide === 'black' && styles.iconWrapperActive]}>
            <ShirtIcon style={styles.shirtIcon} fill="#000" />
          </View>
        </Pressable>        

        {match?.whiteTeam.length ? match.blackTeam.map((singlePlayer, index) => (
          <View style={styles.user} key={index}>
            <Image style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
            <Text style={styles.userText}>{singlePlayer.name}</Text>
          </View>
        )) : <></>} 
      </View>
    </View>

    <CustomButton text="Guardar" onPress={() => navigate('/main/matches')} type="primary" />
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