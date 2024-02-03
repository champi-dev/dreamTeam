import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable
} from 'react-native';
import CustomInput from '../../../../components/CustomInput';
import EditIcon from '../../../../assets/svgs/EditIcon';
import ProfileIcon from '../../../../assets/svgs/ProfileIcon';
import SoccerballIcon from '../../../../assets/svgs/SoccerballIcon';
import { User, mockUser } from './mockData';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { PressableOpacity } from '../../../../components/PresableOpacity';
import BottomSheet from '@gorhom/bottom-sheet';
import { EditProfilePictureBottomSheetContent } from './components/EditProfilePictureBottomSheetContent';

function Profile() {
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState<boolean>(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>('');

  const editPictureBottomSheetRef = useRef<BottomSheet>(null);
  const openBottomSheet = () => {
    editPictureBottomSheetRef.current?.expand();
    setIsBottomSheetOpen(true);
  };
  const closeBottomSheet = () => {
    editPictureBottomSheetRef.current?.close();
    setIsBottomSheetOpen(false);
  };
  const snapPoints = useMemo(() => [300], []);

  const getUserInfoEndpoint = () => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve(mockUser);
      }, 2000);
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await getUserInfoEndpoint();
      setUserInfo(response);
      setProfilePicture(response.profilePicture || '');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingUserInfo(false);
    }
  };

  useEffect(() => {
    void getUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingUserInfo ? (
        <LoadingSkeleton containerStyle={styles.content} />
      ) : (
        <View style={styles.content}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: profilePicture,
                cache: 'force-cache'
              }}
            />
            <PressableOpacity onPress={openBottomSheet}>
              <EditIcon style={styles.editIcon} />
            </PressableOpacity>
          </View>

          <Text style={styles.profileText}>{userInfo?.name}</Text>

          <View style={styles.infoGroup}>
            <CustomInput
              placeholder='Nombre'
              placeholderTextColor='#65656B'
              value={userInfo?.name ?? ''}
              FrontIcon={ProfileIcon}
              styling='secondary'
            />

            <CustomInput
              placeholder='Goles'
              placeholderTextColor='#65656B'
              value={userInfo?.goals ?? ''}
              FrontIcon={SoccerballIcon}
              styling='secondary'
              disabled
            />
          </View>
        </View>
      )}

      {isBottomSheetOpen && (
        <Pressable onPress={closeBottomSheet} style={styles.backdrop} />
      )}

      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={editPictureBottomSheetRef}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <EditProfilePictureBottomSheetContent
          onEditProfilePicture={setProfilePicture}
          onRemoveProfilePicture={setProfilePicture}
          onClose={closeBottomSheet}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
    opacity: 0.3
  },
  bottomSheetBackground: {
    backgroundColor: '#181829'
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 28,
    paddingBottom: 28,
    alignItems: 'center'
  },
  profileImageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    marginBottom: 24
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 200
  },
  editIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
    bottom: 0,
    right: 16
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#FFF',
    fontFamily: 'Lato-Bold'
  },
  infoGroup: {
    width: '100%'
  }
});
