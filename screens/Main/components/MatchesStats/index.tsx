import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from "react-native";
import ShirtIcon from "../../../../assets/svgs/ShirtIcon";

function MatchesStats () {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Partidos jugados</Text>
        <View style={styles.matchOverview}>
            <View style={styles.matchOverviewContent}>
            <ScrollView contentContainerStyle={styles.topTeam} horizontal>
              <ShirtIcon style={styles.shirtIcon} fill="#fff" />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fme.jpeg?alt=media&token=ab25c3f8-a036-4703-8539-034f051b09ed", cache: "force-cache" }} />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437", cache: "force-cache" }} />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubircorrea.jpeg?alt=media&token=d5910673-c34f-4d2f-99d3-2332b1a515af", cache: "force-cache" }} />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirfredy.jpeg?alt=media&token=da4975bf-56d0-4c33-8739-1251dce3a744", cache: "force-cache" }} />
            </ScrollView>

            <ScrollView contentContainerStyle={styles.bottomTeam} horizontal>
              <ShirtIcon style={styles.shirtIcon} fill="#000" />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirjuanda.jpeg?alt=media&token=20132049-aa53-4789-8706-e6296969e539", cache: "force-cache" }} />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirmonroy.jpeg?alt=media&token=a9cbc752-ddce-4f83-a56b-113e8456d380", cache: "force-cache" }} />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirnepe.jpeg?alt=media&token=da69d071-50e3-459d-8979-5aa686f4b37a", cache: "force-cache" }} />
              <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirpipe.jpeg?alt=media&token=de4ec99b-61e5-4f5e-a7c2-f7253ac4c535", cache: "force-cache" }} />
            </ScrollView>
            </View>            

            <View style={styles.actionContainer}>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionText}>3</Text>
              </View>

              <View style={styles.actionTextContainer}>
                <Text style={styles.actionText}>2</Text>
              </View>
            </View>
          </View>
      </View>
    </SafeAreaView>
  );
}

export default MatchesStats;

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
  matchOverview: {
    maxHeight: 200,
    width: "100%",
    backgroundColor: "#2B2B3D",
    borderRadius: 16,    
    marginBottom: 14,
    flexDirection: "row",
  },
  matchOverviewContent: {
    width: "80%",
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
  matchText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Lato-Regular",
  },
  actionContainer: {
    height: '100%',
    width: '20%',
    backgroundColor: '#222232',
    padding: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  actionTextContainer: {
    width: "100%",
    height: 80 - (16 * 2),
    justifyContent: "center",
  },
  actionText: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Lato-Bold",
    textAlign: "center"
  }
});