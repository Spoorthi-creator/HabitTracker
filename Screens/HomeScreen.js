import React,{Component}  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  FlatList,Image
} from 'react-native';
import {
  Feather,
} from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends React.Component{
  constructor() {
  super();
  this.state = {
      userEmail: firebase.auth().currentUser.email,
      allUsers: [],
    };
  }


getUsers = async () => {

    db.collection(firebase.auth().currentUser.email).onSnapshot((snapshot) => {
      var allRecipes = [];
      snapshot.docs.map((doc) => {
        var recipe = doc.data();
        recipe.id = doc.id; 
        allRecipes.push(recipe);
      });
      this.setState({
        allUsers: allRecipes, 
      }); 
      console.log("Inside customers", this.state.allUsers)

      
    });
  }
    

 deleteCustomerRecord = async(id) => {
    //deleting student details according to studentId
    const {allUsers}  = this.state;
    console.log(this.state.allUsers.id)

   await db.collection(this.state.userEmail).doc(id).delete();
    alert('Habit Deleted')
   // console.log('working')

  };

  componentDidMount() {
    this.getUsers();
   }
   
    renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: '85%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
          marginLeft : 30,
        }} >
        
        <View>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize : 19 }}>
            {item.title}
          </Text>
          <Text>{item.description}</Text>
        </View>

        <Feather
          name="trash-2"
          size={25}
          color="#60CC9A"
          style={{ alignSelf: 'center' }}
          onPress = {()=> this.deleteCustomerRecord(item.id)}
        />
      </View>
    );
  }
  keyExtractor = (item, index) => index.toString();

  render(){
       
    return(
  
        <ScrollView>
    
      <View style ={styles.container}>     
      
       <Text style = {{fontSize: 40,fontWeight:'bold',color: 'white',marginTop: 40,alignSelf: 'center',padding:30}}> Welcome! </Text>
      <View style  = {{backgroundColor: 'white', flex :1,marginTop: 20,borderTopLeftRadius: 30,borderTopRightRadius: 30 }}>
      <Text style = {{fontSize: 40,marginTop:20,marginLeft :20}}> Habits: </Text>      
      <View>
                  {this.state.allUsers.length !== 0 ? (
              <FlatList
                data={this.state.allUsers}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
              />
            ) : (
              <View  style={{ flex: 1 , justifyContent:"center"}}>
                <Image
                  style={{ alignSelf: 'center', width: 150, height: 150 }}
                  source={require('../assets/empty.png')}
                />
                <Text>No Habits found!</Text>
              </View>
            )}
      </View>
      
      </View>
      </View>
    </ScrollView>
    
    )
  }
}

const styles = StyleSheet.create({
container: {
  flex:1,
  backgroundColor: '#c9aec3'
}
})