import React from "react";
import { View, Image, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import CustomButton from "../../../../../../../components/CustomButton";
import { User } from "../../../../../../../models/User";

interface InvitePlayersProps {
  searchResultPlayers: User[];
  handleInvitePlayer: (player: User) => void;
  isUserInInvitedPlayers: (userId: string) => User | undefined;
}

function InvitePlayers ({ searchResultPlayers, handleInvitePlayer, isUserInInvitedPlayers }: InvitePlayersProps) {

  const renderItem = ({ item }: ListRenderItemInfo<User>) => (
    <View style={styles.rowLeft}>
      <Image style={styles.userImage} source={{ uri: item.avatarImgUrl, cache: "force-cache" }} />
      <Text style={styles.rowText}>{item.name}</Text>
      <CustomButton 
        text={isUserInInvitedPlayers(item.id) ? 'Eliminar' : 'Invitar'} 
        onPress={(e) => {
          e.stopPropagation();
          handleInvitePlayer(item);
        }} 
        type="primary" 
        buttonStyle={[styles.inviteBtn, isUserInInvitedPlayers(item.id) && styles.inviteBtnDelete]} 
        textStyle={styles.inviteBtnText} 
      />
    </View>
  );

  return (
    <FlatList 
      data={searchResultPlayers}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
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