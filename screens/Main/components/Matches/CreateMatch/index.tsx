import React, { useState, useContext, useEffect, useRef, useMemo, useCallback } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigate } from 'react-router-native';
import BottomSheet from '@gorhom/bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MainScreenContextConfig } from "../../../context";
import CustomUserImage from "../../../../../components/CustomUserImage";
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
import InvitePlayers from "./components/InvitePlayers";
import SelectCourt from "./components/SelectCourt";
import SelectModality from "./components/SelectModality";
import { useKeyboard } from "../../../../../hooks/keyboard";
import { PressableOpacity } from "../../../../../components/PresableOpacity";
import { getUsersByNamePrefix, getAllCourts, createMatch, createNotification, sendPushNotification } from "../../../../../firebase";
import { GlobalContextConfig } from "../../../../../globalContext";
import { capitalizeString } from "../../../../../utils";

type BottomSheetView = "invitePlayers" | "selectCourt" | "selectModality";

function CreateMatch () {
  const navigate = useNavigate();
  const { userId } = useContext(GlobalContextConfig);
  const { availableCourts, setAvailableCourts, user } = useContext(MainScreenContextConfig);
  const [invitedPlayers, setInvitedPlayers] = useState<User[]>([]);
  const [searchResultPlayers, setSearchResultPlayers] = useState<User[]>([]);
  const [searchPlayerText, setSearchPlayerText] = useState<string>("");
  const [searchPlayerTextTimeout, setSearchPlayerTextTimeout] = useState<NodeJS.Timeout | null>(null);
  const [selectedBottomSheetView, setSelectedBottomSheetView] = useState<BottomSheetView>("invitePlayers");
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedModality, setSelectedModality] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<"date" | "time">("date");
  const [matchDate, setMatchDate] = useState<Date | null>(null);
  const [matchTime, setMatchTime] = useState<Date | null>(null);
  const [isCreateMatchLoading, setIsCreateMatchLoading] = useState(false);
  const keyboardShown = useKeyboard()

  const isFormValid = selectedCourt && selectedModality && matchDate && matchTime;
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

  const handleCreateMatch = async () => {
    setIsCreateMatchLoading(true);
    const { error, data: matchId } = await createMatch({
      ownerId: `${userId || 0}`,
      blackTeam: [],
      whiteTeam: [],
      courtId: `${selectedCourt?.id || 0}`,
      date: matchDate?.toLocaleDateString() || "",
      playersPerTeam: parseInt(selectedModality[0]),
      time: matchTime?.toLocaleTimeString() || "",
      createdAt: new Date().toLocaleDateString(),
      played: false,
    });

    if (error) {
      console.error(error);
      setIsCreateMatchLoading(false);
      return;
    }

    invitedPlayers.map(async (singlePlayer) => {
      const notification = {
        highlightedText: capitalizeString((user?.name || user?.email) as string),
        regularText: "te ha invitado a un partido",
        receiverId: singlePlayer.id,
        matchId: matchId as string,
        senderId: userId as string,
      };

      const {error, data: notificationId} = await createNotification(notification);
      if (error) {
        console.error(error);
        return;
      }

      const {error: pushError} = await sendPushNotification({ receiverId: singlePlayer.id, notification: { id: notificationId, ...notification } });
      if (pushError) {
        console.error(pushError);
        return;
      }
    });

    setIsCreateMatchLoading(false);
    navigate('/main/matches');
  }

  const isUserInInvitedPlayers = useCallback((userId: string) => {
    return invitedPlayers.find((singlePlayer) => singlePlayer.id === userId);
  }, [invitedPlayers]);  

  useEffect(() => {
    if (searchPlayerText.length >= 3) {
      if (searchPlayerTextTimeout) {
        clearTimeout(searchPlayerTextTimeout);
      }

      const nameTimeout = setTimeout(() => {
        getUsersByNamePrefix(searchPlayerText).then(({error, data}) => {
          if (error) {
            console.error(error);
            return;
          }
          setSearchResultPlayers(data as User[]);
          handleExpand();
        });
      }, 200)

      setSearchPlayerTextTimeout(nameTimeout);
    }
  }, [searchPlayerText]);

  useEffect(() => {
    if (!availableCourts || !availableCourts.length) {
      getAllCourts().then(({error, data}) => {
        if (error) {
          console.error(error);
          return;
        }
        setAvailableCourts && setAvailableCourts(data as Court[]);
      });
    }
  }, [availableCourts]);

  useEffect(() => {
    if (availableCourts && availableCourts.length) {
      setSelectedCourt(availableCourts[0]);
      setSelectedModality(availableCourts[0].modalities[0]);
    }
  }, [availableCourts]);

  return (<>
    <View style={styles.header}>
      <PressableOpacity onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </PressableOpacity>
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
      style={styles.input}
    />

    {invitedPlayers.length ? <View style={styles.invitedPlayers}>
      {invitedPlayers.length ? invitedPlayers.map((singlePlayer) => (
        <CustomUserImage user={singlePlayer} key={singlePlayer.id} />
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

    { 
      keyboardShown    
        ? <></>
        : <CustomButton text="Crear partido" onPress={handleCreateMatch} type="primary" disabled={!isFormValid || isCreateMatchLoading} />
    }

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
              availableCourts={availableCourts || []} 
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
  input: {
    marginBottom: 16,
  },
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
    marginBottom: 16
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
    marginBottom: 'auto',
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
    marginBottom: 16
  },
  courtInput: {
    width: "49%"
  },
  modalityInput: {
    width: "49%"
  },
});