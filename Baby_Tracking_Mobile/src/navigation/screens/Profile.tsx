import { Text } from '@react-navigation/elements';
import { StaticScreenProps, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { getToken } from '../../utility/Helper';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile() {
  const navigate = useNavigation();
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [])
  );

  const checkToken = async () => {
    var token = await getToken();
    if (token == null) {
      navigate.navigate("Login");
    }
  }

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
