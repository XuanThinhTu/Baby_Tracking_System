import React from "react";
import { View } from "react-native-ui-lib";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const EditForm = () => {
  const route = useRoute();
  const Component = (route.params as { Component: React.ComponentType } | undefined)?.Component;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tạo Mới</Text>
      </View>

      <View style={styles.formContainer}>
        {Component ? <Component /> : <Text>Không có form nào được chọn</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    flex: 1,
  },
  noFormText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default EditForm;
