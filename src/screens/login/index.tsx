import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = (props: any) => {
  const {navigation} = props;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onLoginClick = () => {
    if (
      name.toLowerCase() === 'admin' &&
      password.toLowerCase() === 'admin1234'
    ) {
      navigation.navigate('PlayBoard');
      return;
    }

    if (
      name.toLowerCase() === 'guest' &&
      password.toLowerCase() === 'guest1234'
    ) {
      navigation.navigate('PlayBoard');
      return;
    }

    Alert.alert('Wrong credentials', 'Please enter correct value');
  };

  const onChangeName = (text: string) => {
    setName(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.view}
        placeholder="Username"
        onChangeText={onChangeName}
        testID="user-name"
        value={name}
        maxLength={10}
      />
      <TextInput
        style={styles.view}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        testID="password"
        value={password}
      />
      <TouchableOpacity
        testID={'login'}
        onPress={onLoginClick}
        style={styles.loginBtn}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  view: {
    width: '100%',
    height: 52,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gray',
    textAlignVertical: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  loginBtn: {
    width: '80%',
    height: 52,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    alignSelf: 'center',
  },
  login: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default Login;
