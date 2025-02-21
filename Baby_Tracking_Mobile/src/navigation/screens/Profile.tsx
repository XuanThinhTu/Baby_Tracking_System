import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile() {
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
