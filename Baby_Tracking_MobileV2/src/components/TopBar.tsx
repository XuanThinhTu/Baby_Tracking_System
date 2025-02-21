import { StyleSheet } from 'react-native'
import React from 'react'
import { Button, View, Text } from 'react-native-ui-lib';

interface TopBarProps {
    title: string;
}

export default function TopBar({ title }: TopBarProps) {
    return (
        <View row backgroundColor='#8B5FBF' centerV paddingH-10 style={{ height: 60 }}>
            {/* <Button
                iconSource={() => <IconSymbol name="menucard.fill" size={24} color={"white"} />}
                link
            /> */}
            <Text flex center color={"white"} text60BO marginL-30>
                {title}
            </Text>
            {/* <View row>
                <Button
                    marginR-10
                    iconSource={() => <IconSymbol name={"bell.fill"} size={24} color="white" />}
                    link
                />
                <Button
                    iconSource={() => <IconSymbol name={"search" as IconSymbolName} size={24} color="white" />}
                    link
                />
            </View> */}
        </View>
    )
}