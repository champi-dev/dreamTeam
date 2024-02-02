import React from "react";
import { View, Image, StyleSheet, SafeAreaView, Text } from "react-native";
import CustomInput from "../../../../components/CustomInput";
import EditIcon from "../../../../assets/svgs/EditIcon";
import ProfileIcon from "../../../../assets/svgs/ProfileIcon";
import SoccerballIcon from "../../../../assets/svgs/SoccerballIcon";

function Profile () {
  return <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437", cache: "force-cache" }} />
        <EditIcon style={styles.editIcon} />
      </View>   

      <Text style={styles.profileText}>Cristian Mejia</Text>  

      <View style={styles.infoGroup}>
        <CustomInput 
          placeholder="Nombre" 
          placeholderTextColor="#65656B" 
          value="Cristian Mejia" 
          FrontIcon={ProfileIcon}
          styling="secondary"
        />

        <CustomInput 
          placeholder="Goles" 
          placeholderTextColor="#65656B" 
          value="10" 
          FrontIcon={SoccerballIcon}
          styling="secondary"
          disabled
        />
      </View> 
    </View>
  </SafeAreaView>
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 28,
    paddingBottom: 28,
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    width: 200,
    height: 200,
    marginBottom: 24
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  editIcon: {
    width: 32,
    height: 32,
    position: "absolute",
    bottom: 0,
    right: 16
  },
  profileText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#FFF",
    fontFamily: "Lato-Bold",
  },
  infoGroup: {
    width: '100%',
  }
});