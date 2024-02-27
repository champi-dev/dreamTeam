import React, { useContext, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import CustomUserImage from "../../../../components/CustomUserImage";
import { capitalizeString } from "../../../../utils";
import { listenForUsersWithGoals } from "../../../../firebase";
import { MainScreenContextConfig } from "../../context";

function PlayerStats () {
  const { usersWithGoals: players, setUsersWithGoals: setPlayers } = useContext(MainScreenContextConfig);

  useEffect(() => {
    const unsubscribe = setPlayers && listenForUsersWithGoals({ setUsers: setPlayers });
    return unsubscribe;
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Goleadores</Text>

        <View style={styles.playersGroup}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowText}>Jugador</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowText}>Goles</Text>
            </View>
          </View>

          {players?.length ? players.map((singleUser, index) => (
            <View style={styles.row} key={index}>
              <View style={styles.rowLeft}>
                <CustomUserImage user={singleUser} />
                <Text style={styles.rowText}>{capitalizeString(singleUser.name || singleUser.email)}</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.rowText}>{singleUser.goals}</Text>
              </View>
            </View>
          )) : <></>}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PlayerStats;

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
    fontFamily: "Lato-Regular",
    marginBottom: 32
  },
  playersGroup: {
    width: '100%',
    backgroundColor: '#222232',
    borderRadius: 19,
    paddingTop: 16,
    paddingLeft: 18,
    paddingBottom: 14
  },
  row: {
    flexDirection: 'row',
  },
  rowLeft: {
    flex: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16
  },
  rowRight: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 18,
    borderBottomColor: '#181829',
    borderBottomWidth: 1,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  rowText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  }
});