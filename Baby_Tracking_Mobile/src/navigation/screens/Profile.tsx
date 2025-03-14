import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, List, Paragraph, Text, Title } from 'react-native-paper';
import { useAuth } from '../../services/hooks/useAuth';
import { useRedirect } from '../../services/hooks/useRedirect';
import useApi from '../../services/hooks/useApi';
import { API_GET_USER_P } from '@env';

export function Profile() {
  const { data, loading, error } = useApi(API_GET_USER_P, "GET", null);
  const navigate = useNavigation();
  const { redirectToProfileDetail, redirectToMemberShips } = useRedirect();
  const { logout, isAuthenticated } = useAuth();
  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, [])
  );
  const checkLogin = async () => {
    var isLoggin = await isAuthenticated();
    if (!isLoggin) {
      navigate.navigate("Login");
      return;
    }
  }
  const user = data?.data as User | undefined;

  if (loading || !data) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#8b5fbf" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error loading membership</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Card style={{ backgroundColor: '#8b5fbf', padding: 16, borderRadius: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={60} source={{ uri: '' }} />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Title style={{ color: 'white' }}>{user?.firstName + " " + user?.lastName}</Title>
            <Paragraph style={{ color: 'white' }}>{user?.email}</Paragraph>
          </View>
        </View>
      </Card>


      {/* Settings List */}
      <List.Section style={styles.sectionCard}>
        <List.Item
          onPress={() => user && redirectToProfileDetail(user)}
          title="My Account"
          description="Make changes to your account"
          left={() => <List.Icon icon="account" />}
          right={() => <List.Icon icon="arrow-right" />}
        />

        {/* MemberShips */}
        <List.Item
          onPress={() => redirectToMemberShips()}
          title="MemberShips"
          description="Subscribe to our member ships"
          left={() => <List.Icon icon="wallet-membership" />}
          right={() => <List.Icon icon="arrow-right" />}
        />

        {/* Logout */}
        <List.Item
          onPress={logout}
          title="Log out"
          description="Further secure your account for safety"
          right={() => <List.Icon icon={"arrow-right"} />}
          left={() => <List.Icon icon="logout" />}
        />
      </List.Section>

      {/* More Section */}
      <List.Section>
        <List.Subheader>More</List.Subheader>
        <List.Item title="Help & Support" left={() => <List.Icon icon="help-circle" />} />
        <List.Item title="About App" left={() => <List.Icon icon="information" />} />
      </List.Section>
    </View>
  );

}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },

  sectionCard: {
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
  }
});
