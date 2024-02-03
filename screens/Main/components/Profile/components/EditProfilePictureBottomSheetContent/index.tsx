import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomButton from '../../../../../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

interface EditProfilePictureBottomSheetContentProps {
  onEditProfilePicture?: (imageUri: string) => void;
  onRemoveProfilePicture?: (imageUri: '') => void;
  onClose?: () => void;
}

export const EditProfilePictureBottomSheetContent = (
  props: EditProfilePictureBottomSheetContentProps
) => {
  const { onEditProfilePicture, onRemoveProfilePicture, onClose } = props;
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const handleOptionPress = async (type: 'gallery' | 'camera' | 'delete') => {
    const commonOptions: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    };

    let selection: ImagePicker.ImagePickerResult | null = null;

    switch (type) {
      case 'gallery':
        selection = await ImagePicker.launchImageLibraryAsync(commonOptions);
        break;
      case 'camera':
        if (!status?.granted) {
          requestPermission();
        }
        selection = await ImagePicker.launchCameraAsync(commonOptions);
        break;
      case 'delete':
        onRemoveProfilePicture?.('');
        onClose?.();
        break;
    }

    if (selection && !selection.canceled) {
      onEditProfilePicture?.(selection.assets[0].uri);
    }

    onClose?.();
  };

  return (
    <View style={styles.bottomSheetContainer}>
      <CustomButton
        type='primary'
        onPress={() => {
          handleOptionPress('gallery').catch((error) => {
            console.error('Unable to open gallery: ', error);
          });
        }}
        text='Escoger foto'
      />
      <CustomButton
        type='primary'
        onPress={() => {
          handleOptionPress('camera').catch((error) => {
            console.error('Unable to open camera: ', error);
          });
        }}
        text='Tomar foto'
      />
      <CustomButton
        type='secondary'
        onPress={() => {
          handleOptionPress('delete').catch((error) => {
            console.error('Unable to delete photo: ', error);
          });
        }}
        text='Borrar foto'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: 24,
    gap: 16
  }
});
