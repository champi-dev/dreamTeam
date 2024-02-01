import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";

function PlayerStats () {
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

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437" }} />
              <Text style={styles.rowText}>Cristian Mejia</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowText}>10</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fme.jpeg?alt=media&token=ab25c3f8-a036-4703-8539-034f051b09ed" }} />
              <Text style={styles.rowText}>Champi</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowText}>8</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubircorrea.jpeg?alt=media&token=d5910673-c34f-4d2f-99d3-2332b1a515af" }} />
              <Text style={styles.rowText}>Andres Correa</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowText}>7</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirfredy.jpeg?alt=media&token=da4975bf-56d0-4c33-8739-1251dce3a744" }} />
              <Text style={styles.rowText}>Fredy Quintero</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowText}>4</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirjuanda.jpeg?alt=media&token=20132049-aa53-4789-8706-e6296969e539" }} />
              <Text style={styles.rowText}>Juanda</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowText}>3</Text>
            </View>
          </View>
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