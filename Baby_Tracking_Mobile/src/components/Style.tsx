import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8b5fbf',
        flexDirection: "column",
    },

    formContainer: {
        paddingTop: 50,
        width: "100%",
        height: "100%",
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        backgroundColor: "#fff",
    },

    horizontalForm: {
        flexDirection: "row",
    },

    loginTextContainer: {
        backgroundColor: "#8b5fbf",
        width: "100%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
    },

    titleText: {
        color: "#fff",
        fontSize: 60,
        fontWeight: "bold",
    },

    input: {
        marginVertical: 3,
        marginHorizontal: 35,
        fontSize: 16,
        color: '#333',
        height: 60,
    },

    horizontalInput: {
        flex: 1,
        marginVertical: 3,
        fontSize: 16,
        color: '#333',
        height: 60,
    },

    buttonContainer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
        paddingVertical: 10,
    },

    button: {
        backgroundColor: "#8b5fbf",
        width: 300,
        padding: 10,
        borderRadius: 10,
    },

    buttonText: {
        lineHeight: 50,
        fontSize: 20,
        fontWeight: "bold",
    },
});
