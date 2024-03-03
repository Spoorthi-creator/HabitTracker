import React from "react";
import firebase from "firebase";
import db from "../config"
import {Text, StyleSheet,View,Modal,TouchableOpacity,TextInput,Image,ScrollView,KeyboardAvoidingView,Alert,ImageBackground, Dimensions} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo,AntDesign } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { Feather } from '@expo/vector-icons'; 

export default class Login extends React.Component{
constructor(){
super()
this.state={
  emailID:"",
  password:"",
  secureTextEntry:true
 }
} 
changeSecureText = () => {
        this.setState({secureTextEntry : ! this.state.secureTextEntry})}
   signIn = () => {
        if (this.state.emailID != "" && this.state.password != ""){
            firebase.auth().signInWithEmailAndPassword(this.state.emailID, this.state.password)
            .then((userCredential) => {
                this.props.navigation.replace("Home")
  })
            .catch((error) => {
                var errorMessage = error.message;
                Alert.alert(errorMessage)
  });
        } else {
            Alert.alert("Please fill the above details")
        }
    }

render(){
  return(
      <ImageBackground style = {styles.backgroundImage} source = {require("../assets/background.png")}>
  <View style={{flex:1}}>
 
      <View style = {{width:160,borderColor:"white",height:50, alignContent:"center",alignItems:"center",justifyContent:"center",marginTop:screenHeight/5,alignSelf:'center'}}>
       <Image source={require("../assets/Humble.png")}style={{height:80,width:80,alignSelf:'center'}}></Image>
     
      </View>
    <View    style={{marginTop:40}}>
        <View style={[styles.inputContainer, { marginTop: 100 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'user'} size={25} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'EmailID'}
                  onChangeText={(text) => {
                    this.setState({
                      emailID: text,
                    });
                  }}
                  value={this.state.emailID}
                />
              </View>

     <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'eye'} size={25} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  secureTextEntry={false}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  value={this.state.password}
                />
              </View>
   <TouchableOpacity style={{alignItems:'flex-end'}}onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}>
       <Text style={{
     color:'black',fontSize:16}}> Forgot password?</Text>
       </TouchableOpacity> 
  </View>

       <TouchableOpacity style={styles.button1} onPress={()=>{this.signIn()}}>
       <Text style={styles.buttonText}> Login</Text>
       </TouchableOpacity> 
       <TouchableOpacity style={styles.signUpText} onPress={()=>this.props.navigation.navigate('Register')}>
       <Text style={{ textAlign:"center",
     color:'black',fontSize:16}}> New user? Click here </Text>
       </TouchableOpacity> 
       
      </View>
      </ImageBackground>
  
  )  
  
}
}


const styles = StyleSheet.create({
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
 
    color: '#333333',
  },
  
  backgroundImage : {
    flex : RFValue(1),
    resizeMode : "cover",
    height : screenHeight,
    width : screenWidth,
  },

 
  button1:{

    width:165,
    height:50,
    backgroundColor: "white",
    marginTop:30,
    borderRadius:30,
   alignSelf:'center',
   justifyContent:'center'
  },
  buttonText:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:"center",
     color:'black'

  },

  signUpText:{
    marginTop:10,
   
  }

})