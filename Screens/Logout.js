import React,{Component} from 'react'
import{Text,View,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
export default class LogoutScreen extends Component{

    logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('LogInScreen');
      })
  };
  render(){

    return(
    <ImageBackground source = {require('../assets/background.png')} style={styles.image}>
      <View style = {{
         backgroundColor: 'white', flex :1,marginTop: 200,borderTopLeftRadius: 30,borderTopRightRadius: 30 
      }}>

      <Text style = {{ fontSize: 40,marginTop:20,marginLeft :20}}> Logout ? </Text>
      <Text style ={{ fontSize: 20,marginTop:20,marginLeft :20}}> Are you sure you want to logout ? </Text>
      <TouchableOpacity
                  style={{
                 marginTop:80,
                backgroundColor: 'orange',
                justifyContent: 'center',
                height:80,
                marginLeft: 50,
                marginRight: 50,
                borderRadius: 40
                }}
        onPress={() => this.logout()}>
      <Text style={styles.buttonText}>
        Logout
      </Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
    buttonText: {
    fontSize:30,
    fontWeight:'bold',
    textAlign:"center",
    color:'black',
      marginTop:20,
    },
    image:{
      flex:1
    }
})