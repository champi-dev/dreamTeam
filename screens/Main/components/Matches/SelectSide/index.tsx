import React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigate } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import CustomButton from "../../../../../components/CustomButton";

function SelectSide () {
  const navigate = useNavigate();

  return (<>
    <View style={styles.header}>
      <Pressable onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </Pressable>
      <Text style={styles.title}>Elegir lado</Text>
    </View>

    <View style={styles.content}>
      <View style={styles.contentLeft}>
        <View style={styles.iconWrapper}>
          <ShirtIcon style={styles.shirtIcon} fill="#fff" />
        </View>

        <View style={styles.user}>
          <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fcrismenu.jpeg?alt=media&token=3abdc79f-35d0-473f-b06d-3fc6d62fd437" }} />
          <Text style={styles.userText}>Cristian Mejia</Text>
        </View>

        <View style={styles.user}>
          <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fme.jpeg?alt=media&token=ab25c3f8-a036-4703-8539-034f051b09ed" }} />
          <Text style={styles.userText}>Champi</Text>
        </View>
      </View>

      <View style={styles.contentRight}>
        <View style={[styles.iconWrapper, styles.iconWrapperInactive]}>
          <ShirtIcon style={styles.shirtIcon} fill="#000" />
        </View>

        <View style={styles.user}>
          <Image style={styles.userImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/dreamteam-c33ca.appspot.com/o/images%2Fsubircorrea.jpeg?alt=media&token=d5910673-c34f-4d2f-99d3-2332b1a515af" }} />
          <Text style={styles.userText}>Andres Correa</Text>
        </View>
      </View>
    </View>

    <CustomButton text="Guardar" onPress={() => navigate('/main/matches')} type="primary" />
  </>);
}

export default SelectSide;

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
  content: {
    flex: 1,
    flexDirection: "row",
  },
  contentLeft: {
    width: "50%",
    height: "100%",
    alignItems: "center",
  },
  contentRight: {
    width: "50%",
    height: "100%",
    alignItems: "center",
  },
  shirtIcon: {
    width: 44,
    height: 44,
  },
  iconWrapper: {
    backgroundColor: "#2B2B3D",
    borderRadius: 92,
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32
  },
  iconWrapperInactive: {
    backgroundColor: "#181829",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16
  },
  userText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Lato-Regular"
  }
});