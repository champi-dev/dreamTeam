import React from "react";
import { useNavigate } from "react-router";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import NotificationIcon from "../../../../../assets/svgs/NotificationIcon";
import PlusIcon from "../../../../../assets/svgs/PlusIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";

function JoinMatch () {
  const navigate = useNavigate();

  return (
    <>
    <View style={styles.topContent}>
      <Text style={styles.title}>Partidos</Text>
      <Pressable onPress={() => navigate('/main/matches/notifications')}>
        <NotificationIcon style={styles.notificationIcon}/>
      </Pressable>      
    </View>

      <ScrollView style={styles.matchesGroup}>{/* [TODO]: Change to flatlist */}
        <View style={styles.matchOverview}>
          <View style={styles.matchOverviewContent}>
          <ScrollView contentContainerStyle={styles.topTeam} horizontal>
            <ShirtIcon style={styles.shirtIcon} fill="#fff" />
            <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fme.jpeg?alt=media&token=ab25c3f8-a036-4703-8539-034f051b09ed" }} />
            <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437" }} />
            <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubircorrea.jpeg?alt=media&token=d5910673-c34f-4d2f-99d3-2332b1a515af" }} />
            <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirfredy.jpeg?alt=media&token=da4975bf-56d0-4c33-8739-1251dce3a744" }} />
          </ScrollView>

          <ScrollView contentContainerStyle={styles.bottomTeam} horizontal>
            <ShirtIcon style={styles.shirtIcon} fill="#000" />
            <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirjuanda.jpeg?alt=media&token=20132049-aa53-4789-8706-e6296969e539" }} />
          <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirmonroy.jpeg?alt=media&token=a9cbc752-ddce-4f83-a56b-113e8456d380" }} />
          <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirnepe.jpeg?alt=media&token=da69d071-50e3-459d-8979-5aa686f4b37a" }} />
          <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubirpipe.jpeg?alt=media&token=de4ec99b-61e5-4f5e-a7c2-f7253ac4c535" }} />
        </ScrollView>

        <Text style={styles.matchText}>Hoy, 8:00 PM</Text>
        <Text style={styles.matchText}>La F8 Cra 55 #50-5</Text>
        </View>            

        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>Elegir lado</Text>
        </View>
      </View>
    </ScrollView>

    <View style={styles.createMatchButton}>
      <LinearGradient style={styles.gradient} colors={['#F4A58A', '#ED6B4E']}>
        <PlusIcon style={styles.plusIcon} />
      </LinearGradient>
    </View>
  </>
  );
}

export default JoinMatch;

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