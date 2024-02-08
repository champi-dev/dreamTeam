import React from "react";
import { Pressable, ScrollView, View, Text, StyleSheet } from "react-native";
import { Court } from "../../../../../../../models/Court";

interface SelectCourtProps {
  selectedCourt: Court | null;
  setSelectedModality: (modality: string) => void;
  handleClose: () => void;
}

function SelectModality ({ selectedCourt, setSelectedModality, handleClose }: SelectCourtProps) {
  return (
    <ScrollView>
      {selectedCourt?.modalities.map((singleModality) => (
        <Pressable 
          key={singleModality}
          onPress={() => {
            setSelectedModality(singleModality);
            handleClose();
          }}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowText}>{singleModality}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
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