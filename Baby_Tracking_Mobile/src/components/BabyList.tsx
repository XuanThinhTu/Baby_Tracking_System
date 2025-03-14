import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Text } from 'react-native-paper';
import useApi from '../services/hooks/useApi';
import { API_GET_CHILDREN_LIST } from '@env';
import { AddBabyForm } from './AddBabyForm';

const BabyList = () => {
    const { data, fetchData, loading, error } = useApi(API_GET_CHILDREN_LIST, "GET", null);
    const navigate = useNavigation();

    useFocusEffect(
        useCallback(() => {
            fetchData(API_GET_CHILDREN_LIST, "GET", null, { "Content-Type": "application/json" });
        }, [])
    )

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
        <>
            <Card style={{ margin: 10, borderRadius: 10 }}>
                <Card.Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text variant="titleMedium">Các bé</Text>
                        <TouchableOpacity onPress={() => navigate.navigate("CreateForm", { Component: AddBabyForm })}>
                            <Text style={{ color: '#007AFF' }}>+ Thêm bé</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={data?.data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigate.navigate("BabyDetail", { baby: item })}>
                                <View style={{ alignItems: 'center', marginRight: 16 }}>
                                    <Image
                                        source={{ uri: "https://i.imgur.com/E7r3lYK.png" }}
                                        style={{ width: 60, height: 60, borderRadius: 30 }}
                                    />
                                    <Text variant="bodySmall">{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </Card.Content>
            </Card>
        </>
    );
};

export default BabyList;

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
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

})