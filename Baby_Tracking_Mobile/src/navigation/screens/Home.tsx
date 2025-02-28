import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { getToken } from '../../utility/Helper';


export function Home() {

  const navigation = useNavigation();;

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("Login")} label="Login" />
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
