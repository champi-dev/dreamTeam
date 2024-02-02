import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { useNavigate } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import CloseIcon from "../../../../../assets/svgs/CloseIcon";

function Notifications () {
  const navigate = useNavigate();

  return (<>
    <View style={styles.header}>
      <Pressable onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </Pressable>
      <Text style={styles.title}>Notificaciones</Text>
    </View>
    <View style={styles.notificationsGroup}>
      <View style={styles.notification}>
        <Text style={styles.notificationText}><Text style={styles.notificationTextHighlight}>Carlos Cardona</Text> te ha invitado a un partido</Text>
        <CloseIcon />
      </View>
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