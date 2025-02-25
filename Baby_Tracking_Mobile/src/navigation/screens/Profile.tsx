import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { testSecureStore } from '../../utility/Helper';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile() {

  useEffect(()=>{
    testSecureStore();
  });

  return (
    <View style={styles.container}>
      <Text>User's Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
