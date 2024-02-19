import React from "react";
import { Pressable, View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { Court } from "../../../../../../../models/Court";

interface SelectCourtProps {
  availableCourts: Court[];
  setSelectedCourt: (court: Court) => void;
  setSelectedModality: (modality: string) => void;
  handleClose: () => void;
}

function SelectCourt ({ availableCourts, setSelectedCourt, setSelectedModality, handleClose }: SelectCourtProps) {
  const renderItem = ({item}: ListRenderItemInfo<Court>) => {
    return (
      <Pressable 
        onPress={() => {
          setSelectedCourt(item);
          setSelectedModality(item.modalities[0]);
          handleClose();
        }}>
        <View style={styles.rowLeft}>
          <Text style={styles.rowText}>{item.name}</Text>
        </View>
      </Pressable>
    )
  }
  return (
    <FlatList 
      data={availableCourts}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
}

export default SelectCourt;

const styles = StyleSheet.create({
  rowLeft: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginRight: 'auto',
  },
});