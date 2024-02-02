import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import CustomInput from '../../../../components/CustomInput';
import EditIcon from '../../../../assets/svgs/EditIcon';
import ProfileIcon from '../../../../assets/svgs/ProfileIcon';
import SoccerballIcon from '../../../../assets/svgs/SoccerballIcon';
import { User, mockUser } from './mockData';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { PressableOpacity } from '../../../../components/PresableOpacity';

function Profile() {
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState<boolean>(true);

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
                uri: userInfo?.profilePicture,
                cache: 'force-cache'
              }}
            />
            <PressableOpacity>
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
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
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
