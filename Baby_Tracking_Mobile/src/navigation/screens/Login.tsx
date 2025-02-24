import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper';
import { View } from 'react-native-ui-lib';
import { getRequest } from '../../services/apiServices';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);


  const handleLogin = async () => {
    const response = await getRequest("api/standard-index");
    console.log(response);
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Log in</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          left={<TextInput.Icon icon="email" />}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={hidePass}
          label="Password"
          value={password}
          right={<TextInput.Icon onPress={() => setHidePass(!hidePass)} icon={hidePass ? "eye-off" : "eye"} />}
          left={<TextInput.Icon icon={"lock"} />}
          onChangeText={text => setPassword(text)}
        />
        <Text style={styles.forgotPasswordText} variant='bodyLarge'>Forgot password ?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          labelStyle={styles.buttonText}
          style={styles.button}
          icon="" mode="contained"
          onPress={handleLogin}>
          Sign in
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b5fbf',
    flexDirection: "column"
  },

  formContainer: {
    paddingTop: 50,
    width: "100%",
    height: "100%",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    backgroundColor: "#fff"

  },

  loginTextContainer: {
    backgroundColor: "#8b5fbf",
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",

  },

  loginText: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
  },

  input: {
    marginVertical: 15,
    marginHorizontal: 35,
    fontSize: 16,
    color: '#333',
  },

  forgotPasswordText: {
    textAlign: "right",
    marginEnd: 35,
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
    width: 350,
    padding: 10,
    borderRadius: 10
  },

  buttonText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  }
});