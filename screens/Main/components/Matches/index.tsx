import React from "react";
import { Routes, Route } from "react-router";
import { View, StyleSheet, SafeAreaView } from "react-native";
import JoinMatch from "./JoinMatch";
import Notifications from "./Notifications";

function Matches () {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Routes>
          <Route path="/" element={<JoinMatch />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </View>      
    </SafeAreaView>
  );
}

export default Matches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Regular"
  },
  topContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32
  },
  notificationIcon: {
    width: 24,
    height: 24
  },
  matchesGroup: {
    flex: 1,
  },
  matchOverview: {
    width: "100%",
    backgroundColor: "#2B2B3D",
    borderRadius: 16,    
    marginBottom: 14
  },
  matchOverviewContent: {
    width: "100%",
    padding: 16,
  },
  topTeam: {
   flexDirection: "row",
   marginBottom: 16,
   alignItems: "center",
  },
  bottomTeam: {
    flexDirection: "row", 
    alignItems: "center",
    marginBottom: 16,
   },
  shirtIcon: {
    width: 36,
    height: 36,
    marginRight: 16
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16
  },
  createMatchButton: {
    width: 48,
    height: 48,
    borderRadius: 48,
    marginBottom: 24,
    position: "absolute",
    bottom: 0,
    right: 28
  },
  gradient: {
    flex: 1,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  createMatchText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Regular"
  },
  plusIcon: {
    width: 24,
    height: 24
  },
  matchText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Lato-Regular",
  },
  actionContainer: {
    height: 32,
    width: '100%',
    backgroundColor: '#222232',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Bold",
  }
});