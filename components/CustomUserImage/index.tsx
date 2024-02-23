import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { User } from "../../models/User";

function CustomUserImage({user}: {user: User}) {
  return user.avatarImgUrl ? (
    <Image style={styles.userImage} source={{ uri: user.avatarImgUrl, cache: "force-cache" }} />
  ) : (
    <View style={[styles.userNoImage, {backgroundColor: user.randomColor}]}>
      <Text style={styles.userText}>{user.name[0]?.toUpperCase() || user.email[0]?.toUpperCase()}</Text>
    </View>
  );
}

export default CustomUserImage;

const styles = StyleSheet.create({
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16,
  },
  userNoImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  userText: {
    color: '#fff', 
    fontSize: 12, 
    fontFamily: 'Lato-Regular', 
    textAlign: 'center'
  }
});