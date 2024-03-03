import React, {useState,useEffect, useRef} from "react";
import firebase from "firebase";
import db from "../config"
import {Text, StyleSheet,View,Modal,TouchableOpacity, Dimensions,Platform} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      repeat : true,
    }),
  });



export default function CreateScreen({navigation}){
const[ title,setTitle]=useState('')
const[description,setDescription]=useState('')
const[minDate,setMinDate]=useState('')
const[date,setDate]=useState('')
const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const hourOptions = ['00', '01', '02', '03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  const minuteOptions = ['00', '01', '02', '03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29', '30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
  var curTime =  new  Date().toLocaleString();

const [triggerTS,setTriggerTS]=useState('')

const trigger = new Date(triggerTS)
trigger.setHours(selectedHour)
trigger.setMinutes(selectedMinute)
trigger.setSeconds(0)








async function submit(){
  if(title!=''&&description!=''&&selectedHour!=''&&selectedMinute!=''){  
  await
  db.collection(firebase.auth().currentUser.email).add({
    title:title,
    description:description,
    selectedHour:selectedHour,
    selectedMinute:selectedMinute,
})

  alert('You will be notified at the right time!!')   

  }else{
    alert('Please fill in all the fields')
  }
}

 async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "HabitTracker",
            body: description,
            data: {},
    },
    trigger: { hour : parseInt(selectedHour) , minute : parseInt(selectedMinute), repeats : true}
  });
  alert('You have successfully subscribed for notifications');
}

return(
  <View style={{flex:1,backgroundColor: '#c9aec3'}}>
     <TouchableOpacity style={styles.button1} onPress={()=>{navigation.navigate("HomeScreen")}}>
       <AntDesign name="leftcircleo" size={25} color="black" />
       </TouchableOpacity> 
  <Text  style={{
               marginTop: 50,
               marginLeft: 110,
                padding: 10,
                fontWeight: 'bold',
                fontSize: 30,
                color: '#ffffff',
                justifyContent : 'center'
}}>
  Add a Task
  </Text>
<View  
  style={{
    backgroundColor: 'white',
    marginTop:60,
    width : '100%',
    height:'85%',
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    borderBottomLeftRadius: 30,
  }}
>
   <Input
   placeholder="Title"
   leftIcon={<Entypo name="menu" size={24} color="white" /> }
  inputStyle={{"color":'black'}}
   onChangeText={value => setTitle(value)}   />
   <Input
   placeholder="Descripton"
   leftIcon={<Entypo name="menu" size={24} color="white" /> }
  inputStyle={{"color":'black'}}
   onChangeText={value => setDescription(value)}   />

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
   <Text style={{fontSize:RFValue(20),color:"black",marginLeft:8,margin:30}}>
   Hour
   </Text>
   <View style={{borderRadius:20,width:150,borderWidth:2,height:60,alignItems:'center',backgroundColor:'white'}}>
   <Picker
   style={{color:'black',width:100,height:40, borderColor: 'white'}}
   inputStyle={{borderRadius:10,marginTop: 40,borderColor: 'white'}}
        selectedValue={selectedHour}
        onValueChange={(itemValue) => setSelectedHour(itemValue)}
      >
        {hourOptions.map((hour) => (
          <Picker.Item
              key={hour} label={hour} value={hour} />
        ))}
      </Picker>
      </View>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
   <Text style={{fontSize:RFValue(20),color:"black",marginLeft:5,margin:20}}>
   Minute
   </Text>
   <View style={{borderRadius:20,width:150,borderWidth:2,height:60,alignItems:'center',backgroundColor:'white'}}>
      <Picker
     
   style={{color:'black',width:100,height:40,}}
        selectedValue={selectedMinute}
        onValueChange={(itemValue) => setSelectedMinute(itemValue)}
      >
        {minuteOptions.map((minute) => (
          <Picker.Item key={minute} label={minute} value={minute} />
        ))}
      </Picker>
      </View>
      </View>

       <TouchableOpacity style={styles.button2} onPress={submit}>
       <Text style={styles.buttonText}> Create</Text>
       </TouchableOpacity> 

       <TouchableOpacity style={styles.button2}  onPress={async () => {
          await schedulePushNotification();
        }}>
       <Text style={styles.buttonText}> Also Notify ?</Text>
       </TouchableOpacity>
       </View> 
  </View>
  )}

  const styles = StyleSheet.create({
  button1:{
   
    width: 35,
    height: 35,

   
   margin:20,
    backgroundColor: '#c9aec3',
    borderRadius: 70,
    elevation: 8,
  },
    button2:{
    width:165,
    height:50,
    backgroundColor: "#C4BCDC",
    marginBottom:20,
    borderRadius:30,
   alignSelf:'center',
   justifyContent:'center'
  },
    buttonText:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:"center",
     color:'black'

  },
})
 
