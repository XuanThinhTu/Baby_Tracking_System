import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper';
import { View } from 'react-native-ui-lib';
import useApi from '../../services/hooks/useApi';
import { API_POST_AUTH_LOGIN } from '@env';
import { useAuth } from '../../services/hooks/useAuth';
import { useRedirect } from '../../services/hooks/useRedirect';
import { setAuthToken } from '../../services/apiServices';

export default function Login() {
  const { redirectToRegister, redirectToHome } = useRedirect();
  const { saveToken } = useAuth();
  const { fetchData: loginUser, error, loading } = useApi(API_POST_AUTH_LOGIN, "POST", null);
  const [loginData, setLoginData] = useState<loginUser>({
    email: "",
    password: ""
  });
  const [hidePass, setHidePass] = useState(true);

  const handleLogin = async () => {
    var response: ServerResponse = await loginUser(API_POST_AUTH_LOGIN, "POST", loginData , {"Content-Type":"application/json"});
    if (response.success) {
      saveToken(response.data.accessToken);
      setAuthToken(response.data.accessToken);
      redirectToHome();
    } else {
      console.log(response.message);
    }
    setLoginData({
      email: "",
      password: ""
    })
  }

  const handleInput = (field: keyof loginUser, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
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
          keyboardType='email-address'
          value={loginData.email}
          left={<TextInput.Icon icon="email" />}
          onChangeText={text => handleInput("email", text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={hidePass}
          label="Password"
          textContentType='password'
          value={loginData.password}
          right={<TextInput.Icon onPress={() => setHidePass(!hidePass)} icon={hidePass ? "eye-off" : "eye"} />}
          left={<TextInput.Icon icon={"lock"} />}
          onChangeText={text => handleInput("password", text)}
        />
        <View style={styles.registerContainer}>
          <Text>Don't have account yet? </Text>
          <Text style={styles.registerHyperlink} onPress={() => redirectToRegister()}>Register</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          contentStyle={{ height: 30 }}
          labelStyle={styles.buttonText}
          style={styles.button}
          icon="" mode="contained"
          loading={loading}
          disabled={loading}
          onPress={handleLogin}>
          {loading ? null : "Sign in"}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: "blue",
    alignItems: "flex-end",
    marginEnd: 30
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  registerHyperlink: {
    color: "blue",
    textDecorationLine: "underline",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },

  button: {
    position: "relative",
    backgroundColor: "#8b5fbf",
    width: 300,
    padding: 10,
    borderRadius: 10
  },

  buttonText: {
    position: "absolute",
    lineHeight: 50,
    fontSize: 20,
    fontWeight: "bold",
  }
});