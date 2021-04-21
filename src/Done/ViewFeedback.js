import React, {useState} from 'react'
import {Text,View,StyleSheet,Image,ScrollView,TextInput, Button,TouchableOpacity, StatusBar,Picker} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Feather'
import Header from '../components/Header'
const ViewFeedbackScreen = ({navigation}) => {
 
    return(
      <>
        <StatusBar backgroundColor="white" barStyle = "dark-content" />
        
        <View style={{flex:1,backgroundColor:'rgb(255,255,255)'}}>
          <Header title="" />
          <Icon  name="edit-3" size={24} style={{position:'absolute', right:60}}  />
          <View style={{left:30}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#aeb0af'}}>SUBJECT</Text>
            <Text style={{fontSize:20,fontWeight:'bold', marginTop:15,color:'#aeb0af'}}>MESSAGE</Text>
          </View>
          <View style={{marginTop:20}}>
            <Icon name="calendar" size={24} style={{position:'absolute', left:32,color:'#aeb0af'}} />
            <Text style={{fontSize:20,fontWeight:'bold', left:60,color:'#aeb0af'}}>ADDED ON</Text>
          </View>
          <View style={{marginTop:15, }}>
          <Icon name="crop" size={22} style={{position:'absolute',left:32,color:'#aeb0af'}} />
            <Text style={{color:'red',fontSize:20,fontWeight:'bold',left:60}}>PROGRESS</Text>
          </View>    
        </View>
        </>
       
    )
}

const styles = StyleSheet.create({
    card: {
        padding:10,
        paddingTop:0,
        marginBottom:20
    },
    image: {
        height:120,
        width:120,
        backgroundColor:'grey',
        alignSelf:'center',
        borderRadius:60
    },
    input: {
      width:'100%',
      height:40,
      backgroundColor:'rgb(255,255,255)',
      borderRadius:5,
      fontSize:14,
      marginBottom:20,
      borderBottomWidth:1,
      color:'black',
    },
    text1: {
      fontSize:14,
      color:'rgb(213,213,213)',
      marginBottom:3,
      fontWeight:'bold',
      fontFamily:'Helvetica Neue'
    },
    button: {
      position:'absolute',
      left:20,
      height:60,
      borderRadius:20,
      width:'40%',
      backgroundColor:'rgb(255,204,102)',
      bottom:20
  },
  button1: {
    position:'absolute',
    alignSelf:'center',
    right:20,
    height:60,
    borderRadius:20,
    width:'40%',
    backgroundColor:'rgb(255,204,102)',
    bottom:20
},
  buttonText: {
      fontSize:17,
      alignSelf:'center',
      padding:16,
      color:'black',
      fontWeight:'bold'
  },
})

export default ViewFeedbackScreen