import React from "react";
import { Routes, Route } from "react-router";
import { View, StyleSheet, SafeAreaView } from "react-native";
import JoinMatch from "./JoinMatch";
import Notifications from "./Notifications";
import CreateMatch from "./CreateMatch";
import SelectSide from "./SelectSide";
import EnterMatchResult from "./EnterMatchResult";
import PastMatchResult from "./PastMatchResult";

function Matches () {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Routes>
          <Route path="/" element={<JoinMatch />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/createMatch" element={<CreateMatch />} />
          <Route path="/selectSide" element={<SelectSide />} />
          <Route path="/enterMatchResult" element={<EnterMatchResult />} />
          <Route path="/pastMatchResult" element={<PastMatchResult />} />
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
  }
});