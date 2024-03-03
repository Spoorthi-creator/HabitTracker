import React from "react";
import firebase from "firebase";
import db from "../config"
import {Text, StyleSheet,View,Modal,TouchableOpacity,Alert,ImageBackground, Dimensions} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default class ForgotPassword extends React.Component{
constructor(){
super()
this.state={
  email:"",
 }
} 
passwordResetEmail = () => {
       
            firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Email has been sent")
               this.props.navigation.navigate("Login")
        })
            .catch((error) => {
                var errorMessage = error.message
                Alert.alert(errorMessage)
        })
        

    }
render(){
  return(
      <ImageBackground style = {styles.backgroundImage} source = {require("../assets/background.png")}   resizeMode = "cover">
  <View style={{flex:1}}>
      <View style = {{width:screenWidth,height:100, alignSelf:"flex-end",margin:10}}>
      <Text style = {styles.title}>
        Forgot Password? 
      </Text>
      </View>
    <View    style={{marginTop:screenHeight/10}}>
        <Input
   placeholder="Email"
   leftIcon={<Entypo name="mail" size={24} color="white" /> }
  inputStyle={{"color":'white'}}
   onChangeText={value => this.setState({ email: value })}
  />
  </View>

       <TouchableOpacity style={styles.button1} onPress={()=>{this.passwordResetEmail()}}>
       <Text style={styles.buttonText}> Send Email</Text>
       </TouchableOpacity> 
   <TouchableOpacity style={{justifyContent:'center',margin:10}}onPress={()=>{this.props.navigation.navigate('LogInScreen')}}>
       <Text style={{
    fontSize:23,
  fontWeight:'bold',
  textAlign:"center",
  color:'black'}}> Back to Login</Text>
       </TouchableOpacity> 
      </View>
      </ImageBackground>
  
  )  
  
}
}


const styles = StyleSheet.create({
  title:{
    fontSize: 40,
    fontWeight: "bold", 
    color:"white",
  

  },
  
  backgroundImage : {
    flex : RFValue(1),
  
    height : screenHeight,
    width : screenWidth,
  },

  button1:{

    width:220,
    height:40,
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

})
 
