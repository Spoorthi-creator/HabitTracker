import * as React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Header, Avatar } from 'react-native-elements';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      address: '',
      docID: '',
    };
  }

  updateDetails = async () => {
    try {
      db.collection('users').doc(this.state.docID).update({
        name: this.state.name,
        contact: this.state.contact,
        address: this.state.address,
      });
      Alert.alert('Profile Updated');
      alert('Profile updated');
    } catch (e) {
      console.log(e);
    }
  };


  getUserDetails = () => {
    var email = this.state.email;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            email: data.email,
            name: data.name,
            contact: data.contact,
            address: data.address,
            docID: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }
  render() {
        console.log(this.state.name)
    return (
      <SafeAreaProvider style={{ }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Your Profile',
              style: {
                margin: 2,
                padding: 2,
                fontWeight: 'bold',
                fontSize: 30,
                color: '#fff',
              },
            }}
            backgroundColor={'#c9aec3'}
          />
              <Avatar
                rounded
                source={require('../assets/profilepic.png')}
                height='20%'
                width = '30%'
                marginBottom = '1%'
                marginTop = '3%'
                containerStyle={styles.imageContainer}
              />
              <Text
                style={{ marginTop: 10, color: 'black',justifyContent : 'center',fontSize :RFValue(16),marginLeft: 80 }}>
                {this.state.email}
              </Text>
              <TextInput
                style={styles.textinput}
                placeholder={'first name'}
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                }}
                value={this.state.name}
              />
              <TextInput
                style={styles.textinput}
                placeholder={'contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
                value={this.state.contact}
              />
              <TextInput
                style={styles.textinput}
                multiline={true}
                numberOfLines={2}
                placeholder={'Address'}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
                value={this.state.address}
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  this.updateDetails();
                }}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: RFValue(22),
  },
  imageContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  updateButton: {
    width: '80%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
   
    alignSelf: 'center',
    backgroundColor: '#3fbf7f',
    borderRadius: 20,
  },
  textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
    height: 50,
    borderColor: 'black',
    borderRadius: 20,
    borderBottomWidth: 1.5,
   
    alignSelf: 'center',
    padding: 10,
  },
});
