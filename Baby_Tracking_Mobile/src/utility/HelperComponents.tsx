import { Alert } from "react-native";

export const showConfirmDialog = (title: string, message: string, onConfirm: () => void) => {
    Alert.alert(
        title,
        message,
        [
            { text: "Cancel", style: "cancel" },
            { text: "Confirm", onPress: onConfirm, style: "destructive" }
        ]
    );
};