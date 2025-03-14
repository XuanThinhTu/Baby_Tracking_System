import React from "react";
import { View, ScrollView, Dimensions, StyleSheet, Linking } from "react-native";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import useApi from "../../services/hooks/useApi";
import { API_GET_MEMBERSHIP_LIST, API_POST_MEMBERSHIP_PAYMENT_MEMBERSHIPID } from "@env";
import { Toast } from "react-native-toast-notifications";

const { width } = Dimensions.get("window");

const MemberShips = () => {
  const { data, loading, error } = useApi(API_GET_MEMBERSHIP_LIST, "GET", null);
  const { fetchData } = useApi();

  const getPlansColor = (name: string) => {
    switch (name) {
      case "Standard":
        return "#4A90E2";
      case "Premium":
        return "#8A2BE2";
      case "Lifetime":
        return "#FF1493";
      default:
        return "#8b5fbf"
    }
  }

  const subscribeMember = async (planId: any) => {
    const response = await fetchData(API_POST_MEMBERSHIP_PAYMENT_MEMBERSHIPID.replace("{membershipId}", planId), "POST", null, { "Content-Type": "application/json" });
    const data = await response.json();
    console.log(data);
    if (response.success) {
      Linking.openURL(response.data.paymentUrl);
    } else {
      console.log(response.errorMessage);
      Toast.show(response.message, { type: "danger" });
    }
  }

  if (loading) {
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
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.data?.length > 0 ? (
        data.data.map((plan: any) => (
          <Card key={plan.id} style={[styles.card, { width: width * 0.9 }]}>
            <View style={[styles.header, { backgroundColor: getPlansColor(plan.name) }]}>
              <Text variant="titleLarge" style={styles.headerText}>{plan.name.toUpperCase()}</Text>
              <View style={styles.priceContainer}>
                <Text variant="headlineMedium" style={[styles.priceText, { color: getPlansColor(plan.name) }]}>
                  {plan.price}
                </Text>
              </View>
            </View>

            <Card.Content>
              {Array.isArray(plan.permissions) && plan.permissions.length > 0 ? (
                plan.permissions.map((benefit: any, index: any) => (
                  <Text key={index} style={{ color: benefit ? "green" : "red", marginBottom: 4 }}>
                    {benefit ? "✔ Included" : "✖ Not Included"}
                  </Text>
                ))
              ) : (
                <Text style={{ color: "gray", fontStyle: "italic" }}>No benefits listed</Text>
              )}
            </Card.Content>

            <Button
              mode="contained"
              style={[styles.button, { backgroundColor: getPlansColor(plan.name) }]}
              onPress={() => subscribeMember(plan.id)}
            >
              Subscribe Now
            </Button>
          </Card>
        ))
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No membership plans available</Text>
      )}
    </ScrollView>
  );
};

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
    padding: 16,
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: "#fff",
    fontWeight: 'bold',
  },
  priceContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  priceText: {
    fontWeight: 'bold',
  },
  button: {
    margin: 16,
  },
});

export default MemberShips;
