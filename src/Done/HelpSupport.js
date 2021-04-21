import React, {useState} from 'react'
import {Text,View,StyleSheet,Image,ScrollView,TextInput, Button,TouchableOpacity, StatusBar,Picker} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Feather'
import Header from '../components/Header1'
const HelpSupportScreen = ({navigation}) => {
 
    return(
      <>
        <StatusBar backgroundColor="white" barStyle = "dark-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
          <Header title="HELP AND SUPPORT" />
          <Icons name="add-circle-outline" size={28} style={{position:'absolute', top:1,right:20}} />
        
        {/* <ScrollView style={{flex:1}}> */}
        <View style={styles.card}>
        <View style={{left:30}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#aeb0af'}}>SUPPORT ID : RT30432</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>SUBJECT: Need help installation</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>MESSAGE: Need help installation...</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'rgb(255,204,102)'}}>PENDING</Text>
            <Text style={{fontSize:20,fontWeight:'bold', position:'absolute',right:25, top:110}}>OTP</Text>
          </View>
          
          </View>  
          <View style={styles.card}>
        <View style={{left:30}}>
        <Text style={{fontSize:18,fontWeight:'bold',color:'#aeb0af'}}>SUPPORT ID : RT30432</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>SUBJECT: Need help installation</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>MESSAGE: Need help installation...</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'rgb(255,204,102)'}}>PENDING</Text>
            <Text style={{fontSize:20,fontWeight:'bold', position:'absolute',right:25, top:110}}>OTP</Text>
          </View>
         
          </View>
          <View style={styles.card}>
        <View style={{left:30}}>
        <Text style={{fontSize:18,fontWeight:'bold',color:'#aeb0af'}}>SUPPORT ID : RT30432</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>SUBJECT: Need help installation</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'#aeb0af'}}>MESSAGE: Need help installation...</Text>
            <Text style={{fontSize:16,fontWeight:'bold', marginTop:10,color:'rgb(255,204,102)'}}>PENDING</Text>
            <Text style={{fontSize:20,fontWeight:'bold', position:'absolute',right:25, top:110}}>OTP</Text>
          </View>
          
          </View> 
          {/* </ScrollView>  */}
        </View>
        
        </>
       
    )
}

const styles = StyleSheet.create({
  card: {
    height: 170,
    width: 100,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    alignSelf:'center',
    width:'90%',
    padding:20,
    marginTop:20,
    elevation:2
    
},
image: {
    height:105,
    width:100,
    backgroundColor:'grey',
    borderRadius:20,
    position:'absolute',
    top:15,
    left:25
},
search: {
    width:'77%',
    height:42,
    marginLeft:25, 
    borderRadius:20,
    fontSize:16,
    marginBottom:10,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
  width: 0,
  height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
}
})

export default HelpSupportScreen