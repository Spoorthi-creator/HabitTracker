import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      contact: '',
      address: '',
      confirmPassword: '',
    };
  }

  signUp = (email, password, confirmPassword) => {
    if (password != confirmPassword) {
      alert("Passwords don't match");
      Alert.alert("Passwords don't match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('users').add({
            name: this.state.firstName,
            contact: this.state.contact,
            email: this.state.email.toLowerCase(),
            address: this.state.address,
          });
          alert('User added successfully');
          Alert.alert('User added successfully');
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorM = error.message;
          console.log(errorM);
        });
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={require('../assets/background.png')}
          style={styles.image}>
          <KeyboardAvoidingView style={{ marginTop: 20 }}>
            <View
              style={{
                width : '95%' ,
                padding: 10,
                alignItems: 'center',
              }}>
              <View style={[styles.inputContainer, { marginTop: 100 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'user'} size={25} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Name'}
                  onChangeText={(text) => {
                    this.setState({
                      firstName: text,
                    });
                  }}
                  value={this.state.firstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <MaterialCommunityIcons
                    name={'phone'}
                    size={25}
                    color="white"
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Contact'}
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({
                      contact: text,
                    });
                  }}
                  value={this.state.contact}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Entypo name={'home'} size={25} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Address'}
                  multiline={true}
                  numberOfLines={2}
                  onChangeText={(text) => {
                    this.setState({
                      address: text,
                    });
                  }}
                  value={this.state.address}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Entypo name={'mail'} size={25} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Email Id'}
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    this.setState({
                      email: text,
                    });
                  }}
                  value={this.state.email}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'eye'} size={25} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  value={this.state.password}
                />
              </View>
              <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'eyeo'} size={25} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Confirm Password'}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                  value={this.state.confirmPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => {
                  this.signUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LogInScreen')}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signUpButton: {
    width: '80%',
    padding: 20,
    marginTop: 30,
    justifyContent: 'center',
 
    backgroundColor: 'white',
    borderRadius: 20,
  },
  buttonText: {
   fontSize:23,
  fontWeight:'bold',
  textAlign:"center",
  color:'black'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '85%',
    height: 50,
    borderColor: 'black',
    borderRadius: 20,
    borderBottomWidth: 1.5,
    flexDirection: 'row',
   
    alignSelf: 'center',
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
   
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
   // fontSize: 16,
    color: '#333333',
  },
});