import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import CustomButton from "../../../../../../../components/CustomButton";
import CustomUserImage from "../../../../../../../components/CustomUserImage";
import { User } from "../../../../../../../models/User";
import { capitalizeString } from "../../../../../../../utils";

interface InvitePlayersProps {
  searchResultPlayers: User[];
  handleInvitePlayer: (player: User) => void;
  isUserInInvitedPlayers: (userId: string) => User | undefined;
}

function InvitePlayers ({ searchResultPlayers, handleInvitePlayer, isUserInInvitedPlayers }: InvitePlayersProps) {
  const renderItem = ({ item }: ListRenderItemInfo<User>) => (
    <View style={styles.rowLeft}>
      <CustomUserImage user={item} />
      <Text style={styles.rowText}>{capitalizeString(item.name || item.email)}</Text>
      <CustomButton 
        text={isUserInInvitedPlayers(item.id as string) ? 'Eliminar' : 'Invitar'} 
        onPress={(e) => {
          e.stopPropagation();
          handleInvitePlayer(item);
        }} 
        type="primary" 
        buttonStyle={[styles.inviteBtn, isUserInInvitedPlayers(item.id as string) && styles.inviteBtnDelete]} 
        textStyle={styles.inviteBtnText} 
      />
    </View>
  );

  return searchResultPlayers.length ? (
    <FlatList 
      data={searchResultPlayers}
      keyExtractor={item => item.id as string}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <Text style={styles.rowText}>No se encontraron jugadores</Text>
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