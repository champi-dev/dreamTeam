import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigate } from 'react-router-native';
import CustomButton from "../../../../../components/CustomButton";
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import CustomInput from "../../../../../components/CustomInput";
import SearchIcon from "../../../../../assets/svgs/SearchIcon";
import CourtIcon from "../../../../../assets/svgs/CourtIcon";
import DateIcon from "../../../../../assets/svgs/DateIcon";
import ClockIcon from "../../../../../assets/svgs/ClockIcon";
import { User } from "../../../../../models/User";
import { mockusersToSearchFrom } from "./mockData";

function CreateMatch () {
  const navigate = useNavigate();
  const [invitedPlayers, setInvitedPlayers] = useState<User[]>([]);
  const [searchResultPlayers, setSearchResultPlayers] = useState<User[]>([]);
  const [searchPlayerText, setSearchPlayerText] = useState<string>("");

  useEffect(() => {
    if (searchPlayerText.length > 3) {
      setSearchResultPlayers(mockusersToSearchFrom.filter((singleUser) => singleUser.name.toLowerCase().includes(searchPlayerText.toLowerCase())));
    }
  }, [searchPlayerText])

  return (<>
    <View style={styles.header}>
      <Pressable onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </Pressable>
      <Text style={styles.title}>Crear partido</Text>      
    </View>

    <CustomInput 
      placeholder="Invitar jugador" 
      placeholderTextColor="#65656B" 
      value={searchPlayerText}
      FrontIcon={SearchIcon}
      styling="secondary"
      onChangeText={(text) => setSearchPlayerText(text)}
    />

    <View style={styles.invitedPlayers}>
      {invitedPlayers.length ? invitedPlayers.map((singlePlayer) => (
        <Image style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
      )) : <></>}
    </View>

    <CustomInput 
      placeholder="Seleccionar cancha" 
      placeholderTextColor="#65656B" 
      value="La Grama F8" 
      FrontIcon={CourtIcon}
      styling="secondary"
    />

    <View style={styles.dateGroup}>
      <CustomInput 
        placeholder="Dia" 
        placeholderTextColor="#65656B" 
        value="" 
        FrontIcon={DateIcon}
        styling="secondary"
        style={styles.dateInput}
      />
      <CustomInput 
        placeholder="Hora" 
        placeholderTextColor="#65656B" 
        value="" 
        FrontIcon={ClockIcon}
        styling="secondary"
        style={styles.dateInput}
      />
    </View>

    <CustomButton text="Crear partido" onPress={() => navigate('/main/matches')} type="primary"/>
  </>);
}

export default CreateMatch;

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
  invitedPlayers: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16,
    marginBottom: 16
  },
  dateGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 'auto'
  },
  dateInput: {
    width: "49%"
  }
});