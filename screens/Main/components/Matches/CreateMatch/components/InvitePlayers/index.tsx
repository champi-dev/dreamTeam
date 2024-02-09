import React from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import CustomButton from "../../../../../../../components/CustomButton";
import { User } from "../../../../../../../models/User";

interface InvitePlayersProps {
  searchResultPlayers: User[];
  handleInvitePlayer: (player: User) => void;
  isUserInInvitedPlayers: (userId: string) => User | undefined;
}

function InvitePlayers ({ searchResultPlayers, handleInvitePlayer, isUserInInvitedPlayers }: InvitePlayersProps) {
  return (
    <ScrollView>
      {searchResultPlayers.length ? searchResultPlayers.map((singlePlayer) => (
        <View style={styles.rowLeft} key={singlePlayer.id}>
          <Image style={styles.userImage} source={{ uri: singlePlayer.avatarImgUrl, cache: "force-cache" }} />
          <Text style={styles.rowText}>{singlePlayer.name}</Text>
          <CustomButton text={isUserInInvitedPlayers(singlePlayer.id) ? 'Eliminar' : 'Invitar'} onPress={(e) => {
            e.stopPropagation();
            handleInvitePlayer(singlePlayer)
          }} type="primary" buttonStyle={[styles.inviteBtn, isUserInInvitedPlayers(singlePlayer.id) && styles.inviteBtnDelete]} textStyle={styles.inviteBtnText} />
        </View>
      )) : <></>}
      </ScrollView>
  ); 
}

export default InvitePlayers;

const styles = StyleSheet.create({
  rowLeft: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 16,
  },
  rowText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginRight: 'auto',
  },
  inviteBtn: {
    height: 'auto',
    padding: 8,
    borderRadius: 8,
  },
  inviteBtnText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Lato-Regular',
  },
  inviteBtnDelete: {
    backgroundColor: '#FF4D4D',
  },
});