import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import AddBabyForm from './AddBabyForm';

const BabyList = () => {
    const navigate = useNavigation();

    const [babies, setBabies] = useState([
        { id: "1", name: 'Huy', birthDay: "2025-05-05", gender: "male" },
        { id: "2", name: 'Bao', birthDay: "2025-05-05", gender: "male" },
        { id: "3", name: 'Kiet', birthDay: "2025-05-05", gender: "male" },
        { id: "4", name: 'Han', birthDay: "2025-05-05", gender: "female" },
        { id: "5", name: 'Tai', birthDay: "2025-05-05", gender: "male" },
    ]);

    return (
        <Card style={{ margin: 10, borderRadius: 10 }}>
            <Card.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text variant="titleMedium">Các bé</Text>
                    <TouchableOpacity onPress={() => navigate.navigate("CreateForm", { Component: AddBabyForm })}>
                        <Text style={{ color: '#007AFF' }}>+ Thêm bé</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={babies}
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
    );
};

export default BabyList;
