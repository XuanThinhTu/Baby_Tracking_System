import React from 'react';
import { Text } from 'react-native-paper';
import BabyList from '../../components/BabyList';
import { View } from 'react-native-ui-lib';

const Home = () => {

  return (
    <View>
      <BabyList />
      <Text>Home</Text>
    </View>
  );
};

export default Home;
