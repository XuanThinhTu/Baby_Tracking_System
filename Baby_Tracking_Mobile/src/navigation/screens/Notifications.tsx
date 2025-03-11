import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

const notifications = [
    {
        id: '1',
        title: 'New Update Available!',
        image: 'https://via.placeholder.com/50',
        date: 'March 11, 2025'
    },
    {
        id: '2',
        title: 'Your order has been shipped',
        image: 'https://via.placeholder.com/50',
        date: 'March 10, 2025'
    },
    {
        id: '3',
        title: 'Reminder: Meeting at 3 PM',
        image: 'https://via.placeholder.com/50',
        date: 'March 9, 2025'
    }
];

export function Notifications() {
    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 10 }}>
                        <Card.Title
                            title={item.title}
                            subtitle={item.date}
                            left={(props) => <Avatar.Image {...props} source={{ uri: item.image }} size={40} />}
                        />
                    </Card>
                )}
            />
        </View>
    );
}
