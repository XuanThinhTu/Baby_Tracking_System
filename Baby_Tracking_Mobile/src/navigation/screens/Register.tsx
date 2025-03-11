import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Image, View } from 'react-native-ui-lib'
import useApi from '../../services/hooks/useApi'
import { API_POST_USER_REGISTER } from '@env'
import { useRedirect } from '../../services/hooks/useRedirect'

interface RegisterUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    address: string
}

export function Register() {
    const { goBack } = useRedirect();
    const { fetchData: registerUser, error, loading } = useApi(API_POST_USER_REGISTER, "POST", null, false);
    const [hidePass, setHidePass] = useState(true);
    const [user, setUser] = useState<RegisterUser>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const handleInputChange = (field: keyof RegisterUser, value: string) => {
        setUser(prev => ({ ...prev, [field]: value }));
    }

    const register = async () => {
        try {

            var response = await registerUser(API_POST_USER_REGISTER, "POST", user);
            console.log(response);
            setUser({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone: '',
                address: ''
            });

            if (response.statusCode == 201) {
                goBack();
            }

        } catch (error) {
            console.error("Register error: " + error)
        }
    }

    const redirectToLogin = () => {
        goBack();
    }

    return (
        <View style={style.container}>
            <View style={style.topBarContainer}>
                <Image style={style.topBarImage} source={require("../../assets/images/headerImage.png")} />
                <Text style={style.topBarTitle}>Register</Text>
            </View>
            <View style={style.formContainer}>
                <View style={style.horizontalForm}>
                    <TextInput
                        value={user.firstName}
                        onChangeText={(text) => handleInputChange("firstName", text)}
                        left={<TextInput.Icon icon={"account"} />}
                        style={[style.horizontalInput, style.inputSpacingRight]}
                        label={"First Name"} />
                    <TextInput
                        value={user.lastName}
                        onChangeText={(text) => handleInputChange("lastName", text)}
                        left={<TextInput.Icon icon={"account"} />}
                        style={style.horizontalInput}
                        label={"Last Name"} />
                </View>

                <TextInput
                    value={user.email}
                    onChangeText={(text) => handleInputChange("email", text)}
                    left={<TextInput.Icon icon={"email"} />}
                    style={style.inputSpacingBottom}
                    label={"Email"} />
                <TextInput
                    value={user.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    secureTextEntry={hidePass}
                    right={<TextInput.Icon onPress={() => setHidePass(!hidePass)} icon={hidePass ? "eye-off" : "eye"} />}
                    left={<TextInput.Icon icon={"lock"} />}
                    style={style.inputSpacingBottom}
                    label={"Password"} />
                <TextInput
                    value={user.phone}
                    onChangeText={(text) => handleInputChange("phone", text)}
                    left={<TextInput.Icon icon={"phone"} />}
                    style={style.inputSpacingBottom}
                    label={"Phone"} />
                <TextInput
                    value={user.address}
                    onChangeText={(text) => handleInputChange("address", text)}
                    left={<TextInput.Icon icon={"map-marker"} />}
                    style={style.inputSpacingBottom}
                    label={"Address"} />
            </View>
            <View style={style.loginContainer}>
                <Text>Already have account? </Text>
                <Text
                    style={style.loginHyperlink}
                    onPress={redirectToLogin}>Back to login</Text>
            </View>
            <View style={style.buttonContainer}>
                <Button
                    onPress={register}
                    contentStyle={{ height: 50 }}
                    labelStyle={style.registerButtonText}
                    style={style.registerButton}
                    loading={loading}
                    disabled={loading}
                    mode='contained'>{loading ? "Register..." : "Register"}</Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 0,
        margin: 0,
        flexDirection: "column",
        height: "100%",
        position: "relative"
    },

    formContainer: {
        margin: 20,
        flexDirection: "column",
    },

    topBarContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginBottom: 20
    },

    topBarImage: {
        width: "100%",
        height: 180,
        resizeMode: "cover"
    },

    topBarTitle: {
        width: "100%",
        position: "absolute",
        color: "#fff",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
    },

    horizontalForm: {
        flexDirection: "row",
        marginBottom: 10,
    },

    horizontalInput: {
        flex: 1,
    },

    inputSpacingRight: {
        marginRight: 10,
    },

    inputSpacingBottom: {
        marginBottom: 10,
    },

    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    loginHyperlink: {
        color: "blue",
        textDecorationLine: "underline"
    },

    buttonContainer: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        alignItems: "center",
    },

    registerButton: {
        position: "relative",
        backgroundColor: "#8b5fbf",
        width: 300,
        borderRadius: 10,
    },

    registerButtonText: {
        position: "absolute",
        lineHeight: 50,
        fontSize: 20,
        fontWeight: "bold",
    }
});