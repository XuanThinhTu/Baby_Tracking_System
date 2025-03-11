import React, { useState } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";

const membershipPlans = [
  { id: "basic", name: "Basic", price: "$4.99", color: "#4A90E2", benefits: [true, true, true, false, false, false] },
  { id: "standard", name: "Standard", price: "$9.99", color: "#8A2BE2", benefits: [true, true, true, true, false, false] },
  { id: "premium", name: "Premium", price: "$14.99", color: "#FF1493", benefits: [true, true, true, true, true, true] },
];

const { width } = Dimensions.get("window");

const MemberShips = () => {
  const [selectedPlan, setSelectedPlan] = useState(membershipPlans[0].id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {membershipPlans.map((plan) => (
        <Card key={plan.id} style={[styles.card, { width: width * 0.9 }]}>
          <View style={[styles.header, { backgroundColor: plan.color }]}>
            <Text variant="titleLarge" style={styles.headerText}>{plan.name.toUpperCase()}</Text>
            <View style={styles.priceContainer}>
              <Text variant="headlineMedium" style={[styles.priceText, { color: plan.color }]}>{plan.price}</Text>
            </View>
          </View>
          <Card.Content>
            {plan.benefits.map((benefit, index) => (
              <Text key={index} style={{ color: benefit ? "green" : "red", marginBottom: 4 }}>
                {benefit ? "✔ Included" : "✖ Not Included"}
              </Text>
            ))}
          </Card.Content>
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: plan.color }]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            Subscribe Now
          </Button>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
