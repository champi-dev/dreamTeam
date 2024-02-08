import React from "react";
import { Pressable, ScrollView, View, Text, StyleSheet } from "react-native";
import { Court } from "../../../../../../../models/Court";

interface SelectCourtProps {
  availableCourts: Court[];
  setSelectedCourt: (court: Court) => void;
  setSelectedModality: (modality: string) => void;
  handleClose: () => void;
}

function SelectCourt ({ availableCourts, setSelectedCourt, setSelectedModality, handleClose }: SelectCourtProps) {
  return (
    <ScrollView>
      {availableCourts.length ? availableCourts.map((singleCourt) => (
        <Pressable 
          key={singleCourt.id}
          onPress={() => {
            setSelectedCourt(singleCourt);
            setSelectedModality(singleCourt.modalities[0]);
            handleClose();
          }}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowText}>{singleCourt.name}</Text>
          </View>
        </Pressable>
      )) : <></>}
    </ScrollView>
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