import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper';
import { View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import useApi from '../../services/hooks/useApi';
import { API_POST_AUTH_LOGIN } from '@env';
import { saveToken } from '../../utility/Helper';

interface loginUser {
  email: string,
  password: string,
}

export default function Login() {
  const { fetchData: loginUser, error, loading } = useApi();
  const [loginData, setLoginData] = useState<loginUser>({
    email: "",
    password: ""
  });
  const [hidePass, setHidePass] = useState(true);

  const navigate = useNavigation();

  const handleLogin = async () => {
    try {
      var response = await loginUser(API_POST_AUTH_LOGIN, "POST", loginData);
      if (response.statusCode == 200) {
        saveToken(response.data.accessToken);
        navigate.navigate("Home");
      }
      console.log(response);
      setLoginData({
        email: "",
        password: ""
      })
    } catch (error) {
      console.error("Login error: " + error)
    }
  }

  const handleInput = (field: keyof loginUser, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  }

  const redirectRegister = () => {
    navigate.navigate("Register");
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
          value={loginData.email}
          left={<TextInput.Icon icon="email" />}
          onChangeText={text => handleInput("email", text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={hidePass}
          label="Password"
          value={loginData.password}
          right={<TextInput.Icon onPress={() => setHidePass(!hidePass)} icon={hidePass ? "eye-off" : "eye"} />}
          left={<TextInput.Icon icon={"lock"} />}
          onChangeText={text => handleInput("password", text)}
        />
        {/* <Button style={styles.forgotPasswordText}>Forgot password ?</Button> */}
        <View style={styles.registerContainer}>
          <Text>Don't have account yet? </Text>
          <Text style={styles.registerHyperlink} onPress={redirectRegister}>Register</Text>
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