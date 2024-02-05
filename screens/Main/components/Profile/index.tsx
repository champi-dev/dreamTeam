import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../../../../components/CustomInput';
import EditIcon from '../../../../assets/svgs/EditIcon';
import ProfileIcon from '../../../../assets/svgs/ProfileIcon';
import SoccerballIcon from '../../../../assets/svgs/SoccerballIcon';
import { mockUser } from './mockData';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { PressableOpacity } from '../../../../components/PresableOpacity';
import { User } from '../../../../models/User';
import ProfilePictureIcon from '../../../../assets/svgs/ProfilePictureIcon';

function Profile() {
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState<boolean>(true);
  const [profilePicture, setProfilePicture] = useState<string>('');

  const handleOptionPress = async () => {
    const commonOptions: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    };

    let selection: ImagePicker.ImagePickerResult | null = null;
    selection = await ImagePicker.launchImageLibraryAsync(commonOptions);

    if (selection && !selection.canceled) {
      setProfilePicture(selection.assets[0].uri);
    }
  };

  const getUserInfoEndpoint = () => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve(mockUser);
      }, 500);
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await getUserInfoEndpoint();
      setUserInfo(response);
      setProfilePicture(response.avatarImgUrl || '');
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
            {profilePicture.length ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: profilePicture,
                  cache: 'force-cache'
                }}
              />
            ) : (
              <View style={styles.profilePictureIconContainer}>
                <ProfilePictureIcon
                  width={100}
                  height={100}
                  fill='#65656B'
                  style={styles.profilePictureIcon}
                />
              </View>
            )}
            <PressableOpacity onPress={handleOptionPress}>
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
              value={`${userInfo?.goals ?? ''}`}
              FrontIcon={SoccerballIcon}
              styling='secondary'
              disabled
            />
          </View>
        </View>
      )}
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
  profilePictureIconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#222232'
  },
  profilePictureIcon: {
    alignSelf: 'center'
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
