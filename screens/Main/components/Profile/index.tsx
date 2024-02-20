import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GlobalContextConfig } from '../../../../globalContext';
import { logOut, getUserById, updateUserPropertyById } from '../../../../firebase';
import CustomInput from '../../../../components/CustomInput';
import EditIcon from '../../../../assets/svgs/EditIcon';
import ProfileIcon from '../../../../assets/svgs/ProfileIcon';
import SoccerballIcon from '../../../../assets/svgs/SoccerballIcon';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { PressableOpacity } from '../../../../components/PresableOpacity';
import { User } from '../../../../models/User';
import ProfilePictureIcon from '../../../../assets/svgs/ProfilePictureIcon';
import CustomButton from '../../../../components/CustomButton';
import { MainScreenContextConfig } from '../../context';

function Profile() {
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState<boolean>(true);
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameTimeout, setNameTimeout] = useState<NodeJS.Timeout | null>(null);
  const {setAuthToken, userId} = useContext(GlobalContextConfig);
  const {user: userInfo, setUser: setUserInfo} = useContext(MainScreenContextConfig);

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

  const handleNameInputChange = (text: string) => {
    if (nameTimeout) {
      clearTimeout(nameTimeout);
    }

    const timeout = setTimeout(() => {
      // @ts-ignore
      setUserInfo((prev) => {
        userId && updateUserPropertyById(userId, {name: text}).then(({ error, data }) => {
          if (error) {
            console.error(error);
            return;
          }

          console.log(data);
        })

        return {
          ...prev,
          name: text
        };
      });
    }, 500);
  
    setNameTimeout(timeout);
  }

  const handleLogout = async () => {
    setIsLoading(true);
    const {error, data} = await logOut();

    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setAuthToken && setAuthToken('');
  };

  useEffect(() => {
    if (userId) {
      setIsLoadingUserInfo(true);
      getUserById(userId).then(({error, data}) => {
        if (error) {
          console.error(error);
          setIsLoadingUserInfo(false);
          return;
        }

        data && setUserInfo && setUserInfo(data as User);
        setIsLoadingUserInfo(false);
      })
    }
  }, [userId, getUserById]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingUserInfo && userInfo === null ? (
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
              onChangeText={handleNameInputChange}
              style={styles.input}
            />

            <CustomInput
              placeholder='Goles'
              placeholderTextColor='#65656B'
              value={`${userInfo?.goals ?? ''}`}
              FrontIcon={SoccerballIcon}
              styling='secondary'
              disabled
              style={styles.input}
            />
          </View>

          <CustomButton style={styles.logoutBtn} type='primary' text='Cerrar sesión' onPress={handleLogout} disabled={isLoading} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  input: {
    marginBottom: 16
  },
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
  },
  logoutBtn: {
    width: '100%',
    marginTop: 'auto'
  }
});
