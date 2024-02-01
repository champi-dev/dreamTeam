import React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigate } from 'react-router-native';
import CustomButton from "../../../../../components/CustomButton";
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import CustomInput from "../../../../../components/CustomInput";
import SearchIcon from "../../../../../assets/svgs/SearchIcon";
import CourtIcon from "../../../../../assets/svgs/CourtIcon";
import DateIcon from "../../../../../assets/svgs/DateIcon";
import ClockIcon from "../../../../../assets/svgs/ClockIcon";

function CreateMatch () {
  const navigate = useNavigate();

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
      value="" 
      FrontIcon={SearchIcon}
      styling="secondary"
    />

    <View style={styles.invitedPlayers}>
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fme.jpeg?alt=media&token=ab25c3f8-a036-4703-8539-034f051b09ed" }} />
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437" }} />
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubircorrea.jpeg?alt=media&token=d5910673-c34f-4d2f-99d3-2332b1a515af" }} />
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirfredy.jpeg?alt=media&token=da4975bf-56d0-4c33-8739-1251dce3a744" }} />
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirjuanda.jpeg?alt=media&token=20132049-aa53-4789-8706-e6296969e539" }} />
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirmonroy.jpeg?alt=media&token=a9cbc752-ddce-4f83-a56b-113e8456d380" }} />
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirnepe.jpeg?alt=media&token=da69d071-50e3-459d-8979-5aa686f4b37a" }} />
      <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirpipe.jpeg?alt=media&token=de4ec99b-61e5-4f5e-a7c2-f7253ac4c535" }} />
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