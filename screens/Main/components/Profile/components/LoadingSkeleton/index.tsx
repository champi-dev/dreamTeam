import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Skeleton } from 'react-native-skeletons';

interface LoadingSkeletonProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const LoadingSkeleton = ({ containerStyle }: LoadingSkeletonProps) => {
  return (
    <View style={containerStyle}>
      <Skeleton style={styles.circle} circle width={200} />
      <Skeleton style={styles.name} height={28} />
      <Skeleton style={styles.input} height={64} />
      <Skeleton style={styles.input} height={64} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#222232',
    marginBottom: 24
  },
  name: {
    backgroundColor: '#222232',
    marginBottom: 32
  },
  input: {
    backgroundColor: '#222232',
    marginBottom: 16,
    borderRadius: 16
  }
});
