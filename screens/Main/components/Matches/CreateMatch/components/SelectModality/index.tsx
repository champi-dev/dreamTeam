import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { Court } from "../../../../../../../models/Court";
import { PressableOpacity } from "../../../../../../../components/PresableOpacity";

interface SelectCourtProps {
  selectedCourt: Court | null;
  setSelectedModality: (modality: string) => void;
  handleClose: () => void;
}

function SelectModality ({ selectedCourt, setSelectedModality, handleClose }: SelectCourtProps) {
  const renderItem = ({item}: ListRenderItemInfo<string>) => {
    return (
      <PressableOpacity
        onPress={() => {
          setSelectedModality(item);
          handleClose();
        }}>
        <View style={styles.rowLeft}>
          <Text style={styles.rowText}>{item}</Text>
        </View>
      </PressableOpacity>
    );
  }
  return (
    <FlatList
      data={selectedCourt?.modalities}
      keyExtractor={item => item}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default SelectModality;

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