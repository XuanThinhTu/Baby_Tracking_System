import { Button, TextInput } from "react-native-paper";
import { View } from "react-native-ui-lib";
import { globalStyles } from "../../components/Style";
import { StyleSheet } from "react-native";
import { useTypedRoute } from "../../services/hooks/useTypeRoute";

export function ProfileDetail() {
    const route = useTypedRoute("ProfileDetail");
    const { user } = route.params;
    
    return (
        <View style={detailStyles.formContainer}>
            <View style={globalStyles.horizontalForm}>
                <TextInput
                    style={detailStyles.horizontalInput}
                    mode="outlined"
                    label="First Name"
                    value={user.firstName}
                    left={<TextInput.Icon icon="account" />}
                />
                <TextInput
                    style={detailStyles.horizontalInput}
                    mode="outlined"
                    value={user.lastName}
                    label="Last Name"
                    left={<TextInput.Icon icon="account" />}
                />
            </View>
            <TextInput
                style={detailStyles.input}
                mode="outlined"
                value={user.email}
                label="Email"
                left={<TextInput.Icon icon="email" />}
            />
            <TextInput
                style={detailStyles.input}
                mode="outlined"
                value={user.phone}
                label="Phone Number"
                left={<TextInput.Icon icon="phone" />}
            />
            <TextInput
                style={detailStyles.input}
                mode="outlined"
                value={user.address}
                label="Address"
                left={<TextInput.Icon icon="map-marker" />}
            />
            <TextInput
                style={detailStyles.input}
                mode="outlined"
                label="Current Password"
                right={<TextInput.Icon icon="eye" />}
                left={<TextInput.Icon icon="lock" />}
            />
            <TextInput
                style={detailStyles.input}
                mode="outlined"
                label="New Password"
                right={<TextInput.Icon icon="eye" />}
                left={<TextInput.Icon icon="lock" />}
            />
            <TextInput
                style={detailStyles.input}
                mode="outlined"
                label="Confirm Password"
                right={<TextInput.Icon icon="eye" />}
                left={<TextInput.Icon icon="lock" />}
            />
            <View style={globalStyles.buttonContainer}>
                <Button style={globalStyles.button} mode="contained">Update Profile</Button>
            </View>
        </View>
    )
}

const detailStyles = StyleSheet.create({
    horizontalInput: {
        ...globalStyles.horizontalInput,
        marginHorizontal: 5,
    },

    input: {
        ...globalStyles.input,
        marginHorizontal: 5,
    },

    formContainer: {
        ...globalStyles.formContainer,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        paddingTop: 10,
    }
});