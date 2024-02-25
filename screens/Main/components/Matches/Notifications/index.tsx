import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigate } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import CloseIcon from "../../../../../assets/svgs/CloseIcon";
import { PressableOpacity } from "../../../../../components/PresableOpacity";
import { MainScreenContextConfig } from "../../../context";
import { capitalizeString } from "../../../../../utils";
import { deleteNotification } from "../../../../../firebase";

function Notifications () {
  const {notifications, setNotifications} = useContext(MainScreenContextConfig);
  const navigate = useNavigate();

  const handleDeleteNotification = async (notificationId: string) => {
    const newNotifications = notifications?.filter(({ id }) => id !== notificationId);
    newNotifications && setNotifications && setNotifications(newNotifications);

    const { error } = await deleteNotification(notificationId);
    if (error) {
      console.log(error);
    }
  };

  const handlePress = (notificationId: string) => {
    handleDeleteNotification(notificationId);
    navigate('/main/matches/selectSide')
  };

  return (<>
    <View style={styles.header}>
      <PressableOpacity onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </PressableOpacity>
      <Text style={styles.title}>Notificaciones</Text>
    </View>
  
    <View style={styles.notificationsGroup}>
      {notifications?.length ? notifications.map(({ highlightedText, regularText, matchId, id }) => (
        <PressableOpacity onPress={() => id && handlePress(id)} key={id}>
          <View style={styles.notification}>
            <Text style={styles.notificationText}><Text style={styles.notificationTextHighlight}>{capitalizeString(highlightedText)}</Text> {regularText}</Text>

            <PressableOpacity onPress={() => id && handleDeleteNotification(id)}>
              <CloseIcon />
            </PressableOpacity>
          </View>
        </PressableOpacity>        
      )) : <></>}      
    </View>
  </>);
}

export default Notifications;

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
  notificationsGroup: {
    flex: 1
  },
  notification: {
    width: "100%",
    backgroundColor: "#2B2B3D",
    borderRadius: 16,
    marginBottom: 14,
    justifyContent: "space-between",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationText: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 16
  },
  notificationTextHighlight: {
    fontWeight: "bold",
    fontFamily: "Lato-Bold",
  }
});