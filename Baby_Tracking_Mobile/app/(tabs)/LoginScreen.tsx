import React, { useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { Button, Text, TextField } from 'react-native-ui-lib';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with', email, password);
        // Handle login logic here
    };

    const handleForgetPassword = () => {
        console.log('Navigating to Forget Password screen');
        // Navigate to the Forget Password screen here
    };

    const handleSignup = () => {
        console.log('Navigating to Signup screen');
        // Navigate to the Signup screen here
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require("../../assets/images/Login/amico.png")} style={styles.topImage} />
            </View>
            <View style={styles.loginContainer}>
                <Text text30BL style={styles.loginText}>Log in</Text>
            </View>
            <View style={styles.textFieldContainter}>
                <TextField
                    placeholder="Email"
                    floatingPlaceholder
                    floatingPlaceholderStyle={{ padding: 10 }}
                    text60BL
                    style={styles.textFieldInput}
                />
            </View>
            <View style={styles.textFieldContainter}>
                <TextField
                    placeholder="Password"
                    floatingPlaceholder
                    floatingPlaceholderStyle={{ padding: 10 }}
                    text60BL
                    style={styles.textFieldInput}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button backgroundColor="#FF7F50" borderRadius={10} text50BL label="Log in"></Button>
            </View>
            <View>
                <Text text70BO style={styles.loginText}>Log in with</Text>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        borderWidth: 1,
    },

    topImage: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginTop: 90,
    },

    loginContainer: {
    },

    loginText: {
        textAlign: 'center',
        marginTop: 20
    },

    textFieldContainter: {
        marginTop: 20,
        marginHorizontal: 50,
    },

    textFieldInput: {
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        paddingStart: 10,
    },

    buttonContainer: {
        marginTop: 40,
        marginHorizontal: 50,
    },

    socialLoginContainer: {
        
    }

});
