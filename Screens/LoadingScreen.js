import React,{Component} from 'react'
import{Text,View} from 'react-native'
import firebase from 'firebase'


export default class LoadingScreen extends Component{
  
componentDidMount(){
 this.checkIfLogedIn()
}

checkIfLogedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                    
              this.props.navigation.navigate("BottomTabNavigator")
            } else {
              this.props.navigation.navigate("LogInScreen")
            }
          });
    }



  render(){
    return(
      <View style={{flex:1}}>
      <Text style={{alignSelf:'center',fontSize:20,textAlign:'center'}}> Loading... </Text>
      </View>
    )
  }
}