import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, Image, ScrollView } from "react-native";
import { useNavigate } from 'react-router-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from "../../../../../components/CustomButton";
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import CustomInput from "../../../../../components/CustomInput";
import SearchIcon from "../../../../../assets/svgs/SearchIcon";
import CourtIcon from "../../../../../assets/svgs/CourtIcon";
import DateIcon from "../../../../../assets/svgs/DateIcon";
import ClockIcon from "../../../../../assets/svgs/ClockIcon";
import { User } from "../../../../../models/User";
import { mockusersToSearchFrom } from "./mockData";
import InvitePlayers from "./components/InvitePlayers";

type BottomSheetView = "invitePlayers" | "selectCourt" | "selectModality";

function CreateMatch () {
  const navigate = useNavigate();
  const [invitedPlayers, setInvitedPlayers] = useState<User[]>([]);
  const [searchResultPlayers, setSearchResultPlayers] = useState<User[]>([]);
  const [searchPlayerText, setSearchPlayerText] = useState<string>("");
  const [selectedBottomSheetView, setSelectedBottomSheetView] = useState<BottomSheetView>("invitePlayers");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const handleExpand = () => {
    bottomSheetRef?.current?.expand()
  }
  const handleClose = () => {
    bottomSheetRef?.current?.close()
  }

  const handleInvitePlayer = (player: User) => {
    const alreadyInvited = invitedPlayers.find((singlePlayer) => singlePlayer.id === player.id);

    if (!alreadyInvited){      
      setInvitedPlayers([...invitedPlayers, player]);
      return;
    }

    const filteredPlayers = invitedPlayers.filter((singlePlayer) => singlePlayer.id !== player.id);
    setInvitedPlayers(filteredPlayers);
  }

  const isUserInInvitedPlayers = useCallback((userId: string) => {
    return invitedPlayers.find((singlePlayer) => singlePlayer.id === userId);
  }, [invitedPlayers]);

  useEffect(() => {
    if (searchPlayerText.length >= 3) {
      setSearchResultPlayers(mockusersToSearchFrom.filter((singleUser) => singleUser.name.toLowerCase().includes(searchPlayerText.toLowerCase())));
      handleExpand();
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

    {invitedPlayers.length ? <View style={styles.invitedPlayers}>
      {invitedPlayers.length ? invitedPlayers.map((singlePlayer) => (
        <Image key={singlePlayer.id} style={[styles.userImage, styles.userImageMargin]} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
      )) : <></>}
    </View> : <></>}

    <View style={styles.courtGroup}>
      <CustomInput 
        placeholder="Seleccionar cancha" 
        placeholderTextColor="#65656B" 
        value="La Grama F8" 
        FrontIcon={CourtIcon}
        styling="secondary"
        style={styles.courtInput}
      />

      <CustomInput 
        placeholder="Modalidad de juego" 
        placeholderTextColor="#65656B" 
        value="9 vs 9" 
        FrontIcon={CourtIcon}
        styling="secondary"
        style={styles.modalityInput}
      />
    </View>    

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

    <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.contentContainer}
        handleIndicatorStyle={styles.handleIndicator}
        keyboardBehavior='interactive'
      >
        <View style={styles.bottomSheetContent}>
          <InvitePlayers
            searchResultPlayers={searchResultPlayers} 
            handleInvitePlayer={handleInvitePlayer} 
            isUserInInvitedPlayers={isUserInInvitedPlayers} 
          />
        </View>
      </BottomSheet> 
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
  },
  userImageMargin: {
    marginBottom: 16
  },
  dateGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 'auto'
  },
  dateInput: {
    width: "49%"
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#222232'
  },
  handleIndicator: {
    backgroundColor: '#303046' 
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 51
  },
  rowLeft: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginRight: 'auto',
  },
  inviteBtn: {
    height: 'auto',
    padding: 8,
    borderRadius: 8,
    width: 60
  },
  inviteBtnText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Lato-Regular',
  },
  inviteBtnDelete: {
    backgroundColor: '#FF4D4D',
  },
  courtGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courtInput: {
    width: "49%"
  },
  modalityInput: {
    width: "49%"
  }
});