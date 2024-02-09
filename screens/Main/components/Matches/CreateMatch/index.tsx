import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigate } from 'react-router-native';
import BottomSheet from '@gorhom/bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "../../../../../components/CustomButton";
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import CustomInput from "../../../../../components/CustomInput";
import SearchIcon from "../../../../../assets/svgs/SearchIcon";
import CourtIcon from "../../../../../assets/svgs/CourtIcon";
import DateIcon from "../../../../../assets/svgs/DateIcon";
import ClockIcon from "../../../../../assets/svgs/ClockIcon";
import ProfileIcon from "../../../../../assets/svgs/ProfileIcon";
import { User } from "../../../../../models/User";
import { Court } from "../../../../../models/Court";
import { mockusersToSearchFrom, mockCourts } from "./mockData";
import InvitePlayers from "./components/InvitePlayers";
import SelectCourt from "./components/SelectCourt";
import SelectModality from "./components/SelectModality";

type BottomSheetView = "invitePlayers" | "selectCourt" | "selectModality";

function CreateMatch () {
  const navigate = useNavigate();
  const [invitedPlayers, setInvitedPlayers] = useState<User[]>([]);
  const [searchResultPlayers, setSearchResultPlayers] = useState<User[]>([]);
  const [searchPlayerText, setSearchPlayerText] = useState<string>("");
  const [selectedBottomSheetView, setSelectedBottomSheetView] = useState<BottomSheetView>("invitePlayers");
  const [availableCourts, setAvailableCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedModality, setSelectedModality] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<"date" | "time">("date");
  const [matchDate, setMatchDate] = useState<Date | null>(null);
  const [matchTime, setMatchTime] = useState<Date | null>(null);

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (datePickerMode === "date") {
      setMatchDate(date);
    }
    if (datePickerMode === "time") {
      setMatchTime(date);
    }
    hideDatePicker();
  };

  const isUserInInvitedPlayers = useCallback((userId: string) => {
    return invitedPlayers.find((singlePlayer) => singlePlayer.id === userId);
  }, [invitedPlayers]);  

  useEffect(() => {
    if (searchPlayerText.length >= 3) {
      setSearchResultPlayers(mockusersToSearchFrom.filter((singleUser) => singleUser.name.toLowerCase().includes(searchPlayerText.toLowerCase())));
      handleExpand();
    }
  }, [searchPlayerText]);

  useEffect(() => {
    setAvailableCourts(mockCourts);
  }, [])

  useEffect(() => {
    if (availableCourts.length) {
      setSelectedCourt(availableCourts[0]);
      setSelectedModality(availableCourts[0].modalities[0]);
    }
  }, [availableCourts])

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
      onFocus={() => setSelectedBottomSheetView("invitePlayers")}
    />

    {invitedPlayers.length ? <View style={styles.invitedPlayers}>
      {invitedPlayers.length ? invitedPlayers.map((singlePlayer) => (
        <Image key={singlePlayer.id} style={[styles.userImage, styles.userImageMargin]} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
      )) : <></>}
    </View> : <></>}

    <View style={styles.courtGroup}>
      <CustomInput 
        placeholder="Cancha" 
        placeholderTextColor="#65656B" 
        value={selectedCourt?.name || ""} 
        FrontIcon={CourtIcon}
        styling="secondary"
        style={styles.courtInput}
        asButton
        onPressIn={() => {
          setSelectedBottomSheetView("selectCourt");
          handleExpand();
        }}
      />  

      <CustomInput 
        placeholder="Modalidad" 
        placeholderTextColor="#65656B" 
        value={selectedModality}
        FrontIcon={ProfileIcon}
        styling="secondary"
        style={styles.modalityInput}
        asButton
        onPressIn={() => {
          setSelectedBottomSheetView("selectModality");
          handleExpand();
        }}
      />    
    </View>    

    <View style={styles.dateGroup}>
      <CustomInput 
        placeholder="Dia" 
        placeholderTextColor="#65656B" 
        value={matchDate ? matchDate.toLocaleDateString() : ""}
        FrontIcon={DateIcon}
        styling="secondary"
        style={styles.dateInput}
        asButton
        onPressIn={() => {
          setDatePickerMode("date");
          showDatePicker();
        }}
      />
      <CustomInput 
        placeholder="Hora" 
        placeholderTextColor="#65656B" 
        value={matchTime ? matchTime.toLocaleTimeString() : ""}
        FrontIcon={ClockIcon}
        styling="secondary"
        style={styles.dateInput}
        asButton
        onPressIn={() => {
          setDatePickerMode("time");
          showDatePicker();
        }}
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
          {selectedBottomSheetView === "invitePlayers" ? (
            <InvitePlayers
              searchResultPlayers={searchResultPlayers} 
              handleInvitePlayer={handleInvitePlayer} 
              isUserInInvitedPlayers={isUserInInvitedPlayers} 
            />
          ) : <></>}          

          {selectedBottomSheetView === "selectCourt" ? (
            <SelectCourt 
              availableCourts={availableCourts} 
              setSelectedCourt={setSelectedCourt} 
              setSelectedModality={setSelectedModality} 
              handleClose={handleClose}
            />
          ) : <></>}  

          {selectedBottomSheetView === "selectModality" ? (
            <SelectModality 
              selectedCourt={selectedCourt} 
              setSelectedModality={setSelectedModality} 
              handleClose={handleClose}
            />
          ) : <></>}   
        </View>
      </BottomSheet> 

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={datePickerMode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
  },
});