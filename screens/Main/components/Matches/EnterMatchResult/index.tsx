import React from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import { useNavigate } from 'react-router-native';
import ArrowLeftIcon from "../../../../../assets/svgs/ArrowLeftIcon";
import ShirtIcon from "../../../../../assets/svgs/ShirtIcon";
import SoccerballIcon from "../../../../../assets/svgs/SoccerballIcon";
import CustomInput from "../../../../../components/CustomInput";

function EnterMatchResult () {
  const navigate = useNavigate();

  return (<>
    <View style={styles.header}>
      <Pressable onPress={() => navigate('/main/matches')}>
        <ArrowLeftIcon style={styles.headerIcon} />
      </Pressable>
      <Text style={styles.title}>Resultado</Text>
    </View>

    <View style={styles.content}>
      <ScrollView>
        <View style={styles.item}>
          <ShirtIcon style={styles.shirtIcon} fill="#fff" />
          <CustomInput 
            placeholder="Goles" 
            placeholderTextColor="#65656B" 
            value="3"
            FrontIcon={SoccerballIcon}
            styling="secondary"
            style={styles.itemInput}
          />
        </View>
      </ScrollView>      
    </View>
  </>);
}

export default EnterMatchResult;

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
    flex: 1
  },
  shirtIcon: {
    width: 36,
    height: 36,
    marginRight: 16
  },
  item: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  itemInput: {
    flexGrow: 1,
  }
});